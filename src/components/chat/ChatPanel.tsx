"use client";

import Image from "next/image";
import { ArrowLeft, CircleHelp, RotateCcw, X } from "lucide-react";
import { LazyMotion, domAnimation, m, useIsPresent, useReducedMotion } from "motion/react";
import { useEffect, useRef, type Dispatch } from "react";
import type { ChatContent, WhatsAppCopy } from "@/i18n/types";
import type { ChatAction, ChatState } from "@/lib/chat";
import { getChatMessages, getStageLabel } from "@/lib/chat-content";
import { getAssistantMessage } from "@/lib/whatsapp-message-builder";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ChatMessage } from "./ChatMessage";
import { ChatFlow } from "./ChatFlow";

type Props = { chatConfig: ChatContent; site: WhatsAppCopy; state: ChatState; dispatch: Dispatch<ChatAction>; onClose: () => void };
export function ChatPanel({ state, dispatch, onClose, chatConfig: copy, site }: Props) {
  const reducedMotion = useReducedMotion();
  const isPresent = useIsPresent();
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  const stageKey = [state.view, state.field, state.diagnosticField, state.questionId, copy.locale].join(":");
  useEffect(() => {
    if (!isPresent) { mounted.current = false; return; }
    const target = !mounted.current ? closeRef.current
      : stageRef.current?.querySelector<HTMLElement>("textarea, input, button, a") ?? stageRef.current;
    mounted.current = true;
    target?.focus({ preventScroll: true });
    const scroll = scrollRef.current;
    if (scroll) {
      // Reveal the current question without jumping the page or moving focus during typing.
      scroll.scrollTop = state.view === "welcome" ? 0 : Math.max(0, (stageRef.current?.offsetTop ?? 0) - scroll.offsetTop - 12);
      if (target && scroll.contains(target)) {
        const bounds = target.getBoundingClientRect(), viewport = scroll.getBoundingClientRect();
        if (bounds.height > viewport.height - 16) scroll.scrollTop += bounds.top - viewport.top - 8;
        else if (bounds.top < viewport.top + 8) scroll.scrollTop -= viewport.top + 8 - bounds.top;
        else if (bounds.bottom > viewport.bottom - 8) scroll.scrollTop += bounds.bottom - viewport.bottom + 8;
      }
    }
  }, [stageKey, isPresent, state.view]);

  return (
    <LazyMotion features={domAnimation} strict>
      <m.section id={copy.panelId} className="nw-chat-panel" role="dialog" aria-modal="false"
        aria-labelledby="nextwave-chat-title" aria-describedby="nextwave-chat-subtitle"
        aria-hidden={!isPresent} inert={!isPresent}
        initial={reducedMotion ? false : { opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.97, y: reducedMotion ? 0 : 8 }}
        transition={{ duration: reducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}>
        <header className="nw-chat-header">
          <Image src="/logo.svg" alt="" width={36} height={36} className="nw-chat-logo" />
          <div><h2 id="nextwave-chat-title">{copy.title}</h2><p id="nextwave-chat-subtitle">{copy.subtitle}</p></div>
          <button ref={closeRef} className="nw-chat-close" type="button" aria-label={copy.labels.close} onClick={onClose}><X size={19} aria-hidden="true" /></button>
        </header>
        <div ref={scrollRef} className="nw-chat-scroll">
          <div className="nw-chat-messages" role="log" aria-label={copy.labels.messages} aria-live="polite" aria-relevant="additions text">
            {getChatMessages(state, copy).map(entry => <ChatMessage labels={copy.labels} key={entry.id} {...entry} />)}
          </div>
          <div ref={stageRef} className="nw-chat-stage" role="group" aria-label={getStageLabel(state, copy)} tabIndex={-1}>
            <m.div key={stageKey} initial={reducedMotion ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.16 }}>
              <ChatFlow state={state} copy={copy} site={site} dispatch={dispatch} />
            </m.div>
          </div>
        </div>
        <footer className="nw-chat-footer">
          <div className="nw-chat-tools">
            <button type="button" aria-label={copy.labels.back} disabled={state.history.length === 0} onClick={() => dispatch({ type: "back" })}><ArrowLeft size={15} aria-hidden="true" />{copy.labels.back}</button>
            <button type="button" className="nw-chat-faq-shortcut" aria-label={copy.welcome.questions} title={copy.welcome.questions} onClick={() => dispatch({ type: "questions" })}><CircleHelp size={17} aria-hidden="true" /></button>
            <button type="button" aria-label={copy.labels.restart} disabled={state.view === "welcome" && state.history.length === 0} onClick={() => dispatch({ type: "restart" })}><RotateCcw size={15} aria-hidden="true" />{copy.labels.restart}</button>
          </div>
          <WhatsAppButton site={site} variant="secondary" label={copy.labels.whatsapp} message={getAssistantMessage(state, copy)} className="nw-chat-contact-button" />
        </footer>
      </m.section>
    </LazyMotion>
  );
}
