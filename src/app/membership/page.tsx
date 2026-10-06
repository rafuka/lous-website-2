import type { Metadata } from "next";
import Link from "next/link";
import { JoinForm } from "@/components/join-form";
import { ArrowLink, Eyebrow, PageIntro, Pill, PriceTag, Section } from "@/components/ui";
import { getPublishedBundles } from "@/content/bundles";
import { getActiveHouses, getVisibleHouses, houseName } from "@/content/houses";
import { getVisiblePrograms } from "@/content/programs";
import { formatPriceInline } from "@/lib/format";

export const metadata: Metadata = {
  title: "Membership",
  description: "Choose your House. Whale and Eagle memberships, standalone programs and what's coming.",
};

export default function MembershipPage() {
  const active = getActiveHouses();
  const evolving = getVisibleHouses().filter((h) => h.status === "evolving");
  const bundles = getPublishedBundles();
  const programs = getVisiblePrograms();

  return (
    <>
      <PageIntro eyebrow="Membership" title="Choose your House.">
        Each House is a different path, not a different rank — which is why they share the same price. Membership
        means recurring practice, member pricing across the work, and a community to practise with.
      </PageIntro>

      {/* Active Houses — equal columns, equal weight */}
      <Section tone="light" className="py-24">
        <div className={`grid gap-px bg-line ${active.length > 1 ? "md:grid-cols-2" : ""} ${active.length > 2 ? "lg:grid-cols-3" : ""}`}>
          {active.map((h) =>
            h.offer ? (
              <article key={h.slug} className="flex flex-col bg-paper p-8 md:p-12">
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
                <div className="mt-8">
                  <PriceTag price={h.offer.price} />
                </div>
                <ul className="mt-8 flex-1 space-y-4 border-t border-line pt-8 text-sm">
                  {h.includes.map((inc) => (
                    <li key={inc.title} className="flex gap-3">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-current" />
                      <span>
                        {inc.title}
                        {inc.audienceNote && <span className="text-muted"> — {inc.audienceNote.toLowerCase()}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <JoinForm offer={h.offer} label={`Join ${h.name}`} full />
                </div>
              </article>
            ) : null,
          )}
        </div>
      </Section>

      {/* Multi-House membership — renders real options once bundles are published */}
      <Section tone="dark" className="py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Belonging to more than one House</Eyebrow>
            <h2 className="display mt-6 text-5xl">Join the pack.</h2>
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
                A simpler way to walk with more than one House — without maintaining separate memberships — is being
                designed. Whale eligibility will still apply within any combination that includes the Whale.
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
              {programs.map((p) => (
                <tr key={p.slug} className="border-b border-line">
                  <td className="py-5 pr-6">
                    <Link href={`/programs/${p.slug}`} className="link-underline display text-2xl">
                      {p.title}
                    </Link>
                    {p.eligibilityLabel && <span className="text-muted block text-xs">{p.eligibilityLabel}</span>}
                  </td>
                  <td className="py-5 pr-6">{p.offers[0] ? formatPriceInline(p.offers[0].price) : "—"}</td>
                  <td className="text-muted py-5">
                    {p.includedIn.length ? p.includedIn.map(houseName).join(", ") : "Member pricing"}
                  </td>
                </tr>
              ))}
              <tr className="border-b border-line">
                <td className="py-5 pr-6">
                  <Link href="/sessions" className="link-underline display text-2xl">
                    1:1 sessions
                  </Link>
                </td>
                <td className="py-5 pr-6">Book individually</td>
                <td className="text-muted py-5">Member pricing</td>
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
        <p className="text-muted mt-8 max-w-2xl text-sm">
          Member pricing applies to House members. Exact member rates are shared at booking.
        </p>
        <ArrowLink href="/events" className="mt-10">
          Upcoming sessions &amp; gatherings
        </ArrowLink>
      </Section>
    </>
  );
}
