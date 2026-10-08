import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OfferingPage } from "@/components/offering-page";
import { getProgram, getVisiblePractices } from "@/content/programs";

export function generateStaticParams() {
  return getVisiblePractices().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/practices/[slug]">): Promise<Metadata> {
  const program = getProgram((await params).slug, "practice");
  if (!program) return {};
  return { title: program.title, description: program.summary };
}

export default async function PracticePage({ params }: PageProps<"/practices/[slug]">) {
  const program = getProgram((await params).slug, "practice");
  if (!program) notFound();
  return <OfferingPage program={program} />;
}
