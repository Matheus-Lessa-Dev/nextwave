"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import type { SiteContent } from "@/i18n/types";
import "./language-switcher.css";

const sections = ["inicio", "servicos", "projetos", "processo", "faq", "contato"];

// Cache Components can retain previous routes in hidden React Activity trees.
function visibleSection(id: string) {
  return Array.from(document.querySelectorAll<HTMLElement>(`[id="${id}"]`))
    .find(element => element.getClientRects().length > 0);
}

function currentSection() {
  const visible = sections.filter(id => {
    const element = visibleSection(id);
    return element && element.getBoundingClientRect().top <= 140;
  });
  return visible.at(-1) ?? "inicio";
}

export function LanguageSwitcher({ locale, labels }: { locale: Locale; labels: SiteContent["ui"] }) {
  const router = useRouter();
  const [hash, setHash] = useState("");
  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    document.documentElement.lang = locale;
    const frame = requestAnimationFrame(() => {
      const id = window.location.hash.slice(1);
      if (sections.includes(id)) visibleSection(id)?.scrollIntoView({ behavior: "auto", block: "start" });
    });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", updateHash);
    };
  }, [locale]);

  return (
    <nav className="nw-language-switcher" aria-label={labels.languageLabel}>
      {locales.map(target => (
        <Link key={target} href={`/${target}${hash}`} scroll={false}
          hrefLang={target}
          aria-label={labels.languageNames[target]}
          aria-current={target === locale ? "page" : undefined}
          onClick={event => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            if (target === locale) return;
            const section = currentSection();
            router.push(`/${target}${section === "inicio" ? "" : `#${section}`}`, { scroll: false });
          }}>
          {localeLabels[target]}
        </Link>
      ))}
    </nav>
  );
}
