import { getUpcomingEvents } from "@/lib/calendar";

/** GET /api/events — upcoming events (Google Calendar, or fallback content). */
export async function GET() {
  const { events, source } = await getUpcomingEvents();
  return Response.json({ source, events });
}
