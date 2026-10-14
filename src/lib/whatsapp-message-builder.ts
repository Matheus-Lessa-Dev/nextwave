import type { ProjectBriefing } from "../config/chat";
import type { ChatContent } from "../i18n/chat/types";
import type { ChatState } from "./chat";

export function sentence(text: string): string {
  const clean = text.trim();
  return clean && !/[.!?…]$/.test(clean) ? clean + "." : clean;
}
function interpolate(template: string, value: string) {
  // Keep visitor spelling, language and punctuation; avoid an extra template period.
  return sentence(template.replace("{value}", value.trim()).replace(/([.!?…])\.$/, "$1"));
}
export function joinNatural(values: readonly string[], conjunction: string): string {
  return values.length < 2 ? values.join("") : values.slice(0, -1).join(", ") + ` ${conjunction} ` + values.at(-1);
}

/** Deterministic localized prose, using only supplied project answers. */
export function buildWhatsAppMessage(briefing: ProjectBriefing, copy: ChatContent): string {
  const m = copy.message;
  const opening = [m.intro, briefing.service ? m.requests[briefing.service] : m.generic,
    ...(briefing.business ? [interpolate(m.business, briefing.business)] : [])];
  const needs: string[] = [];
  if (briefing.goal && briefing.goal !== "explore") needs.push(m.goals[briefing.goal]);
  if (briefing.service === "landing") {
    if (briefing.offer) needs.push(interpolate(m.offer, briefing.offer));
    if (briefing.action && briefing.action !== "other") needs.push(m.actions[briefing.action]);
  }
  if (briefing.service === "website") {
    const pages = briefing.pages.filter(id => id !== "unsure").map(id => m.pageNames[id]);
    if (pages.length) needs.push(interpolate(m.pages, joinNatural(pages, m.conjunction)));
  }
  if (briefing.service === "redesign") {
    if (briefing.currentUrl) needs.push(interpolate(m.currentUrl, briefing.currentUrl));
    const improvements = briefing.improvements.filter(id => id !== "unsure").map(id => m.improvementNames[id]);
    if (improvements.length) needs.push(interpolate(m.improvements, joinNatural(improvements, m.conjunction)));
  }
  if (briefing.service === "maintenance" && briefing.maintenance.length) {
    needs.push(interpolate(m.maintenance, joinNatural(briefing.maintenance.map(id => m.maintenanceNames[id]), m.conjunction)));
  }
  const context: string[] = [];
  if (briefing.materials && briefing.materials !== "unsure") context.push(m.materials[briefing.materials]);
  if (briefing.timing && briefing.timing !== "unsure") context.push(m.timing[briefing.timing]);
  if (briefing.details) context.push(interpolate(m.details, briefing.details));
  return [m.greeting, opening.join(" "), needs.join(" "), context.join(" "), m.closing].filter(Boolean).join("\n\n");
}

export function getAssistantMessage(state: ChatState, copy: ChatContent): string {
  const generated = buildWhatsAppMessage(state.briefing, copy);
  const edit = state.messageEdits[copy.locale];
  return edit?.base === generated && edit.text.trim() ? edit.text.trim() : generated;
}
