import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGalleryItemById } from "@/lib/data";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localize, type Locale } from "@/lib/i18n/locale";

export default async function GalleryItemPage({ locale, id }: { locale: Locale; id: string }) {
  const item = await getGalleryItemById(id);
  if (!item) notFound();

  const dict = getDictionary(locale);
  const prefix = locale === "en" ? "/en" : "";
  const description = localize(item.description, item.description_hu, locale);

  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <Link
        href={`${prefix}/gallery`}
        className="font-display text-sm tracking-wide text-rust hover:text-rust-dark"
      >
        &larr; {dict.galleryItem.backToGallery}
      </Link>

      <div className="relative mt-6 aspect-[4/3] overflow-hidden border-2 border-espresso shadow-[6px_6px_0_0_var(--color-espresso)]">
        <Image
          src={item.image_url}
          alt={item.title}
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 90vw"
          className="object-cover"
        />
        <div className="badge-stamp absolute right-4 top-4 bg-cream/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-espresso">
          {item.era}
        </div>
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-rust">{item.category}</p>
      <h1 className="font-display mt-1 text-5xl leading-none text-espresso">{item.title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/85">{description}</p>
    </div>
  );
}
