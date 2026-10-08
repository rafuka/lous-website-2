import "server-only";
import { houses } from "@/content/houses";
import { bundles } from "@/content/bundles";
import { programs } from "@/content/programs";
import { resonanceFlow } from "@/content/sessions";
import type { Offer } from "@/content/types";

/**
 * Every purchasable offer on the site, keyed by id. Only offers whose parent
 * is publicly purchasable are included, so unpublished bundles or evolving
 * Houses can never be checked out by crafting a request.
 */
function collectOffers(): Map<string, Offer> {
  const map = new Map<string, Offer>();
  for (const h of houses) if (h.status === "active" && h.offer) map.set(h.offer.id, h.offer);
  for (const b of bundles) if (b.published && b.offer) map.set(b.offer.id, b.offer);
  for (const p of programs) if (p.status === "active") for (const o of p.offers) map.set(o.id, o);
  for (const o of resonanceFlow.packages) map.set(o.id, o);
  return map;
}

export function getOffer(id: string): Offer | undefined {
  return collectOffers().get(id);
}

/** Stripe price ID for an offer, or undefined if not configured yet. */
export function resolveStripePrice(offer: Offer): string | undefined {
  if (!offer.stripePriceEnv) return undefined;
  const value = process.env[offer.stripePriceEnv];
  return value && value.startsWith("price_") ? value : undefined;
}

/** Whether an offer can actually be bought right now. */
export function isPurchasable(offer: Offer): boolean {
  return offer.price.kind !== "tbc" && offer.price.kind !== "members-only" && Boolean(process.env.STRIPE_SECRET_KEY) && Boolean(resolveStripePrice(offer));
}
