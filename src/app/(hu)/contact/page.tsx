import ContactPage from "@/app/_pages/ContactPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kapcsolat",
};

export default function Page() {
  return <ContactPage locale="hu" />;
}
