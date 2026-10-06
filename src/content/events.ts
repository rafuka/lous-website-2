import type { CalendarEvent } from "./types";

/**
 * Fallback events shown when Google Calendar is not yet connected.
 * Once GOOGLE_CALENDAR_* env vars are set, events come from the calendar
 * instead (see src/lib/calendar.ts). Keep this list empty or illustrative.
 */
export const fallbackEvents: CalendarEvent[] = [
  {
    id: "sample-creative-flow-opening",
    title: "Unlock Your Creative Flow — opening session",
    start: "2026-11-03T18:00:00Z",
    end: "2026-11-03T20:00:00Z",
    houses: ["whale"],
    membersOnly: false,
    description: "The first live session of the six-month program.",
  },
  {
    id: "sample-akawa",
    title: "Akawa session",
    start: "2026-11-10T19:00:00Z",
    end: "2026-11-10T20:30:00Z",
    houses: ["eagle"],
    membersOnly: true,
  },
  {
    id: "sample-practice-lab",
    title: "Practice Lab — The Origin",
    start: "2026-11-12T17:00:00Z",
    end: "2026-11-12T18:30:00Z",
    houses: ["whale"],
    membersOnly: true,
  },
];
