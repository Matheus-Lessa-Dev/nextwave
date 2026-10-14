"use client";

import { useEffect, useSyncExternalStore } from "react";
import { chatBudgetIds, chatQuestionIds, chatServiceIds, chatSteps } from "@/config/chat";
import { chatReducer, initialChatState, type ChatAction, type ChatState } from "@/lib/chat";

const storageKey = "nextwave.assistant.v1";
let state = initialChatState;
let restored = false;
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
};
const getSnapshot = () => state;
const getServerSnapshot = () => initialChatState;

export function isChatState(value: unknown): value is ChatState {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  const includes = (values: readonly string[], id: unknown) => typeof id === "string" && values.includes(id);
  if (!includes(chatSteps, candidate.step)) return false;
  if (candidate.serviceId !== undefined && !includes(chatServiceIds, candidate.serviceId)) return false;
  if (candidate.budgetId !== undefined && !includes(chatBudgetIds, candidate.budgetId)) return false;
  if (candidate.questionId !== undefined && !includes(chatQuestionIds, candidate.questionId)) return false;
  if (["budget", "summary"].includes(candidate.step as string)) {
    return includes(chatServiceIds, candidate.serviceId)
      && (candidate.step !== "summary" || includes(chatBudgetIds, candidate.budgetId))
      && candidate.questionId === undefined;
  }
  if (candidate.step === "answer") return includes(chatQuestionIds, candidate.questionId)
    && candidate.serviceId === undefined && candidate.budgetId === undefined;
  return candidate.serviceId === undefined && candidate.budgetId === undefined && candidate.questionId === undefined;
}

function dispatch(action: ChatAction) {
  state = chatReducer(state, action);
  try { sessionStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* Memory preserves client navigation when storage is unavailable. */ }
  listeners.forEach(listener => listener());
}

export function useChatSession() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => {
    if (restored) return;
    restored = true;
    try {
      const saved: unknown = JSON.parse(sessionStorage.getItem(storageKey) ?? "null");
      if (isChatState(saved)) {
        // Store only locale-independent selections, never translated text.
        state = {
          step: saved.step,
          ...(saved.serviceId ? { serviceId: saved.serviceId } : {}),
          ...(saved.budgetId ? { budgetId: saved.budgetId } : {}),
          ...(saved.questionId ? { questionId: saved.questionId } : {}),
        };
        listeners.forEach(listener => listener());
      }
    } catch { /* A corrupt or blocked session cannot prevent contact. */ }
  }, []);
  return [snapshot, dispatch] as const;
}
