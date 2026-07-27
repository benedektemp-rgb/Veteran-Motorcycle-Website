"use client";

import { useMemo, useState } from "react";
import GalleryCard from "@/components/GalleryCard";
import type { GalleryItem } from "@/lib/types";
import type { Locale } from "@/lib/i18n/locale";

export default function GalleryGrid({
  items,
  locale,
  allLabel,
  emptyLabel,
  searchPlaceholder,
  noResultsLabel,
}: {
  items: GalleryItem[];
  locale: Locale;
  allLabel: string;
  emptyLabel: string;
  searchPlaceholder: string;
  noResultsLabel: string;
}) {
  const eras = useMemo(() => [allLabel, ...Array.from(new Set(items.map((i) => i.era)))], [items, allLabel]);
  const [activeEra, setActiveEra] = useState(allLabel);
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();

  const filtered = items.filter((item) => {
    const matchesEra = activeEra === allLabel || item.era === activeEra;
    const matchesSearch =
      query.length === 0 ||
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);
    return matchesEra && matchesSearch;
  });

  return (
    <div>
      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder={searchPlaceholder}
        className="w-full max-w-sm border-2 border-espresso bg-cream px-3 py-2 text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-rust"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {eras.map((era) => (
          <button
            key={era}
            type="button"
            onClick={() => setActiveEra(era)}
            className={`font-display rounded-sm border-2 border-espresso px-4 py-1.5 text-sm tracking-wide transition-colors ${
              activeEra === era ? "bg-espresso text-cream" : "bg-cream text-espresso hover:bg-espresso/10"
            }`}
          >
            {era}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <GalleryCard key={item.id} item={item} locale={locale} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-ink/60">{query.length > 0 ? noResultsLabel : emptyLabel}</p>
      )}
    </div>
  );
}
