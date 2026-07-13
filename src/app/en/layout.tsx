import type { Metadata } from "next";
import "../globals.css";
import { bebasNeue, vollkorn } from "@/lib/fonts";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getSiteSettings } from "@/lib/data";
import { localize } from "@/lib/i18n/locale";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const tagline = localize(settings.tagline, settings.tagline_hu, "en");
  const about = localize(settings.about_text, settings.about_text_hu, "en");
  return {
    title: `${settings.museum_name} | ${tagline}`,
    description: about.slice(0, 155),
  };
}

export default async function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`${bebasNeue.variable} ${vollkorn.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-parchment">
        <SiteHeader locale="en" settings={settings} />
        <main className="flex-1">{children}</main>
        <SiteFooter locale="en" settings={settings} />
      </body>
    </html>
  );
}
