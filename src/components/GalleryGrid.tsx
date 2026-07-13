"use client";

import { useMemo, useState } from "react";
import GalleryCard from "@/components/GalleryCard";
import type { GalleryItem } from "@/lib/types";

export default function GalleryGrid({
  items,
  allLabel,
  emptyLabel,
}: {
  items: GalleryItem[];
  allLabel: string;
  emptyLabel: string;
}) {
  const eras = useMemo(() => [allLabel, ...Array.from(new Set(items.map((i) => i.era)))], [items, allLabel]);
  const [activeEra, setActiveEra] = useState(allLabel);

  const filtered = activeEra === allLabel ? items : items.filter((item) => item.era === activeEra);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
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
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>

      {filtered.length === 0 && <p className="mt-10 text-center text-ink/60">{emptyLabel}</p>}
    </div>
  );
}
