import Link from "next/link";
import { locale as getLocale } from "next/root-params";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function NotFound() {
  const requested = await getLocale();
  const locale = isLocale(requested) ? requested : defaultLocale;
  const { site } = await getDictionary(locale);
  return (
    <main className="container flex min-h-screen flex-col items-start justify-center gap-5">
      <p className="text-accent">404</p>
      <h1 className="text-3xl font-semibold">{site.ui.notFoundTitle}</h1>
      <p className="text-muted">{site.ui.notFoundDescription}</p>
      <Link className="button button-primary" href={`/${locale}`}>{site.ui.returnHome}</Link>
    </main>
  );
}
