"use server";

import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { clearSessionCookie, createSessionToken, getSession, setSessionCookie } from "@/lib/auth";
import { getSupabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase-admin";

export type LoginState = { error?: string };

function revalidatePublicPages() {
  revalidatePath("/", "layout");
  revalidatePath("/gallery");
  revalidatePath("/events");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/en", "layout");
  revalidatePath("/en/gallery");
  revalidatePath("/en/events");
  revalidatePath("/en/about");
  revalidatePath("/en/contact");
  revalidatePath("/admin");
}

async function requireSession() {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }
}

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const username = formData.get("username")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminUsername || !adminPasswordHash) {
    return {
      error: "Az admin bejelentkezés még nincs beállítva a szerveren (hiányzik az ADMIN_USERNAME / ADMIN_PASSWORD_HASH).",
    };
  }

  if (username !== adminUsername) {
    return { error: "Hibás felhasználónév vagy jelszó." };
  }

  const valid = await bcrypt.compare(password, adminPasswordHash);
  if (!valid) {
    return { error: "Hibás felhasználónév vagy jelszó." };
  }

  const token = await createSessionToken(username);
  await setSessionCookie(token);
  redirect("/admin");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

async function uploadImageIfProvided(formData: FormData, fallbackUrl: string): Promise<string> {
  const file = formData.get("image") as File | null;
  if (!file || file.size === 0) return fallbackUrl;

  const admin = getSupabaseAdmin();
  if (!admin) return fallbackUrl;

  const extension = file.name.split(".").pop() || "jpg";
  const path = `${randomUUID()}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await admin.storage.from("media").upload(path, buffer, {
    contentType: file.type || "image/jpeg",
    upsert: false,
  });
  if (error) return fallbackUrl;

  const { data } = admin.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

export type MutationState = { error?: string; success?: boolean };

export async function updateSiteSettingsAction(
  _prevState: MutationState,
  formData: FormData
): Promise<MutationState> {
  await requireSession();
  const admin = getSupabaseAdmin();
  if (!admin || !isSupabaseAdminConfigured()) {
    return { error: "A Supabase még nincs csatlakoztatva, ezért ez a módosítás nem menthető. Lásd a README fájlt a beállításhoz." };
  }

  const currentHero = formData.get("current_hero_image_url")?.toString() ?? "";
  const heroImageUrl = await uploadImageIfProvided(formData, currentHero);

  const payload = {
    id: 1,
    museum_name: formData.get("museum_name")?.toString() ?? "",
    tagline: formData.get("tagline")?.toString() ?? "",
    tagline_hu: formData.get("tagline_hu")?.toString() || null,
    about_text: formData.get("about_text")?.toString() ?? "",
    about_text_hu: formData.get("about_text_hu")?.toString() || null,
    address: formData.get("address")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    facebook_url: formData.get("facebook_url")?.toString() ?? "",
    instagram_url: formData.get("instagram_url")?.toString() ?? "",
    youtube_url: formData.get("youtube_url")?.toString() ?? "",
    hero_image_url: heroImageUrl,
    updated_at: new Date().toISOString(),
  };

  const { error } = await admin.from("site_settings").upsert(payload);
  if (error) return { error: error.message };

  revalidatePublicPages();
  return { success: true };
}

export async function saveGalleryItemAction(
  _prevState: MutationState,
  formData: FormData
): Promise<MutationState> {
  await requireSession();
  const admin = getSupabaseAdmin();
  if (!admin || !isSupabaseAdminConfigured()) {
    return { error: "A Supabase még nincs csatlakoztatva, ezért ez a módosítás nem menthető. Lásd a README fájlt a beállításhoz." };
  }

  const id = formData.get("id")?.toString();
  const currentImageUrl = formData.get("current_image_url")?.toString() ?? "";
  const imageUrl = await uploadImageIfProvided(formData, currentImageUrl);

  const payload = {
    title: formData.get("title")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    description_hu: formData.get("description_hu")?.toString() || null,
    category: formData.get("category")?.toString() ?? "",
    era: formData.get("era")?.toString() ?? "",
    sort_order: Number(formData.get("sort_order") ?? 0),
    image_url: imageUrl,
  };

  const { error } = id
    ? await admin.from("gallery_items").update(payload).eq("id", id)
    : await admin.from("gallery_items").insert(payload);

  if (error) return { error: error.message };

  revalidatePublicPages();
  return { success: true };
}

export async function deleteGalleryItemAction(formData: FormData) {
  await requireSession();
  const admin = getSupabaseAdmin();
  if (!admin) return;

  const id = formData.get("id")?.toString();
  if (!id) return;

  await admin.from("gallery_items").delete().eq("id", id);
  revalidatePublicPages();
}

export async function saveEventAction(
  _prevState: MutationState,
  formData: FormData
): Promise<MutationState> {
  await requireSession();
  const admin = getSupabaseAdmin();
  if (!admin || !isSupabaseAdminConfigured()) {
    return { error: "A Supabase még nincs csatlakoztatva, ezért ez a módosítás nem menthető. Lásd a README fájlt a beállításhoz." };
  }

  const id = formData.get("id")?.toString();
  const currentImageUrl = formData.get("current_image_url")?.toString() ?? "";
  const imageUrl = await uploadImageIfProvided(formData, currentImageUrl);

  const payload = {
    title: formData.get("title")?.toString() ?? "",
    title_hu: formData.get("title_hu")?.toString() || null,
    description: formData.get("description")?.toString() ?? "",
    description_hu: formData.get("description_hu")?.toString() || null,
    event_date: formData.get("event_date")?.toString() ?? "",
    location: formData.get("location")?.toString() ?? "",
    image_url: imageUrl,
  };

  const { error } = id
    ? await admin.from("events").update(payload).eq("id", id)
    : await admin.from("events").insert(payload);

  if (error) return { error: error.message };

  revalidatePublicPages();
  return { success: true };
}

export async function deleteEventAction(formData: FormData) {
  await requireSession();
  const admin = getSupabaseAdmin();
  if (!admin) return;

  const id = formData.get("id")?.toString();
  if (!id) return;

  await admin.from("events").delete().eq("id", id);
  revalidatePublicPages();
}
