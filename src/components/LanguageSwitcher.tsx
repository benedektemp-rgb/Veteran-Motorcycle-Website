"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath } from "@/lib/i18n/locale";
import type { Locale } from "@/lib/i18n/locale";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  const options: { locale: Locale; label: string }[] = [
    { locale: "en", label: "EN" },
    { locale: "hu", label: "HU" },
  ];

  return (
    <div className="flex items-center gap-1 font-display text-sm tracking-wide">
      {options.map((option, index) => (
        <span key={option.locale} className="flex items-center gap-1">
          {index > 0 && <span className="text-espresso/40">/</span>}
          {option.locale === locale ? (
            <span className="text-rust">{option.label}</span>
          ) : (
            <Link href={localePath(pathname, option.locale)} className="text-espresso hover:text-rust">
              {option.label}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
