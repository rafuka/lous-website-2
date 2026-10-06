import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { Price } from "@/content/types";
import { formatPrice } from "@/lib/format";

export function Section({
  tone = "light",
  className = "",
  children,
  ...rest
}: { tone?: "light" | "dark"; className?: string; children: ReactNode } & ComponentProps<"section">) {
  return (
    <section className={`tone-${tone} ${className}`} {...rest}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow text-muted ${className}`}>{children}</p>;
}

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Section tone="dark" className="pb-20 pt-24 md:pb-28 md:pt-32">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="display mt-6 max-w-4xl animate-rise text-6xl md:text-8xl">{title}</h1>
      {children && <div className="text-muted mt-8 max-w-2xl text-lg leading-relaxed">{children}</div>}
    </Section>
  );
}

export function PriceTag({ price, size = "lg" }: { price: Price; size?: "lg" | "sm" }) {
  const { amount, suffix } = formatPrice(price);
  const isNumber = price.kind === "recurring" || price.kind === "one-time";
  return (
    <p className="flex items-baseline gap-2">
      <span className={isNumber ? (size === "lg" ? "display text-5xl" : "display text-3xl") : "text-sm"}>
        {amount}
      </span>
      {suffix && <span className="text-muted text-sm">{suffix}</span>}
    </p>
  );
}

export function Pill({ children, accent }: { children: ReactNode; accent?: string }) {
  return (
    <span
      className="eyebrow inline-flex whitespace-nowrap items-center gap-2 rounded-full border border-line px-3 py-1.5 !text-[0.62rem]"
      style={accent ? { borderColor: accent } : undefined}
    >
      {accent && <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />}
      {children}
    </span>
  );
}

export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-3 text-sm ${className}`}>
      <span className="link-underline">{children}</span>
      <span aria-hidden className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
}) {
  const base = "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm transition-colors";
  const styles =
    variant === "solid"
      ? "bg-current [&>span]:text-[var(--btn-fg)]"
      : "border border-current hover:bg-current [&:hover>span]:text-[var(--btn-fg)]";
  return (
    <Link href={href} className={`${base} ${styles}`}>
      <span>{children}</span>
    </Link>
  );
}
