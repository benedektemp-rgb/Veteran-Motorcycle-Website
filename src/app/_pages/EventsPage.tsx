import PageHero from "@/components/PageHero";
import EventCard from "@/components/EventCard";
import { getEvents } from "@/lib/data";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localize, type Locale } from "@/lib/i18n/locale";

export default async function EventsPage({ locale }: { locale: Locale }) {
  const events = await getEvents();
  const dict = getDictionary(locale);
  const today = new Date().toISOString().slice(0, 10);

  const localizedEvents = events.map((event) => ({
    ...event,
    title: localize(event.title, event.title_hu, locale),
    description: localize(event.description, event.description_hu, locale),
  }));

  const upcoming = localizedEvents.filter((e) => e.event_date >= today);
  const past = localizedEvents.filter((e) => e.event_date < today);

  return (
    <div>
      <PageHero eyebrow={dict.events.eyebrow} title={dict.events.title} subtitle={dict.events.subtitle} />

      <div className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="font-display text-3xl text-espresso">{dict.events.upcoming}</h2>
        <div className="mt-6 space-y-6">
          {upcoming.length > 0 ? (
            upcoming.map((event) => <EventCard key={event.id} event={event} locale={locale} />)
          ) : (
            <p className="text-ink/60">{dict.events.noUpcoming}</p>
          )}
        </div>

        {past.length > 0 && (
          <>
            <h2 className="font-display mt-14 text-3xl text-espresso">{dict.events.pastEvents}</h2>
            <div className="mt-6 space-y-6 opacity-70">
              {past.map((event) => (
                <EventCard key={event.id} event={event} locale={locale} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
