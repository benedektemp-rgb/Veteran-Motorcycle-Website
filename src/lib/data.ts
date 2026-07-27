import siteSettingsData from "../../content/site-settings.json";
import galleryData from "../../content/gallery.json";
import eventsData from "../../content/events.json";
import type { GalleryItem, MuseumEvent, SiteSettings } from "./types";

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettingsData as SiteSettings;
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  return [...(galleryData as GalleryItem[])].sort((a, b) => a.sort_order - b.sort_order);
}

export async function getGalleryItemById(id: string): Promise<GalleryItem | null> {
  const items = galleryData as GalleryItem[];
  return items.find((item) => item.id === id) ?? null;
}

export async function getEvents(): Promise<MuseumEvent[]> {
  return [...(eventsData as MuseumEvent[])].sort((a, b) => a.event_date.localeCompare(b.event_date));
}

export async function getUpcomingEvents(limit?: number): Promise<MuseumEvent[]> {
  const events = await getEvents();
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((event) => event.event_date >= today);
  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}
