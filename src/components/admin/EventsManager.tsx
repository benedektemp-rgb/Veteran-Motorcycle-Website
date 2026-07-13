"use client";

import { useState } from "react";
import Image from "next/image";
import { deleteEventAction } from "@/app/admin/actions";
import DeleteButton from "@/components/admin/DeleteButton";
import EventForm from "@/components/admin/EventForm";
import type { MuseumEvent } from "@/lib/types";

export default function EventsManager({ events, disabled }: { events: MuseumEvent[]; disabled: boolean }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  return (
    <div className="mt-4 space-y-3">
      {events.map((event) => (
        <div key={event.id} className="border-2 border-espresso bg-cream p-4">
          {editingId === event.id ? (
            <EventForm event={event} disabled={disabled} onDone={() => setEditingId(null)} />
          ) : (
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden border border-espresso">
                <Image src={event.image_url} alt={event.title} fill sizes="80px" className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-display text-lg leading-tight text-espresso">{event.title}</p>
                <p className="text-xs text-ink/60">
                  {event.event_date} &middot; {event.location}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingId(event.id)}
                className="text-sm font-semibold text-espresso underline"
              >
                Szerkesztés
              </button>
              <DeleteButton
                id={event.id}
                action={deleteEventAction}
                disabled={disabled}
                label="ezt az eseményt"
              />
            </div>
          )}
        </div>
      ))}

      {adding ? (
        <div className="border-2 border-dashed border-espresso p-4">
          <EventForm disabled={disabled} onDone={() => setAdding(false)} />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          disabled={disabled}
          className="font-display border-2 border-espresso px-4 py-2 text-espresso transition-colors hover:bg-espresso hover:text-cream disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Esemény hozzáadása
        </button>
      )}
    </div>
  );
}
