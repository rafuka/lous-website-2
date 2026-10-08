import type { Price } from "@/content/types";

const currencyFormat = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);

export function formatPrice(price: Price): { amount: string; suffix?: string } {
  switch (price.kind) {
    case "recurring":
      return { amount: currencyFormat(price.amount, price.currency), suffix: `/ ${price.interval}` };
    case "one-time":
      return { amount: currencyFormat(price.amount, price.currency) };
    case "donation": {
      const from = price.suggested ? ` from ${currencyFormat(price.suggested, price.currency ?? "EUR")}` : "";
      return { amount: price.firstFree ? `First free · then by donation${from}` : `By donation${from}` };
    }
    case "member-pricing":
      return { amount: "Member pricing" };
    case "members-only":
      return { amount: "Members only" };
    case "tbc":
      return { amount: "Pricing to be announced" };
  }
}

export function formatPriceInline(price: Price) {
  const { amount, suffix } = formatPrice(price);
  return suffix ? `${amount} ${suffix}` : amount;
}

export function formatEventDate(iso: string, timeZone = "Europe/Brussels") {
  const d = new Date(iso);
  return {
    day: new Intl.DateTimeFormat("en-GB", { day: "2-digit", timeZone }).format(d),
    month: new Intl.DateTimeFormat("en-GB", { month: "short", timeZone }).format(d),
    weekday: new Intl.DateTimeFormat("en-GB", { weekday: "long", timeZone }).format(d),
    monthYear: new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone }).format(d),
    time: new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone,
      timeZoneName: "short",
    }).format(d),
  };
}

/** "10:00–12:00 CET" in the site time zone. */
export function formatTimeRange(start: string, end?: string, timeZone = "Europe/Brussels") {
  const hm = (iso: string) =>
    new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone }).format(new Date(iso));
  const zone =
    new Intl.DateTimeFormat("en-GB", { timeZone, timeZoneName: "short" })
      .formatToParts(new Date(start))
      .find((p) => p.type === "timeZoneName")?.value ?? "";
  const label = zone === "GMT+1" ? "CET" : zone === "GMT+2" ? "CEST" : zone;
  return `${hm(start)}${end ? `–${hm(end)}` : ""} ${label}`.trim();
}
