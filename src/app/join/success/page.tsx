import type { Metadata } from "next";
import { ArrowLink, PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Welcome", robots: { index: false } };

export default function JoinSuccessPage() {
  return (
    <PageIntro eyebrow="Welcome" title="You're in.">
      <p>Thank you for joining. A confirmation is on its way to your inbox, with everything you need for what comes next.</p>
      <ArrowLink href="/events" className="mt-10 text-paper">
        See upcoming sessions
      </ArrowLink>
    </PageIntro>
  );
}
