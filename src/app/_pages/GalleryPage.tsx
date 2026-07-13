import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import { getGalleryItems } from "@/lib/data";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localize, type Locale } from "@/lib/i18n/locale";

export default async function GalleryPage({ locale }: { locale: Locale }) {
  const items = await getGalleryItems();
  const dict = getDictionary(locale);

  const localizedItems = items.map((item) => ({
    ...item,
    description: localize(item.description, item.description_hu, locale),
  }));

  return (
    <div>
      <PageHero eyebrow={dict.gallery.eyebrow} title={dict.gallery.title} subtitle={dict.gallery.subtitle} />
      <div className="mx-auto max-w-6xl px-5 py-14">
        <GalleryGrid items={localizedItems} allLabel={dict.gallery.allFilter} emptyLabel={dict.gallery.empty} />
      </div>
    </div>
  );
}
