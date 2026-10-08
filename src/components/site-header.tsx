"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Mark } from "./mark";

type NavItem = { href: string; label: string };

export function SiteHeader({ name, nav, cta }: { name: string; nav: NavItem[]; cta: NavItem }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <header className="tone-dark sticky top-0 z-50 border-b border-line">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label={`${name} — home`}>
          <Mark className="h-7 w-7" />
          <span className="eyebrow">{name}</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`link-underline text-sm ${active ? "opacity-100" : "opacity-70 hover:opacity-100"}`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={cta.href}
            className="rounded-full border border-paper/60 px-5 py-2 text-sm transition-colors hover:bg-paper hover:text-ink"
          >
            {cta.label}
          </Link>
        </nav>

        <button
          type="button"
          className="eyebrow lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-line px-6 pb-10 pt-6 lg:hidden" aria-label="Mobile">
          <ul className="space-y-5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="display text-4xl">
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Link href={cta.href} className="inline-block rounded-full bg-paper px-6 py-3 text-sm text-ink">
                {cta.label}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
