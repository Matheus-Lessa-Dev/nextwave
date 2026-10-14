import type { Dispatch } from "react";
import { briefingFields } from "@/config/chat";
import type { ChatAction, ChatState } from "@/lib/chat";
import { diagnosticClarification } from "@/lib/service-recommendation";
import { getAssistantMessage } from "@/lib/whatsapp-message-builder";
import type { ChatContent, WhatsAppCopy } from "@/i18n/types";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { BriefingQuestion, optionsOf } from "./BriefingQuestion";
import { ChatOptions } from "./ChatOptions";
import { ChatMessage } from "./ChatMessage";
import { ServiceChoices, ServiceRecommendation } from "./ServiceRecommendation";
import { ChatSummary } from "./ChatSummary";
import { ChatFAQ } from "./ChatFAQ";

type Props = { state: ChatState; copy: ChatContent; site: WhatsAppCopy; dispatch: Dispatch<ChatAction> };
export function ChatFlow({ state, copy, site, dispatch }: Props) {
  switch (state.view) {
    case "welcome": return <>
      <ChatOptions featuredId="diagnose" options={optionsOf(copy.welcome).filter(option => option.id !== "direct")}
        onSelect={entry => { if (entry !== "direct") dispatch({ type: "start", entry }); }} />
      <WhatsAppButton site={site} variant="secondary" className="nw-chat-direct" label={copy.welcome.direct} message={getAssistantMessage(state, copy)} />
    </>;
    case "services": return <>
      <ChatMessage labels={copy.labels} speaker="assistant" text={copy.prompts.services} />
      <ServiceChoices copy={copy} onSelect={service => dispatch({ type: "service", service, source: "manual" })} />
    </>;
    case "diagnosis": {
      if (state.diagnosticField === "situation") return <>
        <ChatMessage labels={copy.labels} speaker="assistant" text={copy.prompts.situation} />
        <ChatOptions options={optionsOf(copy.situations)} onSelect={value => dispatch({ type: "situation", value })} />
      </>;
      if (state.diagnosticField === "goal") return <>
        <ChatMessage labels={copy.labels} speaker="assistant" text={copy.prompts.diagnosticGoal} />
        <ChatOptions options={optionsOf(copy.goals)} onSelect={value => dispatch({ type: "diagnostic-goal", value })} />
      </>;
      const field = diagnosticClarification({ situation: state.diagnosis.situation, goal: state.diagnosis.goal }) ?? "hasSite";
      const options = field === "change" ? copy.clarifications.change : field === "scope" ? copy.clarifications.scope : copy.clarifications.binary;
      return <>
        <ChatMessage labels={copy.labels} speaker="assistant" text={copy.prompts[field]} />
        <ChatOptions options={optionsOf(options as Record<string, string>)} onSelect={value => dispatch({ type: "clarify", field, value })} />
      </>;
    }
    case "recommendation": return <ServiceRecommendation {...{ state, copy, dispatch }} />;
    case "briefing": return <BriefingQuestion key={state.field} {...{ state, copy, dispatch }} />;
    case "summary": return <ChatSummary {...{ state, copy, site, dispatch }} />;
    case "edit": return <ChatOptions options={[
      { id: "service" as const, label: copy.labels.service },
      ...briefingFields.filter(field => field === "goal" || ["business", "materials", "timing", "details"].includes(field)
        || (state.briefing.service === "landing" && ["offer", "action"].includes(field))
        || (state.briefing.service === "website" && field === "pages")
        || (state.briefing.service === "redesign" && ["currentUrl", "improvements"].includes(field))
        || (state.briefing.service === "maintenance" && field === "maintenance")).map(id => ({ id, label: copy.fieldLabels[id] })),
    ]} onSelect={field => dispatch({ type: "edit", field })} />;
    case "questions": return <>
      <ChatMessage labels={copy.labels} speaker="assistant" text={copy.prompts.questions} />
      <ChatFAQ answer={false} {...{ copy, dispatch }} />
    </>;
    case "answer": return <ChatFAQ answer {...{ copy, dispatch }} />;
  }
}
