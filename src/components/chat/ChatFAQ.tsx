import type { Dispatch } from "react";
import { faqIds } from "@/config/chat";
import type { ChatAction } from "@/lib/chat";
import type { ChatContent } from "@/i18n/types";
import { ChatOptions } from "./ChatOptions";

export function ChatFAQ({ answer, copy, dispatch }: { answer: boolean; copy: ChatContent; dispatch: Dispatch<ChatAction> }) {
  return answer ? <ChatOptions options={[
    { id: "questions", label: copy.labels.anotherQuestion },
    { id: "diagnose", label: copy.labels.chooseHelp },
  ] as const} onSelect={id => dispatch(id === "questions" ? { type: "questions" } : { type: "start", entry: "diagnose" })} />
    : <ChatOptions options={faqIds.map(id => ({ id, label: copy.faq[id].question }))} onSelect={id => dispatch({ type: "question", id })} />;
}
