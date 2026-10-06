import Link from "next/link";
import { HouseCard } from "@/components/house-card";
import { Mark } from "@/components/mark";
import { ArrowLink, ButtonLink, Eyebrow, Section } from "@/components/ui";
import { getVisibleHouses } from "@/content/houses";
import { journeys } from "@/content/journeys";
import { getVisiblePrograms } from "@/content/programs";
import { site } from "@/content/site";

const pathway = [
  { step: "Discover", text: "Meet the Four Houses — four doors into one ecosystem." },
  { step: "Choose", text: "Find the House that fits where you are now." },
  { step: "Explore", text: "See what membership holds, and what stands on its own." },
  { step: "Join", text: "Become a member, or book a single program or session." },
];

export default function Home() {
  const houses = getVisibleHouses();
  const programs = getVisiblePrograms();

  return (
    <>
      {/* Hero — yin and yang, side by side */}
      <section className="grid min-h-[calc(100svh-4rem)] md:grid-cols-2">
        <div className="tone-dark flex flex-col justify-between px-6 pb-12 pt-20 lg:px-10">
          <Eyebrow>{site.name}</Eyebrow>
          <div>
            <h1 className="display animate-rise text-7xl sm:text-8xl lg:text-[9rem]">
              Becoming
              <br />
              Humans
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-paper/70">{site.tagline}</p>
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <ButtonLink href="/houses">Discover the Four Houses</ButtonLink>
          </div>
        </div>
        <div className="tone-light relative flex flex-col justify-between px-6 pb-12 pt-20 lg:px-10">
          <Mark className="h-16 w-16 md:h-20 md:w-20" />
          <div className="max-w-md">
            <p className="display text-4xl md:text-5xl">
              Not spirituality to escape being human — practice to inhabit it.
            </p>
            <p className="text-muted mt-6 leading-relaxed">
              Energetic practice, embodiment, creativity, presence, community and mystery, woven into ordinary,
              practical human life.
            </p>
          </div>
          <ArrowLink href="#houses" className="mt-12">
            Four doors, one ecosystem
          </ArrowLink>
        </div>
      </section>

      {/* The Four Houses — strong visual overview before detail */}
      <section id="houses" className="tone-dark border-t border-line py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow>The Four Houses</Eyebrow>
              <h2 className="display mt-6 text-5xl md:text-7xl">Different doors into the same house.</h2>
            </div>
            <p className="text-muted md:col-span-5">
              Each House has its own animal, language and field of exploration. None sits above another — they are
              different relationships to the same work.
            </p>
          </div>
          <div className="mt-16 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {houses.map((house) => (
              <HouseCard key={house.slug} house={house} />
            ))}
          </div>
        </div>
      </section>

      {/* Pathway */}
      <Section tone="light" className="py-24 md:py-32">
        <Eyebrow>How to begin</Eyebrow>
        <ol className="mt-12 grid gap-px bg-line md:grid-cols-4">
          {pathway.map((p, i) => (
            <li key={p.step} className="bg-paper p-8">
              <span className="eyebrow text-muted">0{i + 1}</span>
              <p className="display mt-6 text-4xl">{p.step}</p>
              <p className="text-muted mt-3 text-sm leading-relaxed">{p.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-wrap gap-8">
          <ArrowLink href="/membership">Compare memberships</ArrowLink>
          <ArrowLink href="/programs">Programs without membership</ArrowLink>
        </div>
      </Section>

      {/* Standalone work */}
      <Section tone="light" className="border-t border-line py-24 md:py-32">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>Standalone work</Eyebrow>
            <h2 className="display mt-6 text-5xl">Programs that stand on their own.</h2>
            <p className="text-muted mt-6">Open to join without a House membership. Members receive member pricing.</p>
          </div>
          <ul className="divide-y divide-line-light border-y border-line md:col-span-8">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link href={`/programs/${p.slug}`} className="group flex items-baseline justify-between gap-6 py-8">
                  <div>
                    <p className="display text-3xl md:text-4xl">{p.title}</p>
                    <p className="text-muted mt-2 text-sm">{p.strapline}</p>
                  </div>
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/sessions" className="group flex items-baseline justify-between gap-6 py-8">
                <div>
                  <p className="display text-3xl md:text-4xl">1:1 sessions</p>
                  <p className="text-muted mt-2 text-sm">Individual work, with member pricing for House members</p>
                </div>
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </Section>

      {/* Journeys */}
      <Section tone="dark" className="py-24 md:py-32">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow>Retreats &amp; residencies</Eyebrow>
            <h2 className="display mt-6 text-5xl md:text-7xl">Becoming Humans, in person.</h2>
          </div>
          <p className="text-muted md:col-span-5">
            Each gathering explores a different aspect of human life. They belong together without needing to be the
            same.
          </p>
        </div>
        <div className="mt-16 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
          {journeys.map((j) => (
            <div key={j.slug} className="bg-ink p-8">
              <p className="eyebrow text-muted">{j.when}</p>
              <p className="display mt-8 text-4xl">{j.place}</p>
              <p className="mt-2 font-display text-xl italic text-paper/70">{j.title}</p>
            </div>
          ))}
        </div>
        <ArrowLink href="/journeys" className="mt-12">
          All retreats &amp; residencies
        </ArrowLink>
      </Section>
    </>
  );
}
