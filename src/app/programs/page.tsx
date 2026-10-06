import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, Pill, Section } from "@/components/ui";
import { houseName } from "@/content/houses";
import { getVisiblePrograms } from "@/content/programs";
import { formatPriceInline } from "@/lib/format";

export const metadata: Metadata = {
  title: "Programs",
  description: "Standalone The Wolf Wisdom programs — open to join with or without a House membership.",
};

export default function ProgramsPage() {
  const programs = getVisiblePrograms();
  return (
    <>
      <PageIntro eyebrow="Programs" title="Work that stands on its own.">
        These journeys belong to The Wolf Wisdom and can be joined without a House membership. Where a House includes
        a program, it is noted below.
      </PageIntro>
      <Section tone="light" className="py-24">
        <ul className="divide-y divide-line-light border-y border-line">
          {programs.map((p) => (
            <li key={p.slug}>
              <Link href={`/programs/${p.slug}`} className="group grid gap-6 py-12 md:grid-cols-12 md:items-baseline">
                <p className="eyebrow text-muted md:col-span-2">{p.kind}</p>
                <div className="md:col-span-6">
                  <h2 className="display text-4xl md:text-5xl">{p.title}</h2>
                  <p className="text-muted mt-3 leading-relaxed">{p.summary}</p>
                </div>
                <div className="space-y-3 text-sm md:col-span-3">
                  <p>{p.offers[0] ? formatPriceInline(p.offers[0].price) : ""}</p>
                  {p.eligibilityLabel && <Pill>{p.eligibilityLabel}</Pill>}
                  {p.includedIn.length > 0 && (
                    <p className="text-muted">Included in {p.includedIn.map(houseName).join(", ")}</p>
                  )}
                </div>
                <span aria-hidden className="text-right transition-transform group-hover:translate-x-1 md:col-span-1">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
