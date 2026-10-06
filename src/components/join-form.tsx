import { startCheckout } from "@/app/actions/checkout";
import type { Offer } from "@/content/types";

/**
 * Join / book button. Posts to the checkout server action, which redirects to
 * Stripe Checkout (or to a "register interest" page until Stripe is set up).
 * Offers with an eligibility statement require an explicit confirmation.
 */
export function JoinForm({ offer, label = "Join", full = false }: { offer: Offer; label?: string; full?: boolean }) {
  return (
    <form action={startCheckout} className="space-y-4">
      <input type="hidden" name="offerId" value={offer.id} />
      {offer.eligibility && (
        <label className="flex cursor-pointer items-start gap-3 text-sm">
          <input type="checkbox" name="eligible" value="yes" required className="mt-1 h-4 w-4 accent-current" />
          <span className="text-muted">{offer.eligibility}</span>
        </label>
      )}
      <button
        type="submit"
        className={`rounded-full border border-current px-6 py-3 text-sm transition-colors hover:bg-current [&:hover>span]:text-[var(--btn-fg)] ${full ? "w-full" : ""}`}
      >
        <span>{label}</span>
      </button>
    </form>
  );
}
