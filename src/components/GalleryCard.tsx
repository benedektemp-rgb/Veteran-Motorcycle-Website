import Image from "next/image";
import Link from "next/link";
import type { GalleryItem } from "@/lib/types";
import type { Locale } from "@/lib/i18n/locale";

export default function GalleryCard({ item, locale }: { item: GalleryItem; locale: Locale }) {
  const prefix = locale === "en" ? "/en" : "";

  return (
    <Link
      href={`${prefix}/gallery/${item.id}`}
      className="group block overflow-hidden border-2 border-espresso bg-cream shadow-[4px_4px_0_0_var(--color-espresso)]"
    >
      <article>
        <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-espresso">
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="badge-stamp absolute right-3 top-3 bg-cream/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-espresso">
            {item.era}
          </div>
        </div>
        <div className="p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-rust">{item.category}</p>
          <h3 className="font-display mt-1 text-2xl leading-tight text-espresso group-hover:text-rust">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/80">{item.description}</p>
        </div>
      </article>
    </Link>
  );
}
