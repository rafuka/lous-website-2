import type { Metadata } from "next";
import { Eyebrow, PageIntro, Section } from "@/components/ui";
import { site } from "@/content/site";
import { getBookingUrl } from "@/lib/calendar";

export const metadata: Metadata = {
  title: "1:1 Sessions",
  description: "Individual sessions with The Wolf Wisdom. House members receive member pricing.",
};

export default function SessionsPage() {
  const bookingUrl = getBookingUrl();
  return (
    <>
      <PageIntro eyebrow="1:1" title="Individual sessions.">
        One-to-one work, drawing on whatever serves: energetic practice, embodiment, presence, creativity. Open to
        everyone — House members receive {site.memberPricingLabel.toLowerCase()}.
      </PageIntro>

      <Section tone="light" className="py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>Book a time</Eyebrow>
            <p className="text-muted mt-6 leading-relaxed">
              Choose a time that suits you. If you are a House member, mention it when booking to receive member
              pricing.
            </p>
          </div>
          <div className="md:col-span-8">
            {bookingUrl ? (
              <iframe
                src={bookingUrl}
                title="Book a 1:1 session"
                className="h-[720px] w-full border border-line bg-white"
                loading="lazy"
              />
            ) : (
              <div className="flex h-80 flex-col items-center justify-center gap-6 border border-dashed border-line p-8 text-center">
                <p className="display text-3xl">Online booking opens soon.</p>
                <a
                  href={`mailto:${site.contactEmail}?subject=${encodeURIComponent("1:1 session enquiry")}`}
                  className="rounded-full border border-current px-6 py-3 text-sm"
                >
                  Enquire by email
                </a>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
