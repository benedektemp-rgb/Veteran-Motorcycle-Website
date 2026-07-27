"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { deleteGalleryItemAction, resetGalleryAction, type MutationState } from "@/app/admin/actions";
import DeleteButton from "@/components/admin/DeleteButton";
import GalleryItemForm from "@/components/admin/GalleryItemForm";
import QrCodeButton from "@/components/admin/QrCodeButton";
import type { GalleryItem } from "@/lib/types";

const initialResetState: MutationState = {};

export default function GalleryManager({ items, disabled }: { items: GalleryItem[]; disabled: boolean }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [resetState, resetAction, resetPending] = useActionState(resetGalleryAction, initialResetState);

  return (
    <div className="mt-4 space-y-3">
      {items.length > 0 && (
        <div className="flex flex-col items-end gap-1">
          <form
            action={resetAction}
            onSubmit={(event) => {
              if (
                !confirm(
                  "Biztosan törli az ÖSSZES motorkerékpárt és fényképet a galériából? Ez a lista minden elemét véglegesen eltávolítja, és nem vonható vissza."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button
              type="submit"
              disabled={disabled || resetPending}
              className="text-xs font-semibold text-rust-dark underline disabled:cursor-not-allowed disabled:opacity-50"
            >
              {resetPending ? "Törlés folyamatban..." : "Galéria törlése (összes motorkerékpár és fénykép)"}
            </button>
          </form>
          {resetState.error && <p className="text-xs font-semibold text-rust-dark">{resetState.error}</p>}
        </div>
      )}

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
              <QrCodeButton path={`/gallery/${item.id}`} label={item.title} />
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
