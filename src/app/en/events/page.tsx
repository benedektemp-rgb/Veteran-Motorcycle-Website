import EventsPage from "@/app/_pages/EventsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
};

export default function Page() {
  return <EventsPage locale="en" />;
}
