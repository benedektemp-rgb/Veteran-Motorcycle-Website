import { getSupabase } from "./supabase";
import { eventsSeed, galleryItemsSeed, siteSettingsSeed } from "./seed-data";
import type { GalleryItem, MuseumEvent, SiteSettings } from "./types";

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = getSupabase();
  if (!supabase) return siteSettingsSeed;

  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  if (error) {
    console.error("getSiteSettings: Supabase query failed, falling back to seed data", error);
    return siteSettingsSeed;
  }
  if (!data) return siteSettingsSeed;
  return data as unknown as SiteSettings;
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const supabase = getSupabase();
  if (!supabase) return galleryItemsSeed;

  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("getGalleryItems: Supabase query failed, falling back to seed data", error);
    return galleryItemsSeed;
  }
  return (data ?? []) as unknown as GalleryItem[];
}

export async function getGalleryItemById(id: string): Promise<GalleryItem | null> {
  const supabase = getSupabase();
  if (!supabase) return galleryItemsSeed.find((item) => item.id === id) ?? null;

  const { data, error } = await supabase.from("gallery_items").select("*").eq("id", id).maybeSingle();
  if (error) {
    console.error("getGalleryItemById: Supabase query failed", { id, error });
    return null;
  }
  return (data as unknown as GalleryItem) ?? null;
}

export async function getEvents(): Promise<MuseumEvent[]> {
  const supabase = getSupabase();
  if (!supabase) return eventsSeed;

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });
  if (error) {
    console.error("getEvents: Supabase query failed, falling back to seed data", error);
    return eventsSeed;
  }
  return (data ?? []) as unknown as MuseumEvent[];
}

export async function getUpcomingEvents(limit?: number): Promise<MuseumEvent[]> {
  const events = await getEvents();
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((event) => event.event_date >= today);
  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}
