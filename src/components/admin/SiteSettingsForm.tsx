"use client";

import { useActionState } from "react";
import { updateSiteSettingsAction, type MutationState } from "@/app/admin/actions";
import { TextAreaField, TextField } from "@/components/admin/FormField";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type { SiteSettings } from "@/lib/types";

const initialState: MutationState = {};

export default function SiteSettingsForm({
  settings,
  disabled,
}: {
  settings: SiteSettings;
  disabled: boolean;
}) {
  const [state, formAction, pending] = useActionState(updateSiteSettingsAction, initialState);

  return (
    <form action={formAction} className="mt-4 grid gap-4 border-2 border-espresso bg-cream p-6 sm:grid-cols-2">
      <input type="hidden" name="current_hero_image_url" value={settings.hero_image_url} />

      <TextField label="Múzeum neve" name="museum_name" defaultValue={settings.museum_name} required />
      <div className="sm:col-span-2 grid gap-4 sm:grid-cols-2">
        <TextField label="Szlogen (angol)" name="tagline" defaultValue={settings.tagline} />
        <TextField label="Szlogen (magyar)" name="tagline_hu" defaultValue={settings.tagline_hu ?? ""} />
      </div>
      <TextField label="Cím" name="address" defaultValue={settings.address} />
      <TextField label="Telefon" name="phone" defaultValue={settings.phone} />
      <TextField label="E-mail" name="email" defaultValue={settings.email} />
      <TextField label="Facebook link" name="facebook_url" defaultValue={settings.facebook_url} />
      <TextField label="Instagram link" name="instagram_url" defaultValue={settings.instagram_url} />
      <TextField label="YouTube link" name="youtube_url" defaultValue={settings.youtube_url} />
      <TextAreaField label="Leírás (angol)" name="about_text" defaultValue={settings.about_text} rows={5} />
      <TextAreaField
        label="Leírás (magyar)"
        name="about_text_hu"
        defaultValue={settings.about_text_hu ?? ""}
        rows={5}
      />
      <ImageUploadField label="Fejléc kép" name="image" currentImageUrl={settings.hero_image_url} />

      {state.error && <p className="text-sm font-semibold text-rust-dark sm:col-span-2">{state.error}</p>}
      {state.success && <p className="text-sm font-semibold text-olive sm:col-span-2">Mentve.</p>}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={disabled || pending}
          className="font-display border-2 border-rust-dark bg-rust px-6 py-2.5 text-lg tracking-wide text-cream transition-colors hover:bg-rust-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Mentés..." : "Beállítások mentése"}
        </button>
      </div>
    </form>
  );
}
