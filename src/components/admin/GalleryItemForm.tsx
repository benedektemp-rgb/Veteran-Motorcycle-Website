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

      <TextField label="Title" name="title" defaultValue={item?.title} required />
      <TextField label="Category" name="category" defaultValue={item?.category} placeholder="e.g. Japanese" />
      <TextField label="Era" name="era" defaultValue={item?.era} placeholder="e.g. 1970s" />
      <TextField
        label="Sort Order"
        name="sort_order"
        type="number"
        defaultValue={String(item?.sort_order ?? 0)}
      />
      <TextAreaField label="Description (English)" name="description" defaultValue={item?.description} rows={3} />
      <TextAreaField
        label="Description (Hungarian)"
        name="description_hu"
        defaultValue={item?.description_hu ?? ""}
        rows={3}
      />
      <ImageUploadField label="Photo" name="image" currentImageUrl={item?.image_url} />

      {state.error && <p className="text-sm font-semibold text-rust-dark sm:col-span-2">{state.error}</p>}

      <div className="flex gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={disabled || pending}
          className="font-display border-2 border-rust-dark bg-rust px-4 py-2 text-cream transition-colors hover:bg-rust-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="font-display border-2 border-espresso px-4 py-2 text-espresso transition-colors hover:bg-espresso hover:text-cream"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
