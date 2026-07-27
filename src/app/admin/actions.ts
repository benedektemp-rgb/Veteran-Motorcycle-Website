"use server";

import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { clearSessionCookie, createSessionToken, getSession, setSessionCookie } from "@/lib/auth";
import { getGalleryItems, getEvents } from "@/lib/data";
import {
  EVENTS_PATH,
  GALLERY_PATH,
  SITE_SETTINGS_PATH,
  deleteUploadedImage,
  isContentStoreWritable,
  saveUploadedImage,
  writeContentFile,
} from "@/lib/content-writer";
import type { GalleryItem, MuseumEvent } from "@/lib/types";

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

const NOT_WRITABLE_ERROR =
  "A tartalom mentése jelenleg nincs beállítva (hiányzik a GITHUB_TOKEN). Lásd a README fájlt a beállításhoz.";

const SAVED_MESSAGE = "Mentve. A módosítás néhány percen belül jelenik meg az élő oldalon.";

async function uploadImageIfProvided(formData: FormData, fallbackUrl: string): Promise<string> {
  const file = formData.get("image") as File | null;
  if (!file || file.size === 0) return fallbackUrl;
  return saveUploadedImage(file);
}

export type MutationState = { error?: string; success?: boolean; message?: string };

export async function updateSiteSettingsAction(
  _prevState: MutationState,
  formData: FormData
): Promise<MutationState> {
  await requireSession();
  if (!isContentStoreWritable()) {
    return { error: NOT_WRITABLE_ERROR };
  }

  const currentHero = formData.get("current_hero_image_url")?.toString() ?? "";
  const heroImageUrl = await uploadImageIfProvided(formData, currentHero);

  const settings = {
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
  };

  try {
    await writeContentFile(SITE_SETTINGS_PATH, settings);
  } catch (error) {
    console.error("updateSiteSettingsAction: write failed", error);
    return { error: "Nem sikerült menteni a beállításokat." };
  }

  revalidatePublicPages();
  return { success: true, message: SAVED_MESSAGE };
}

export async function saveGalleryItemAction(
  _prevState: MutationState,
  formData: FormData
): Promise<MutationState> {
  await requireSession();
  if (!isContentStoreWritable()) {
    return { error: NOT_WRITABLE_ERROR };
  }

  const id = formData.get("id")?.toString();
  const currentImageUrl = formData.get("current_image_url")?.toString() ?? "";
  const imageUrl = await uploadImageIfProvided(formData, currentImageUrl);

  const items = await getGalleryItems();

  const fields = {
    title: formData.get("title")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    description_hu: formData.get("description_hu")?.toString() || null,
    category: formData.get("category")?.toString() ?? "",
    era: formData.get("era")?.toString() ?? "",
    sort_order: Number(formData.get("sort_order") ?? 0),
    image_url: imageUrl,
  };

  let updated: GalleryItem[];
  if (id) {
    updated = items.map((item) => (item.id === id ? { ...item, ...fields } : item));
  } else {
    const newItem: GalleryItem = {
      id: randomUUID(),
      created_at: new Date().toISOString(),
      ...fields,
    };
    updated = [...items, newItem];
  }

  try {
    await writeContentFile(GALLERY_PATH, updated);
  } catch (error) {
    console.error("saveGalleryItemAction: write failed", error);
    return { error: "Nem sikerült menteni a motorkerékpárt." };
  }

  revalidatePublicPages();
  return { success: true, message: SAVED_MESSAGE };
}

export async function deleteGalleryItemAction(formData: FormData) {
  await requireSession();
  if (!isContentStoreWritable()) return;

  const id = formData.get("id")?.toString();
  if (!id) return;

  const items = await getGalleryItems();
  const target = items.find((item) => item.id === id);
  const remaining = items.filter((item) => item.id !== id);

  try {
    await writeContentFile(GALLERY_PATH, remaining);
    if (target) await deleteUploadedImage(target.image_url);
  } catch (error) {
    console.error("deleteGalleryItemAction: failed", error);
    return;
  }

  revalidatePublicPages();
}

export async function resetGalleryAction(): Promise<MutationState> {
  await requireSession();
  if (!isContentStoreWritable()) {
    return { error: NOT_WRITABLE_ERROR };
  }

  const items = await getGalleryItems();

  try {
    await writeContentFile(GALLERY_PATH, []);
    for (const item of items) {
      await deleteUploadedImage(item.image_url);
    }
  } catch (error) {
    console.error("resetGalleryAction: failed", error);
    return { error: "Nem sikerült törölni a galéria elemeit." };
  }

  revalidatePublicPages();
  return { success: true, message: SAVED_MESSAGE };
}

export async function saveEventAction(
  _prevState: MutationState,
  formData: FormData
): Promise<MutationState> {
  await requireSession();
  if (!isContentStoreWritable()) {
    return { error: NOT_WRITABLE_ERROR };
  }

  const id = formData.get("id")?.toString();
  const currentImageUrl = formData.get("current_image_url")?.toString() ?? "";
  const imageUrl = await uploadImageIfProvided(formData, currentImageUrl);

  const events = await getEvents();

  const fields = {
    title: formData.get("title")?.toString() ?? "",
    title_hu: formData.get("title_hu")?.toString() || null,
    description: formData.get("description")?.toString() ?? "",
    description_hu: formData.get("description_hu")?.toString() || null,
    event_date: formData.get("event_date")?.toString() ?? "",
    location: formData.get("location")?.toString() ?? "",
    image_url: imageUrl,
  };

  let updated: MuseumEvent[];
  if (id) {
    updated = events.map((event) => (event.id === id ? { ...event, ...fields } : event));
  } else {
    const newEvent: MuseumEvent = {
      id: randomUUID(),
      created_at: new Date().toISOString(),
      ...fields,
    };
    updated = [...events, newEvent];
  }

  try {
    await writeContentFile(EVENTS_PATH, updated);
  } catch (error) {
    console.error("saveEventAction: write failed", error);
    return { error: "Nem sikerült menteni az eseményt." };
  }

  revalidatePublicPages();
  return { success: true, message: SAVED_MESSAGE };
}

export async function deleteEventAction(formData: FormData) {
  await requireSession();
  if (!isContentStoreWritable()) return;

  const id = formData.get("id")?.toString();
  if (!id) return;

  const events = await getEvents();
  const target = events.find((event) => event.id === id);
  const remaining = events.filter((event) => event.id !== id);

  try {
    await writeContentFile(EVENTS_PATH, remaining);
    if (target) await deleteUploadedImage(target.image_url);
  } catch (error) {
    console.error("deleteEventAction: failed", error);
    return;
  }

  revalidatePublicPages();
}
