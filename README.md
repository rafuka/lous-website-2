# The Wolf Wisdom — Becoming Humans

Next.js 16 (App Router, Cache Components) + Tailwind v4. Black/white Yin/Yang base with living material — pearl/moonlight white, a deep "Nothingness" black holding colour, grain, restrained opal accents (`globals.css`). House colours used only as accents; the opal mark identifies experiences shared across Houses.

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
| `membership.ts` | The shared membership layer (Whale + Eagle): live sessions incl. Akawa, Live Time of Presence, Reclaiming Our Blood, 10% off Resonance Flow™ |
| `programs.ts` | Programs (`category: "program"` — Creative Flow, Chakra Series → `/programs/…`) and practices (`category: "practice"` — Practice Lab, Akawa, Reclaiming Our Blood, Live Time of Presence → `/practices/…`), with eligibility, inclusion, rhythm and calendar keywords |
| `sessions.ts` | Resonance Flow™ copy, prices and packages |
| `journeys.ts` | Retreats & residencies with status labels (`planned` / `exploring` + note) |
| `events.ts` | Fixed dates (24 Creative Flow sessions, 9 New Moon gatherings), shown until Google Calendar is connected |
| `entry-points.ts` | The "Find your way in" doorways |
| `site.ts` | Nav, global CTA, Four Houses umbrella sentence, founder section, contact email |

**House status:** `active` (price + Join button) · `evolving` (visible, marked "In development", "Keep me posted") · `hidden` (not rendered anywhere).

- **Activate Wolf or Dragon:** set `status: "active"`, add an `offer` and `includes`, set its `STRIPE_PRICE_*` env var.
- **Launch a multi-House bundle:** set `published: true` and add an `offer` in `bundles.ts`. The membership page swaps its "being designed" note for real options.
- **Add final artwork:** set `artwork: { src, alt }` on a House (put files in `public/houses/`). It replaces the generated vortex-eye placeholder everywhere.
- **Change palettes:** edit each House's `accent` once confirmed with the artist.

## Stripe (connect later)

1. Create Products/Prices in Stripe: Whale €40/mo, Eagle €40/mo, Creative Flow €30/mo, Practice Lab and Reclaiming Our Blood ("customer chooses price" donations, ROB minimum €8), Akawa €35, Resonance Flow 5-pack €570 and 10-pack €1,080, and the Chakra Series once its price is set.
2. Set `STRIPE_SECRET_KEY` and the `STRIPE_PRICE_*` IDs.
3. Add a webhook to `https://<domain>/api/stripe/webhook` (events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`) and set `STRIPE_WEBHOOK_SECRET`. Locally: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

Join buttons call the `startCheckout` server action (`src/app/actions/checkout.ts`), which creates a Checkout Session. Until Stripe is configured, they redirect to `/join/unavailable` ("register interest"). Offers with an `eligibility` statement (Whale, Creative Flow, Practice Lab) require a confirmation checkbox, and the confirmation is stored in the session/subscription metadata. Membership provisioning goes in the webhook `TODO`s once a member area exists.

## Google Calendar (connect later)

- **Calendar page** (`/calendar`, `/api/events`; `/events` redirects): create a Google Cloud service account, enable the Calendar API, share your calendar(s) with the service-account email, then set `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`, `GOOGLE_CALENDAR_PUBLIC_ID` and optionally `GOOGLE_CALENDAR_MEMBERS_ID`. Events are matched to an offering by title or tag (e.g. "Akawa", "Practice Lab", "Reclaiming Our Blood", "Live Time of Presence", see `calendarKeywords`), which supplies eligibility, inclusion, price and link. Tag `#whale #eagle #wolf #dragon` to override Houses; anything on the members calendar, tagged `#members`, or Live Time of Presence shows "Members only". Results are cached for a few minutes.
- **1:1 booking** (`/sessions`): set `NEXT_PUBLIC_GOOGLE_BOOKING_URL` to a Google Calendar appointment-schedule booking page and it is embedded on the page. Until then, the page shows an email enquiry button instead.
