import type { Metadata } from "next";
import { JoinForm } from "@/components/join-form";
import { CategoryMark, Eyebrow, PageIntro, PriceTag, Section } from "@/components/ui";
import { resonanceFlow } from "@/content/sessions";
import { site } from "@/content/site";
import { getBookingUrl } from "@/lib/calendar";

export const metadata: Metadata = {
  title: "Resonance Flow™ — 1:1",
  description: "Resonance Flow™: individual sessions, a merging of modalities in service of wholeness.",
};

export default function SessionsPage() {
  const bookingUrl = getBookingUrl();
  return (
    <>
      <PageIntro eyebrow="1:1 · Individual practice" title={resonanceFlow.title}>
        {resonanceFlow.strapline}
      </PageIntro>

      <Section tone="light" className="py-24">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="space-y-6 text-lg leading-relaxed md:col-span-7">
            {resonanceFlow.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <aside className="space-y-6 md:col-span-5">
            <div className="border border-line p-8">
              <Eyebrow>Single sessions</Eyebrow>
              <ul className="mt-6 divide-y divide-line-light">
                {resonanceFlow.pricing.map((row) => (
                  <li key={row.label} className="flex items-baseline justify-between gap-4 py-4">
                    <span className="text-sm">
                      {row.note && <CategoryMark shared className="mr-2 inline-block h-1.5 w-1.5 align-middle" />}
                      {row.label}
                      {row.note && <span className="text-muted block text-xs">{row.note}</span>}
                    </span>
                    <PriceTag price={row.price} size="sm" />
                  </li>
                ))}
              </ul>
              <p className="text-muted mt-4 text-sm">Book a time below.</p>
            </div>
            <div className="border border-line p-8">
              <Eyebrow>Packages</Eyebrow>
              <ul className="mt-6 space-y-8">
                {resonanceFlow.packages.map((pkg) => (
                  <li key={pkg.id}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="display text-2xl">{pkg.label}</span>
                      <PriceTag price={pkg.price} size="sm" />
                    </div>
                    <p className="text-muted mt-1 text-sm">{pkg.note}</p>
                    <div className="mt-4">
                      <JoinForm offer={pkg} label={`Buy ${pkg.label}`} />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="text-muted mt-8 text-xs">{resonanceFlow.stackingNote}</p>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="light" className="border-t border-line py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>Book a time</Eyebrow>
            <p className="text-muted mt-6 leading-relaxed">
              Choose a time that suits you. Sessions are limited each month. If
              you are a Whale or Eagle member, or have a package, mention it when booking.
            </p>
          </div>
          <div className="md:col-span-8">
            {bookingUrl ? (
              <iframe
                src={bookingUrl}
                title="Book a Resonance Flow session"
                className="h-[720px] w-full border border-line bg-white"
                loading="lazy"
              />
            ) : (
              <div className="flex h-80 flex-col items-center justify-center gap-6 border border-dashed border-line p-8 text-center">
                <p className="display text-3xl">Online booking opens soon.</p>
                <a
                  href={`mailto:${site.contactEmail}?subject=${encodeURIComponent("Resonance Flow session enquiry")}`}
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
