import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JoinForm } from "@/components/join-form";
import { ArrowLink, Eyebrow, PageIntro, Pill, PriceTag, Section } from "@/components/ui";
import { getHouse } from "@/content/houses";
import { journeys } from "@/content/journeys";
import { getProgram, getVisiblePrograms } from "@/content/programs";
import { site } from "@/content/site";

export function generateStaticParams() {
  return getVisiblePrograms().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/programs/[slug]">): Promise<Metadata> {
  const program = getProgram((await params).slug);
  if (!program) return {};
  return { title: program.title, description: program.summary };
}

export default async function ProgramPage({ params }: PageProps<"/programs/[slug]">) {
  const program = getProgram((await params).slug);
  if (!program) notFound();

  const includedIn = program.includedIn.map(getHouse).filter((h) => h !== undefined);
  const related = journeys.filter((j) => j.relatedProgram === program.slug);

  return (
    <>
      <PageIntro eyebrow={program.kind} title={program.title}>
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
              </div>
            ))}

            {includedIn.length > 0 ? (
              <div className="tone-dark p-8">
                <Eyebrow>Included in membership</Eyebrow>
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
          </aside>
        </div>
      </Section>

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
