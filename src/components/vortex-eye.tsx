import Image from "next/image";
import type { House } from "@/content/types";

/**
 * Placeholder for the House artworks: an eye that becomes a vortex.
 * Once the artist supplies final artwork, set `house.artwork` and this renders
 * the image instead — no layout changes needed.
 */
export function HouseArtwork({
  house,
  className = "",
  priority = false,
}: {
  house: House;
  className?: string;
  priority?: boolean;
}) {
  if (house.artwork) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={house.artwork.src}
          alt={house.artwork.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className={`grain relative flex items-center justify-center overflow-hidden ${className}`}
      role="img"
      aria-label={`${house.name} — artwork in development`}
    >
      <VortexEye accent={house.accent} seed={house.order} />
    </div>
  );
}

function spiralPath(turns: number, rotation: number, cx: number, cy: number, maxR: number) {
  const steps = 120;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = rotation + t * turns * Math.PI * 2;
    const r = maxR * Math.pow(t, 1.35);
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle) * 0.62; // flattened into an eye
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return d;
}

export function VortexEye({ accent, seed = 1 }: { accent: string; seed?: number }) {
  const arms = 9 + seed;
  const id = `vx-${seed}`;
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id={`${id}-g`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.95" />
          <stop offset="55%" stopColor={accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-m`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f3f1ec" stopOpacity="0.9" />
          <stop offset="45%" stopColor={accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f3f1ec" stopOpacity="0.25" />
        </linearGradient>
        <clipPath id={`${id}-eye`}>
          <path d="M20 200 Q200 40 380 200 Q200 360 20 200 Z" />
        </clipPath>
      </defs>

      <circle cx="200" cy="200" r="190" fill={`url(#${id}-g)`} opacity="0.35" />

      <g clipPath={`url(#${id}-eye)`}>
        <g className="origin-center animate-vortex" style={{ transformBox: "fill-box" }}>
          {Array.from({ length: arms }, (_, i) => (
            <path
              key={i}
              d={spiralPath(1.6, (i / arms) * Math.PI * 2, 200, 200, 210)}
              fill="none"
              stroke={`url(#${id}-m)`}
              strokeWidth={i % 3 === 0 ? 1.1 : 0.55}
              strokeLinecap="round"
              opacity={0.55 + (i % 4) * 0.1}
            />
          ))}
        </g>
      </g>

      <path
        d="M20 200 Q200 40 380 200 Q200 360 20 200 Z"
        fill="none"
        stroke="#f3f1ec"
        strokeOpacity="0.5"
        strokeWidth="0.8"
      />
      <circle cx="200" cy="200" r="16" fill="#0c0c0b" />
      <circle cx="200" cy="200" r="16" fill="none" stroke={accent} strokeWidth="1" />
      <circle cx="194" cy="194" r="3" fill="#f3f1ec" opacity="0.8" />
    </svg>
  );
}
