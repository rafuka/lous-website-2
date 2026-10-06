import type { House, HouseSlug } from "./types";

/**
 * The Four Houses.
 *
 * To activate Wolf or Dragon: set `status: "active"`, add an `offer`, fill in
 * `includes`, and set the matching STRIPE_PRICE_* env var. No page changes needed.
 * To take one off the public site entirely: `status: "hidden"`.
 *
 * Accent colours are placeholders until palettes are confirmed with the artist.
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
      "A House for VortexHealing students: continuity of practice, experimentation, creativity and community between formal trainings.",
    description: [
      "The Whale is a dedicated home for VortexHealing students. It holds the space between formal trainings, where practice either deepens or quietly fades.",
      "Here we keep practising together, experiment, create, and stay in contact with one another as a living community of practitioners.",
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
        detail: "Live practice sessions, currently planned three times a month.",
      },
      {
        title: "Unlock Your Creative Flow",
        detail: "All live sessions of the six-month program (Nov 2026 – Apr 2027).",
      },
      {
        title: "Reclaiming Our Blood",
        detail: "Included for women in the Whale membership.",
        audienceNote: "For women members",
      },
      {
        title: "Members-only gatherings",
        detail: "Occasional spontaneous events, shared as they arise.",
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
        href: "/programs/practice-lab",
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
      "An ongoing practice of presence, embodiment, awareness and personal exploration — open to everyone.",
    description: [
      "The Eagle is the open House. It is for anyone who wants a living, ongoing practice of presence, embodiment and awareness — no prior training required.",
      "Members meet regularly in Akawa sessions and receive member pricing across The Wolf Wisdom programs, 1:1 work and gatherings.",
    ],
    audience: "Open to the general community",
    status: "active",
    offer: {
      id: "house-eagle",
      label: "Eagle membership",
      price: { kind: "recurring", amount: 40, currency: "EUR", interval: "month" },
      stripePriceEnv: "STRIPE_PRICE_EAGLE_MONTHLY",
    },
    includes: [
      {
        title: "Akawa sessions",
        detail: "Recurring live sessions, currently on a rhythm of three a month.",
      },
      {
        title: "Member pricing on programs",
        detail: "Preferential pricing on upcoming The Wolf Wisdom programs.",
      },
      { title: "Member pricing on 1:1 sessions" },
      {
        title: "Member pricing on women-only gatherings",
        audienceNote: "For eligible members",
      },
      {
        title: "Spontaneous gatherings",
        detail: "Occasional drop-in events through the year, free for members.",
      },
    ],
    standaloneAlternatives: [
      { title: "1:1 sessions", price: { kind: "member-pricing" }, href: "/sessions" },
      { title: "Programs & retreats", price: { kind: "member-pricing" }, href: "/programs" },
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
    summary:
      "Belonging across Houses — a simpler way to be part of more than one, without losing your own path.",
    description: [
      "The Wolf is being shaped as the House of belonging: a way to walk with more than one House at once, held in a single, simpler membership.",
      "Belonging without losing individuality. Details are still being designed.",
    ],
    audience: "Members of more than one House",
    status: "evolving",
    evolvingNote: "The Wolf is still being designed. Leave your name to hear when it opens.",
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
    summary: "A shared House for magic, mystery and transformation — being shaped in collaboration.",
    description: [
      "The Dragon is a House being dreamed into form together with a collaborator. Its shape, offerings and rhythm will be shared once they are ready.",
    ],
    audience: "To be shared",
    status: "evolving",
    evolvingNote: "The Dragon is being shaped in collaboration. Nothing here is final yet.",
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
