export const serviceIds = ["landing", "website", "redesign", "maintenance"] as const;
export type ServiceId = typeof serviceIds[number];
export const situationIds = ["offer", "company", "modernize", "upkeep", "unsure", "existing"] as const;
export type SituationId = typeof situationIds[number];
export const goalIds = ["generate-leads", "present-company", "campaign", "improve-design", "keep-updated", "explore"] as const;
export type GoalId = typeof goalIds[number];
export const pageIds = ["about", "services", "portfolio", "contact", "unsure"] as const;
export const improvementIds = ["visual", "navigation", "mobile", "organization", "performance", "unsure"] as const;
export const maintenanceIds = ["content", "fixes", "periodic", "improvements", "guidance"] as const;
export const actionIds = ["whatsapp", "quote", "booking", "offer", "other"] as const;
export const materialIds = ["ready", "partial", "prepare", "unsure"] as const;
export const timingIds = ["asap", "weeks", "months", "unsure"] as const;
export const faqIds = ["difference", "timeline", "mobile", "domain", "hosting", "materials", "maintenance", "hiring", "quote", "payment"] as const;
export type FAQId = typeof faqIds[number];
export const briefingFields = ["business", "goal", "offer", "action", "pages", "currentUrl", "improvements", "maintenance", "materials", "timing", "details"] as const;
export type BriefingField = typeof briefingFields[number];
export type DiagnosticAnswers = {
  situation?: SituationId;
  goal?: GoalId;
  companyScope?: "yes" | "no" | "unsure";
  offerFocus?: "yes" | "no" | "unsure";
  hasSite?: "yes" | "no" | "unsure";
  change?: "design" | "support" | "both" | "unsure";
  scope?: ServiceId | "unsure";
};
export type ProjectBriefing = {
  service?: ServiceId;
  business?: string;
  goal?: GoalId;
  offer?: string;
  action?: typeof actionIds[number];
  pages: (typeof pageIds[number])[];
  currentUrl?: string;
  improvements: (typeof improvementIds[number])[];
  maintenance: (typeof maintenanceIds[number])[];
  materials?: typeof materialIds[number];
  timing?: typeof timingIds[number];
  details?: string;
  completed: BriefingField[];
};
export const textLimits = { business: 160, offer: 240, currentUrl: 300, details: 600, message: 2000 } as const;
export const serviceFields: Record<ServiceId, readonly BriefingField[]> = {
  landing: ["offer", "action"],
  website: ["pages"],
  redesign: ["currentUrl", "improvements"],
  maintenance: ["maintenance"],
};
export const serviceGoals: Record<ServiceId, readonly GoalId[]> = {
  landing: ["generate-leads", "campaign", "explore"],
  website: ["present-company", "generate-leads", "explore"],
  redesign: ["improve-design", "generate-leads", "explore"],
  maintenance: ["keep-updated", "improve-design", "explore"],
};
