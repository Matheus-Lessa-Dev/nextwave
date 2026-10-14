import type { Locale } from "../config";
import type { BriefingField, DiagnosticAnswers, FAQId, GoalId, ServiceId, actionIds, pageIds, improvementIds, maintenanceIds, materialIds, timingIds } from "../../config/chat";
import type { Recommendation, Clarification } from "../../lib/service-recommendation";

export type ChatFAQSource = { faq: { items: readonly { answer: string }[] } };
export type ChatContent = {
  locale: Locale;
  panelId: string;
  title: string;
  subtitle: string;
  greeting: string;
  labels: {
    open: string; close: string; loading: string; back: string; restart: string; whatsapp: string;
    messages: string; assistant: string; visitor: string; continue: string; skip: string;
    finish: string; edit: string; resume: string; preview: string; previewHelp: string;
    resetMessage: string; send: string; service: string; goal: string; business: string;
    materials: string; timing: string; details: string; alternative: string; explore: string;
    confirmRecommendation: string; anotherQuestion: string; chooseHelp: string;
    optional: string; multiple: string; progress: string; editAnswer: string;
  };
  welcome: Record<"diagnose" | "choose" | "improve" | "questions" | "direct", string>;
  prompts: Record<BriefingField | "situation" | "diagnosticGoal" | Clarification | "services" | "questions", string>;
  placeholders: Record<"business" | "offer" | "currentUrl" | "details", string>;
  fieldLabels: Record<BriefingField, string>;
  situations: Record<Exclude<NonNullable<DiagnosticAnswers["situation"]>, "existing">, string>;
  goals: Record<GoalId, string>;
  clarifications: {
    binary: Record<"yes" | "no" | "unsure", string>;
    change: Record<"design" | "support" | "both" | "unsure", string>;
    scope: Record<ServiceId | "unsure", string>;
  };
  actions: Record<typeof actionIds[number], string>;
  pages: Record<typeof pageIds[number], string>;
  improvements: Record<typeof improvementIds[number], string>;
  maintenance: Record<typeof maintenanceIds[number], string>;
  materials: Record<typeof materialIds[number], string>;
  timing: Record<typeof timingIds[number], string>;
  services: Record<ServiceId, { name: string; description: string; explanation: string; benefits: readonly string[] }>;
  recommendation: {
    title: string; guidance: string;
    confidence: Record<Recommendation["confidence"], string>;
    reasons: Record<Recommendation["reasons"][number], string>;
  };
  summary: { title: string; description: string; scopeNote: string; empty: string };
  errors: { invalidUrl: string; tooLong: string; emptyMessage: string };
  faq: Record<FAQId, { question: string; answer: string }>;
  message: {
    greeting: string; intro: string; generic: string; closing: string;
    requests: Record<ServiceId, string>;
    business: string; offer: string; currentUrl: string; details: string;
    goals: Record<Exclude<GoalId, "explore">, string>;
    actions: Record<Exclude<typeof actionIds[number], "other">, string>;
    pages: string; pageNames: Record<Exclude<typeof pageIds[number], "unsure">, string>;
    improvements: string; improvementNames: Record<Exclude<typeof improvementIds[number], "unsure">, string>;
    maintenance: string; maintenanceNames: Record<typeof maintenanceIds[number], string>;
    materials: Record<Exclude<typeof materialIds[number], "unsure">, string>;
    timing: Record<Exclude<typeof timingIds[number], "unsure">, string>;
    conjunction: string;
  };
};
