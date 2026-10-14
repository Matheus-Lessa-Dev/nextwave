export const locales = ["pt-BR", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt-BR";
export const localeLabels = { "pt-BR": "PT", en: "EN", es: "ES" } as const;
export const openGraphLocales = { "pt-BR": "pt_BR", en: "en_US", es: "es_ES" } as const;
export function isLocale(value: string): value is Locale {
  return locales.some(locale => locale === value);
}
