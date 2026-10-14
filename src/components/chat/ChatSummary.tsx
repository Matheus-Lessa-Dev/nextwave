"use client";

import { Pencil } from "lucide-react";
import { useState, type Dispatch } from "react";
import type { ChatContent, WhatsAppCopy } from "@/i18n/types";
import type { ChatAction, ChatState } from "@/lib/chat";
import { briefingFields, textLimits } from "@/config/chat";
import { briefingAnswer } from "@/lib/chat-content";
import { nextBriefingField } from "@/lib/project-briefing";
import { buildWhatsAppMessage } from "@/lib/whatsapp-message-builder";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

function MessagePreview({ generated, initial, copy, site, dispatch }: {
  generated: string; initial: string; copy: ChatContent; site: WhatsAppCopy; dispatch: Dispatch<ChatAction>;
}) {
  const [draft, setDraft] = useState(initial);
  const valid = draft.trim().length > 0;
  return (
    <div className="nw-chat-preview">
      <label htmlFor="nw-chat-message-preview">{copy.labels.preview}</label>
      <p id="nw-chat-preview-help" className="nw-chat-note">{copy.labels.previewHelp}</p>
      <textarea id="nw-chat-message-preview" value={draft} rows={7} maxLength={textLimits.message}
        aria-describedby="nw-chat-preview-help" aria-invalid={!valid}
        onChange={event => setDraft(event.target.value)}
        onBlur={() => dispatch({ type: "message", locale: copy.locale, base: generated, text: draft })} />
      {!valid && <p role="alert" className="nw-chat-error">{copy.errors.emptyMessage}</p>}
      <button type="button" className="nw-chat-link" onClick={() => {
        setDraft(generated); dispatch({ type: "message", locale: copy.locale, base: generated, text: generated });
      }}>{copy.labels.resetMessage}</button>
      {valid && <WhatsAppButton site={site} label={copy.labels.send} message={draft.trim()} className="nw-chat-contact-button" />}
    </div>
  );
}

export function ChatSummary({ state, copy, site, dispatch }: { state: ChatState; copy: ChatContent; site: WhatsAppCopy; dispatch: Dispatch<ChatAction> }) {
  const generated = buildWhatsAppMessage(state.briefing, copy);
  const edit = state.messageEdits[copy.locale];
  const initial = edit?.base === generated ? edit.text : generated;
  const rows = briefingFields.map(field => ({ field, value: briefingAnswer(field, state.briefing, copy) })).filter(row => row.value);
  return (
    <>
      <h3 className="nw-chat-summary-title">{copy.summary.title}</h3>
      <p className="nw-chat-note">{copy.summary.description}</p>
      <dl className="nw-chat-summary">
        {state.briefing.service && <div><dt>{copy.labels.service}</dt><dd>{copy.services[state.briefing.service].name}</dd>
          <button type="button" aria-label={copy.labels.editAnswer.replace("{field}", copy.labels.service)} onClick={() => dispatch({ type: "edit", field: "service" })}><Pencil size={15} aria-hidden="true" /></button>
        </div>}
        {rows.map(({ field, value }) => <div key={field}><dt>{copy.fieldLabels[field]}</dt><dd>{value}</dd>
          <button type="button" aria-label={copy.labels.editAnswer.replace("{field}", copy.fieldLabels[field])} onClick={() => dispatch({ type: "edit", field })}><Pencil size={15} aria-hidden="true" /></button>
        </div>)}
        {!state.briefing.service && rows.length === 0 && <div><dt>{copy.summary.empty}</dt></div>}
      </dl>
      <div className="nw-chat-step-tools">
        <button type="button" className="nw-chat-link" onClick={() => dispatch({ type: "edit-menu" })}>{copy.labels.edit}</button>
        {state.briefing.service && nextBriefingField(state.briefing) && <button type="button" className="nw-chat-link" onClick={() => dispatch({ type: "resume" })}>{copy.labels.resume}</button>}
      </div>
      <p className="nw-chat-note">{copy.summary.scopeNote}</p>
      <MessagePreview key={copy.locale + generated} {...{ generated, initial, copy, site, dispatch }} />
    </>
  );
}
