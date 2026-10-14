"use client";

import dynamic from "next/dynamic";
import { MessageCircle, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { createContext, useCallback, useContext, useRef, useState } from "react";
import type { ChatContent, WhatsAppCopy } from "@/i18n/types";
import "./chat.css";
import { useChatSession } from "@/lib/chat-store";

const ChatCopyContext = createContext<ChatContent | null>(null);

function ChatLoading() {
  const copy = useContext(ChatCopyContext);
  return copy ? <div id={copy.panelId} className="nw-chat-loading" role="status">{copy.labels.loading}</div> : null;
}

const ChatPanel = dynamic(() => import("./ChatPanel").then(module => module.ChatPanel), {
  ssr: false,
  loading: ChatLoading,
});

export function FloatingChat({ chatConfig, site }: { chatConfig: ChatContent; site: WhatsAppCopy }) {
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useChatSession();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="nw-chat-dock" onKeyDown={event => {
      if (open && event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        close();
      }
    }}>
      <ChatCopyContext value={chatConfig}>
        <AnimatePresence>{open && <ChatPanel key="chat-panel" chatConfig={chatConfig} site={site} state={state} dispatch={dispatch} onClose={close} />}</AnimatePresence>
      </ChatCopyContext>
      <button
        ref={triggerRef}
        className="nw-chat-trigger"
        type="button"
        aria-label={open ? chatConfig.labels.close : chatConfig.labels.open}
        aria-expanded={open}
        aria-controls={open ? chatConfig.panelId : undefined}
        onClick={() => open ? close() : setOpen(true)}
      >
        {open ? <X size={25} aria-hidden="true" /> : <MessageCircle size={25} aria-hidden="true" />}
      </button>
    </div>
  );
}
