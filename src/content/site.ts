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
    { href: "/journeys", label: "Retreats" },
    { href: "/sessions", label: "1:1" },
    { href: "/events", label: "Events" },
  ],
  /** Language for discounts until exact percentages are finalised. */
  memberPricingLabel: "Member pricing",
};
