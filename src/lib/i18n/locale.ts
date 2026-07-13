export type Locale = "en" | "hu";

export const locales: Locale[] = ["hu", "en"];

// Hungarian is the default locale and lives unprefixed at "/"; English is
// the secondary locale for tourists and lives under the "/en" prefix.
export const DEFAULT_LOCALE: Locale = "hu";
const PREFIXED_LOCALE: Locale = "en";

export function localize(en: string, hu: string | null | undefined, locale: Locale): string {
  if (locale === "hu" && hu && hu.trim().length > 0) return hu;
  return en;
}

export function localePath(pathname: string, targetLocale: Locale): string {
  const withoutPrefix =
    pathname === `/${PREFIXED_LOCALE}` ? "/" : pathname.replace(new RegExp(`^/${PREFIXED_LOCALE}(/|$)`), "/");
  if (targetLocale !== PREFIXED_LOCALE) return withoutPrefix;
  return withoutPrefix === "/" ? `/${PREFIXED_LOCALE}` : `/${PREFIXED_LOCALE}${withoutPrefix}`;
}
