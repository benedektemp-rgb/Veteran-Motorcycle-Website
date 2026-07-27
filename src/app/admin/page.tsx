import { getEvents, getGalleryItems, getSiteSettings } from "@/lib/data";
import { isContentStoreWritable } from "@/lib/content-writer";
import SiteSettingsForm from "@/components/admin/SiteSettingsForm";
import GalleryManager from "@/components/admin/GalleryManager";
import EventsManager from "@/components/admin/EventsManager";
import LogoutButton from "@/components/admin/LogoutButton";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin irányítópult",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const [settings, galleryItems, events] = await Promise.all([
    getSiteSettings(),
    getGalleryItems(),
    getEvents(),
  ]);
  const writable = isContentStoreWritable();

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-rust">Admin irányítópult</p>
          <h1 className="font-display text-4xl text-espresso">{settings.museum_name} kezelése</h1>
        </div>
        <LogoutButton />
      </div>

      {!writable && (
        <div className="mt-6 border-2 border-rust bg-rust/10 p-4 text-sm text-rust-dark">
          A mentés jelenleg nincs beállítva (hiányzik a GITHUB_TOKEN). Az admin felület alant
          megtekinthető, de a módosítások nem menthetők, amíg a beállítás meg nem történik (lásd
          README.md).
        </div>
      )}

      <section className="mt-10">
        <h2 className="font-display text-2xl text-espresso">Webhely beállításai</h2>
        <SiteSettingsForm settings={settings} disabled={!writable} />
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl text-espresso">Galéria</h2>
        <GalleryManager items={galleryItems} disabled={!writable} />
      </section>

      <section className="mt-14 pb-10">
        <h2 className="font-display text-2xl text-espresso">Események</h2>
        <EventsManager events={events} disabled={!writable} />
      </section>
    </div>
  );
}
