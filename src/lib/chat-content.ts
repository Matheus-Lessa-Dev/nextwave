import type { ChatContent } from "../i18n/chat/types";
import type { ChatState } from "./chat";
import type { BriefingField, ProjectBriefing } from "../config/chat";
import { diagnosticClarification } from "./service-recommendation";
import { joinNatural } from "./whatsapp-message-builder";

export type ChatEntry = { id: string; speaker: "assistant" | "visitor"; text: string };
export function getStageLabel(state: ChatState, copy: ChatContent): string {
  if (state.view === "briefing" && state.field) return copy.prompts[state.field];
  if (state.view === "diagnosis") {
    if (state.diagnosticField === "situation") return copy.prompts.situation;
    if (state.diagnosticField === "goal") return copy.prompts.diagnosticGoal;
    return copy.prompts[diagnosticClarification({ situation: state.diagnosis.situation, goal: state.diagnosis.goal }) ?? "hasSite"];
  }
  if (state.view === "recommendation") return copy.recommendation.title;
  if (state.view === "summary") return copy.summary.title;
  if (state.view === "edit") return copy.labels.edit;
  if (state.view === "services") return copy.prompts.services;
  if (state.view === "questions") return copy.prompts.questions;
  if (state.view === "answer" && state.questionId) return copy.faq[state.questionId].question;
  return copy.greeting;
}
export function briefingAnswer(field: BriefingField, b: ProjectBriefing, copy: ChatContent): string | undefined {
  switch (field) {
    case "business": case "offer": case "currentUrl": case "details": return b[field];
    case "goal": return b.goal && b.goal !== "explore" ? copy.goals[b.goal] : undefined;
    case "action": return b.action && b.action !== "other" ? copy.actions[b.action] : undefined;
    case "pages": return joinNatural(b.pages.filter(id => id !== "unsure").map(id => copy.pages[id]), copy.message.conjunction) || undefined;
    case "improvements": return joinNatural(b.improvements.filter(id => id !== "unsure").map(id => copy.improvements[id]), copy.message.conjunction) || undefined;
    case "maintenance": return joinNatural(b.maintenance.map(id => copy.maintenance[id]), copy.message.conjunction) || undefined;
    case "materials": return b.materials && b.materials !== "unsure" ? copy.materials[b.materials] : undefined;
    case "timing": return b.timing && b.timing !== "unsure" ? copy.timing[b.timing] : undefined;
  }
}
export function getChatMessages(state: ChatState, copy: ChatContent): ChatEntry[] {
  const entries: ChatEntry[] = [{ id: "greeting", speaker: "assistant", text: copy.greeting }];
  const visitor = (id: string, text?: string) => { if (text) entries.push({ id, speaker: "visitor", text }); };
  if (state.entry) visitor("entry", copy.welcome[state.entry]);
  const d = state.diagnosis;
  if (d.situation && d.situation !== "existing") visitor("situation", copy.situations[d.situation]);
  if (d.goal) visitor("diagnostic-goal", copy.goals[d.goal]);
  const clarification = diagnosticClarification({ situation: d.situation, goal: d.goal });
  if (clarification) {
    const answer = d[clarification];
    const options = clarification === "scope" ? copy.clarifications.scope : clarification === "change" ? copy.clarifications.change : copy.clarifications.binary;
    if (answer && answer in options) visitor("clarification", (options as Record<string, string>)[answer]);
  }
  if (state.briefing.service) visitor("service", copy.services[state.briefing.service].name);
  for (const field of state.briefing.completed) {
    if (state.view === "briefing" && state.field === field) continue;
    const answer = briefingAnswer(field, state.briefing, copy);
    if (!answer) continue;
    entries.push({ id: `prompt-${field}`, speaker: "assistant", text: copy.prompts[field] });
    visitor(`answer-${field}`, answer);
  }
  if (state.view === "answer" && state.questionId) {
    visitor("faq-question", copy.faq[state.questionId].question);
    entries.push({ id: "faq-answer", speaker: "assistant", text: copy.faq[state.questionId].answer });
  }
  return entries;
}
