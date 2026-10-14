"use client";

import { useEffect, useSyncExternalStore } from "react";
import { chatReducer, initialChatState, type ChatAction } from "./chat";
import { migrateLegacyChat, restoreChatSession } from "./chat-session";

const storageKey = "nextwave.assistant.v2.2";
let state = initialChatState;
let restored = false;
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
};
const getSnapshot = () => state;
const getServerSnapshot = () => initialChatState;
function persist() {
  try { sessionStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* Memory still preserves client navigation. */ }
}
function dispatch(action: ChatAction) {
  const next = chatReducer(state, action);
  if (next === state) return;
  state = next;
  persist();
  listeners.forEach(listener => listener());
}
export function useChatSession() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => {
    if (restored) return;
    restored = true;
    try {
      const saved = sessionStorage.getItem(storageKey);
      state = saved ? restoreChatSession(saved) : migrateLegacyChat(sessionStorage.getItem("nextwave.assistant.v1"));
      sessionStorage.removeItem("nextwave.assistant.v1");
      persist();
      listeners.forEach(listener => listener());
    } catch { /* A blocked session cannot prevent a conversation. */ }
  }, []);
  return [snapshot, dispatch] as const;
}
