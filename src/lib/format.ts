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
    case "donation":
      return { amount: "By donation" };
    case "member-pricing":
      return { amount: "Member pricing" };
    case "tbc":
      return { amount: "Pricing to be announced" };
  }
}

export function formatPriceInline(price: Price) {
  const { amount, suffix } = formatPrice(price);
  return suffix ? `${amount} ${suffix}` : amount;
}

export function formatEventDate(iso: string, timeZone = "Europe/Dublin") {
  const d = new Date(iso);
  return {
    day: new Intl.DateTimeFormat("en-GB", { day: "2-digit", timeZone }).format(d),
    month: new Intl.DateTimeFormat("en-GB", { month: "short", timeZone }).format(d),
    weekday: new Intl.DateTimeFormat("en-GB", { weekday: "long", timeZone }).format(d),
    time: new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone,
      timeZoneName: "short",
    }).format(d),
  };
}
