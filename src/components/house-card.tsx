import Link from "next/link";
import type { House } from "@/content/types";
import { HouseArtwork } from "./vortex-eye";
import { Pill } from "./ui";

/** Overview tile for a House. Same size and weight for every House — no ranks. */
export function HouseCard({ house }: { house: House }) {
  const evolving = house.status === "evolving";
  return (
    <Link
      href={`/houses/${house.slug}`}
      className="group relative flex flex-col border-line bg-ink text-paper"
      style={{ "--accent": house.accent } as React.CSSProperties}
    >
      <HouseArtwork
        house={house}
        className={`aspect-square transition-opacity duration-700 ${evolving ? "opacity-60 group-hover:opacity-90" : "opacity-90 group-hover:opacity-100"}`}
      />
      <div className="flex flex-1 flex-col border-t border-line-dark p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="eyebrow" style={{ color: house.accent }}>
            {house.coreIdea}
          </p>
          {evolving && <Pill>In development</Pill>}
        </div>
        <h3 className="display mt-4 text-4xl">{house.name}</h3>
        <p className="mt-1 font-display text-xl italic text-paper/70">{house.invitation}.</p>
        <p className="mt-4 text-sm leading-relaxed text-paper/60">{house.summary}</p>
        {house.eligibilityLabel && (
          <p className="mt-5">
            <Pill accent={house.accent}>{house.eligibilityLabel}</Pill>
          </p>
        )}
      </div>
    </Link>
  );
}
