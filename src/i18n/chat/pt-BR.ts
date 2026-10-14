import type { ChatContent, ChatFAQSource } from "./types";

export function createChatContent(site: ChatFAQSource): ChatContent {
  return {
    "locale": "pt-BR",
    "panelId": "nextwave-chat-panel",
    "title": "NextWave Assistant",
    "subtitle": "Assistente virtual de projetos",
    "greeting": "Olá!  Sou o assistente virtual da NextWave. Posso ajudar você a encontrar a melhor solução para seu negócio.",
    "labels": {
      "open": "Abrir assistente comercial da NextWave",
      "close": "Fechar assistente comercial da NextWave",
      "loading": "Abrindo assistente…",
      "back": "Voltar",
      "restart": "Reiniciar",
      "whatsapp": "Falar no WhatsApp",
      "messages": "Conversa com NextWave Assistant",
      "assistant": "NextWave Assistant",
      "visitor": "Você",
      "continue": "Continuar",
      "skip": "Pular esta pergunta",
      "finish": "Finalizar com o que já contei",
      "edit": "Editar respostas",
      "resume": "Continuar o briefing",
      "preview": "Sua mensagem para a NextWave",
      "previewHelp": "Você pode ajustar a mensagem. Ela será aberta no WhatsApp, onde você confirma o envio.",
      "resetMessage": "Restaurar mensagem sugerida",
      "send": "Conversar sobre meu projeto",
      "service": "Serviço",
      "goal": "Objetivo principal",
      "business": "Negócio ou segmento",
      "materials": "Materiais disponíveis",
      "timing": "Prazo desejado",
      "details": "Detalhes adicionais",
      "alternative": "Outra possibilidade",
      "explore": "Explorar outra solução",
      "confirmRecommendation": "Continuar com essa opção",
      "anotherQuestion": "Outra dúvida",
      "chooseHelp": "Me ajude a escolher um serviço",
      "optional": "Opcional. Você pode pular ou falar diretamente conosco.",
      "multiple": "Escolha as opções que fazem sentido para você.",
      "progress": "Briefing · etapa {current} de {total}",
      "editAnswer": "Editar {field}"
    },
    "welcome": {
      "diagnose": "Me ajude a escolher um serviço",
      "choose": "Já sei o que quero criar",
      "improve": "Quero melhorar meu site atual",
      "questions": "Tenho algumas dúvidas",
      "direct": "Falar diretamente no WhatsApp"
    },
    "prompts": {
      "situation": "Qual destas situações descreve melhor o que você precisa?",
      "diagnosticGoal": "Qual é seu principal objetivo?",
      "companyScope": "Você precisa apresentar várias informações, como serviços, equipe, história ou contato?",
      "offerFocus": "Você quer uma página focada em uma oferta e uma ação principal, como pedir orçamento ou entrar em contato?",
      "hasSite": "Você já possui um site?",
      "change": "Você pretende mudar o visual e a estrutura ou precisa principalmente de atualizações e suporte?",
      "scope": "Para definir a direção, qual destas necessidades é a prioridade agora?",
      "services": "Qual solução você tem em mente? Você pode conhecer as opções e escolher livremente.",
      "questions": "Que dúvida você gostaria de esclarecer?",
      "business": "Me conta um pouco sobre seu negócio. Em qual área você atua?",
      "goal": "O que você mais gostaria de alcançar com esse projeto?",
      "offer": "Qual produto, serviço ou oferta você quer divulgar?",
      "action": "Qual ação principal você deseja que o visitante realize?",
      "pages": "Quais informações ou páginas você deseja apresentar?",
      "currentUrl": "Qual é o endereço do seu site atual?",
      "improvements": "O que você mais gostaria de melhorar?",
      "maintenance": "O que você precisa manter ou atualizar?",
      "materials": "Você já tem materiais para o projeto, como logo, textos e imagens?",
      "timing": "Quando gostaria de colocar o projeto no ar?",
      "details": "Tem algum detalhe importante que gostaria de acrescentar?"
    },
    "placeholders": {
      "business": "Ex.: barbearia, clínica, loja de roupas, escritório…",
      "offer": "Conte qual oferta ou serviço deseja apresentar…",
      "currentUrl": "Ex.: seusite.com.br",
      "details": "Conte um detalhe que ajude a entender seu projeto…"
    },
    "fieldLabels": {
      "business": "Negócio ou segmento",
      "goal": "Objetivo",
      "offer": "Produto, serviço ou oferta",
      "action": "Ação principal",
      "pages": "Informações e páginas",
      "currentUrl": "Site atual",
      "improvements": "Melhorias desejadas",
      "maintenance": "Atualizações e suporte",
      "materials": "Materiais",
      "timing": "Prazo desejado",
      "details": "Detalhes adicionais"
    },
    "situations": {
      "offer": "Quero divulgar um produto ou serviço específico.",
      "company": "Quero apresentar minha empresa na internet.",
      "modernize": "Já tenho um site, mas quero modernizá-lo.",
      "upkeep": "Meu site precisa de atualizações ou suporte.",
      "unsure": "Ainda não tenho certeza."
    },
    "goals": {
      "generate-leads": "Conseguir mais contatos e pedidos de orçamento.",
      "present-company": "Apresentar minha empresa e seus serviços.",
      "campaign": "Divulgar uma campanha, promoção ou lançamento.",
      "improve-design": "Melhorar a aparência e a experiência do meu site.",
      "keep-updated": "Manter meu site atualizado e funcionando.",
      "explore": "Ainda estou explorando possibilidades."
    },
    "clarifications": {
      "binary": {
        "yes": "Sim.",
        "no": "Não.",
        "unsure": "Ainda não sei como começar."
      },
      "change": {
        "design": "Quero melhorar o visual e a estrutura.",
        "support": "Preciso principalmente de atualizações e suporte.",
        "both": "Preciso das duas coisas.",
        "unsure": "Ainda preciso de orientação."
      },
      "scope": {
        "landing": "Divulgar uma oferta com foco em uma ação.",
        "website": "Apresentar a empresa e diferentes informações.",
        "redesign": "Modernizar um site que já existe.",
        "maintenance": "Atualizar ou corrigir meu site atual.",
        "unsure": "Prefiro avaliar as alternativas."
      }
    },
    "actions": {
      "whatsapp": "Chamar no WhatsApp.",
      "quote": "Solicitar orçamento.",
      "booking": "Agendar atendimento.",
      "offer": "Conhecer uma oferta.",
      "other": "Outro."
    },
    "pages": {
      "about": "Sobre a empresa",
      "services": "Serviços",
      "portfolio": "Portfólio",
      "contact": "Contato",
      "unsure": "Ainda não defini"
    },
    "improvements": {
      "visual": "Visual",
      "navigation": "Navegação",
      "mobile": "Experiência no celular",
      "organization": "Organização das informações",
      "performance": "Desempenho",
      "unsure": "Ainda não sei"
    },
    "maintenance": {
      "content": "Textos e imagens",
      "fixes": "Correções",
      "periodic": "Atualizações periódicas",
      "improvements": "Melhorias pontuais",
      "guidance": "Preciso de orientação"
    },
    "materials": {
      "ready": "Sim, tenho tudo.",
      "partial": "Tenho apenas uma parte.",
      "prepare": "Ainda preciso preparar.",
      "unsure": "Não sei o que será necessário."
    },
    "timing": {
      "asap": "O quanto antes.",
      "weeks": "Nas próximas semanas.",
      "months": "Nos próximos meses.",
      "unsure": "Ainda não tenho prazo."
    },
    "services": {
      "landing": {
        "name": "Landing page",
        "description": "Uma página focada em uma oferta e uma ação principal.",
        "explanation": "Uma landing page pode apresentar sua oferta com clareza e orientar o visitante para o contato, orçamento ou outra ação que você definir.",
        "benefits": [
          "Conteúdo focado em uma oferta",
          "Caminho claro para a ação principal"
        ]
      },
      "website": {
        "name": "Site institucional",
        "description": "Uma presença completa para apresentar sua empresa.",
        "explanation": "Um site institucional pode organizar informações sobre sua empresa e seus serviços, transmitir profissionalismo e facilitar o contato dos visitantes.",
        "benefits": [
          "Informações organizadas por assunto",
          "Espaço para apresentar a identidade da empresa"
        ]
      },
      "redesign": {
        "name": "Redesign de site",
        "description": "Uma nova experiência para um site que já existe.",
        "explanation": "O redesign permite revisar o visual, a navegação e a estrutura do seu site. As melhorias serão definidas depois de avaliar o que você já tem.",
        "benefits": [
          "Revisão da experiência e da navegação",
          "Visual alinhado à identidade da marca"
        ]
      },
      "maintenance": {
        "name": "Manutenção e suporte",
        "description": "Atualizações e melhorias conforme a necessidade.",
        "explanation": "Manutenção e suporte podem ajudar com conteúdo, correções e melhorias pontuais no site atual, sem pressupor uma reconstrução. O escopo será combinado com você.",
        "benefits": [
          "Conteúdo atualizado",
          "Correções e melhorias com escopo definido"
        ]
      }
    },
    "recommendation": {
      "title": "Minha recomendação para seu projeto",
      "guidance": "Esta é uma orientação inicial. Vamos confirmar a solução e o escopo em uma conversa.",
      "confidence": {
        "clear": "Uma direção clara",
        "tentative": "Uma possibilidade a avaliar",
        "insufficient": "Vamos comparar as possibilidades"
      },
      "reasons": {
        "focused-offer": "Você quer divulgar uma oferta ou facilitar uma ação principal.",
        "company-presence": "Você quer apresentar sua empresa e suas informações.",
        "existing-design": "Seu site atual precisa de uma experiência mais adequada.",
        "existing-upkeep": "Sua necessidade está em atualizar ou cuidar do site atual.",
        "uncertain": "Ainda não há informações suficientes para indicar apenas uma solução. Estas opções podem ajudar a começar.",
        "conflict": "Suas respostas apontam necessidades diferentes. Vale comparar estas opções antes de decidir."
      }
    },
    "summary": {
      "title": "Seu projeto está tomando forma!",
      "description": "Confira o que você contou. Você pode editar, completar ou conversar com a NextWave agora.",
      "scopeNote": "O orçamento e o prazo serão definidos após uma conversa sobre o escopo. Este resumo não representa uma contratação.",
      "empty": "Você pode começar a conversa mesmo sem um briefing completo."
    },
    "errors": {
      "invalidUrl": "Informe um endereço de site válido, como seusite.com.br, ou pule esta pergunta.",
      "tooLong": "Este texto ultrapassa o limite do campo. Reduza um pouco para continuar.",
      "emptyMessage": "Escreva uma mensagem antes de abrir o WhatsApp."
    },
    "faq": {
      "difference": {
        "question": "Qual a diferença entre landing page e site institucional?",
        "answer": "Uma landing page concentra uma oferta e uma ação principal. Um site institucional apresenta a empresa e diferentes informações, como serviços, história e contato. A melhor opção depende do objetivo do projeto."
      },
      "timeline": {
        "question": "Quanto tempo leva para criar um site?",
        "answer": site.faq.items[1].answer
      },
      "mobile": {
        "question": "O site funciona no celular?",
        "answer": site.faq.items[2].answer
      },
      "domain": {
        "question": "Preciso comprar domínio?",
        "answer": "O domínio é o endereço usado para acessar seu site. " + site.faq.items[4].answer
      },
      "hosting": {
        "question": "Como funciona hospedagem?",
        "answer": "A hospedagem mantém os arquivos do seu site disponíveis na internet. " + site.faq.items[4].answer
      },
      "materials": {
        "question": "Preciso fornecer textos e imagens?",
        "answer": site.faq.items[3].answer
      },
      "maintenance": {
        "question": "Vocês oferecem manutenção?",
        "answer": "Oferecemos manutenção e suporte, incluindo atualizações e melhorias conforme a necessidade. O que será feito e as condições do acompanhamento são definidos na proposta."
      },
      "hiring": {
        "question": "Como funciona a contratação?",
        "answer": "Começamos com uma conversa para entender seu negócio e objetivo. Depois, combinamos escopo e proposta antes do desenvolvimento. Os ajustes, a publicação e os próximos passos são definidos ao longo desse processo."
      },
      "quote": {
        "question": "Como solicitar orçamento?",
        "answer": site.faq.items[0].answer
      },
      "payment": {
        "question": "Como funciona o pagamento?",
        "answer": "As condições de pagamento são esclarecidas na conversa sobre a proposta. Fale conosco pelo WhatsApp antes de contratar."
      }
    },
    "message": {
      "greeting": "Olá! Tudo bem?",
      "intro": "Conversei com o assistente virtual da NextWave.",
      "generic": "Gostaria de conversar sobre um projeto para meu negócio.",
      "closing": "Podemos conversar sobre as possibilidades e um orçamento?",
      "requests": {
        "landing": "Gostaria de criar uma landing page.",
        "website": "Gostaria de desenvolver um site institucional.",
        "redesign": "Gostaria de modernizar meu site.",
        "maintenance": "Estou procurando suporte para atualizações e melhorias no meu site."
      },
      "business": "O projeto é para um negócio na área de {value}.",
      "offer": "Quero divulgar {value}.",
      "currentUrl": "Meu site atual é {value}.",
      "details": "Também gostaria de compartilhar este detalhe: {value}.",
      "goals": {
        "generate-leads": "Meu objetivo é facilitar novos contatos e pedidos de orçamento.",
        "present-company": "Quero apresentar minha empresa e seus serviços.",
        "campaign": "Quero divulgar uma campanha, promoção ou lançamento.",
        "improve-design": "Quero melhorar a aparência e a experiência do meu site.",
        "keep-updated": "Quero manter meu site atualizado e funcionando."
      },
      "actions": {
        "whatsapp": "Gostaria que os visitantes entrassem em contato pelo WhatsApp.",
        "quote": "A ação principal será solicitar orçamento.",
        "booking": "Gostaria que os visitantes pudessem agendar atendimento.",
        "offer": "A ação principal será conhecer a oferta."
      },
      "pages": "Gostaria de apresentar {value}.",
      "pageNames": {
        "about": "informações sobre a empresa",
        "services": "nossos serviços",
        "portfolio": "o portfólio",
        "contact": "um canal de contato"
      },
      "improvements": "As melhorias que tenho em mente são {value}.",
      "improvementNames": {
        "visual": "o visual",
        "navigation": "a navegação",
        "mobile": "a experiência no celular",
        "organization": "a organização das informações",
        "performance": "o desempenho"
      },
      "maintenance": "Preciso de ajuda com {value}.",
      "maintenanceNames": {
        "content": "textos e imagens",
        "fixes": "correções",
        "periodic": "atualizações periódicas",
        "improvements": "melhorias pontuais",
        "guidance": "orientação sobre o que precisa ser feito"
      },
      "materials": {
        "ready": "Já tenho logo, textos e imagens para o projeto.",
        "partial": "Tenho parte dos materiais para o projeto.",
        "prepare": "Ainda preciso preparar os materiais."
      },
      "timing": {
        "asap": "Gostaria de colocar o projeto no ar o quanto antes, conforme a viabilidade.",
        "weeks": "Gostaria de colocar o projeto no ar nas próximas semanas.",
        "months": "Gostaria de colocar o projeto no ar nos próximos meses."
      },
      "conjunction": "e"
    }
  };
}
