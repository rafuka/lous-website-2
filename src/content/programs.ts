import type { Program } from "./types";

/**
 * Standalone The Wolf Wisdom work. Discoverable and purchasable without any
 * House membership.
 */
export const programs: Program[] = [
  {
    slug: "unlock-your-creative-flow",
    title: "Unlock Your Creative Flow",
    kind: "program",
    strapline: "Six months of live practice for the creative human",
    summary:
      "A six-month live online program for VortexHealing students, culminating in an optional gathering in Ireland.",
    description: [
      "Unlock Your Creative Flow is a six-month live online journey into creativity as a lived, embodied practice.",
      "Sessions are concentrated into two teaching weeks each month, so that people across Europe, Australia and the Americas can join live.",
      "In May 2027 the program meets in person in Ireland — an optional, physical culmination of the six months.",
    ],
    facts: [
      { label: "Dates", value: "November 2026 – April 2027" },
      { label: "Format", value: "Live online" },
      { label: "Rhythm", value: "4 live sessions a month, 2 hours each, across two teaching weeks" },
      { label: "Time zones", value: "Europe/Australia and Europe/Americas" },
      { label: "Culmination", value: "Optional gathering in Ireland, May 2027" },
    ],
    eligibilityLabel: "VortexHealing students only",
    includedIn: ["whale"],
    offers: [
      {
        id: "program-creative-flow",
        label: "Join Creative Flow",
        price: { kind: "recurring", amount: 30, currency: "EUR", interval: "month" },
        stripePriceEnv: "STRIPE_PRICE_CREATIVE_FLOW_MONTHLY",
        eligibility: "I confirm I am a VortexHealing student.",
      },
    ],
    status: "active",
    order: 1,
  },
  {
    slug: "practice-lab",
    title: "Practice Lab — The Origin",
    kind: "practice",
    strapline: "A living lab for VortexHealing practice",
    summary: "Regular live practice sessions for VortexHealing students, offered on a donation basis.",
    description: [
      "Practice Lab is where VortexHealing practice is kept alive between trainings: shared, explored, experimented with.",
      "It is included in the Whale membership, and remains available on its own on a donation basis.",
    ],
    facts: [
      { label: "Rhythm", value: "Currently planned three times a month" },
      { label: "Format", value: "Live online" },
    ],
    eligibilityLabel: "VortexHealing students only",
    includedIn: ["whale"],
    offers: [
      {
        id: "program-practice-lab-donation",
        label: "Join by donation",
        price: { kind: "donation" },
        stripePriceEnv: "STRIPE_PRICE_PRACTICE_LAB_DONATION",
        mode: "payment",
        eligibility: "I confirm I am a VortexHealing student.",
      },
    ],
    status: "active",
    order: 2,
  },
  {
    slug: "chakra-series",
    title: "The Chakra Series",
    kind: "series",
    strapline: "A premium journey through the body's centres",
    summary:
      "Twenty-one days with each chakra, followed by a week of integration. Recorded content with live elements.",
    description: [
      "The Chakra Series is a personal The Wolf Wisdom journey, moving through each chakra in turn.",
      "Each chakra is given twenty-one days, followed by around a week of integration before the next begins. The journey combines recorded content with live elements.",
      "It is a standalone journey and is not included in House memberships. Members receive member pricing.",
    ],
    facts: [
      { label: "Launch", value: "Planned for December 2026" },
      { label: "Rhythm", value: "21 days per chakra + ~1 integration week" },
      { label: "Format", value: "Recorded content with live elements" },
    ],
    includedIn: [],
    offers: [
      {
        id: "program-chakra-series",
        label: "Chakra Series",
        price: { kind: "tbc" },
        stripePriceEnv: "STRIPE_PRICE_CHAKRA_SERIES",
        mode: "payment",
      },
    ],
    status: "active",
    order: 3,
  },
];

export function getVisiblePrograms() {
  return programs.filter((p) => p.status !== "hidden").sort((a, b) => a.order - b.order);
}

export function getProgram(slug: string) {
  const p = programs.find((x) => x.slug === slug);
  return p && p.status !== "hidden" ? p : undefined;
}
