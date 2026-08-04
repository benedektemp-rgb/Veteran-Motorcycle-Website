"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import type { GalleryItem } from "@/lib/types";

export default function PrintQrGrid({ items }: { items: GalleryItem[] }) {
  const [codes, setCodes] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function generate() {
      try {
        const entries = await Promise.all(
          items.map(async (item) => {
            const targetUrl = `${window.location.origin}/gallery/${item.id}`;
            const dataUrl = await QRCode.toDataURL(targetUrl, { width: 400, margin: 1 });
            return [item.id, dataUrl] as const;
          })
        );
        if (!cancelled) setCodes(Object.fromEntries(entries));
      } catch {
        if (!cancelled) setError("Nem sikerült elkészíteni a QR-kódokat.");
      }
    }

    generate();
    return () => {
      cancelled = true;
    };
  }, [items]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div>
          <Link href="/admin" className="text-sm font-semibold text-espresso underline">
            &larr; Vissza az admin felülethez
          </Link>
          <h1 className="font-display mt-2 text-3xl text-espresso">QR-kódok nyomtatása</h1>
          <p className="mt-1 text-sm text-ink/70">
            Vágja ki egyenként a négyzeteket, és ragassza ki a megfelelő motorkerékpár mellé.
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          disabled={items.length === 0 || Object.keys(codes).length < items.length}
          className="font-display border-2 border-rust-dark bg-rust px-6 py-2.5 text-lg tracking-wide text-cream transition-colors hover:bg-rust-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          Nyomtatás
        </button>
      </div>

      {error && <p className="mt-6 text-sm font-semibold text-rust-dark print:hidden">{error}</p>}

      {items.length === 0 ? (
        <p className="mt-6 text-sm text-ink/70 print:hidden">
          Nincs motorkerékpár a galériában, amihez QR-kódot lehetne készíteni.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 print:mt-0 print:grid-cols-3 print:gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-2 border-2 border-dashed border-espresso/40 p-4 text-center [break-inside:avoid]"
            >
              {codes[item.id] ? (
                // eslint-disable-next-line @next/next/no-img-element -- local data: URL, not a servable remote image
                <img src={codes[item.id]} alt={`QR kód: ${item.title}`} className="h-32 w-32" />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center text-xs text-ink/50">
                  Készítés...
                </div>
              )}
              <p className="font-display text-base leading-tight text-espresso">{item.title}</p>
              <p className="text-xs text-ink/60">
                {item.era} &middot; {item.category}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
