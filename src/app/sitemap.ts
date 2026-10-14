import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { locales } from "@/i18n/config";
import { languageAlternates } from "@/i18n/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  return locales.map(locale => ({
    url: new URL(`/${locale}`, site.url).href,
    alternates: { languages: languageAlternates(site.url!) },
  }));
}
