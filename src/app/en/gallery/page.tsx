import GalleryPage from "@/app/_pages/GalleryPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
};

export default function Page() {
  return <GalleryPage locale="en" />;
}
