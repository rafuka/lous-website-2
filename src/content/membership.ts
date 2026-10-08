import type { HouseSlug, Inclusion } from "./types";

/**
 * The shared membership layer. Membership is an ongoing way of practising
 * inside The Wolf Wisdom, not a list of discounts. These experiences belong to
 * every active House; each House then adds what is specific to it.
 *
 * Shared-session principle: sessions hosted across The Wolf Wisdom are not
 * artificially split between Houses to make each membership look fuller.
 */
export const sharedMembership: { houses: HouseSlug[]; intro: string; includes: Inclusion[] } = {
  houses: ["whale", "eagle"],
  intro:
    "Some experiences belong to a single House. Others are shared: sessions I host across The Wolf Wisdom are open to members of every House, rather than divided up to make each membership look fuller.",
  includes: [
    {
      title: "Live sessions across The Wolf Wisdom",
      detail: "Access to eligible live sessions I host across the school, including Akawa.",
    },
    {
      title: "Live Time of Presence",
      detail:
        "Almost daily. When I sit down for my own practice, I may open the space online and invite members to practise alongside me. The time varies — intentionally alive rather than a rigid class.",
    },
    {
      title: "Reclaiming Our Blood",
      detail: "The New Moon gathering, included for women members of every House.",
      audienceNote: "For women members",
    },
    {
      title: "10% off Resonance Flow™",
      detail: "Individual 1:1 sessions at €108 instead of €120.",
    },
    {
      title: "Members-only gatherings",
      detail: "Spontaneous gatherings as they arise, and member pricing where it applies.",
    },
  ],
};
