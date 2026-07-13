"use client";

import { useActionState, useEffect } from "react";
import { saveGalleryItemAction, type MutationState } from "@/app/admin/actions";
import { TextAreaField, TextField } from "@/components/admin/FormField";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type { GalleryItem } from "@/lib/types";

const initialState: MutationState = {};

export default function GalleryItemForm({
  item,
  disabled,
  onDone,
}: {
  item?: GalleryItem;
  disabled: boolean;
  onDone: () => void;
}) {
  const [state, formAction, pending] = useActionState(saveGalleryItemAction, initialState);

  useEffect(() => {
    if (state.success) onDone();
  }, [state.success, onDone]);

  return (
    <form action={formAction} className="grid gap-3 sm:grid-cols-2">
      {item && <input type="hidden" name="id" value={item.id} />}
      <input type="hidden" name="current_image_url" value={item?.image_url ?? ""} />

      <TextField label="Cím" name="title" defaultValue={item?.title} required />
      <TextField label="Kategória" name="category" defaultValue={item?.category} placeholder="pl. japán" />
      <TextField label="Korszak" name="era" defaultValue={item?.era} placeholder="pl. 1970s" />
      <TextField
        label="Sorrend"
        name="sort_order"
        type="number"
        defaultValue={String(item?.sort_order ?? 0)}
      />
      <TextAreaField label="Leírás (angol)" name="description" defaultValue={item?.description} rows={3} />
      <TextAreaField
        label="Leírás (magyar)"
        name="description_hu"
        defaultValue={item?.description_hu ?? ""}
        rows={3}
      />
      <ImageUploadField label="Fénykép" name="image" currentImageUrl={item?.image_url} />

      {state.error && <p className="text-sm font-semibold text-rust-dark sm:col-span-2">{state.error}</p>}

      <div className="flex gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={disabled || pending}
          className="font-display border-2 border-rust-dark bg-rust px-4 py-2 text-cream transition-colors hover:bg-rust-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Mentés..." : "Mentés"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="font-display border-2 border-espresso px-4 py-2 text-espresso transition-colors hover:bg-espresso hover:text-cream"
        >
          Mégse
        </button>
      </div>
    </form>
  );
}
