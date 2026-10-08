import type { Metadata } from "next";
import Link from "next/link";
import { CategoryMark, Eyebrow, PageIntro, Pill, Section } from "@/components/ui";
import { getActiveHouses, getHouse, houseName } from "@/content/houses";
import { getAllOfferings, getProgram, isMembersOnly, offeringHref } from "@/content/programs";
import type { CalendarEvent } from "@/content/types";
import { getUpcomingEvents } from "@/lib/calendar";
import { formatEventDate, formatPriceInline, formatTimeRange } from "@/lib/format";

export const metadata: Metadata = {
  title: "Calendar",
  description: "Upcoming sessions, practices, programs and gatherings across The Wolf Wisdom.",
};

export default async function CalendarPage() {
  const { events } = await getUpcomingEvents();
  const rhythms = getAllOfferings().filter((p) => p.rhythm);
  const months = groupByMonth(events);

  return (
    <>
      <PageIntro eyebrow="Calendar" title="What is happening, and when.">
        Programs, practices and gatherings across the school — with who each is for, whether your membership includes
        it, and how to join on its own. All times are Brussels time (CET/CEST).
      </PageIntro>

      {/* Regular rhythm */}
      <Section tone="light" className="py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>The rhythm</Eyebrow>
            <h2 className="display mt-4 text-4xl md:text-5xl">How the school breathes.</h2>
          </div>
          <Legend />
        </div>
        <ul className="mt-12 grid gap-x-10 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {rhythms.map((p) => (
            <li key={p.slug} className="border-b border-line">
              <Link href={offeringHref(p)} className="group flex h-full flex-col py-6">
                <span className="flex items-center gap-3">
                  <OfferingMark houses={p.includedIn} />
                  <span className="display text-2xl">{p.title}</span>
                </span>
                <span className="text-muted mt-3 text-sm">{p.rhythm}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Upcoming */}
      <Section tone="light" className="border-t border-line py-24">
        <Eyebrow>Upcoming</Eyebrow>
        {months.length === 0 ? (
          <p className="display mt-8 text-3xl">New dates are on their way.</p>
        ) : (
          months.map(([month, list]) => (
            <div key={month} className="mt-12">
              <h2 className="display text-3xl md:text-4xl">{month}</h2>
              <ul className="mt-6 divide-y divide-line-light border-y border-line">
                {list.map((e) => (
                  <EventRow key={e.id} event={e} />
                ))}
              </ul>
            </div>
          ))
        )}
        <p className="text-muted mt-10 max-w-2xl text-sm">
          Live Time of Presence appears here at short notice, whenever the space opens. 1:1 Resonance Flow™ times are
          on the <Link href="/sessions" className="link-underline text-current">booking page</Link>.
        </p>
      </Section>
    </>
  );
}

function EventRow({ event: e }: { event: CalendarEvent }) {
  const d = formatEventDate(e.start);
  const offering = e.offering ? getProgram(e.offering) : undefined;
  const standalone = offering?.offers[0];

  return (
    <li className="grid gap-4 py-7 md:grid-cols-12 md:items-baseline">
      <div className="flex items-baseline gap-3 md:col-span-2">
        <span className="display text-5xl">{d.day}</span>
        <span className="eyebrow text-muted">{d.weekday.slice(0, 3)}</span>
      </div>
      <div className="md:col-span-5">
        <p className="flex items-center gap-3">
          <OfferingMark houses={e.houses} />
          <span className="display text-3xl">{e.title}</span>
        </p>
        <p className="text-muted mt-1 text-sm">
          {formatTimeRange(e.start, e.end)}
          {e.location ? ` · ${e.location}` : ""}
          {e.description ? ` · ${e.description}` : ""}
        </p>
      </div>
      <div className="space-y-2 text-sm md:col-span-3">
        {(e.membersOnly || offering?.eligibilityLabel) && (
          <div className="flex flex-wrap gap-2">
            {e.membersOnly && <Pill>Members only</Pill>}
            {offering?.eligibilityLabel && <Pill>{offering.eligibilityLabel}</Pill>}
          </div>
        )}
        {e.houses.length > 0 && (
          <p className="text-muted">
            Included in {e.houses.map(houseName).join(" & ")}
            {offering?.inclusionNote ? ` · ${offering.inclusionNote.toLowerCase()}` : ""}
          </p>
        )}
        {standalone && !e.membersOnly && <p>On its own: {formatPriceInline(standalone.price)}</p>}
      </div>
      <div className="md:col-span-2 md:text-right">
        {offering && (
          <Link href={offeringHref(offering)} className="link-underline text-sm">
            {isMembersOnly(offering) || e.membersOnly ? "Details" : "Join"} →
          </Link>
        )}
      </div>
    </li>
  );
}

/** House accent dot, or the opal mark when an experience is shared across Houses. */
function OfferingMark({ houses }: { houses: CalendarEvent["houses"] }) {
  if (houses.length > 1) return <CategoryMark shared className="h-2 w-2" />;
  return <CategoryMark accent={houses[0] ? getHouse(houses[0])?.accent : undefined} className="h-2 w-2" />;
}

function Legend() {
  return (
    <ul className="text-muted flex flex-wrap gap-x-6 gap-y-2 text-xs">
      {getActiveHouses().map((h) => (
        <li key={h.slug} className="flex items-center gap-2">
          <CategoryMark accent={h.accent} className="h-2 w-2" /> {h.name}
        </li>
      ))}
      <li className="flex items-center gap-2">
        <CategoryMark shared className="h-2 w-2" /> Shared across Houses
      </li>
      <li className="flex items-center gap-2">
        <CategoryMark className="h-2 w-2" /> Open / other
      </li>
    </ul>
  );
}

function groupByMonth(events: CalendarEvent[]) {
  const groups = new Map<string, CalendarEvent[]>();
  for (const e of events) {
    const key = formatEventDate(e.start).monthYear;
    groups.set(key, [...(groups.get(key) ?? []), e]);
  }
  return [...groups.entries()];
}
