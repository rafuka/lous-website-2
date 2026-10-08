import type { Metadata } from "next";
import { OfferingList } from "@/components/offering-list";
import { ArrowLink, PageIntro, Section } from "@/components/ui";
import { getVisiblePrograms } from "@/content/programs";

export const metadata: Metadata = {
  title: "Programs",
  description: "Structured journeys with a defined arc — Unlock Your Creative Flow and The Chakra Series.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageIntro eyebrow="Programs" title="Journeys with an arc.">
        Programs are structured journeys with a beginning, a curriculum and an end. Join on their own, or through a
        House that includes them. Standalone does not mean open to everyone: each keeps its own eligibility.
      </PageIntro>
      <Section tone="light" className="py-24">
        <OfferingList items={getVisiblePrograms()} />
        <ArrowLink href="/practices" className="mt-12">
          Looking for ongoing practice? See the practices
        </ArrowLink>
      </Section>
    </>
  );
}
