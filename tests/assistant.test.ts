import assert from "node:assert/strict";
import { describe, test } from "node:test";
import pt from "../src/i18n/dictionaries/pt-BR";
import en from "../src/i18n/dictionaries/en";
import es from "../src/i18n/dictionaries/es";
import { serviceIds, textLimits, type ProjectBriefing } from "../src/config/chat";
import { recommendService, diagnosticClarification } from "../src/lib/service-recommendation";
import { chatReducer, initialChatState, type ChatAction, type ChatState } from "../src/lib/chat";
import { createBriefing, getBriefingFields, validateBriefingText } from "../src/lib/project-briefing";
import { buildWhatsAppMessage, getAssistantMessage } from "../src/lib/whatsapp-message-builder";
import { briefingAnswer, getChatMessages } from "../src/lib/chat-content";
import { isChatState, migrateLegacyChat, restoreChatSession } from "../src/lib/chat-session";
import { getWhatsAppLink, WHATSAPP_NUMBER } from "../src/lib/whatsapp";

const dictionaries = [pt, en, es];
const reduce = (actions: ChatAction[], state = initialChatState) => actions.reduce(chatReducer, state);
const brief = (answers: Partial<ProjectBriefing> = {}): ProjectBriefing => ({ ...createBriefing(), ...answers });

describe("Deterministic service recommendation", () => {
  test("promotion points to a landing page", () => assert.equal(recommendService({ situation: "offer", goal: "campaign", offerFocus: "yes" }).service, "landing"));
  test("company with several services points to a business website", () => assert.equal(recommendService({ situation: "company", goal: "present-company", companyScope: "yes" }).service, "website"));
  test("a broader company presence can generate leads without creating a false conflict", () => {
    const answers = { situation: "company", goal: "generate-leads" } as const;
    assert.equal(diagnosticClarification(answers), "companyScope");
    assert.equal(recommendService({ ...answers, companyScope: "yes" }).service, "website");
    assert.equal(recommendService({ ...answers, companyScope: "no" }).service, "landing");
  });
  test("lead generation does not override a clear existing-site improvement need", () => {
    assert.equal(recommendService({ situation: "modernize", goal: "generate-leads" }).service, "redesign");
    assert.equal(recommendService({ situation: "upkeep", goal: "generate-leads" }).service, "maintenance");
  });
  test("existing outdated design points to redesign", () => assert.equal(recommendService({ situation: "modernize", goal: "improve-design" }).service, "redesign"));
  test("existing website updates point to maintenance", () => assert.equal(recommendService({ situation: "upkeep", goal: "keep-updated" }).service, "maintenance"));
  test("undecided visitor gets another question and alternatives", () => {
    assert.equal(diagnosticClarification({ situation: "unsure", goal: "explore" }), "hasSite");
    const result = recommendService({ situation: "unsure", goal: "explore", hasSite: "no" });
    assert.equal(result.service, undefined);
    assert.deepEqual(result.candidates, ["landing", "website"]);
    assert.equal(result.confidence, "insufficient");
  });
  test("conflicting needs do not force a recommendation", () => {
    const answers = { situation: "company", goal: "keep-updated" } as const;
    assert.equal(diagnosticClarification(answers), "scope");
    assert.equal(recommendService(answers).service, undefined);
    assert.deepEqual(recommendService(answers).candidates, ["website", "maintenance"]);
    assert.equal(recommendService({ ...answers, scope: "maintenance" }).service, "maintenance");
  });
  test("no existing site cannot imply maintenance or redesign", () => {
    assert.equal(recommendService({ goal: "keep-updated", hasSite: "no" }).service, undefined);
  });
  test("site improvement shortcut separates redesign and support", () => {
    assert.equal(recommendService({ situation: "existing", change: "support" }).service, "maintenance");
    assert.equal(recommendService({ situation: "existing", change: "design" }).service, "redesign");
    const both = recommendService({ situation: "existing", change: "both" });
    assert.equal(both.alternative, "maintenance");
    assert.equal(both.confidence, "tentative");
  });
});

describe("Adaptive briefing and predictable state", () => {
  test("manual service overrides a different recommendation", () => {
    const state = reduce([
      { type: "start", entry: "diagnose" }, { type: "situation", value: "offer" },
      { type: "diagnostic-goal", value: "campaign" }, { type: "clarify", field: "offerFocus", value: "yes" },
      { type: "services" }, { type: "service", service: "maintenance", source: "manual" },
    ]);
    assert.equal(recommendService(state.diagnosis).service, "landing");
    assert.equal(state.briefing.service, "maintenance");
    assert.equal(state.source, "manual");
  });
  test("diagnostic goal is reused without asking it again", () => {
    const state = reduce([{ type: "start", entry: "diagnose" }, { type: "situation", value: "company" },
      { type: "diagnostic-goal", value: "present-company" }, { type: "clarify", field: "companyScope", value: "yes" },
      { type: "service", service: "website", source: "recommended" }, { type: "answer", field: "business", value: "clínica" }]);
    assert.equal(state.field, "pages");
    assert.equal(state.briefing.goal, "present-company");
  });
  test("an exploring diagnostic goal is also not asked again", () => {
    const state = reduce([{ type: "start", entry: "diagnose" }, { type: "situation", value: "unsure" },
      { type: "diagnostic-goal", value: "explore" }, { type: "clarify", field: "hasSite", value: "no" },
      { type: "service", service: "website", source: "manual" }, { type: "answer", field: "business", value: "" }]);
    assert.equal(state.field, "pages");
  });
  test("manually edited goal remains authoritative when changing service", () => {
    const state = reduce([{ type: "start", entry: "diagnose" }, { type: "situation", value: "company" },
      { type: "diagnostic-goal", value: "present-company" }, { type: "service", service: "website", source: "recommended" },
      { type: "finish" }, { type: "edit", field: "goal" }, { type: "answer", field: "goal", value: "generate-leads" },
      { type: "edit", field: "service" }, { type: "service", service: "landing", source: "manual" }]);
    assert.equal(state.briefing.goal, "generate-leads");
    assert.equal(state.view, "summary");
  });
  for (const service of serviceIds) test(service + " brief needs at most seven optional interactions", () => {
    let state = reduce([{ type: "service", service, source: "manual" }]);
    let count = 0;
    while (state.view === "briefing" && state.field) {
      const field = state.field;
      state = chatReducer(state, { type: "answer", field, value: ["pages", "improvements", "maintenance"].includes(field) ? [] : "" });
      count++;
      assert.ok(count <= 7);
      assert.ok(isChatState(state));
    }
    assert.equal(state.view, "summary");
    assert.ok(count >= 5);
  });
  test("finish early, edit and back preserve business and other answers", () => {
    let state = reduce([{ type: "service", service: "landing", source: "manual" },
      { type: "draft", field: "business", value: "barbearia" }, { type: "finish" },
      { type: "edit", field: "business" }, { type: "answer", field: "business", value: "clínica" }]);
    assert.equal(state.view, "summary");
    assert.equal(state.briefing.business, "clínica");
    state = chatReducer(state, { type: "back" });
    assert.equal(state.view, "briefing");
    assert.equal(state.briefing.business, "clínica");
  });
  test("changing service clears incompatible answers but retains common context", () => {
    const state: ChatState = { ...initialChatState, briefing: brief({ service: "landing", business: "loja", offer: "promoção", action: "whatsapp", completed: ["business", "offer", "action"] }) };
    const next = chatReducer(state, { type: "service", service: "redesign", source: "manual" });
    assert.equal(next.briefing.business, "loja");
    assert.equal(next.briefing.offer, undefined);
    assert.deepEqual(next.briefing.completed, ["business"]);
  });
  test("reselecting a completed service goes to summary without repeating questions", () => {
    const b = brief({ service: "website", goal: "present-company", completed: ["business", "pages", "materials", "timing", "details"] });
    const state = chatReducer({ ...initialChatState, briefing: b }, { type: "service", service: "website", source: "manual" });
    assert.equal(state.view, "summary");
  });
  test("drafts persist without advancing or announcing each typed character", () => {
    const state = reduce([{ type: "service", service: "landing", source: "manual" },
      { type: "answer", field: "business", value: "loja" }, { type: "back" }, { type: "draft", field: "business", value: "clínica" }]);
    assert.equal(state.field, "business");
    assert.ok(!getChatMessages(state, pt.chat).some(entry => entry.id === "answer-business"));
    assert.equal(restoreChatSession(JSON.stringify(state)).briefing.business, "clínica");
  });
  test("restart clears the brief and edited messages", () => {
    const state = chatReducer({ ...initialChatState, briefing: brief({ business: "loja" }) }, { type: "restart" });
    assert.deepEqual(state, initialChatState);
  });
  test("website addresses and text limits are checked", () => {
    assert.equal(validateBriefingText("currentUrl", "seusite.com.br"), undefined);
    assert.equal(validateBriefingText("currentUrl", "https://example.test/page"), undefined);
    assert.equal(validateBriefingText("currentUrl", "javascript:alert(1)"), "invalidUrl");
    assert.equal(validateBriefingText("currentUrl", "not a website"), "invalidUrl");
    assert.equal(validateBriefingText("business", "x".repeat(textLimits.business + 1)), "tooLong");
  });
});

describe("Natural multilingual WhatsApp messages", () => {
  for (const dictionary of dictionaries) {
    const copy = dictionary.chat;
    test(copy.locale + " incomplete brief produces a valid natural message", () => {
      const message = buildWhatsAppMessage(brief(), copy);
      assert.ok(message.startsWith(copy.message.greeting));
      assert.ok(message.includes(copy.message.generic) && message.endsWith(copy.message.closing));
      assert.ok(!/Origem:|Source:|Origen:|undefined|null|\.\.|Serviço:|Service:|Servicio:/.test(message));
    });
    test(copy.locale + " empty and unknown optional answers are omitted", () => {
      const message = buildWhatsAppMessage(brief({ service: "landing", goal: "explore", materials: "unsure", timing: "unsure", action: "other" }), copy);
      assert.equal(message, buildWhatsAppMessage(brief({ service: "landing" }), copy));
    });
    test(copy.locale + " free text is preserved and punctuation is not duplicated", () => {
      const freeText = "Barbearia João & filhos\nAtendimento com horário marcado!";
      const message = buildWhatsAppMessage(brief({ service: "landing", business: "barbearia", offer: "corte e barba!", details: freeText }), copy);
      assert.ok(message.includes(freeText));
      assert.ok(message.includes("corte e barba!") && !message.includes("!."));
      assert.equal(message.match(new RegExp(copy.message.requests.landing.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"))?.length, 1);
    });
    for (const service of serviceIds) test(copy.locale + " " + service + " uses only the selected service's details", () => {
      const b = brief({ service, pages: ["about", "services", "contact"], improvements: ["visual", "mobile"], maintenance: ["content", "fixes"],
        offer: "OFERTA", materials: "partial", timing: "weeks", goal: "generate-leads" });
      const message = buildWhatsAppMessage(b, copy);
      assert.ok(message.includes(copy.message.requests[service]));
      assert.ok(message.includes(copy.message.materials.partial) && message.includes(copy.message.timing.weeks));
      assert.equal(message.includes("OFERTA"), service === "landing");
      assert.ok(message.length < textLimits.message);
    });
    test(copy.locale + " WhatsApp URL encodes the message and official number", () => {
      const message = buildWhatsAppMessage(brief({ service: "website", business: "clínica & saúde" }), copy);
      const link = new URL(getWhatsAppLink(message));
      assert.equal(WHATSAPP_NUMBER, "5544997341655");
      assert.equal(link.origin, "https://wa.me");
      assert.equal(link.pathname, "/5544997341655");
      assert.equal(link.searchParams.get("text"), message);
    });
    test(copy.locale + " FAQ answers reuse real landing page information", () => {
      assert.equal(copy.faq.timeline.answer, dictionary.site.faq.items[1].answer);
      assert.equal(copy.faq.mobile.answer, dictionary.site.faq.items[2].answer);
      assert.ok(copy.faq.domain.answer.endsWith(dictionary.site.faq.items[4].answer));
      assert.ok(copy.faq.hosting.answer.endsWith(dictionary.site.faq.items[4].answer));
      assert.equal(copy.faq.materials.answer, dictionary.site.faq.items[3].answer);
      assert.equal(copy.faq.quote.answer, dictionary.site.faq.items[0].answer);
    });
  }
  test("language switches retain IDs and free text while translating summaries and messages", () => {
    const state: ChatState = { ...initialChatState, view: "summary", briefing: brief({
      service: "website", business: "clínica brasileira", goal: "present-company", pages: ["services"], materials: "partial", timing: "weeks",
    }) };
    for (const dictionary of dictionaries) {
      const restored = restoreChatSession(JSON.stringify(state));
      const copy = dictionary.chat;
      assert.equal(restored.briefing.service, "website");
      assert.equal(restored.briefing.business, "clínica brasileira");
      assert.equal(briefingAnswer("materials", restored.briefing, copy), copy.materials.partial);
      assert.ok(getAssistantMessage(restored, copy).includes(copy.message.requests.website));
      assert.ok(getAssistantMessage(restored, copy).includes("clínica brasileira"));
    }
    assert.notEqual(getAssistantMessage(state, pt.chat), getAssistantMessage(state, en.chat));
  });
  test("manual message edits are scoped by language and invalidated after brief changes", () => {
    const generated = buildWhatsAppMessage(initialChatState.briefing, pt.chat);
    const state = chatReducer(initialChatState, { type: "message", locale: "pt-BR", base: generated, text: "Minha mensagem personalizada." });
    assert.equal(getAssistantMessage(state, pt.chat), "Minha mensagem personalizada.");
    assert.equal(getAssistantMessage(state, en.chat), buildWhatsAppMessage(state.briefing, en.chat));
    const next = chatReducer(state, { type: "service", service: "website", source: "manual" });
    assert.notEqual(getAssistantMessage(next, pt.chat), "Minha mensagem personalizada.");
  });
});

describe("Session safety and migration", () => {
  test("malformed, excessive or translated-ID sessions fall back safely", () => {
    for (const raw of ["broken json", "x".repeat(24001), JSON.stringify({ ...initialChatState, view: "wrong" }),
      JSON.stringify({ ...initialChatState, briefing: brief({ service: "landing" }), diagnosis: { goal: "Mais clientes" } }),
      JSON.stringify({ ...initialChatState, briefing: { ...createBriefing(), pages: ["not-a-page"] } })]) {
      assert.equal(restoreChatSession(raw), initialChatState);
    }
  });
  test("old service choice migrates without retaining the removed budget", () => {
    const state = migrateLegacyChat(JSON.stringify({ step: "summary", serviceId: "landing", budgetId: "unknown" }));
    assert.equal(state.briefing.service, "landing");
    assert.equal(state.view, "briefing");
    assert.ok(isChatState(state));
    assert.ok(!JSON.stringify(state).includes("budget"));
  });
  test("typed content has the same keys in all languages", () => {
    const keys = (value: unknown, prefix = ""): string[] => value && typeof value === "object"
      ? Object.entries(value).flatMap(([key, child]) => keys(child, prefix + "." + key)) : [prefix];
    assert.deepEqual(keys(pt.chat), keys(en.chat));
    assert.deepEqual(keys(pt.chat), keys(es.chat));
    for (const service of serviceIds) assert.ok(getBriefingFields(brief({ service })).length <= 7);
  });
});
