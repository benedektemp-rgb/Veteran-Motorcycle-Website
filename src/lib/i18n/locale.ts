export type Locale = "en" | "hu";

export const locales: Locale[] = ["en", "hu"];

export function localize(en: string, hu: string | null | undefined, locale: Locale): string {
  if (locale === "hu" && hu && hu.trim().length > 0) return hu;
  return en;
}

export function localePath(pathname: string, targetLocale: Locale): string {
  const withoutHu = pathname === "/hu" ? "/" : pathname.replace(/^\/hu(\/|$)/, "/");
  if (targetLocale === "en") return withoutHu;
  return withoutHu === "/" ? "/hu" : `/hu${withoutHu}`;
}
