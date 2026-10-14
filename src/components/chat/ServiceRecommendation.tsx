import { Globe2, Layers3, MousePointer2, Wrench } from "lucide-react";
import type { Dispatch } from "react";
import { serviceIds, type ServiceId } from "@/config/chat";
import type { ChatContent } from "@/i18n/types";
import type { ChatAction, ChatState } from "@/lib/chat";
import { recommendService } from "@/lib/service-recommendation";
import { ChatOptions } from "./ChatOptions";

const icons = { landing: MousePointer2, website: Globe2, redesign: Layers3, maintenance: Wrench };

export function ServiceChoices({ copy, onSelect, ids = serviceIds }: {
  copy: ChatContent; onSelect: (service: ServiceId) => void; ids?: readonly ServiceId[];
}) {
  return <ChatOptions options={ids.map(id => ({ id, label: copy.services[id].name, description: copy.services[id].description }))} onSelect={onSelect} />;
}

export function ServiceRecommendation({ state, copy, dispatch }: { state: ChatState; copy: ChatContent; dispatch: Dispatch<ChatAction> }) {
  const recommendation = recommendService(state.diagnosis);
  const service = recommendation.service;
  const Icon = service ? icons[service] : Globe2;
  return (
    <div className="nw-chat-recommendation">
      <div className="nw-chat-recommendation-heading"><Icon size={23} aria-hidden="true" /><span>{copy.recommendation.confidence[recommendation.confidence]}</span></div>
      <h3>{copy.recommendation.title}</h3>
      {recommendation.reasons.map(reason => <p key={reason}>{copy.recommendation.reasons[reason]}</p>)}
      {service ? <>
        <h4>{copy.services[service].name}</h4>
        <p>{copy.services[service].explanation}</p>
        <ul>{copy.services[service].benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul>
        {recommendation.alternative && <p className="nw-chat-note">{copy.labels.alternative}: {copy.services[recommendation.alternative].name} — {copy.services[recommendation.alternative].description}</p>}
        <button type="button" className="nw-chat-primary" onClick={() => dispatch({ type: "service", service, source: "recommended" })}>{copy.labels.confirmRecommendation}</button>
      </> : <ServiceChoices copy={copy} ids={recommendation.candidates} onSelect={service => dispatch({ type: "service", service, source: "manual" })} />}
      <p className="nw-chat-note">{copy.recommendation.guidance}</p>
      <button type="button" className="nw-chat-link" onClick={() => dispatch({ type: "services" })}>{copy.labels.explore}</button>
    </div>
  );
}
