import type { Offer, Price } from "./types";

/**
 * Resonance Flow™ — 1:1 individual practice.
 * Package and membership discounts do not stack (unless decided otherwise later).
 * Single sessions are booked through the calendar booking page; packages are
 * bought here and then booked session by session.
 */
export const resonanceFlow = {
  title: "Resonance Flow™",
  strapline: "A merging of modalities in service of wholeness.",
  description: [
    "Resonance Flow™ is my individual practice: a personalised meeting of the sources, practices and tools I work with, used according to what is present rather than according to a fixed protocol.",
    "The intention is to work with conditioning across emotional and energetic layers, support a return toward balance and energetic strength, and create more space for the body and system to move toward health.",
    "For me, wholeness is not something we manufacture. It involves remembering what we are beneath the habitual experience of separation, and allowing that recognition to become increasingly embodied in the way we live.",
  ],
  pricing: [
    { label: "Individual session", price: { kind: "one-time", amount: 120, currency: "EUR" } as Price },
    {
      label: "Whale & Eagle members",
      price: { kind: "one-time", amount: 108, currency: "EUR" } as Price,
      note: "10% off individual sessions",
    },
  ],
  packages: [
    {
      id: "resonance-flow-5",
      label: "5 sessions",
      price: { kind: "one-time", amount: 570, currency: "EUR" },
      stripePriceEnv: "STRIPE_PRICE_RESONANCE_FLOW_5",
      mode: "payment",
      note: "5% off · €114 per session",
    },
    {
      id: "resonance-flow-10",
      label: "10 sessions",
      price: { kind: "one-time", amount: 1080, currency: "EUR" },
      stripePriceEnv: "STRIPE_PRICE_RESONANCE_FLOW_10",
      mode: "payment",
      note: "10% off · €108 per session",
    },
  ] satisfies (Offer & { note: string })[],
  stackingNote: "Package and membership discounts do not combine.",
};
