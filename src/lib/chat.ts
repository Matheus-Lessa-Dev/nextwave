import type { ChatContent } from "@/i18n/types";
import { type ChatBudgetId, type ChatQuestionId, type ChatServiceId } from "@/config/chat";

export type ChatState = {
  step: "welcome" | "budget" | "summary" | "questions" | "answer" | "direct";
  serviceId?: ChatServiceId;
  budgetId?: ChatBudgetId;
  questionId?: ChatQuestionId;
};

export type ChatAction =
  | { type: "service"; id: ChatServiceId }
  | { type: "budget"; id: ChatBudgetId }
  | { type: "question"; id: ChatQuestionId }
  | { type: "questions" | "direct" | "back" | "restart" };

export const initialChatState: ChatState = { step: "welcome" };

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "service": return { step: "budget", serviceId: action.id };
    case "budget": return state.step === "budget" && state.serviceId
      ? { ...state, step: "summary", budgetId: action.id } : state;
    case "questions": return { step: "questions" };
    case "question": return state.step === "questions" ? { step: "answer", questionId: action.id } : state;
    case "direct": return { step: "direct" };
    case "restart": return initialChatState;
    case "back":
      if (state.step === "summary") return { step: "budget", serviceId: state.serviceId };
      if (state.step === "answer" || state.step === "direct") return { step: "questions" };
      return initialChatState;
  }
}

export function getChatSelection(state: ChatState, chatConfig: ChatContent) {
  return {
    service: chatConfig.services.find(item => item.id === state.serviceId),
    budget: chatConfig.budgets.find(item => item.id === state.budgetId),
    question: chatConfig.questions.find(item => item.id === state.questionId),
  };
}

/** A codificação e o número continuam sob responsabilidade de src/lib/whatsapp.ts. */
export function getAssistantMessage(state: ChatState, chatConfig: ChatContent): string {
  const { service, budget, question } = getChatSelection(state, chatConfig);
  const labels = chatConfig.labels;
  return [
    chatConfig.whatsappIntro,
    `${labels.origin}: ${chatConfig.title}`,
    `${labels.service}: ${service?.service ?? labels.unspecifiedService}`,
    ...(budget ? [`${labels.budget}: ${budget.label}`] : []),
    ...(question ? [`${labels.question}: ${question.label}`] : []),
    labels.quoteRequest,
  ].join("\n");
}

export type ChatEntry = { id: string; speaker: "assistant" | "visitor"; text: string };

export function getChatMessages(state: ChatState, chatConfig: ChatContent): ChatEntry[] {
  const messages: ChatEntry[] = [{ id: "greeting", speaker: "assistant", text: chatConfig.greeting }];
  const { service, budget, question } = getChatSelection(state, chatConfig);
  if (service) {
    messages.push({ id: "service", speaker: "visitor", text: service.label });
    messages.push({ id: "budget-question", speaker: "assistant", text: chatConfig.budgetQuestion });
    if (budget) messages.push({ id: "budget", speaker: "visitor", text: budget.label });
    if (state.step === "summary") messages.push({ id: "summary", speaker: "assistant", text: chatConfig.summaryPrompt });
  } else if (state.step !== "welcome") {
    messages.push({ id: "doubts", speaker: "visitor", text: chatConfig.doubtsOption.label });
    messages.push({ id: "questions-prompt", speaker: "assistant", text: chatConfig.questionsPrompt });
    if (question) {
      messages.push({ id: `question-${question.id}`, speaker: "visitor", text: question.label });
      messages.push({ id: `answer-${question.id}`, speaker: "assistant", text: question.answer });
    }
    if (state.step === "direct") {
      messages.push({ id: "direct-choice", speaker: "visitor", text: chatConfig.questions[4].label });
      messages.push({ id: "direct", speaker: "assistant", text: chatConfig.directPrompt });
    }
  }
  return messages;
}
