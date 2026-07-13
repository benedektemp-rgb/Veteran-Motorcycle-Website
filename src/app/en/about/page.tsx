import AboutPage from "@/app/_pages/AboutPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function Page() {
  return <AboutPage locale="en" />;
}
