import type { Journey } from "./types";

/**
 * In-person retreats and residencies under the Becoming Humans philosophy.
 * Each explores a different aspect of human life; they need not be linked.
 * Status labels keep exploratory projects from reading as confirmed bookings.
 */
export const journeys: Journey[] = [
  {
    slug: "ireland-2027",
    place: "Europe / Ireland",
    when: "May 2027",
    title: "The Creative Human",
    theme: "Creativity",
    description:
      "The physical culmination of Unlock Your Creative Flow — an optional gathering in Europe to bring six months of practice into the body, the land and each other.",
    status: "planned",
    note: "Dates TBC",
    relatedProgram: "unlock-your-creative-flow",
  },
  {
    slug: "bali-2027",
    place: "Bali",
    when: "July 2027",
    title: "The Embodied Human",
    theme: "Embodiment",
    description:
      "An embodiment-oriented retreat connected to the Chakra work — living the body's centres rather than studying them.",
    status: "exploring",
    note: "Dates TBC",
    relatedProgram: "chakra-series",
  },
  {
    slug: "mount-shasta-2027",
    place: "Mount Shasta",
    when: "August 2027",
    title: "On the Mountain",
    theme: "To be revealed",
    description: "A possible co-facilitated gathering. Its shape and content remain intentionally open.",
    status: "exploring",
    note: "Collaboration TBC",
  },
  {
    slug: "awaken-the-master-within",
    place: "Greece (or Montenegro)",
    when: "Around October 2027",
    title: "Awaken the Master Within",
    theme: "Integrated human potential",
    description:
      "Inspired by Leonardo da Vinci: curiosity, art, science, observation, imagination, experimentation and mastery. A retreat that may grow into a month-long residency.",
    status: "exploring",
    note: "May become a month-long residency",
  },
];

const statusLabels: Record<Journey["status"], string> = {
  planned: "Planned",
  exploring: "In exploration",
  open: "Booking open",
  past: "Past",
};

export function journeyStatus(j: Journey) {
  return j.note ? `${statusLabels[j.status]} · ${j.note}` : statusLabels[j.status];
}
