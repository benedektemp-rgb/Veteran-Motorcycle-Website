"use client";

import { useState } from "react";
import QRCode from "qrcode";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function QrCodeButton({ path, label }: { path: string; label: string }) {
  const [open, setOpen] = useState(false);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleOpen() {
    if (open) {
      setOpen(false);
      return;
    }

    setOpen(true);
    setError(null);

    if (dataUrl) return;

    try {
      const targetUrl = `${window.location.origin}${path}`;
      const png = await QRCode.toDataURL(targetUrl, { width: 512, margin: 2 });
      setUrl(targetUrl);
      setDataUrl(png);
    } catch {
      setError("Nem sikerült elkészíteni a QR-kódot.");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleOpen}
        className="text-sm font-semibold text-espresso underline"
      >
        QR kód
      </button>

      {open && (
        <div className="mt-2 border-2 border-espresso bg-parchment p-3">
          {error && <p className="text-xs font-semibold text-rust-dark">{error}</p>}
          {dataUrl && url && (
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element -- local data: URL, not a servable remote image */}
              <img src={dataUrl} alt={`QR kód: ${label}`} className="h-28 w-28 flex-shrink-0" />
              <div className="min-w-0 text-xs text-ink/70">
                <p className="break-all">{url}</p>
                <a
                  href={dataUrl}
                  download={`qr-${slugify(label)}.png`}
                  className="mt-2 inline-block font-semibold text-rust-dark underline"
                >
                  PNG letöltése
                </a>
              </div>
            </div>
          )}
          {!dataUrl && !error && <p className="text-xs text-ink/60">Készítés...</p>}
        </div>
      )}
    </div>
  );
}
