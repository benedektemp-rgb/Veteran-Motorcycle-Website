"use client";

import { useRef, useState, type ChangeEvent, type DragEvent, type MouseEvent } from "react";

export default function ImageUploadField({
  label,
  name,
  currentImageUrl,
}: {
  label: string;
  name: string;
  currentImageUrl?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function applyFile(file: File | null) {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setFileName(file.name);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    applyFile(event.target.files?.[0] ?? null);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (!file || !inputRef.current) return;

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    inputRef.current.files = dataTransfer.files;
    applyFile(file);
  }

  function handleClear(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (inputRef.current) inputRef.current.value = "";
    setPreview(currentImageUrl || null);
    setFileName(null);
  }

  return (
    <div className="sm:col-span-2">
      <label className="text-sm font-semibold text-espresso">{label}</label>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`mt-1 flex cursor-pointer flex-col items-center gap-3 border-2 border-dashed p-4 text-center transition-colors sm:flex-row sm:text-left ${
          isDragging ? "border-rust bg-rust/10" : "border-espresso bg-parchment hover:bg-espresso/5"
        }`}
      >
        <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden border border-espresso bg-cream">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element -- local blob preview, not a servable remote image
            <img src={preview} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-ink/40">No image</div>
          )}
        </div>
        <div className="flex-1 text-sm text-ink/70">
          <p className="font-semibold text-espresso">
            {fileName ?? "Drag & drop an image here, or click to browse"}
          </p>
          <p className="mt-1 text-xs">JPG, PNG, or WebP. Leave empty to keep the current photo.</p>
          {fileName && (
            <button
              type="button"
              onClick={handleClear}
              className="mt-2 text-xs font-semibold text-rust-dark underline"
            >
              Remove selected photo
            </button>
          )}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
}
