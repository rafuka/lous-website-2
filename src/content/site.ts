export const site = {
  name: "The Wolf Wisdom",
  school: "Becoming Humans",
  tagline: "A school for exploring what it is to be a human being.",
  description:
    "The Wolf Wisdom is a school for learning, exploring and experiencing what it means to be human — through practice, embodiment, creativity, presence and community.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@thewolfwisdom.com",
  nav: [
    { href: "/houses", label: "The Houses" },
    { href: "/membership", label: "Membership" },
    { href: "/programs", label: "Programs" },
    { href: "/practices", label: "Practices" },
    { href: "/journeys", label: "Retreats" },
    { href: "/sessions", label: "1:1" },
    { href: "/calendar", label: "Calendar" },
  ],
  /** The persistent call to action. There is more than one legitimate way in. */
  cta: { href: "/begin", label: "Find your way in" },
  /**
   * Umbrella sentence for the Four Houses. Still in exploration — not final.
   * Other directions: "Four pathways to meet your truth." · "Four doorways into
   * one school." · "Four Houses inside one village." · "Four ways of entering
   * the same inquiry."
   */
  housesUmbrella: "Four Houses. One living school.",
  /** Language for discounts until exact percentages are finalised. */
  memberPricingLabel: "Member pricing",
  /** Every displayed time is in this zone (CET/CEST). */
  timeZone: "Europe/Brussels",
};

/**
 * "The human behind The Wolf" — a point of relationship and context on the
 * homepage, not a biography. Swap `photo` for any of the other portraits.
 */
export const founder = {
  heading: "The human behind The Wolf.",
  photo: {
    src: "/people/the-human-behind-the-wolf.jpg",
    alt: "The founder of The Wolf Wisdom, laughing with eyes closed, hair falling across the face",
    width: 1067,
    height: 1600,
  },
  text: [
    "This school grew out of my own exploration — through the body, trauma, spirituality, creativity, science, philosophy, art, energy, and the ordinary business of being alive.",
    "None of these on its own felt like the whole answer. Together they became a way of practising: curious, embodied, and rooted in daily life. The Wolf Wisdom is where I share that practice, and where we keep exploring it together.",
  ],
};
