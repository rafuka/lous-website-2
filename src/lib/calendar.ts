import "server-only";
import { cacheLife } from "next/cache";
import { JWT } from "google-auth-library";
import { fallbackEvents } from "@/content/events";
import type { CalendarEvent, HouseSlug } from "@/content/types";

/**
 * Google Calendar integration.
 *
 * Connect later by creating a Google Cloud service account, enabling the
 * Google Calendar API, sharing each calendar with the service account email
 * ("See all event details"), then setting:
 *
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL
 *   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY   (with literal \n line breaks)
 *   GOOGLE_CALENDAR_PUBLIC_ID            calendar for open events
 *   GOOGLE_CALENDAR_MEMBERS_ID           calendar for members-only events (optional)
 *
 * Tag events with House hashtags in the description to associate them with
 * Houses: #whale #eagle #wolf #dragon. Anything on the members calendar, or
 * tagged #members, is marked members-only.
 *
 * Until configured, the site shows the fallback events in src/content/events.ts.
 */

const HOUSE_TAGS: HouseSlug[] = ["whale", "eagle", "wolf", "dragon"];

export function isCalendarConfigured() {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
      (process.env.GOOGLE_CALENDAR_PUBLIC_ID || process.env.GOOGLE_CALENDAR_MEMBERS_ID),
  );
}

async function getAccessToken() {
  const jwt = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
  });
  const { token } = await jwt.getAccessToken();
  if (!token) throw new Error("Could not obtain Google access token");
  return token;
}

type GoogleEvent = {
  id: string;
  summary?: string;
  description?: string;
  location?: string;
  htmlLink?: string;
  start?: { dateTime?: string; date?: string };
  end?: { dateTime?: string; date?: string };
};

async function fetchCalendar(calendarId: string, token: string, membersCalendar: boolean) {
  const params = new URLSearchParams({
    timeMin: new Date().toISOString(),
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "50",
  });
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok) throw new Error(`Google Calendar ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as { items?: GoogleEvent[] };

  return (data.items ?? []).flatMap((e): CalendarEvent[] => {
    const start = e.start?.dateTime ?? e.start?.date;
    if (!start) return [];
    const text = `${e.summary ?? ""} ${e.description ?? ""}`.toLowerCase();
    return [
      {
        id: e.id,
        title: e.summary ?? "Untitled",
        start,
        end: e.end?.dateTime ?? e.end?.date,
        description: e.description?.replace(/#\w+/g, "").trim() || undefined,
        location: e.location,
        houses: HOUSE_TAGS.filter((h) => text.includes(`#${h}`)),
        membersOnly: membersCalendar || text.includes("#members"),
      },
    ];
  });
}

export async function getUpcomingEvents(): Promise<{ events: CalendarEvent[]; source: "google" | "fallback" }> {
  "use cache";
  cacheLife("minutes");

  const now = Date.now();
  const upcomingFallback = () =>
    fallbackEvents.filter((e) => new Date(e.end ?? e.start).getTime() >= now);

  if (!isCalendarConfigured()) return { events: upcomingFallback(), source: "fallback" };

  try {
    const token = await getAccessToken();
    const sources: Promise<CalendarEvent[]>[] = [];
    if (process.env.GOOGLE_CALENDAR_PUBLIC_ID)
      sources.push(fetchCalendar(process.env.GOOGLE_CALENDAR_PUBLIC_ID, token, false));
    if (process.env.GOOGLE_CALENDAR_MEMBERS_ID)
      sources.push(fetchCalendar(process.env.GOOGLE_CALENDAR_MEMBERS_ID, token, true));
    const events = (await Promise.all(sources))
      .flat()
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    return { events, source: "google" };
  } catch (err) {
    console.error("[calendar] falling back to static events:", err);
    return { events: upcomingFallback(), source: "fallback" };
  }
}

/** Google Calendar appointment-schedule booking page for 1:1 sessions. */
export function getBookingUrl() {
  return process.env.NEXT_PUBLIC_GOOGLE_BOOKING_URL || undefined;
}
