"use client";

import Link from "next/link";
import { useState } from "react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locale";
import type { SiteSettings } from "@/lib/types";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function SiteHeader({ locale, settings }: { locale: Locale; settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const dict = getDictionary(locale);
  const prefix = locale === "en" ? "/en" : "";

  const navLinks = [
    { href: `${prefix}/`, label: dict.nav.home },
    { href: `${prefix}/gallery`, label: dict.nav.gallery },
    { href: `${prefix}/events`, label: dict.nav.events },
    { href: `${prefix}/about`, label: dict.nav.about },
    { href: `${prefix}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b-4 border-espresso bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href={prefix || "/"} className="font-display text-2xl tracking-wide text-espresso sm:text-3xl">
          {settings.museum_name}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-lg tracking-wide text-espresso transition-colors hover:text-rust"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher locale={locale} />
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher locale={locale} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-1.5"
            aria-label={dict.nav.toggleMenu}
            aria-expanded={open}
          >
            <span className="h-0.5 w-7 bg-espresso" />
            <span className="h-0.5 w-7 bg-espresso" />
            <span className="h-0.5 w-7 bg-espresso" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t-2 border-espresso bg-cream px-5 py-3 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display py-2 text-lg tracking-wide text-espresso"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
