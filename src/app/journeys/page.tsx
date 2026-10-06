import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, Pill, Section } from "@/components/ui";
import { journeys } from "@/content/journeys";
import { getProgram } from "@/content/programs";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Retreats & Residencies",
  description: "In-person Becoming Humans gatherings: Ireland, Bali, Mount Shasta and Greece, 2027.",
};

const statusLabel = { planned: "Planned", forming: "Taking shape", open: "Booking open", past: "Past" } as const;

export default function JourneysPage() {
  return (
    <>
      <PageIntro eyebrow="Retreats & residencies" title="Becoming Humans, in person.">
        Each gathering explores a different aspect of human life — the creative human, the embodied human, the master
        within. They belong to one philosophy without needing to be one curriculum.
      </PageIntro>

      <Section tone="light" className="py-12 md:py-24">
        <ol className="divide-y divide-line-light">
          {journeys.map((j, i) => {
            const program = j.relatedProgram ? getProgram(j.relatedProgram) : undefined;
            return (
              <li key={j.slug} className="grid gap-6 py-16 md:grid-cols-12">
                <div className="md:col-span-3">
                  <p className="eyebrow text-muted">
                    0{i + 1} · {j.when}
                  </p>
                  <div className="mt-4">
                    <Pill>{j.note ?? statusLabel[j.status]}</Pill>
                  </div>
                </div>
                <div className="md:col-span-6">
                  <h2 className="display text-5xl md:text-6xl">{j.place}</h2>
                  <p className="mt-2 font-display text-2xl italic">{j.title}</p>
                  <p className="text-muted mt-6 max-w-xl leading-relaxed">{j.description}</p>
                  {program && (
                    <Link href={`/programs/${program.slug}`} className="link-underline mt-6 inline-block text-sm">
                      Connected to {program.title} →
                    </Link>
                  )}
                </div>
                <div className="md:col-span-3 md:text-right">
                  <a
                    href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(`${j.place} ${j.when} — keep me posted`)}`}
                    className="inline-block rounded-full border border-current px-5 py-2.5 text-sm"
                  >
                    Keep me posted
                  </a>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="text-muted mt-8 text-sm">House members receive {site.memberPricingLabel.toLowerCase()} on retreats.</p>
      </Section>
    </>
  );
}
