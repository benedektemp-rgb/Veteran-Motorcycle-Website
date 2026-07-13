const MAX_DIMENSION = 1920;
const JPEG_QUALITY = 0.82;
const SKIP_IF_UNDER_BYTES = 400_000;

export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") return file;
  if (file.size <= SKIP_IF_UNDER_BYTES) return file;

  try {
    const objectUrl = URL.createObjectURL(file);
    const image = await loadImage(objectUrl);
    URL.revokeObjectURL(objectUrl);

    const scale = Math.min(1, MAX_DIMENSION / Math.max(image.width, image.height));
    const width = Math.round(image.width * scale);
    const height = Math.round(image.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(image, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY)
    );
    if (!blob || blob.size >= file.size) return file;

    const newName = file.name.replace(/\.\w+$/, "") + ".jpg";
    return new File([blob], newName, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
