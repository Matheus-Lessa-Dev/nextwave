import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Process } from "@/components/Process";
import { FAQ } from "@/components/FAQ";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { FloatingChat } from "@/components/chat/FloatingChat";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { site, chat } = await getDictionary(locale);
  return (
    <div id="inicio">
      <a className="skip-link" href="#conteudo">{site.ui.skip}</a>
      <Navbar site={site} locale={locale} />
      <main id="conteudo" tabIndex={-1}>
        <Hero site={site} />
        <Services site={site} />
        <Portfolio site={site} />
        <Process site={site} />
        <FAQ site={site} />
        <ContactCTA site={site} />
      </main>
      <Footer site={site} />
      <FloatingChat chatConfig={chat} site={{ ui: site.ui, contact: site.contact }} />
    </div>
  );
}
