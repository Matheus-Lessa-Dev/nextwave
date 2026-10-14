"use client";

import Image from "next/image";
import { ArrowLeft, RotateCcw, X } from "lucide-react";
import { LazyMotion, domAnimation, m, useIsPresent, useReducedMotion } from "motion/react";
import { useEffect, useRef, type Dispatch } from "react";
import type { ChatContent, WhatsAppCopy } from "@/i18n/types";
import { getAssistantMessage, getChatMessages, getChatSelection, type ChatAction, type ChatState } from "@/lib/chat";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ChatMessage } from "./ChatMessage";
import { ChatOptions } from "./ChatOptions";

type Props = { chatConfig: ChatContent; site: WhatsAppCopy; state: ChatState; dispatch: Dispatch<ChatAction>; onClose: () => void };

export function ChatPanel({ state, dispatch, onClose, chatConfig, site }: Props) {
  const reducedMotion = useReducedMotion();
  const isPresent = useIsPresent();
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  const message = getAssistantMessage(state, chatConfig);
  const { service, budget } = getChatSelection(state, chatConfig);
  const contactAvailable = getWhatsAppLink(message) !== null;

  useEffect(() => {
    if (!isPresent) {
      mounted.current = false;
      return;
    }
    let target: HTMLElement | null = closeRef.current;
    if (!mounted.current) {
      closeRef.current?.focus({ preventScroll: true });
      mounted.current = true;
    } else {
      target = stageRef.current?.querySelector<HTMLButtonElement>("button") ?? stageRef.current;
      target?.focus({ preventScroll: true });
    }
    const scroll = scrollRef.current;
    if (scroll) {
      scroll.scrollTop = state.step === "welcome" ? 0 : scroll.scrollHeight;
      // A rolagem do histórico não deve esconder a opção que recebeu o foco.
      if (target && scroll.contains(target)) {
        const bounds = target.getBoundingClientRect();
        const viewport = scroll.getBoundingClientRect();
        if (bounds.top < viewport.top + 8) scroll.scrollTop -= viewport.top + 8 - bounds.top;
        else if (bounds.bottom > viewport.bottom - 8) scroll.scrollTop += bounds.bottom - viewport.bottom + 8;
      }
    }
  }, [state, isPresent]);

  return (
    <LazyMotion features={domAnimation} strict>
      <m.section
        id={chatConfig.panelId}
        className="nw-chat-panel"
        role="dialog"
        aria-modal="false"
        aria-labelledby="nextwave-chat-title"
        aria-describedby="nextwave-chat-subtitle"
        aria-hidden={!isPresent}
        inert={!isPresent}
        initial={reducedMotion ? false : { opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.97, y: reducedMotion ? 0 : 8 }}
        transition={{ duration: reducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className="nw-chat-header">
          <Image src="/logo.svg" alt="" width={36} height={36} className="nw-chat-logo" />
          <div><h2 id="nextwave-chat-title">{chatConfig.title}</h2><p id="nextwave-chat-subtitle">{chatConfig.subtitle}</p></div>
          <button ref={closeRef} className="nw-chat-close" type="button" aria-label={chatConfig.labels.close} onClick={onClose}><X size={19} aria-hidden="true" /></button>
        </header>

        <div ref={scrollRef} className="nw-chat-scroll">
          <div className="nw-chat-messages" role="log" aria-label={chatConfig.labels.messages} aria-live="polite" aria-relevant="additions text">
            {getChatMessages(state, chatConfig).map(entry => <ChatMessage labels={chatConfig.labels} key={entry.id} {...entry} />)}
          </div>
          <div ref={stageRef} className="nw-chat-stage" role="group" aria-label={chatConfig.stageLabels[state.step]} tabIndex={-1}>
            <p className="nw-chat-stage-label">{chatConfig.stageLabels[state.step]}</p>
            {state.step === "welcome" && <ChatOptions options={[...chatConfig.services, chatConfig.doubtsOption]} onSelect={id => dispatch(id === "questions" ? { type: "questions" } : { type: "service", id })} />}
            {state.step === "budget" && <><p className="nw-chat-note">{chatConfig.budgetNote}</p><ChatOptions options={chatConfig.budgets} onSelect={id => dispatch({ type: "budget", id })} /></>}
            {state.step === "questions" && <ChatOptions options={chatConfig.questions} onSelect={id => dispatch(id === "direct" ? { type: "direct" } : { type: "question", id })} />}
            {state.step === "answer" && <ChatOptions options={[chatConfig.otherQuestionOption]} onSelect={() => dispatch({ type: "questions" })} />}
            {state.step === "summary" && <dl className="nw-chat-summary">
              <div><dt>{chatConfig.labels.service}</dt><dd>{service?.service}</dd></div>
              <div><dt>{chatConfig.labels.budget}</dt><dd>{budget?.label}</dd></div>
            </dl>}
          </div>
        </div>

        <footer className="nw-chat-footer">
          <div className="nw-chat-tools">
            <button type="button" disabled={state.step === "welcome"} onClick={() => dispatch({ type: "back" })}><ArrowLeft size={15} aria-hidden="true" />{chatConfig.labels.back}</button>
            <button type="button" disabled={state.step === "welcome"} onClick={() => dispatch({ type: "restart" })}><RotateCcw size={15} aria-hidden="true" />{chatConfig.labels.restart}</button>
          </div>
          <WhatsAppButton site={site} label={chatConfig.labels.whatsapp} message={message} className="nw-chat-contact-button" />
          {!contactAvailable && <p className="nw-chat-pending" role="status">{chatConfig.contactPending}</p>}
        </footer>
      </m.section>
    </LazyMotion>
  );
}
