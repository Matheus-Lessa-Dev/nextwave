import "server-only";
import type { Locale } from "./config";
import type { Dictionary } from "./types";

const dictionaries = {
  "pt-BR": () => import("./dictionaries/pt-BR").then(module => module.default),
  en: () => import("./dictionaries/en").then(module => module.default),
  es: () => import("./dictionaries/es").then(module => module.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
