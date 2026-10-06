import type { Metadata } from "next";
import { ArrowLink, PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Checkout cancelled", robots: { index: false } };

export default function JoinCancelledPage() {
  return (
    <PageIntro eyebrow="No rush" title="Nothing was charged.">
      <p>Take your time. The door stays open whenever you are ready.</p>
      <ArrowLink href="/membership" className="mt-10 text-paper">
        Back to membership
      </ArrowLink>
    </PageIntro>
  );
}
