import Image from "next/image";
import Link from "next/link";
import { EntryPointList } from "@/components/entry-point-list";
import { HouseCard } from "@/components/house-card";
import { Mark } from "@/components/mark";
import { ArrowLink, ButtonLink, CategoryMark, Eyebrow, Pill, Section } from "@/components/ui";
import { getHouse, getVisibleHouses } from "@/content/houses";
import { journeyStatus, journeys } from "@/content/journeys";
import { founder, site } from "@/content/site";
import { getUpcomingEvents } from "@/lib/calendar";
import { formatEventDate, formatTimeRange } from "@/lib/format";

export default async function Home() {
  const houses = getVisibleHouses();
  const { events } = await getUpcomingEvents();
  const upcoming = events.slice(0, 4);

  return (
    <>
      {/* Hero — yin and yang, side by side */}
      <section className="grid min-h-[calc(100svh-4rem)] md:grid-cols-2">
        <div className="tone-dark flex flex-col justify-between px-6 pb-12 pt-20 lg:px-10">
          <Eyebrow>{site.name}</Eyebrow>
          <div>
            <h1 className="display text-moonlit animate-rise text-7xl sm:text-8xl lg:text-[8.5rem]">
              Becoming
              <br />
              Humans
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-paper/70">{site.tagline}</p>
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <ButtonLink href={site.cta.href}>{site.cta.label}</ButtonLink>
            <ButtonLink href="/houses" variant="outline">
              Meet the Four Houses
            </ButtonLink>
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
          <ArrowLink href="#human" className="mt-12">
            The human behind The Wolf
          </ArrowLink>
        </div>
      </section>

      {/* The human behind The Wolf — relationship and context, not a biography */}
      <Section tone="light" id="human" className="border-t border-line py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:items-center">
          <div className="relative aspect-[4/5] overflow-hidden md:col-span-5">
            <Image
              src={founder.photo.src}
              alt={founder.photo.alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Eyebrow>Becoming Humans</Eyebrow>
            <h2 className="display mt-6 text-5xl md:text-6xl">{founder.heading}</h2>
            <div className="opal-rule mt-10 w-24" />
            <div className="mt-10 space-y-5 text-lg leading-relaxed">
              {founder.text.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ArrowLink href="/sessions" className="mt-10">
              Work with me one-to-one
            </ArrowLink>
          </div>
        </div>
      </Section>

      {/* The Four Houses — strong visual overview before detail */}
      <section id="houses" className="tone-dark border-t border-line py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow>The Four Houses</Eyebrow>
              <h2 className="display mt-6 text-5xl md:text-7xl">{site.housesUmbrella}</h2>
            </div>
            <p className="text-muted md:col-span-5">
              Each House has its own animal, language and field of exploration. None sits above another — they are
              different ways of entering the same school.
            </p>
          </div>
          <div className="mt-16 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {houses.map((house) => (
              <HouseCard key={house.slug} house={house} />
            ))}
          </div>
        </div>
      </section>

      {/* What is happening, and when */}
      <Section tone="light" className="py-24 md:py-32">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>Calendar</Eyebrow>
            <h2 className="display mt-6 text-5xl">What is happening, and when.</h2>
            <p className="text-muted mt-6">Live practice, programs and New Moon gatherings. Brussels time.</p>
            <ArrowLink href="/calendar" className="mt-8">
              Full calendar
            </ArrowLink>
          </div>
          <ul className="divide-y divide-line-light border-y border-line md:col-span-8">
            {upcoming.map((e) => {
              const d = formatEventDate(e.start);
              return (
                <li key={e.id} className="flex items-baseline gap-6 py-6">
                  <span className="w-20 shrink-0">
                    <span className="display text-4xl">{d.day}</span>{" "}
                    <span className="eyebrow text-muted">{d.month}</span>
                  </span>
                  <span className="flex-1">
                    <span className="flex items-center gap-3">
                      {e.houses.length > 1 ? (
                        <CategoryMark shared className="h-2 w-2" />
                      ) : (
                        <CategoryMark accent={e.houses[0] && getHouse(e.houses[0])?.accent} className="h-2 w-2" />
                      )}
                      <span className="display text-2xl md:text-3xl">{e.title}</span>
                    </span>
                    <span className="text-muted mt-1 block text-sm">
                      {d.weekday} · {formatTimeRange(e.start, e.end)}
                      {e.membersOnly ? " · Members only" : ""}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      {/* Find your way in */}
      <Section tone="light" className="border-t border-line py-24 md:py-32">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow>{site.cta.label}</Eyebrow>
            <h2 className="display mt-6 text-5xl md:text-6xl">More than one doorway.</h2>
          </div>
          <p className="text-muted md:col-span-5">
            A membership, a single practice, a program, a 1:1 session or an in-person experience — enter in the way
            that makes sense for you.
          </p>
        </div>
        <div className="mt-12">
          <EntryPointList />
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
            <Link key={j.slug} href="/journeys" className="flex flex-col bg-ink p-8">
              <p className="eyebrow text-muted">{j.when}</p>
              <p className="display mt-8 text-4xl">{j.place}</p>
              <p className="mt-2 font-display text-xl italic text-paper/70">{j.title}</p>
              <div className="mt-8">
                <Pill>{journeyStatus(j)}</Pill>
              </div>
            </Link>
          ))}
        </div>
        <ArrowLink href="/journeys" className="mt-12">
          All retreats &amp; residencies
        </ArrowLink>
      </Section>
    </>
  );
}
