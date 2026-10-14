import type { ChatContent } from "@/i18n/types";
import type { ChatEntry } from "@/lib/chat-content";

export function ChatMessage({ speaker, text, labels }: Pick<ChatEntry, "speaker" | "text"> & { labels: ChatContent["labels"] }) {
  return (
    <div className={`nw-chat-message ${speaker === "visitor" ? "nw-chat-visitor-message" : "nw-chat-assistant-message"}`}>
      <span className="nw-chat-speaker">{speaker === "visitor" ? labels.visitor : labels.assistant}</span>
      <p>{text}</p>
    </div>
  );
}
