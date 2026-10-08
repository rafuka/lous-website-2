import type { CalendarEvent } from "./types";

/**
 * Fixed dates already decided. They are shown on the calendar when Google
 * Calendar is not connected yet, and on the matching program pages either way.
 * Every time is Europe/Brussels local time (CET, or CEST from 28 March 2027).
 *
 * Practice Lab (Mondays 10:00) and Akawa (Wednesdays 19:30) run three times a
 * month on dates still to be fixed — their rhythm is shown from programs.ts.
 * Live Time of Presence appears at short notice, from Google Calendar only.
 */

function creativeFlow(n: number, start: string, end: string): CalendarEvent {
  return {
    id: `creative-flow-${n}`,
    title: "Unlock Your Creative Flow",
    description: `Session ${n} of 24.`,
    start,
    end,
    houses: ["whale"],
    membersOnly: false,
    offering: "unlock-your-creative-flow",
  };
}

function newMoon(start: string, end: string, note?: string): CalendarEvent {
  return {
    id: `reclaiming-our-blood-${start.slice(0, 10)}`,
    title: "Reclaiming Our Blood",
    description: note ?? "New Moon gathering.",
    start,
    end,
    houses: ["whale", "eagle"],
    membersOnly: false,
    offering: "reclaiming-our-blood",
  };
}

export const creativeFlowSessions: CalendarEvent[] = [
  creativeFlow(1, "2026-11-10T10:00:00+01:00", "2026-11-10T12:00:00+01:00"),
  creativeFlow(2, "2026-11-12T19:00:00+01:00", "2026-11-12T21:00:00+01:00"),
  creativeFlow(3, "2026-11-24T10:00:00+01:00", "2026-11-24T12:00:00+01:00"),
  creativeFlow(4, "2026-11-26T19:00:00+01:00", "2026-11-26T21:00:00+01:00"),
  creativeFlow(5, "2026-12-01T10:00:00+01:00", "2026-12-01T12:00:00+01:00"),
  creativeFlow(6, "2026-12-03T19:00:00+01:00", "2026-12-03T21:00:00+01:00"),
  creativeFlow(7, "2026-12-15T10:00:00+01:00", "2026-12-15T12:00:00+01:00"),
  creativeFlow(8, "2026-12-17T19:00:00+01:00", "2026-12-17T21:00:00+01:00"),
  creativeFlow(9, "2027-01-12T10:00:00+01:00", "2027-01-12T12:00:00+01:00"),
  creativeFlow(10, "2027-01-14T19:00:00+01:00", "2027-01-14T21:00:00+01:00"),
  creativeFlow(11, "2027-01-26T10:00:00+01:00", "2027-01-26T12:00:00+01:00"),
  creativeFlow(12, "2027-01-28T19:00:00+01:00", "2027-01-28T21:00:00+01:00"),
  creativeFlow(13, "2027-02-09T10:00:00+01:00", "2027-02-09T12:00:00+01:00"),
  creativeFlow(14, "2027-02-11T19:00:00+01:00", "2027-02-11T21:00:00+01:00"),
  creativeFlow(15, "2027-02-23T10:00:00+01:00", "2027-02-23T12:00:00+01:00"),
  creativeFlow(16, "2027-02-25T19:00:00+01:00", "2027-02-25T21:00:00+01:00"),
  creativeFlow(17, "2027-03-02T10:00:00+01:00", "2027-03-02T12:00:00+01:00"),
  creativeFlow(18, "2027-03-04T19:00:00+01:00", "2027-03-04T21:00:00+01:00"),
  creativeFlow(19, "2027-03-23T10:00:00+01:00", "2027-03-23T12:00:00+01:00"),
  creativeFlow(20, "2027-03-25T19:00:00+01:00", "2027-03-25T21:00:00+01:00"),
  creativeFlow(21, "2027-04-06T10:00:00+02:00", "2027-04-06T12:00:00+02:00"),
  creativeFlow(22, "2027-04-08T19:00:00+02:00", "2027-04-08T21:00:00+02:00"),
  creativeFlow(23, "2027-04-20T10:00:00+02:00", "2027-04-20T12:00:00+02:00"),
  creativeFlow(24, "2027-04-22T19:00:00+02:00", "2027-04-22T21:00:00+02:00"),
];

export const newMoonGatherings: CalendarEvent[] = [
  newMoon("2026-11-09T19:30:00+01:00", "2026-11-09T21:00:00+01:00"),
  newMoon("2026-12-09T19:30:00+01:00", "2026-12-09T21:00:00+01:00"),
  newMoon("2027-01-07T19:30:00+01:00", "2027-01-07T21:00:00+01:00"),
  newMoon("2027-02-06T19:30:00+01:00", "2027-02-06T21:00:00+01:00", "New Moon · annular solar eclipse"),
  newMoon("2027-03-08T19:30:00+01:00", "2027-03-08T21:00:00+01:00"),
  newMoon("2027-04-07T19:30:00+02:00", "2027-04-07T21:00:00+02:00"),
  newMoon("2027-05-06T19:30:00+02:00", "2027-05-06T21:00:00+02:00"),
  newMoon("2027-06-04T19:30:00+02:00", "2027-06-04T21:00:00+02:00"),
  newMoon("2027-07-04T19:30:00+02:00", "2027-07-04T21:00:00+02:00"),
];

export const fixedEvents: CalendarEvent[] = [...creativeFlowSessions, ...newMoonGatherings].sort(
  (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
);
