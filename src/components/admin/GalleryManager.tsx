"use client";

import { useState } from "react";
import Image from "next/image";
import { deleteGalleryItemAction } from "@/app/admin/actions";
import DeleteButton from "@/components/admin/DeleteButton";
import GalleryItemForm from "@/components/admin/GalleryItemForm";
import type { GalleryItem } from "@/lib/types";

export default function GalleryManager({ items, disabled }: { items: GalleryItem[]; disabled: boolean }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  return (
    <div className="mt-4 space-y-3">
      {items.map((item) => (
        <div key={item.id} className="border-2 border-espresso bg-cream p-4">
          {editingId === item.id ? (
            <GalleryItemForm item={item} disabled={disabled} onDone={() => setEditingId(null)} />
          ) : (
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden border border-espresso">
                <Image src={item.image_url} alt={item.title} fill sizes="80px" className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-display text-lg leading-tight text-espresso">{item.title}</p>
                <p className="text-xs text-ink/60">
                  {item.era} &middot; {item.category}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingId(item.id)}
                className="text-sm font-semibold text-espresso underline"
              >
                Szerkesztés
              </button>
              <DeleteButton
                id={item.id}
                action={deleteGalleryItemAction}
                disabled={disabled}
                label="ezt a motorkerékpárt"
              />
            </div>
          )}
        </div>
      ))}

      {adding ? (
        <div className="border-2 border-dashed border-espresso p-4">
          <GalleryItemForm disabled={disabled} onDone={() => setAdding(false)} />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          disabled={disabled}
          className="font-display border-2 border-espresso px-4 py-2 text-espresso transition-colors hover:bg-espresso hover:text-cream disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Motorkerékpár hozzáadása
        </button>
      )}
    </div>
  );
}
