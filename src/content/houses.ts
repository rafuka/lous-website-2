import type { House, HouseSlug } from "./types";

/**
 * The Four Houses.
 *
 * To activate Wolf or Dragon: set `status: "active"`, add an `offer`, fill in
 * `includes`, and set the matching STRIPE_PRICE_* env var. No page changes needed.
 * To take one off the public site entirely: `status: "hidden"`.
 *
 * Accent colours are placeholders until palettes are confirmed with the artist.
 * `includes` lists only what is specific to a House — the shared layer lives
 * in membership.ts.
 */
export const houses: House[] = [
  {
    slug: "whale",
    name: "The Whale",
    animal: "Whale",
    invitation: "Dive deeper",
    coreIdea: "Depth",
    emotionalTerritory: "Depth, receiving, spaciousness, the inner world",
    summary:
      "For VortexHealing students. The House of depth, continuity of practice, experimentation and creative application.",
    description: [
      "The Whale is a home for VortexHealing students. It holds the space between formal trainings — where practice either deepens or quietly fades.",
      "Here we keep practising together, experiment, and carry the work into creative life, as a living community of practitioners.",
    ],
    audience: "VortexHealing students",
    eligibilityLabel: "VortexHealing students only",
    status: "active",
    offer: {
      id: "house-whale",
      label: "Whale membership",
      price: { kind: "recurring", amount: 40, currency: "EUR", interval: "month" },
      stripePriceEnv: "STRIPE_PRICE_WHALE_MONTHLY",
      eligibility: "I confirm I am a VortexHealing student.",
    },
    includes: [
      {
        title: "Practice Lab — The Origin",
        detail: "Three live sessions a month, practising VortexHealing tools in community.",
      },
      {
        title: "Unlock Your Creative Flow",
        detail: "Four 2-hour live sessions a month, November 2026 – April 2027.",
      },
    ],
    standaloneAlternatives: [
      {
        title: "Unlock Your Creative Flow",
        price: { kind: "recurring", amount: 30, currency: "EUR", interval: "month" },
        href: "/programs/unlock-your-creative-flow",
      },
      {
        title: "Practice Lab — The Origin",
        price: { kind: "donation" },
        href: "/practices/practice-lab",
      },
    ],
    accent: "#6f8fa0",
    order: 1,
  },
  {
    slug: "eagle",
    name: "The Eagle",
    animal: "Eagle",
    invitation: "See wider",
    coreIdea: "Perspective",
    emotionalTerritory: "Perspective, vision, awareness, expansion",
    summary:
      "Open beyond the VortexHealing community. A wider practice of perspective, awareness, embodiment and remembrance.",
    description: [
      "The Eagle is open to everyone — no prior training required. It is a wider practice of perspective, awareness, embodiment and remembrance.",
      "Its heart is Akawa: entering, together, a field in which the system can recognise what is already present beneath conditioning.",
    ],
    audience: "Open to everyone",
    status: "active",
    offer: {
      id: "house-eagle",
      label: "Eagle membership",
      price: { kind: "recurring", amount: 40, currency: "EUR", interval: "month" },
      stripePriceEnv: "STRIPE_PRICE_EAGLE_MONTHLY",
    },
    includes: [
      {
        title: "Akawa live sessions",
        detail: "The Eagle's core practice — a regular rhythm of live sessions in a field of remembrance.",
      },
    ],
    standaloneAlternatives: [
      {
        title: "Akawa",
        price: { kind: "one-time", amount: 35, currency: "EUR" },
        href: "/practices/akawa",
        note: "per session",
      },
      {
        title: "Resonance Flow™ 1:1",
        price: { kind: "one-time", amount: 120, currency: "EUR" },
        href: "/sessions",
        note: "per session",
      },
    ],
    accent: "#a88c5f",
    order: 2,
  },
  {
    slug: "wolf",
    name: "The Wolf",
    animal: "Wolf",
    invitation: "Join the pack",
    coreIdea: "Belonging",
    emotionalTerritory: "Belonging, instinct, individuality and the pack",
    summary: "Belonging, instinct and the pack. Its purpose and shape are still being explored.",
    description: [
      "The Wolf carries the territory of belonging without losing individuality.",
      "Its purpose, membership and final language are still in development, and will be shared once they are ready.",
    ],
    audience: "To be shared",
    status: "evolving",
    evolvingNote: "The Wolf is in development. Nothing here is final yet — leave your name to hear when it takes shape.",
    includes: [],
    standaloneAlternatives: [],
    accent: "#8d9196",
    order: 3,
  },
  {
    slug: "dragon",
    name: "The Dragon",
    animal: "Dragon",
    invitation: "Explore magic",
    coreIdea: "Magic",
    emotionalTerritory: "Magic, transformation, mystery, possibility",
    summary: "Magic, mystery and transformation. Its purpose and shape are still being explored.",
    description: [
      "The Dragon is a House being dreamed into form, possibly in collaboration.",
      "Its purpose, membership, collaboration structure and final language are still in development, and will be shared once they are ready.",
    ],
    audience: "To be shared",
    status: "evolving",
    evolvingNote: "The Dragon is in development. Nothing here is final yet — leave your name to hear when it takes shape.",
    includes: [],
    standaloneAlternatives: [],
    accent: "#9a5a48",
    order: 4,
  },
];

export function getVisibleHouses() {
  return houses.filter((h) => h.status !== "hidden").sort((a, b) => a.order - b.order);
}

export function getActiveHouses() {
  return getVisibleHouses().filter((h) => h.status === "active");
}

export function getHouse(slug: string) {
  const house = houses.find((h) => h.slug === slug);
  return house && house.status !== "hidden" ? house : undefined;
}

export function houseName(slug: HouseSlug) {
  return houses.find((h) => h.slug === slug)?.name ?? slug;
}
