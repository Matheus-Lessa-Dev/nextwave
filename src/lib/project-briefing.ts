import { serviceFields, textLimits, type BriefingField, type ProjectBriefing } from "../config/chat";

export function createBriefing(): ProjectBriefing {
  return { pages: [], improvements: [], maintenance: [], completed: [] };
}

export function getBriefingFields(briefing: ProjectBriefing): BriefingField[] {
  return ["business", ...(!briefing.goal ? ["goal" as const] : []),
    ...(briefing.service ? serviceFields[briefing.service] : []), "materials", "timing", "details"];
}

export function nextBriefingField(briefing: ProjectBriefing): BriefingField | undefined {
  return getBriefingFields(briefing).find(field => !briefing.completed.includes(field));
}

export function validateBriefingText(field: keyof typeof textLimits, value: string): "tooLong" | "invalidUrl" | undefined {
  if (value.length > textLimits[field]) return "tooLong";
  if (field !== "currentUrl" || !value.trim()) return;
  try {
    const url = new URL(value.includes("://") ? value.trim() : `https://${value.trim()}`);
    if (!["http:", "https:"].includes(url.protocol) || !url.hostname.includes(".") || /\s/.test(value)) return "invalidUrl";
  } catch { return "invalidUrl"; }
}
