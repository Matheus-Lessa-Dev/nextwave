// Stable identifiers only. Assistant copy lives in the locale dictionaries.
export const chatServiceIds = ["landing", "website", "redesign"] as const;
export const chatBudgetIds = ["up-to-1000", "1000-to-2500", "above-2500", "unknown"] as const;
export const chatQuestionIds = ["timeline", "mobile", "domain", "payment"] as const;
export const chatSteps = ["welcome", "budget", "summary", "questions", "answer", "direct"] as const;
export type ChatServiceId = typeof chatServiceIds[number];
export type ChatBudgetId = typeof chatBudgetIds[number];
export type ChatQuestionId = typeof chatQuestionIds[number];
