import type { Program, ProgramCategory } from "./types";

/**
 * Programs (structured journeys with an arc) and practices (recurring or
 * spontaneous live practice). Standalone does not mean open to everyone:
 * each offering keeps its own eligibility.
 */
export const programs: Program[] = [
  {
    slug: "unlock-your-creative-flow",
    title: "Unlock Your Creative Flow",
    category: "program",
    kind: "program",
    strapline: "From conceptual dream into material practice.",
    summary:
      "A six-month live workshop for VortexHealing students bringing a specific creative project into form.",
    description: [
      "Unlock Your Creative Flow is a six-month live workshop created for VortexHealing students who want to bring a specific creative project into form — a book, a song, visual art, a performance, or another work that is asking to be made.",
      "Each two-hour session has two movements. First, we work with the project itself: where it is now, what is trying to emerge, what has moved since the previous call, and how to translate inspiration into material practice. Then we move into approximately 45 minutes of self-healing practice to release blocks and tune the creative flow in the system.",
      "All self-healing practices are recorded and available to enrolled students for the full six months. Calls are scheduled across time zones so that VortexHealing students in Europe, the Americas and Australia can take part.",
    ],
    facts: [
      { label: "Dates", value: "November 2026 → April 2027" },
      { label: "Rhythm", value: "4 × 2-hour live sessions a month — 24 sessions" },
      { label: "Each session", value: "Project development + ~45 minutes of self-healing practice" },
      { label: "Recordings", value: "Self-healing practices recorded and accessible throughout" },
      { label: "Culmination", value: "Optional physical gathering in Europe, May 2027" },
    ],
    eligibilityLabel: "VortexHealing students only",
    includedIn: ["whale"],
    rhythm: "4 × 2 hours a month · Nov 2026 – Apr 2027",
    calendarKeywords: ["creative flow"],
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
    slug: "chakra-series",
    title: "The Chakra Series",
    category: "program",
    kind: "series",
    strapline: "A journey through the body's centres",
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
    calendarKeywords: ["chakra"],
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
    order: 2,
  },
  {
    slug: "practice-lab",
    title: "Practice Lab — The Origin",
    category: "practice",
    kind: "practice",
    strapline: "A living practice space for VortexHealing students.",
    summary: "Three live sessions a month practising VortexHealing tools in community. By donation, or included in the Whale.",
    description: [
      "Three live sessions each month dedicated to practising VortexHealing tools in community, open to VortexHealing students of every level before Core Veil.",
      "The theme changes from session to session, so we can revisit different tools, experiment, practise sensing and keep the work alive between formal trainings.",
      "The intention is not to add another class, but to create continuity: a place to practise what we have already received.",
    ],
    facts: [
      { label: "Rhythm", value: "3 live sessions a month · Mondays, 10:00 CET" },
      { label: "Theme", value: "Varies every session" },
      { label: "Membership", value: "Included in the Whale" },
      { label: "On its own", value: "By donation" },
    ],
    resources: {
      title: "Want to become a VortexHealing student?",
      intro: "Embark on a foundational training:",
      links: [
        { label: "North America", href: "https://www.lorrainegoldbloom.com/foundational" },
        { label: "Europe", href: "https://www.anthonygorman.org" },
        { label: "Asia / Pacific", href: "https://danielwald.com/foundational-training/" },
        { label: "South America", href: "https://vortexhealing.org/andrea_bio" },
      ],
    },
    eligibilityLabel: "VortexHealing students · all levels before Core Veil",
    includedIn: ["whale"],
    rhythm: "3× a month · Mondays 10:00 CET",
    calendarKeywords: ["practice lab"],
    offers: [
      {
        id: "program-practice-lab-donation",
        label: "Join by donation",
        price: { kind: "donation" },
        stripePriceEnv: "STRIPE_PRICE_PRACTICE_LAB_DONATION",
        mode: "payment",
        eligibility: "I confirm I am a VortexHealing student, below Core Veil level.",
      },
    ],
    status: "active",
    order: 3,
  },
  {
    slug: "akawa",
    title: "Akawa",
    category: "practice",
    kind: "practice",
    strapline: "Enter a field of remembrance.",
    summary: "A live consciousness and energy practice centred on remembrance. Small groups of up to twelve.",
    description: [
      "Akawa is a live consciousness and energy practice centred on remembrance. Rather than asking the system to become something else, the invitation is to enter a field in which it can recognise what is already present beneath conditioning and separation.",
      "I experience Akawa as a conscious relationship with a wider field of awareness — a space where awakening can unfold according to each person's own rhythm and readiness. Nothing needs to be forced. The practice is to enter, receive, listen, and allow the intelligence of the field to meet what is present.",
      "The experience may feel gentle, intense, quiet or challenging depending on the moment. My role is to hold and accompany the space while each participant follows their own process.",
    ],
    facts: [
      { label: "Rhythm", value: "3 live sessions a month · Wednesdays, 19:30 CET" },
      { label: "Group", value: "Maximum 12 participants" },
      { label: "Membership", value: "Included for Whale and Eagle members" },
      { label: "On its own", value: "€35 per session" },
    ],
    includedIn: ["whale", "eagle"],
    rhythm: "3× a month · Wednesdays 19:30 CET",
    calendarKeywords: ["akawa"],
    offers: [
      {
        id: "practice-akawa-session",
        label: "Book a session",
        price: { kind: "one-time", amount: 35, currency: "EUR" },
        stripePriceEnv: "STRIPE_PRICE_AKAWA_SESSION",
        mode: "payment",
      },
    ],
    status: "active",
    order: 4,
  },
  {
    slug: "reclaiming-our-blood",
    title: "Reclaiming Our Blood",
    category: "practice",
    kind: "gathering",
    strapline: "The cave — a New Moon gathering inside The Wolf Wisdom.",
    summary:
      "A women-only New Moon gathering dedicated to reconnecting with the intelligence of the womb, the blood and the body.",
    description: [
      "Reclaiming Our Blood is a women-only New Moon gathering dedicated to reconnecting with the intelligence of the womb, the blood and the body.",
      "Each gathering explores a different archetype or womb-related theme, informed by what is alive in the season, the lunar cycle, the astrological landscape and the field of the group. The aim is not to impose one symbolic system on the body, but to use these lenses as invitations into deeper listening.",
      "When experiences of the womb are not consciously met, they can be carried as tension, numbness, inflammation or disconnection. This space exists to meet what is ready to move — through stillness, awareness, energetic work and optional sharing.",
      "Over time, I want this to become a sisterhood: a cave inside the wider village of The Wolf Wisdom. A place where women can enter silence together, listen to the body, speak when there is something to say, and leave without having to perform intimacy.",
    ],
    facts: [
      { label: "Rhythm", value: "13 gatherings a year, aligned with the lunar cycle" },
      { label: "Length", value: "90 minutes · usually 19:30–21:00 CET" },
      { label: "Membership", value: "Included for women in every membership" },
      { label: "On its own", value: "First gathering free · then by donation, from €8" },
    ],
    lists: [
      {
        title: "Format",
        items: [
          "45 minutes of stillness, presence and awareness of the body.",
          "45 minutes of optional sharing — there is never an obligation to speak.",
          "Structured focus + intuitive work.",
          "Timing may vary to accommodate different time zones.",
        ],
      },
      {
        title: "Practical agreements",
        items: [
          "Arrive 10 minutes early; there is no admission once the session has begun.",
          "Sit or lie down comfortably, with the spine as straight as possible.",
          "Join from a space where you will not be disturbed.",
          "Confidentiality is essential.",
          "Sharing is optional and always respected.",
        ],
      },
    ],
    community: {
      label: "Join the WhatsApp group",
      href: "https://chat.whatsapp.com/BkpPi37or86883L8XPXoOF?mode=gi_t",
      note: "An admin-led, non-chatting group: dates, links and reminders for each gathering.",
    },
    eligibilityLabel: "Women only",
    includedIn: ["whale", "eagle"],
    inclusionNote: "For women members",
    rhythm: "Every New Moon · 19:30–21:00 CET",
    calendarKeywords: ["reclaiming our blood"],
    offers: [
      {
        id: "practice-reclaiming-our-blood",
        label: "Give & join",
        price: { kind: "donation", suggested: 8, currency: "EUR", firstFree: true },
        stripePriceEnv: "STRIPE_PRICE_ROB_DONATION",
        mode: "payment",
        eligibility: "I understand this is a women-only gathering.",
      },
    ],
    status: "active",
    order: 5,
  },
  {
    slug: "live-time-of-presence",
    title: "Live Time of Presence",
    category: "practice",
    kind: "practice",
    strapline: "Practising alongside, almost daily.",
    summary:
      "When I sit down for my own practice, I may open the space online and invite members to practise alongside me.",
    description: [
      "Almost every day, when I sit down for my own practice, I may open the space online and invite members to practise alongside me.",
      "The time varies. This is intentionally alive rather than a rigid scheduled class — sessions appear on the calendar at short notice, whenever the space opens.",
    ],
    facts: [
      { label: "Rhythm", value: "Almost daily · time varies" },
      { label: "Notice", value: "Short notice, shared with members" },
      { label: "Membership", value: "Included for Whale and Eagle members" },
    ],
    includedIn: ["whale", "eagle"],
    rhythm: "Almost daily · time varies · members only",
    calendarKeywords: ["time of presence"],
    offers: [],
    status: "active",
    order: 6,
  },
];

function visible(category?: ProgramCategory) {
  return programs
    .filter((p) => p.status !== "hidden" && (!category || p.category === category))
    .sort((a, b) => a.order - b.order);
}

export function getVisiblePrograms() {
  return visible("program");
}

export function getVisiblePractices() {
  return visible("practice");
}

export function getAllOfferings() {
  return visible();
}

export function getProgram(slug: string, category?: ProgramCategory) {
  const p = programs.find((x) => x.slug === slug);
  return p && p.status !== "hidden" && (!category || p.category === category) ? p : undefined;
}

export function offeringHref(p: Program) {
  return `/${p.category === "program" ? "programs" : "practices"}/${p.slug}`;
}

/** Shared across Houses rather than belonging to one — shown with the opal mark. */
export function isShared(p: Program) {
  return p.includedIn.length > 1;
}

/** Included in membership with no standalone way to join, e.g. Live Time of Presence. */
export function isMembersOnly(p: Program) {
  return p.offers.length === 0 && p.includedIn.length > 0;
}

export function matchOffering(text: string) {
  const t = text.toLowerCase();
  return programs.find((p) => p.status !== "hidden" && p.calendarKeywords?.some((k) => t.includes(k)));
}
