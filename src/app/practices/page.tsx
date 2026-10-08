import type { Metadata } from "next";
import Link from "next/link";
import { OfferingList } from "@/components/offering-list";
import { ArrowLink, Eyebrow, PageIntro, Section } from "@/components/ui";
import { getVisiblePractices } from "@/content/programs";

export const metadata: Metadata = {
  title: "Practices",
  description:
    "Recurring and spontaneous live practice: Practice Lab, Akawa, Reclaiming Our Blood and Live Time of Presence.",
};

const modalities = [
  {
    name: "VortexHealing",
    quality: "Transformation",
    text: "Working with conditioning, energetic structures and what is ready to change.",
    href: "/practices/practice-lab",
  },
  {
    name: "Akawa",
    quality: "Remembrance",
    text: "Entering a field in which the system can recognise something of its original wholeness.",
    href: "/practices/akawa",
  },
];

export default function PracticesPage() {
  return (
    <>
      <PageIntro eyebrow="Practices" title="Live, and alive.">
        Recurring and spontaneous live practice — the ongoing heartbeat of the school. Some belong to one House; others
        are shared across every membership. Each keeps its own eligibility.
      </PageIntro>

      <Section tone="light" className="py-24">
        <OfferingList items={getVisiblePractices()} />
        <ArrowLink href="/calendar" className="mt-12">
          See what is coming up
        </ArrowLink>
      </Section>

      {/* VortexHealing and Akawa — not competing systems */}
      <Section tone="dark" className="py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>VortexHealing &amp; Akawa</Eyebrow>
            <h2 className="display mt-6 text-5xl md:text-6xl">Different qualities, one movement toward wholeness.</h2>
          </div>
          <div className="text-muted space-y-5 leading-relaxed md:col-span-6 md:col-start-7">
            <p>
              Both work through consciousness and energy, but I experience them as carrying different qualities. I do
              not see them as competing systems, or as separate destinations.
            </p>
            <p>
              They are different tools and frequencies within the same movement back toward unity. Human systems are
              different; what opens one person may not be what opens another. The Wolf Wisdom makes room for more than
              one doorway.
            </p>
          </div>
        </div>
        <div className="mt-16 grid gap-px bg-line md:grid-cols-2">
          {modalities.map((m) => (
            <Link key={m.name} href={m.href} className="group bg-ink p-8 md:p-12">
              <p className="eyebrow text-muted">{m.name}</p>
              <p className="display mt-6 text-5xl italic">{m.quality}</p>
              <p className="text-muted mt-4 max-w-sm">{m.text}</p>
              <span aria-hidden className="mt-8 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
