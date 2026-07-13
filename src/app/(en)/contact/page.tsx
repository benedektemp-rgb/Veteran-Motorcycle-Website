import ContactPage from "@/app/_pages/ContactPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function Page() {
  return <ContactPage locale="en" />;
}
