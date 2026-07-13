import type { Metadata } from "next";
import "../globals.css";
import { bebasNeue, vollkorn } from "@/lib/fonts";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Admin felület",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="hu" className={`${bebasNeue.variable} ${vollkorn.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-parchment">
        <SiteHeader locale="hu" settings={settings} showLanguageSwitcher={false} />
        <main className="flex-1">{children}</main>
        <SiteFooter locale="hu" settings={settings} />
      </body>
    </html>
  );
}
