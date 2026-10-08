import { cacheLife } from "next/cache";
import Link from "next/link";
import { getVisibleHouses } from "@/content/houses";
import { site } from "@/content/site";
import { Mark } from "./mark";

export function SiteFooter() {
  const houses = getVisibleHouses();
  return (
    <footer className="tone-dark border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-12 lg:px-10">
        <div className="md:col-span-5">
          <Mark className="h-10 w-10" />
          <p className="display mt-8 text-4xl">{site.school}</p>
          <p className="text-muted mt-3 max-w-sm">{site.tagline}</p>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow text-muted">Houses</p>
          <ul className="mt-5 space-y-3 text-sm">
            {houses.map((h) => (
              <li key={h.slug}>
                <Link href={`/houses/${h.slug}`} className="link-underline">
                  {h.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow text-muted">The work</p>
          <ul className="mt-5 space-y-3 text-sm">
            {site.nav
              .filter((n) => n.href !== "/houses")
              .map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-underline">
                    {n.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow text-muted">Contact</p>
          <a href={`mailto:${site.contactEmail}`} className="link-underline mt-5 inline-block text-sm">
            {site.contactEmail}
          </a>
          <Link href={site.cta.href} className="link-underline mt-3 block w-fit text-sm">
            {site.cta.label} →
          </Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 border-t border-line px-6 py-6 text-xs lg:px-10">
        <span className="text-muted">
          © <CurrentYear /> {site.name}
        </span>
        <span className="text-muted">VortexHealing® is a registered trademark of its respective owner.</span>
      </div>
    </footer>
  );
}

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
