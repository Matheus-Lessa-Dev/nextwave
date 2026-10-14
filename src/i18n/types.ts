import type pt from "./dictionaries/pt-BR";
import type { ChatContent } from "./chat/types";

// Textos podem variar; identificadores, âncoras, nomes próprios e estrutura permanecem estáveis.
type Translated<T> = T extends string ? string
  : T extends readonly unknown[] ? { [K in keyof T]: Translated<T[K]> }
  : T extends object ? { [K in keyof T]: K extends "id" | "icon" | "type" | "href" | "name" | "prefix" | "suffix" | "panelId" ? T[K] : Translated<T[K]> }
  : T;

export type Dictionary = { site: Translated<typeof pt.site>; chat: ChatContent };
export type SiteContent = Dictionary["site"];
export type { ChatContent } from "./chat/types";
export type WhatsAppCopy = Pick<SiteContent, "ui" | "contact">;
