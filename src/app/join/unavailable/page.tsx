import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowLink, PageIntro } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Joining opens soon", robots: { index: false } };

export default function JoinUnavailablePage({ searchParams }: PageProps<"/join/unavailable">) {
  return (
    <Suspense fallback={<PageIntro eyebrow="Almost there" title="One moment." />}>
      <Unavailable searchParams={searchParams} />
    </Suspense>
  );
}

async function Unavailable({ searchParams }: { searchParams: PageProps<"/join/unavailable">["searchParams"] }) {
  const { offer, reason } = await searchParams;
  const offerId = typeof offer === "string" ? offer : "";

  if (reason === "eligibility") {
    return (
      <PageIntro eyebrow="Eligibility" title="Please confirm eligibility.">
        <p>This offering is for VortexHealing students only. Go back and confirm eligibility to continue.</p>
        <ArrowLink href="/membership" className="mt-10 text-paper">
          Back to membership
        </ArrowLink>
      </PageIntro>
    );
  }

  return (
    <PageIntro eyebrow="Almost there" title="Online joining opens soon.">
      <p>Payments are not open online yet. Send a note and you&apos;ll be among the first to hear when doors open.</p>
      <a
        href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(`Joining: ${offerId || "The Wolf Wisdom"}`)}`}
        className="mt-10 inline-block rounded-full bg-paper px-6 py-3 text-sm text-ink"
      >
        Register interest
      </a>
    </PageIntro>
  );
}
