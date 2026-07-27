import GalleryItemPage from "@/app/_pages/GalleryItemPage";
import { getGalleryItemById } from "@/lib/data";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = await getGalleryItemById(id);
  return { title: item ? item.title : "Galéria" };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <GalleryItemPage locale="hu" id={id} />;
}
