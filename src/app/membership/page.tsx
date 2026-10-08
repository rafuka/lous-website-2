import type { Metadata } from "next";
import Link from "next/link";
import { JoinForm } from "@/components/join-form";
import { ArrowLink, CategoryMark, Eyebrow, PageIntro, Pill, PriceTag, Section } from "@/components/ui";
import { getPublishedBundles } from "@/content/bundles";
import { getActiveHouses, getVisibleHouses, houseName } from "@/content/houses";
import { sharedMembership } from "@/content/membership";
import { getAllOfferings, isMembersOnly, isShared, offeringHref } from "@/content/programs";
import { resonanceFlow } from "@/content/sessions";
import { formatPriceInline } from "@/lib/format";

export const metadata: Metadata = {
  title: "Membership",
  description: "Ongoing ways of practising inside The Wolf Wisdom — the Whale and the Eagle, and what they share.",
};

export default function MembershipPage() {
  const active = getActiveHouses();
  const evolving = getVisibleHouses().filter((h) => h.status === "evolving");
  const bundles = getPublishedBundles();
  const offerings = getAllOfferings().filter((p) => !isMembersOnly(p));

  return (
    <>
      <PageIntro eyebrow="Membership" title="Ways of practising, not lists of discounts.">
        A membership is an ongoing way of practising inside The Wolf Wisdom. Some experiences belong to a single House;
        others are shared by every House. Each House is a different path, not a different rank — which is why they
        share the same price.
      </PageIntro>

      {/* Shared layer */}
      <Section tone="light" className="py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <CategoryMark shared className="h-2.5 w-2.5" />
              <Eyebrow>Shared by every House</Eyebrow>
            </div>
            <h2 className="display mt-6 text-5xl">One living school.</h2>
            <p className="text-muted mt-6 leading-relaxed">{sharedMembership.intro}</p>
          </div>
          <ul className="divide-y divide-line-light border-y border-line md:col-span-8">
            {sharedMembership.includes.map((inc) => (
              <li key={inc.title} className="flex flex-wrap items-baseline justify-between gap-4 py-6">
                <div className="max-w-xl">
                  <p className="display text-2xl">{inc.title}</p>
                  {inc.detail && <p className="text-muted mt-1 text-sm leading-relaxed">{inc.detail}</p>}
                </div>
                {inc.audienceNote && <Pill shared>{inc.audienceNote}</Pill>}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Active Houses — equal columns, equal weight */}
      <Section tone="light" className="border-t border-line py-24">
        <div className={`grid gap-px bg-line ${active.length > 1 ? "md:grid-cols-2" : ""} ${active.length > 2 ? "lg:grid-cols-3" : ""}`}>
          {active.map((h) =>
            h.offer ? (
              <article key={h.slug} className="flex flex-col bg-paper/90 p-8 md:p-12">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="eyebrow" style={{ color: h.accent }}>
                    {h.coreIdea}
                  </p>
                  {h.eligibilityLabel && <Pill accent={h.accent}>{h.eligibilityLabel}</Pill>}
                </div>
                <h2 className="display mt-6 text-5xl">
                  <Link href={`/houses/${h.slug}`} className="link-underline">
                    {h.name}
                  </Link>
                </h2>
                <p className="text-muted mt-1 font-display text-xl italic">{h.invitation}.</p>
                <p className="text-muted mt-6 text-sm leading-relaxed">{h.summary}</p>
                <div className="mt-8">
                  <PriceTag price={h.offer.price} />
                </div>
                <ul className="mt-8 flex-1 space-y-4 border-t border-line pt-8 text-sm">
                  {h.includes.map((inc) => (
                    <li key={inc.title} className="flex gap-3">
                      <CategoryMark accent={h.accent} className="mt-1.5 h-1.5 w-1.5" />
                      <span>
                        {inc.title}
                        {inc.detail && <span className="text-muted block">{inc.detail}</span>}
                      </span>
                    </li>
                  ))}
                  {sharedMembership.houses.includes(h.slug) && (
                    <li className="flex gap-3">
                      <CategoryMark shared className="mt-1.5 h-1.5 w-1.5" />
                      <span>
                        Everything in the shared layer
                        <span className="text-muted block">
                          Live sessions incl. Akawa, Live Time of Presence, Reclaiming Our Blood for women, 10% off
                          Resonance Flow™.
                        </span>
                      </span>
                    </li>
                  )}
                </ul>
                <div className="mt-10">
                  <JoinForm offer={h.offer} label={`Join ${h.name}`} full />
                </div>
              </article>
            ) : null,
          )}
        </div>
      </Section>

      {/* Wolf & Dragon — mechanics still in development */}
      <Section tone="dark" className="py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>In development</Eyebrow>
            <h2 className="display mt-6 text-5xl">The Wolf &amp; the Dragon.</h2>
          </div>
          <div className="md:col-span-7">
            {bundles.length > 0 ? (
              <ul className="grid gap-px bg-line sm:grid-cols-2">
                {bundles.map((b) => (
                  <li key={b.id} className="bg-ink p-8">
                    <p className="display text-3xl">{b.name}</p>
                    <p className="text-muted mt-2 text-sm">{b.description}</p>
                    {b.offer && (
                      <>
                        <div className="mt-6">
                          <PriceTag price={b.offer.price} size="sm" />
                        </div>
                        <div className="mt-6">
                          <JoinForm offer={b.offer} label="Join" />
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg leading-relaxed text-paper/70">
                Their purpose, membership mechanics and final language are still being shaped, and nothing about them
                is fixed yet. They will be shared here when they are ready.
              </p>
            )}
            {evolving.length > 0 && (
              <ul className="mt-10 flex flex-wrap gap-3">
                {evolving.map((h) => (
                  <li key={h.slug}>
                    <Link href={`/houses/${h.slug}`}>
                      <Pill accent={h.accent}>{h.name} — in development</Pill>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Section>

      {/* Standalone */}
      <Section tone="light" className="py-24">
        <Eyebrow>Without membership</Eyebrow>
        <h2 className="display mt-6 text-5xl">Standalone options</h2>
        <p className="text-muted mt-4 max-w-2xl">
          Standalone does not mean open to everyone: each offering keeps its own eligibility.
        </p>
        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="eyebrow text-muted py-4 pr-6 font-normal">Offering</th>
                <th className="eyebrow text-muted py-4 pr-6 font-normal">On its own</th>
                <th className="eyebrow text-muted py-4 font-normal">Included in</th>
              </tr>
            </thead>
            <tbody>
              {offerings.map((p) => (
                <tr key={p.slug} className="border-b border-line">
                  <td className="py-5 pr-6">
                    <Link href={offeringHref(p)} className="link-underline display text-2xl">
                      {p.title}
                    </Link>
                    {p.eligibilityLabel && <span className="text-muted block text-xs">{p.eligibilityLabel}</span>}
                  </td>
                  <td className="py-5 pr-6">{p.offers[0] ? formatPriceInline(p.offers[0].price) : "—"}</td>
                  <td className="text-muted py-5">
                    <span className="flex items-center gap-2">
                      {isShared(p) && <CategoryMark shared />}
                      {p.includedIn.length ? p.includedIn.map(houseName).join(" & ") : "Member pricing"}
                      {p.inclusionNote ? ` · ${p.inclusionNote.toLowerCase()}` : ""}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="border-b border-line">
                <td className="py-5 pr-6">
                  <Link href="/sessions" className="link-underline display text-2xl">
                    {resonanceFlow.title} 1:1
                  </Link>
                </td>
                <td className="py-5 pr-6">{formatPriceInline(resonanceFlow.pricing[0].price)} per session</td>
                <td className="text-muted py-5">
                  <span className="flex items-center gap-2">
                    <CategoryMark shared />
                    10% off for Whale &amp; Eagle members
                  </span>
                </td>
              </tr>
              <tr className="border-b border-line">
                <td className="py-5 pr-6">
                  <Link href="/journeys" className="link-underline display text-2xl">
                    Retreats &amp; residencies
                  </Link>
                </td>
                <td className="py-5 pr-6">Book individually</td>
                <td className="text-muted py-5">Member pricing</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ArrowLink href="/calendar" className="mt-10">
          Upcoming sessions &amp; gatherings
        </ArrowLink>
      </Section>
    </>
  );
}
