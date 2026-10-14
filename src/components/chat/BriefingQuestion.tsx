"use client";

import { useState, type Dispatch } from "react";
import { textLimits, serviceGoals } from "@/config/chat";
import type { ChatContent } from "@/i18n/types";
import type { ChatAction, ChatState } from "@/lib/chat";
import { getBriefingFields, validateBriefingText } from "@/lib/project-briefing";
import { ChatOptions } from "./ChatOptions";
import { ChatMessage } from "./ChatMessage";

export function optionsOf<T extends string>(options: Record<T, string>) {
  return (Object.entries(options) as [T, string][]).map(([id, label]) => ({ id, label }));
}
type Props = { state: ChatState; copy: ChatContent; dispatch: Dispatch<ChatAction> };

function TextAnswer({ state, copy, dispatch, field }: Props & { field: "business" | "offer" | "currentUrl" | "details" }) {
  const [error, setError] = useState<"invalidUrl" | "tooLong">();
  const value = state.briefing[field] ?? "";
  const id = `nw-chat-input-${field}`;
  return (
    <form className="nw-chat-form" onSubmit={event => {
      event.preventDefault();
      const error = validateBriefingText(field, value);
      if (error) { setError(error); return; }
      dispatch({ type: "answer", field, value });
    }}>
      <label htmlFor={id} className="sr-only">{copy.prompts[field]}</label>
      <textarea id={id} value={value} rows={field === "details" ? 3 : 2} maxLength={textLimits[field]}
        placeholder={copy.placeholders[field]} inputMode={field === "currentUrl" ? "url" : "text"}
        autoCapitalize={field === "currentUrl" ? "none" : "sentences"} spellCheck={field !== "currentUrl"}
        aria-invalid={!!error} aria-describedby={error ? id + "-error" : undefined}
        onChange={event => { setError(undefined); dispatch({ type: "draft", field, value: event.target.value }); }} />
      {error && <p id={id + "-error"} role="alert" className="nw-chat-error">{copy.errors[error]}</p>}
      <button type="submit" className="nw-chat-primary">{copy.labels.continue}</button>
    </form>
  );
}
function MultipleAnswer({ state, copy, dispatch, field }: Props & { field: "pages" | "improvements" | "maintenance" }) {
  const options = optionsOf(copy[field] as Record<string, string>);
  const selected: readonly string[] = state.briefing[field];
  return (
    <div>
      <p className="nw-chat-note">{copy.labels.multiple}</p>
      <div className="nw-chat-checkboxes">
        {options.map(option => <label key={option.id}>
          <input type="checkbox" checked={selected.includes(option.id)} onChange={() => {
            const values = selected.includes(option.id) ? selected.filter(id => id !== option.id)
              : option.id === "unsure" ? ["unsure"] : [...selected.filter(id => id !== "unsure"), option.id];
            dispatch({ type: "draft", field, value: values });
          }} /><span>{option.label}</span>
        </label>)}
      </div>
      <button type="button" className="nw-chat-primary" onClick={() => dispatch({ type: "answer", field, value: selected })}>{copy.labels.continue}</button>
    </div>
  );
}

export function BriefingQuestion({ state, copy, dispatch }: Props) {
  const field = state.field;
  if (!field || !state.briefing.service) return null;
  const fields = getBriefingFields(state.briefing);
  const progressFields = [...new Set([...state.briefing.completed, ...fields])];
  const current = Math.max(1, progressFields.indexOf(field) + 1);
  const options = field === "goal" ? serviceGoals[state.briefing.service].map(id => ({ id, label: copy.goals[id] }))
    : field === "action" ? optionsOf(copy.actions)
    : field === "materials" ? optionsOf(copy.materials)
    : field === "timing" ? optionsOf(copy.timing) : undefined;
  return (
    <>
      <div className="nw-chat-progress" role="progressbar" aria-label={copy.labels.progress.replace("{current}", String(current)).replace("{total}", String(progressFields.length))}
        aria-valuemin={0} aria-valuemax={progressFields.length} aria-valuenow={current}>
        <span style={{ width: `${current / progressFields.length * 100}%` }} />
      </div>
      <p className="nw-chat-note">{copy.labels.progress.replace("{current}", String(current)).replace("{total}", String(progressFields.length))}</p>
      <ChatMessage labels={copy.labels} speaker="assistant" text={copy.prompts[field]} />
      <p className="nw-chat-note">{copy.labels.optional}</p>
      {field in textLimits && <TextAnswer key={field} {...{ state, copy, dispatch }} field={field as "business" | "offer" | "currentUrl" | "details"} />}
      {(field === "pages" || field === "improvements" || field === "maintenance") && <MultipleAnswer {...{ state, copy, dispatch, field }} />}
      {options && <ChatOptions options={options} onSelect={value => dispatch({ type: "answer", field, value })} />}
      <div className="nw-chat-step-tools">
        <button type="button" className="nw-chat-link" onClick={() => dispatch({ type: "answer", field, value: ["pages", "improvements", "maintenance"].includes(field) ? [] : "" })}>{copy.labels.skip}</button>
        <button type="button" className="nw-chat-link" onClick={() => dispatch({ type: "finish" })}>{copy.labels.finish}</button>
      </div>
    </>
  );
}
