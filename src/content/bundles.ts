import type { Bundle } from "./types";

/**
 * Multi-House memberships. Nothing is published yet — pricing and inclusions
 * are undecided. Flip `published` and add an `offer` to make one live.
 */
export const bundles: Bundle[] = [
  {
    id: "eagle-dragon",
    name: "Eagle + Dragon",
    houses: ["eagle", "dragon"],
    description: "Perspective and magic, held in one membership.",
    published: false,
  },
  {
    id: "whale-eagle",
    name: "Whale + Eagle",
    houses: ["whale", "eagle"],
    description: "Depth and perspective, for VortexHealing students.",
    published: false,
    eligibility: "I confirm I am a VortexHealing student.",
  },
  {
    id: "whale-dragon",
    name: "Whale + Dragon",
    houses: ["whale", "dragon"],
    description: "Depth and magic, for VortexHealing students.",
    published: false,
    eligibility: "I confirm I am a VortexHealing student.",
  },
];

export function getPublishedBundles() {
  return bundles.filter((b) => b.published);
}
