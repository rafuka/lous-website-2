import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

/**
 * Stripe webhook endpoint: POST /api/stripe/webhook
 *
 * Set STRIPE_WEBHOOK_SECRET from the Stripe dashboard (or `stripe listen`).
 * The handlers below are where membership provisioning will go once a member
 * area / database exists (e.g. grant House access, add to calendar invites,
 * send a welcome email).
 */
export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return Response.json({ error: "Stripe is not configured" }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) return Response.json({ error: "Missing signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await request.text(), signature, secret);
  } catch (err) {
    console.error("[stripe] signature verification failed", err);
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      // TODO: grant access for session.metadata?.offer_id to session.customer
      console.info("[stripe] checkout completed", session.id, session.metadata?.offer_id);
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      // TODO: update or revoke House access based on subscription.status
      console.info("[stripe]", event.type, subscription.id, subscription.status);
      break;
    }
    case "invoice.payment_failed": {
      // TODO: notify member / mark membership as at-risk
      console.info("[stripe] payment failed", event.data.object.id);
      break;
    }
  }

  return Response.json({ received: true });
}
