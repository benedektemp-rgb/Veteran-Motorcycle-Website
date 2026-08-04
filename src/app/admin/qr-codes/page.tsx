import { getGalleryItems } from "@/lib/data";
import PrintQrGrid from "@/components/admin/PrintQrGrid";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "QR-kódok nyomtatása",
  robots: { index: false, follow: false },
};

export default async function QrCodesPrintPage() {
  const items = await getGalleryItems();
  return <PrintQrGrid items={items} />;
}
