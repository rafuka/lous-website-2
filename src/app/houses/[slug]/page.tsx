import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JoinForm } from "@/components/join-form";
import { ArrowLink, Eyebrow, Pill, PriceTag, Section } from "@/components/ui";
import { HouseArtwork } from "@/components/vortex-eye";
import { getHouse, getVisibleHouses } from "@/content/houses";
import { site } from "@/content/site";
import { formatPriceInline } from "@/lib/format";

export function generateStaticParams() {
  return getVisibleHouses().map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: PageProps<"/houses/[slug]">): Promise<Metadata> {
  const house = getHouse((await params).slug);
  if (!house) return {};
  return { title: house.name, description: house.summary };
}

export default async function HousePage({ params }: PageProps<"/houses/[slug]">) {
  const house = getHouse((await params).slug);
  if (!house) notFound();

  const others = getVisibleHouses().filter((h) => h.slug !== house.slug);
  const active = house.status === "active";

  return (
    <>
      <section className="tone-dark">
        <div className="mx-auto grid max-w-7xl md:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-20 lg:px-10">
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow" style={{ color: house.accent }}>
                {house.coreIdea}
              </p>
              {!active && <Pill>In development</Pill>}
            </div>
            <h1 className="display mt-6 animate-rise text-7xl md:text-8xl">{house.name}</h1>
            <p className="mt-3 font-display text-3xl italic text-paper/70">{house.invitation}.</p>
            <p className="mt-8 max-w-md leading-relaxed text-paper/70">{house.summary}</p>
            {house.eligibilityLabel && (
              <p className="mt-8">
                <Pill accent={house.accent}>{house.eligibilityLabel}</Pill>
              </p>
            )}
          </div>
          <HouseArtwork house={house} priority className="aspect-square md:aspect-auto md:min-h-[640px]" />
        </div>
      </section>

      <Section tone="light" className="py-24">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="space-y-6 text-lg leading-relaxed md:col-span-7">
            {house.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="text-muted text-base">
              <span className="eyebrow mr-3">Territory</span>
              {house.emotionalTerritory}
            </p>
          </div>

          <aside className="md:col-span-5">
            {active && house.offer ? (
              <div className="border border-line p-8">
                <Eyebrow>Membership</Eyebrow>
                <div className="mt-6">
                  <PriceTag price={house.offer.price} />
                </div>
                <p className="text-muted mt-2 text-sm">{house.audience}. Monthly membership.</p>
                <div className="mt-8">
                  <JoinForm offer={house.offer} label={`Join ${house.name}`} full />
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-line p-8">
                <Eyebrow>Taking shape</Eyebrow>
                <p className="mt-6 leading-relaxed">{house.evolvingNote}</p>
                <a
                  href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(`${house.name} — keep me posted`)}`}
                  className="mt-8 inline-block rounded-full border border-current px-6 py-3 text-sm"
                >
                  Keep me posted
                </a>
              </div>
            )}
          </aside>
        </div>
      </Section>

      {house.includes.length > 0 && (
        <Section tone="light" className="border-t border-line py-24">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Eyebrow>What&apos;s included</Eyebrow>
              <h2 className="display mt-6 text-5xl">Inside {house.name}</h2>
            </div>
            <ul className="divide-y divide-line-light border-y border-line md:col-span-8">
              {house.includes.map((inc) => (
                <li key={inc.title} className="flex flex-wrap items-baseline justify-between gap-4 py-6">
                  <div>
                    <p className="display text-2xl">{inc.title}</p>
                    {inc.detail && <p className="text-muted mt-1 text-sm">{inc.detail}</p>}
                  </div>
                  {inc.audienceNote && <Pill accent={house.accent}>{inc.audienceNote}</Pill>}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {house.standaloneAlternatives.length > 0 && (
        <Section tone="light" className="border-t border-line py-24">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Eyebrow>Without membership</Eyebrow>
              <h2 className="display mt-6 text-4xl">Also available on its own</h2>
            </div>
            <ul className="grid gap-px bg-line md:col-span-8 md:grid-cols-2">
              {house.standaloneAlternatives.map((alt) => {
                const body = (
                  <>
                    <p className="display text-2xl">{alt.title}</p>
                    <p className="text-muted mt-2 text-sm">{formatPriceInline(alt.price)}</p>
                  </>
                );
                return (
                  <li key={alt.title} className="bg-paper p-6">
                    {alt.href ? (
                      <Link href={alt.href} className="block hover:opacity-70">
                        {body}
                      </Link>
                    ) : (
                      body
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </Section>
      )}

      <Section tone="dark" className="py-20">
        <Eyebrow>Other Houses</Eyebrow>
        <ul className="mt-8 grid gap-px bg-line sm:grid-cols-3">
          {others.map((h) => (
            <li key={h.slug} className="bg-ink">
              <Link href={`/houses/${h.slug}`} className="group block p-8">
                <p className="eyebrow" style={{ color: h.accent }}>
                  {h.coreIdea}
                </p>
                <p className="display mt-4 text-4xl">{h.name}</p>
                <p className="mt-1 font-display italic text-paper/60 transition-colors group-hover:text-paper">
                  {h.invitation} →
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <ArrowLink href="/membership" className="mt-12">
          Compare memberships
        </ArrowLink>
      </Section>
    </>
  );
}
