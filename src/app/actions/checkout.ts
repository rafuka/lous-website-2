"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getOffer, isPurchasable, resolveStripePrice } from "@/lib/offers";
import { getStripe } from "@/lib/stripe";

/**
 * Starts a Stripe Checkout Session for an offer and redirects to it.
 * When Stripe or the price isn't configured yet, sends the visitor to a
 * friendly "register interest" page instead of failing.
 */
export async function startCheckout(formData: FormData) {
  const offerId = String(formData.get("offerId") ?? "");
  const offer = getOffer(offerId);
  if (!offer) redirect("/membership");

  if (offer.eligibility && formData.get("eligible") !== "yes") {
    redirect(`/join/unavailable?offer=${encodeURIComponent(offer.id)}&reason=eligibility`);
  }

  const stripe = getStripe();
  const price = resolveStripePrice(offer);
  if (!stripe || !price || !isPurchasable(offer)) {
    redirect(`/join/unavailable?offer=${encodeURIComponent(offer.id)}`);
  }

  const h = await headers();
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host")}`;
  const mode = offer.mode ?? (offer.price.kind === "recurring" ? "subscription" : "payment");
  const metadata = {
    offer_id: offer.id,
    eligibility_confirmed: offer.eligibility ? "yes" : "n/a",
  };

  const session = await stripe.checkout.sessions.create({
    mode,
    line_items: [{ price, quantity: 1 }],
    success_url: `${origin}/join/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/join/cancelled?offer=${encodeURIComponent(offer.id)}`,
    allow_promotion_codes: true,
    metadata,
    ...(mode === "subscription"
      ? { subscription_data: { metadata } }
      : { payment_intent_data: { metadata }, customer_creation: "always" as const }),
  });

  if (!session.url) redirect(`/join/unavailable?offer=${encodeURIComponent(offer.id)}`);
  redirect(session.url);
}
