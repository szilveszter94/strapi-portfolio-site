import { routing } from "./navigation";

export function getLocaleFromPathname(pathname) {
  if (!pathname) return routing.defaultLocale;

  const parts = pathname.split("/");
  const maybeLocale = parts[1];

  return routing.locales.includes(maybeLocale) ? maybeLocale : routing.defaultLocale;
}
