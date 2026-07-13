import Image from "next/image";
import type { MuseumEvent } from "@/lib/types";
import type { Locale } from "@/lib/i18n/locale";

function formatEventDate(dateStr: string, locale: Locale) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString(locale === "hu" ? "hu-HU" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function EventCard({ event, locale }: { event: MuseumEvent; locale: Locale }) {
  return (
    <article className="grid overflow-hidden border-2 border-espresso bg-cream shadow-[4px_4px_0_0_var(--color-espresso)] sm:grid-cols-[minmax(0,220px)_1fr]">
      <div className="relative aspect-[4/3] sm:aspect-auto sm:h-full border-b-2 border-espresso sm:border-b-0 sm:border-r-2">
        <Image
          src={event.image_url}
          alt={event.title}
          fill
          sizes="(min-width: 640px) 220px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-rust">
          {formatEventDate(event.event_date, locale)}
        </p>
        <h3 className="font-display mt-1 text-2xl text-espresso">{event.title}</h3>
        <p className="mt-1 text-sm font-semibold text-ink/70">{event.location}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink/80">{event.description}</p>
      </div>
    </article>
  );
}
