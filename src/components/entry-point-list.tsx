import Link from "next/link";
import { entryPoints } from "@/content/entry-points";

/** The ways into the school, from ongoing membership to single experiences. */
export function EntryPointList() {
  return (
    <ol className="divide-y divide-line-light border-y border-line">
      {entryPoints.map((p, i) => (
        <li key={p.href}>
          <Link href={p.href} className="group grid gap-4 py-10 md:grid-cols-12 md:items-baseline">
            <span className="eyebrow text-muted md:col-span-1">0{i + 1}</span>
            <span className="display text-4xl md:col-span-4 md:text-5xl">{p.title}</span>
            <span className="md:col-span-6">
              <span className="block leading-relaxed">{p.logic}</span>
              <span className="text-muted mt-1 block text-sm">{p.examples}</span>
            </span>
            <span aria-hidden className="text-right transition-transform group-hover:translate-x-1 md:col-span-1">
              →
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
