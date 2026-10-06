/**
 * Content model for The Wolf Wisdom.
 *
 * Everything the site renders comes from the files in /src/content. Changing a
 * House's `status`, adding a bundle, or adjusting a price should never require
 * touching page components. When a headless CMS is introduced later, these
 * types are the contract it needs to satisfy.
 */

export type Currency = "EUR";

/**
 * - `active`   — fully presented, joinable (if it has a checkout offer).
 * - `evolving` — visible as a door into the ecosystem, clearly marked as in
 *                development. No price, no checkout. Invites interest instead.
 * - `hidden`   — exists in content but is not rendered anywhere publicly.
 */
export type PublishStatus = "active" | "evolving" | "hidden";

export type Price =
  | { kind: "recurring"; amount: number; currency: Currency; interval: "month" | "year" }
  | { kind: "one-time"; amount: number; currency: Currency }
  | { kind: "donation" }
  | { kind: "member-pricing" }
  | { kind: "tbc" };

/**
 * A purchasable thing. `id` is the key used by the checkout route; the Stripe
 * price is resolved server-side from the environment variable named in
 * `stripePriceEnv` so that price IDs never live in content.
 */
export type Offer = {
  id: string;
  label: string;
  price: Price;
  stripePriceEnv?: string;
  /** Checkout mode. Defaults to "subscription" for recurring prices. */
  mode?: "subscription" | "payment";
  /** If set, the visitor must confirm this statement before checkout. */
  eligibility?: string;
};

export type HouseSlug = "whale" | "eagle" | "wolf" | "dragon";

export type Inclusion = {
  title: string;
  detail?: string;
  /** Narrows who the inclusion applies to, e.g. "For women members". */
  audienceNote?: string;
};

export type StandaloneAlternative = {
  title: string;
  price: Price;
  href?: string;
  note?: string;
};

export type House = {
  slug: HouseSlug;
  name: string;
  animal: string;
  /** Short invitation, e.g. "Dive deeper". */
  invitation: string;
  coreIdea: string;
  emotionalTerritory: string;
  summary: string;
  description: string[];
  audience: string;
  /** Rendered as a prominent label, e.g. "VortexHealing students only". */
  eligibilityLabel?: string;
  status: PublishStatus;
  /** Shown when status is "evolving". */
  evolvingNote?: string;
  offer?: Offer;
  includes: Inclusion[];
  standaloneAlternatives: StandaloneAlternative[];
  /**
   * Accent colour. PLACEHOLDER — palettes are to be developed with the artist.
   * Keep muted/metallic so they sit inside the black-and-white world.
   */
  accent: string;
  /** Final artwork, once supplied. Falls back to the generated vortex-eye. */
  artwork?: { src: string; alt: string; textSafeSrc?: string };
  order: number;
};

/**
 * Multi-House membership (the likely shape of The Wolf). Unpublished bundles
 * are never shown; publishing one makes the "Belong to more than one House"
 * section render real options instead of the "coming" note.
 */
export type Bundle = {
  id: string;
  name: string;
  houses: HouseSlug[];
  description: string;
  published: boolean;
  offer?: Offer;
  /** Whale eligibility still applies within any bundle that includes Whale. */
  eligibility?: string;
};

export type ProgramKind = "program" | "practice" | "series" | "gathering" | "sessions";

export type Program = {
  slug: string;
  title: string;
  kind: ProgramKind;
  strapline: string;
  summary: string;
  description: string[];
  facts: { label: string; value: string }[];
  eligibilityLabel?: string;
  /** Houses whose membership includes this program. */
  includedIn: HouseSlug[];
  offers: Offer[];
  status: PublishStatus;
  order: number;
};

export type Journey = {
  slug: string;
  place: string;
  when: string;
  title: string;
  theme: string;
  description: string;
  status: "planned" | "forming" | "open" | "past";
  note?: string;
  relatedProgram?: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  start: string; // ISO
  end?: string; // ISO
  description?: string;
  location?: string;
  /** Which Houses' members this event is for. Empty = public. */
  houses: HouseSlug[];
  membersOnly: boolean;
  url?: string;
};
