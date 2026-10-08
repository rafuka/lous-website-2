import type { Metadata } from "next";
import { HouseCard } from "@/components/house-card";
import { ArrowLink, PageIntro, Section } from "@/components/ui";
import { getVisibleHouses } from "@/content/houses";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "The Four Houses",
  description: "Whale, Eagle, Wolf and Dragon — four ways of entering the same school.",
};

export default function HousesPage() {
  const houses = getVisibleHouses();
  return (
    <>
      <PageIntro eyebrow="The Four Houses" title={site.housesUmbrella}>
        Each House has its own animal, visual language and field of exploration. They are not ranked, and not separate
        — different ways of entering the same school, the same village, the same inquiry into becoming human.
      </PageIntro>

      <section className="tone-dark pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {houses.map((h) => (
              <HouseCard key={h.slug} house={h} />
            ))}
          </div>
        </div>
      </section>

      <Section tone="light" className="py-24">
        <h2 className="display text-5xl">Which House fits you?</h2>
        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="eyebrow text-muted py-4 pr-6 font-normal">House</th>
                <th className="eyebrow text-muted py-4 pr-6 font-normal">Territory</th>
                <th className="eyebrow text-muted py-4 pr-6 font-normal">For</th>
                <th className="eyebrow text-muted py-4 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {houses.map((h) => (
                <tr key={h.slug} className="border-b border-line align-top">
                  <td className="py-6 pr-6">
                    <span className="display text-2xl">{h.name}</span>
                    <span className="mt-1 block font-display italic text-muted">{h.invitation}</span>
                  </td>
                  <td className="text-muted py-6 pr-6">{h.emotionalTerritory}</td>
                  <td className="py-6 pr-6">{h.eligibilityLabel ?? h.audience}</td>
                  <td className="py-6">
                    {h.status === "active" ? "Open" : <span className="text-muted">In development</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ArrowLink href="/membership" className="mt-12">
          See membership options
        </ArrowLink>
      </Section>
    </>
  );
}
