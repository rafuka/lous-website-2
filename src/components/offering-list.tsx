import Link from "next/link";
import { houseName } from "@/content/houses";
import { isMembersOnly, isShared, offeringHref } from "@/content/programs";
import type { Program } from "@/content/types";
import { formatPriceInline } from "@/lib/format";
import { CategoryMark, Pill } from "./ui";

/** Programs or practices as an editorial list: what, who for, how to join. */
export function OfferingList({ items }: { items: Program[] }) {
  return (
    <ul className="divide-y divide-line-light border-y border-line">
      {items.map((p) => (
        <li key={p.slug}>
          <Link href={offeringHref(p)} className="group grid gap-6 py-12 md:grid-cols-12 md:items-baseline">
            <p className="eyebrow text-muted md:col-span-2">{p.rhythm?.split(" · ")[0] ?? p.kind}</p>
            <div className="md:col-span-6">
              <h2 className="display text-4xl md:text-5xl">{p.title}</h2>
              <p className="text-muted mt-3 leading-relaxed">{p.summary}</p>
            </div>
            <div className="space-y-3 text-sm md:col-span-3">
              <p>{p.offers[0] ? formatPriceInline(p.offers[0].price) : isMembersOnly(p) ? "Members only" : ""}</p>
              {p.eligibilityLabel && <Pill>{p.eligibilityLabel}</Pill>}
              {p.includedIn.length > 0 && (
                <p className="text-muted flex items-center gap-2">
                  {isShared(p) && <CategoryMark shared />}
                  Included in {p.includedIn.map(houseName).join(" & ")}
                  {p.inclusionNote ? ` · ${p.inclusionNote.toLowerCase()}` : ""}
                </p>
              )}
            </div>
            <span aria-hidden className="text-right transition-transform group-hover:translate-x-1 md:col-span-1">
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
