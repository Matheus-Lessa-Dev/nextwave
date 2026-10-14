import { actionIds, briefingFields, faqIds, goalIds, improvementIds, maintenanceIds, materialIds, pageIds, serviceIds, situationIds, textLimits, timingIds } from "../config/chat";
import { locales } from "../i18n/config";
import { initialChatState, type ChatState } from "./chat";

const views = ["welcome", "services", "diagnosis", "recommendation", "briefing", "summary", "edit", "questions", "answer"];
const record = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value);
const id = (value: unknown, values: readonly string[]) => typeof value === "string" && values.includes(value);
const optionalId = (value: unknown, values: readonly string[]) => value === undefined || id(value, values);
const ids = (value: unknown, values: readonly string[]) => Array.isArray(value) && value.length <= values.length
  && new Set(value).size === value.length && value.every(item => id(item, values));
function validFrame(value: unknown): boolean {
  return record(value) && id(value.view, views)
    && optionalId(value.field, briefingFields) && optionalId(value.questionId, faqIds)
    && optionalId(value.diagnosticField, ["situation", "goal", "clarification"])
    && (value.editing === undefined || typeof value.editing === "boolean")
    && (value.view !== "briefing" || id(value.field, briefingFields))
    && (value.view !== "answer" || id(value.questionId, faqIds))
    && (value.view !== "diagnosis" || id(value.diagnosticField, ["situation", "goal", "clarification"]));
}
export function isChatState(value: unknown): value is ChatState {
  if (!record(value) || !validFrame(value) || !record(value.diagnosis) || !record(value.briefing)
    || !record(value.messageEdits) || !Array.isArray(value.history) || value.history.length > 20
    || !value.history.every(validFrame)) return false;
  const d = value.diagnosis, b = value.briefing;
  if (!optionalId(d.situation, situationIds) || !optionalId(d.goal, goalIds)
    || !optionalId(d.scope, [...serviceIds, "unsure"]) || !optionalId(d.change, ["design", "support", "both", "unsure"])
    || !["companyScope", "offerFocus", "hasSite"].every(key => optionalId(d[key], ["yes", "no", "unsure"]))) return false;
  if (!optionalId(b.service, serviceIds) || !optionalId(b.goal, goalIds) || !optionalId(b.action, actionIds)
    || !optionalId(b.materials, materialIds) || !optionalId(b.timing, timingIds)
    || !ids(b.pages, pageIds) || !ids(b.improvements, improvementIds) || !ids(b.maintenance, maintenanceIds)
    || !ids(b.completed, briefingFields)) return false;
  for (const field of ["business", "offer", "currentUrl", "details"] as const) {
    if (b[field] !== undefined && (typeof b[field] !== "string" || b[field].length > textLimits[field])) return false;
  }
  if (value.view === "briefing" && !id(b.service, serviceIds)) return false;
  if (!optionalId(value.entry, ["diagnose", "choose", "improve", "questions"])
    || !optionalId(value.source, ["recommended", "manual"])) return false;
  return Object.entries(value.messageEdits).every(([locale, edit]) => id(locale, locales) && record(edit)
    && typeof edit.text === "string" && edit.text.length <= textLimits.message
    && typeof edit.base === "string" && edit.base.length <= 4000);
}

export function restoreChatSession(raw: string | null): ChatState {
  if (!raw || raw.length > 24000) return initialChatState;
  try {
    const value: unknown = JSON.parse(raw);
    return isChatState(value) ? value : initialChatState;
  } catch { return initialChatState; }
}

/** Preserve an old service choice; the removed budget is deliberately not migrated. */
export function migrateLegacyChat(raw: string | null): ChatState {
  if (!raw || raw.length > 1000) return initialChatState;
  try {
    const value: unknown = JSON.parse(raw);
    if (record(value) && id(value.serviceId, serviceIds)) {
      return { ...initialChatState, view: "briefing", field: "business", source: "manual",
        briefing: { ...initialChatState.briefing, service: value.serviceId as ChatState["briefing"]["service"] } };
    }
  } catch { /* A previous session is optional. */ }
  return initialChatState;
}
