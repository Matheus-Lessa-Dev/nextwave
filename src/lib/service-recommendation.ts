import type { DiagnosticAnswers, ServiceId } from "../config/chat";

export type Recommendation = {
  service?: ServiceId;
  reasons: readonly ("focused-offer" | "company-presence" | "existing-design" | "existing-upkeep" | "uncertain" | "conflict")[];
  alternative?: ServiceId;
  candidates: readonly ServiceId[];
  confidence: "clear" | "tentative" | "insufficient";
};

const situationService = {
  offer: "landing", company: "website", modernize: "redesign", upkeep: "maintenance",
} as const;
const goalService = {
  "generate-leads": "landing", "present-company": "website", campaign: "landing",
  "improve-design": "redesign", "keep-updated": "maintenance",
} as const;
const reason = {
  landing: "focused-offer", website: "company-presence",
  redesign: "existing-design", maintenance: "existing-upkeep",
} as const;

function result(service: ServiceId, confidence: Recommendation["confidence"], alternative?: ServiceId): Recommendation {
  return { service, confidence, alternative, reasons: [reason[service]], candidates: [service, ...(alternative ? [alternative] : [])] };
}

/** Explicit clarification wins; contradictory or absent signals never produce a forced choice. */
export function recommendService(answers: DiagnosticAnswers): Recommendation {
  if (answers.scope && answers.scope !== "unsure") return result(answers.scope, "clear");
  if (answers.change === "design") return result("redesign", "clear");
  if (answers.change === "support") return result("maintenance", "clear");
  if (answers.change === "both") return result("redesign", "tentative", "maintenance");
  const first = answers.situation && answers.situation in situationService
    ? situationService[answers.situation as keyof typeof situationService] : undefined;
  // Lead generation is a goal shared by all four services, rather than a conflicting scope.
  const second = answers.goal === "generate-leads" && first ? first
    : answers.goal && answers.goal !== "explore" ? goalService[answers.goal] : undefined;
  if (first && second && first !== second) {
    return { confidence: "insufficient", reasons: ["conflict"], candidates: [first, second] };
  }
  const service = second ?? first;
  if (answers.hasSite === "no" && (service === "redesign" || service === "maintenance")) {
    return { confidence: "insufficient", reasons: ["conflict"], candidates: ["landing", "website"] };
  }
  if (answers.companyScope === "no" && service === "website") {
    return answers.goal === "generate-leads" ? result("landing", "tentative", "website")
      : result("website", "tentative", "landing");
  }
  if (answers.offerFocus === "no" && service === "landing") return result("landing", "tentative", "website");
  if (service) return result(service, first && second ? "clear" : "tentative",
    service === "landing" ? "website" : service === "website" ? "landing" : undefined);
  return { confidence: "insufficient", reasons: ["uncertain"],
    candidates: answers.hasSite === "yes" || answers.situation === "existing"
      ? ["redesign", "maintenance"] : ["landing", "website"] };
}

export type Clarification = "scope" | "companyScope" | "offerFocus" | "hasSite" | "change";
export function diagnosticClarification(answers: DiagnosticAnswers): Clarification | undefined {
  if (answers.situation === "existing") return "change";
  const recommendation = recommendService(answers);
  if (recommendation.reasons.includes("conflict")) return "scope";
  if (!recommendation.service) return "hasSite";
  if (recommendation.service === "website") return "companyScope";
  if (recommendation.service === "landing") return "offerFocus";
}
