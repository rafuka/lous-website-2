import { ArrowLink, PageIntro } from "@/components/ui";

export default function NotFound() {
  return (
    <PageIntro eyebrow="404" title="This path isn't here.">
      <p>Perhaps it hasn&apos;t been walked yet.</p>
      <ArrowLink href="/" className="mt-10 text-paper">
        Return home
      </ArrowLink>
    </PageIntro>
  );
}
