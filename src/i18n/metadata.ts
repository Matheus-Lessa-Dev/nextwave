import type { Metadata } from "next";
import { locales, defaultLocale, openGraphLocales, type Locale } from "./config";
import type { SiteContent } from "./types";

export function languageAlternates(baseUrl: string) {
  return Object.fromEntries([
    ...locales.map(locale => [locale, new URL(`/${locale}`, baseUrl).href]),
    ["x-default", new URL(`/${defaultLocale}`, baseUrl).href],
  ]);
}

export function localizedMetadata(locale: Locale, content: SiteContent, baseUrl?: string): Metadata {
  const url = baseUrl ? new URL(`/${locale}`, baseUrl).href : undefined;
  return {
    title: content.title,
    description: content.description,
    applicationName: content.name,
    icons: { icon: "/logo.svg" },
    ...(baseUrl ? {
      metadataBase: new URL(baseUrl),
      alternates: { canonical: url, languages: languageAlternates(baseUrl) },
    } : {}),
    openGraph: {
      type: "website",
      locale: openGraphLocales[locale],
      alternateLocale: locales.filter(other => other !== locale).map(other => openGraphLocales[other]),
      siteName: content.name,
      title: content.title,
      description: content.description,
      ...(url ? { url } : {}),
    },
    twitter: { card: "summary", title: content.title, description: content.description },
    robots: { index: true, follow: true },
  };
}
