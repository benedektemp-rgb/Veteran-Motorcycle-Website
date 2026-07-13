"use client";

import { useActionState, useEffect } from "react";
import { saveEventAction, type MutationState } from "@/app/admin/actions";
import { TextAreaField, TextField } from "@/components/admin/FormField";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type { MuseumEvent } from "@/lib/types";

const initialState: MutationState = {};

export default function EventForm({
  event,
  disabled,
  onDone,
}: {
  event?: MuseumEvent;
  disabled: boolean;
  onDone: () => void;
}) {
  const [state, formAction, pending] = useActionState(saveEventAction, initialState);

  useEffect(() => {
    if (state.success) onDone();
  }, [state.success, onDone]);

  return (
    <form action={formAction} className="grid gap-3 sm:grid-cols-2">
      {event && <input type="hidden" name="id" value={event.id} />}
      <input type="hidden" name="current_image_url" value={event?.image_url ?? ""} />

      <TextField label="Cím (angol)" name="title" defaultValue={event?.title} required />
      <TextField label="Cím (magyar)" name="title_hu" defaultValue={event?.title_hu ?? ""} />
      <TextField label="Dátum" name="event_date" type="date" defaultValue={event?.event_date} required />
      <TextField label="Helyszín" name="location" defaultValue={event?.location} />
      <TextAreaField label="Leírás (angol)" name="description" defaultValue={event?.description} rows={3} />
      <TextAreaField
        label="Leírás (magyar)"
        name="description_hu"
        defaultValue={event?.description_hu ?? ""}
        rows={3}
      />
      <ImageUploadField label="Fénykép" name="image" currentImageUrl={event?.image_url} />

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
