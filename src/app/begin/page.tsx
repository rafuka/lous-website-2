import type { Metadata } from "next";
import { EntryPointList } from "@/components/entry-point-list";
import { ArrowLink, PageIntro, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Find your way in",
  description: "A membership, a single practice, a program, a 1:1 session or an in-person experience.",
};

export default function BeginPage() {
  return (
    <>
      <PageIntro eyebrow="Find your way in" title="More than one doorway.">
        There is no single right way to enter The Wolf Wisdom. Begin with whatever makes sense for you now — each door
        leads into the same school. Standalone does not mean open to everyone: each offering keeps its own
        eligibility.
      </PageIntro>
      <Section tone="light" className="py-24">
        <EntryPointList />
        <ArrowLink href="/calendar" className="mt-12">
          See what is happening, and when
        </ArrowLink>
      </Section>
    </>
  );
}
