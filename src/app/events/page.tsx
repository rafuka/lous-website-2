import type { Metadata } from "next";
import { ArrowLink, PageIntro, Pill, Section } from "@/components/ui";
import { houses } from "@/content/houses";
import { getUpcomingEvents } from "@/lib/calendar";
import { formatEventDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming sessions, practice labs and gatherings across The Wolf Wisdom.",
};

export default async function EventsPage() {
  const { events } = await getUpcomingEvents();
  const accent = (slug: string) => houses.find((h) => h.slug === slug)?.accent;

  return (
    <>
      <PageIntro eyebrow="Events" title="Upcoming.">
        Recurring House sessions, programs and the occasional spontaneous gathering. Members-only gatherings arise
        through the year and are shared with members as they come.
      </PageIntro>

      <Section tone="light" className="py-24">
        {events.length === 0 ? (
          <p className="display text-3xl">New dates are on their way.</p>
        ) : (
          <ul className="divide-y divide-line-light border-y border-line">
            {events.map((e) => {
              const d = formatEventDate(e.start);
              return (
                <li key={e.id} className="grid gap-6 py-8 md:grid-cols-12 md:items-baseline">
                  <div className="flex items-baseline gap-3 md:col-span-2">
                    <span className="display text-5xl">{d.day}</span>
                    <span className="eyebrow text-muted">{d.month}</span>
                  </div>
                  <div className="md:col-span-6">
                    <p className="display text-3xl">{e.title}</p>
                    <p className="text-muted mt-1 text-sm">
                      {d.weekday} · {d.time}
                      {e.location ? ` · ${e.location}` : ""}
                    </p>
                    {e.description && <p className="text-muted mt-3 max-w-lg text-sm">{e.description}</p>}
                  </div>
                  <div className="flex flex-wrap gap-2 md:col-span-4 md:justify-end">
                    {e.membersOnly && <Pill>Members only</Pill>}
                    {e.houses.map((h) => (
                      <Pill key={h} accent={accent(h)}>
                        {h}
                      </Pill>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <ArrowLink href="/membership" className="mt-12">
          Become a member
        </ArrowLink>
      </Section>
    </>
  );
}
