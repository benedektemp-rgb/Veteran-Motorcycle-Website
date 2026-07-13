import EventsPage from "@/app/_pages/EventsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Események",
};

export default function Page() {
  return <EventsPage locale="hu" />;
}
