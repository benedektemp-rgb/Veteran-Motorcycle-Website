import AboutPage from "@/app/_pages/AboutPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rólunk",
};

export default function Page() {
  return <AboutPage locale="hu" />;
}
