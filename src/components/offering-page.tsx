import Link from "next/link";
import { JoinForm } from "@/components/join-form";
import { ArrowLink, CategoryMark, Eyebrow, PageIntro, Pill, PriceTag, Section } from "@/components/ui";
import { getHouse } from "@/content/houses";
import { journeys } from "@/content/journeys";
import { isMembersOnly, isShared } from "@/content/programs";
import { site } from "@/content/site";
import type { Program } from "@/content/types";
import { getUpcomingEvents } from "@/lib/calendar";
import { formatEventDate, formatTimeRange } from "@/lib/format";

/** Detail page shared by programs (/programs/…) and practices (/practices/…). */
export async function OfferingPage({ program }: { program: Program }) {
  const includedIn = program.includedIn.map(getHouse).filter((h) => h !== undefined);
  const related = journeys.filter((j) => j.relatedProgram === program.slug);
  const shared = isShared(program);
  const { events } = await getUpcomingEvents();
  const dates = events.filter((e) => e.offering === program.slug);

  return (
    <>
      <PageIntro eyebrow={program.category === "program" ? "Program" : "Practice"} title={program.title}>
        {program.strapline}
      </PageIntro>

      <Section tone="light" className="py-24">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="space-y-6 text-lg leading-relaxed">
              {program.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <dl className="mt-12 divide-y divide-line-light border-y border-line">
              {program.facts.map((f) => (
                <div key={f.label} className="grid grid-cols-3 gap-4 py-4 text-sm">
                  <dt className="eyebrow text-muted pt-0.5">{f.label}</dt>
                  <dd className="col-span-2">{f.value}</dd>
                </div>
              ))}
            </dl>
            {program.lists?.map((list) => (
              <div key={list.title} className="mt-12">
                <Eyebrow>{list.title}</Eyebrow>
                <ul className="mt-5 space-y-3">
                  {list.items.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed">
                      <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-current" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <aside className="space-y-6 md:col-span-5">
            {program.offers.map((offer) => (
              <div key={offer.id} className="border border-line p-8">
                {program.eligibilityLabel && <Pill>{program.eligibilityLabel}</Pill>}
                <div className="mt-6">
                  <PriceTag price={offer.price} />
                </div>
                <div className="mt-8">
                  {offer.price.kind === "tbc" ? (
                    <a
                      href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(`${program.title} — keep me posted`)}`}
                      className="inline-block rounded-full border border-current px-6 py-3 text-sm"
                    >
                      Keep me posted
                    </a>
                  ) : (
                    <JoinForm offer={offer} label={offer.label} full />
                  )}
                </div>
                {offer.price.kind === "donation" && offer.price.firstFree && (
                  <p className="text-muted mt-6 text-sm leading-relaxed">
                    Coming for the first time? Your first gathering is free —{" "}
                    <a
                      href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(`${program.title} — my first gathering`)}`}
                      className="link-underline text-current"
                    >
                      write to register
                    </a>
                    .
                  </p>
                )}
              </div>
            ))}

            {isMembersOnly(program) && (
              <div className="border border-line p-8">
                <Pill shared={shared}>Members only</Pill>
                <p className="mt-6 leading-relaxed">
                  Part of the shared membership layer. Sessions appear on the calendar at short notice.
                </p>
                <ArrowLink href="/membership" className="mt-8">
                  See membership
                </ArrowLink>
              </div>
            )}

            {program.community && (
              <div className="border border-line p-8">
                <Eyebrow>Community</Eyebrow>
                <a
                  href={program.community.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block rounded-full border border-current px-6 py-3 text-sm"
                >
                  {program.community.label} ↗
                </a>
                {program.community.note && (
                  <p className="text-muted mt-4 text-sm leading-relaxed">{program.community.note}</p>
                )}
              </div>
            )}

            {includedIn.length > 0 ? (
              <div className="tone-dark p-8">
                <div className="flex items-center gap-3">
                  <Eyebrow>Included in membership</Eyebrow>
                  {shared && <CategoryMark shared className="h-2 w-2" />}
                </div>
                {program.inclusionNote && <p className="text-muted mt-3 text-sm">{program.inclusionNote}</p>}
                {includedIn.map((h) => (
                  <Link key={h.slug} href={`/houses/${h.slug}`} className="mt-4 block">
                    <span className="display text-3xl">{h.name}</span>
                    <span className="text-muted ml-3 text-sm">— also includes more →</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted text-sm">
                Not included in House memberships. House members receive {site.memberPricingLabel.toLowerCase()}.
              </p>
            )}

            {program.resources && (
              <div className="border border-line p-8">
                <p className="display text-2xl">{program.resources.title}</p>
                {program.resources.intro && <p className="text-muted mt-2 text-sm">{program.resources.intro}</p>}
                <ul className="mt-5 space-y-2 text-sm">
                  {program.resources.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                        {l.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Section>

      {(dates.length > 0 || program.rhythm) && (
        <Section tone="light" className="border-t border-line py-24">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Eyebrow>Dates</Eyebrow>
              <h2 className="display mt-6 text-4xl">When we meet</h2>
              {program.rhythm && <p className="text-muted mt-4 text-sm">{program.rhythm}</p>}
            </div>
            <div className="md:col-span-8">
              {dates.length > 0 ? (
                <ul className="grid gap-x-10 border-t border-line sm:grid-cols-2">
                  {dates.map((e) => {
                    const d = formatEventDate(e.start);
                    return (
                      <li key={e.id} className="flex items-baseline gap-4 border-b border-line py-4 text-sm">
                        <span className="display w-10 text-2xl">{d.day}</span>
                        <span>
                          {d.weekday.slice(0, 3)} {d.month} · {formatTimeRange(e.start, e.end)}
                          {e.description && (
                            <span className="text-muted block text-xs">{e.description}</span>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-muted">Dates are shared on the calendar as they are set.</p>
              )}
              <ArrowLink href="/calendar" className="mt-8">
                Full calendar
              </ArrowLink>
            </div>
          </div>
        </Section>
      )}

      {related.length > 0 && (
        <Section tone="dark" className="py-20">
          <Eyebrow>In person</Eyebrow>
          {related.map((j) => (
            <div key={j.slug} className="mt-6">
              <p className="display text-4xl">
                {j.place}, {j.when}
              </p>
              <p className="text-muted mt-2 max-w-xl">{j.description}</p>
            </div>
          ))}
          <ArrowLink href="/journeys" className="mt-10">
            All retreats &amp; residencies
          </ArrowLink>
        </Section>
      )}
    </>
  );
}
