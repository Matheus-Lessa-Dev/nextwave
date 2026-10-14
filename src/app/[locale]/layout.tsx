import type { Viewport } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import { locales, isLocale, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizedMetadata } from "@/i18n/metadata";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale: requested } = await params;
  const locale = isLocale(requested) ? requested : defaultLocale;
  const dictionary = await getDictionary(locale);
  return localizedMetadata(locale, dictionary.site, site.url);
}

export const viewport: Viewport = { themeColor: "#070B14", colorScheme: "dark" };

export default async function RootLayout({ children, params }: Props) {
  const { locale: requested } = await params;
  const locale = isLocale(requested) ? requested : defaultLocale;
  return (
    <html lang={locale} className={`${geistSans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
