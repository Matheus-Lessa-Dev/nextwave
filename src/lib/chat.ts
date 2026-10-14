import type { Locale } from "../i18n/config";
import { type BriefingField, type DiagnosticAnswers, type FAQId, type ProjectBriefing, type ServiceId } from "../config/chat";
import { createBriefing, nextBriefingField, validateBriefingText } from "./project-briefing";
import { diagnosticClarification, recommendService, type Clarification } from "./service-recommendation";

export type View = "welcome" | "services" | "diagnosis" | "recommendation" | "briefing" | "summary" | "edit" | "questions" | "answer";
export type Frame = { view: View; field?: BriefingField; diagnosticField?: "situation" | "goal" | "clarification"; questionId?: FAQId; editing?: boolean };
export type ChatState = Frame & {
  diagnosis: DiagnosticAnswers;
  briefing: ProjectBriefing;
  entry?: "diagnose" | "choose" | "improve" | "questions";
  source?: "recommended" | "manual";
  history: Frame[];
  messageEdits: Partial<Record<Locale, { base: string; text: string }>>;
};
export type ChatAction =
  | { type: "start"; entry: NonNullable<ChatState["entry"]> }
  | { type: "situation"; value: NonNullable<DiagnosticAnswers["situation"]> }
  | { type: "diagnostic-goal"; value: NonNullable<DiagnosticAnswers["goal"]> }
  | { type: "clarify"; field: Clarification; value: string }
  | { type: "service"; service: ServiceId; source: "manual" | "recommended" }
  | { type: "answer"; field: BriefingField; value: string | readonly string[] }
  | { type: "draft"; field: BriefingField; value: string | readonly string[] }
  | { type: "edit"; field: BriefingField | "service" }
  | { type: "question"; id: FAQId }
  | { type: "message"; locale: Locale; base: string; text: string }
  | { type: "back" | "restart" | "services" | "questions" | "finish" | "resume" | "edit-menu" };

export const initialChatState: ChatState = { view: "welcome", diagnosis: {}, briefing: createBriefing(), history: [], messageEdits: {} };
function frame(state: ChatState): Frame {
  return { view: state.view, field: state.field, diagnosticField: state.diagnosticField, questionId: state.questionId, editing: state.editing };
}
function navigate(state: ChatState, target: Frame): ChatState {
  return { ...state, field: undefined, diagnosticField: undefined, questionId: undefined, editing: undefined,
    ...target, history: [...state.history.slice(-19), frame(state)] };
}
function chooseService(state: ChatState, service: ServiceId, source: ChatState["source"]): ChatState {
  const same = state.briefing.service === service;
  const briefing: ProjectBriefing = { ...state.briefing, service,
    ...(!same ? { offer: undefined, action: undefined, currentUrl: undefined, pages: [], improvements: [], maintenance: [],
      completed: state.briefing.completed.filter(field => ["business", "goal", "materials", "timing", "details"].includes(field)) } : {}),
  };
  const field = nextBriefingField(briefing);
  return navigate({ ...state, briefing, source, messageEdits: {} }, state.editing || !field
    ? { view: "summary" } : { view: "briefing", field });
}

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "restart": return { ...initialChatState, briefing: createBriefing() };
    case "back": {
      const previous = state.history.at(-1);
      return previous ? { ...state, field: undefined, diagnosticField: undefined, questionId: undefined, editing: undefined,
        ...previous, history: state.history.slice(0, -1) } : initialChatState;
    }
    case "start": {
      const updated = { ...state, entry: action.entry, diagnosis: action.entry === "improve" ? { situation: "existing" as const } : {} };
      if (action.entry === "choose") return navigate(updated, { view: "services" });
      if (action.entry === "questions") return navigate(updated, { view: "questions" });
      return navigate(updated, { view: "diagnosis", diagnosticField: action.entry === "improve" ? "clarification" : "situation" });
    }
    case "situation": return navigate({ ...state, diagnosis: { situation: action.value } }, { view: "diagnosis", diagnosticField: "goal" });
    case "diagnostic-goal": {
      const diagnosis = { situation: state.diagnosis.situation, goal: action.value };
      const briefing = { ...state.briefing, goal: action.value, completed: state.briefing.completed.filter(field => field !== "goal") };
      return navigate({ ...state, diagnosis, briefing, messageEdits: {} }, diagnosticClarification(diagnosis)
        ? { view: "diagnosis", diagnosticField: "clarification" } : { view: "recommendation" });
    }
    case "clarify": {
      const diagnosis: DiagnosticAnswers = { ...state.diagnosis, [action.field]: action.value };
      if (action.field === "change" && action.value !== "unsure") {
        diagnosis.goal = action.value === "support" ? "keep-updated" : "improve-design";
      }
      const briefing = action.field === "change" && action.value !== "unsure"
        ? { ...state.briefing, goal: diagnosis.goal } : state.briefing;
      return navigate({ ...state, diagnosis, briefing, messageEdits: {} }, { view: "recommendation" });
    }
    case "service": return chooseService(state, action.service, action.source);
    case "services": return navigate(state, { view: "services" });
    case "questions": return navigate(state, { view: "questions" });
    case "question": return navigate(state, { view: "answer", questionId: action.id });
    case "finish": return navigate(state, { view: "summary" });
    case "edit-menu": return navigate(state, { view: "edit" });
    case "edit": return navigate(state, action.field === "service" ? { view: "services", editing: true }
      : { view: "briefing", field: action.field, editing: true });
    case "resume": {
      const field = nextBriefingField(state.briefing);
      return field ? navigate(state, { view: "briefing", field }) : state;
    }
    case "draft": {
      if (state.view !== "briefing" || state.field !== action.field) return state;
      const value = typeof action.value === "string" ? action.value : [...action.value];
      return { ...state, briefing: { ...state.briefing, [action.field]: value }, messageEdits: {} };
    }
    case "answer": {
      if (state.view !== "briefing" || state.field !== action.field) return state;
      if (typeof action.value === "string" && action.field in textLimitsForAnswer
        && validateBriefingText(action.field as keyof typeof textLimitsForAnswer, action.value)) return state;
      const value = typeof action.value === "string" ? action.value.trim() || undefined : [...action.value];
      const briefing = { ...state.briefing, [action.field]: value,
        completed: [...new Set([...state.briefing.completed, action.field])] };
      const field = nextBriefingField(briefing);
      return navigate({ ...state, briefing, messageEdits: {} }, !state.editing && field
        ? { view: "briefing", field } : { view: "summary" });
    }
    case "message": return { ...state, messageEdits: { ...state.messageEdits,
      [action.locale]: { base: action.base, text: action.text.slice(0, 2000) } } };
  }
}
const textLimitsForAnswer = { business: true, offer: true, currentUrl: true, details: true } as const;
export { recommendService };
