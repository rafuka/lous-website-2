# The Wolf Wisdom — Becoming Humans

Next.js 16 (App Router, Cache Components) + Tailwind v4. Monochrome Yin/Yang base; House colours used only as accents.

```bash
cp .env.example .env.local   # everything is optional — the site runs with no env vars
npm run dev
```

## Editing content (the "CMS")

All copy, prices and publish states live in `src/content/` — pages never hard-code them.

| File | What it controls |
| --- | --- |
| `houses.ts` | The Four Houses: copy, `status`, price/offer, inclusions, standalone alternatives, accent colour, artwork |
| `bundles.ts` | Multi-House (Wolf / pack) memberships — all `published: false` for now |
| `programs.ts` | Creative Flow, Practice Lab, Chakra Series (standalone work) |
| `journeys.ts` | Retreats & residencies (Ireland, Bali, Shasta, Greece) |
| `events.ts` | Fallback events shown until Google Calendar is connected |
| `site.ts` | Nav, contact email, "Member pricing" wording |

**House status:** `active` (price + Join button) · `evolving` (visible, marked "In development", "Keep me posted") · `hidden` (not rendered anywhere).

- **Activate Wolf or Dragon:** set `status: "active"`, add an `offer` and `includes`, set its `STRIPE_PRICE_*` env var.
- **Launch a multi-House bundle:** set `published: true` and add an `offer` in `bundles.ts`. The membership page swaps its "being designed" note for real options.
- **Add final artwork:** set `artwork: { src, alt }` on a House (put files in `public/houses/`). It replaces the generated vortex-eye placeholder everywhere.
- **Change palettes:** edit each House's `accent` once confirmed with the artist.

## Stripe (connect later)

1. Create Products/Prices in Stripe: Whale €40/mo, Eagle €40/mo, Creative Flow €30/mo, Practice Lab ("customer chooses price" for donations), and the Chakra Series once its price is set.
2. Set `STRIPE_SECRET_KEY` and the `STRIPE_PRICE_*` IDs.
3. Add a webhook to `https://<domain>/api/stripe/webhook` (events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`) and set `STRIPE_WEBHOOK_SECRET`. Locally: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

Join buttons call the `startCheckout` server action (`src/app/actions/checkout.ts`), which creates a Checkout Session. Until Stripe is configured, they redirect to `/join/unavailable` ("register interest"). Offers with an `eligibility` statement (Whale, Creative Flow, Practice Lab) require a confirmation checkbox, and the confirmation is stored in the session/subscription metadata. Membership provisioning goes in the webhook `TODO`s once a member area exists.

## Google Calendar (connect later)

- **Events page** (`/events`, `/api/events`): create a Google Cloud service account, enable the Calendar API, share your calendar(s) with the service-account email, then set `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`, `GOOGLE_CALENDAR_PUBLIC_ID` and optionally `GOOGLE_CALENDAR_MEMBERS_ID`. Tag events with `#whale #eagle #wolf #dragon` in the description; anything on the members calendar, or tagged `#members`, shows a "Members only" label. Results are cached for a few minutes.
- **1:1 booking** (`/sessions`): set `NEXT_PUBLIC_GOOGLE_BOOKING_URL` to a Google Calendar appointment-schedule booking page and it is embedded on the page. Until then, the page shows an email enquiry button instead.
