import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OfferingPage } from "@/components/offering-page";
import { getProgram, getVisiblePrograms } from "@/content/programs";

export function generateStaticParams() {
  return getVisiblePrograms().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/programs/[slug]">): Promise<Metadata> {
  const program = getProgram((await params).slug, "program");
  if (!program) return {};
  return { title: program.title, description: program.summary };
}

export default async function ProgramPage({ params }: PageProps<"/programs/[slug]">) {
  const program = getProgram((await params).slug, "program");
  if (!program) notFound();
  return <OfferingPage program={program} />;
}
