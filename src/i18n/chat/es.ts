import type { ChatContent, ChatFAQSource } from "./types";

export function createChatContent(site: ChatFAQSource): ChatContent {
  return {
    "locale": "es",
    "panelId": "nextwave-chat-panel",
    "title": "NextWave Assistant",
    "subtitle": "Asistente virtual de proyectos",
    "greeting": "¡Hola! Soy el asistente virtual de NextWave. Puedo ayudarte a encontrar la mejor solución para tu negocio.",
    "labels": {
      "open": "Abrir el asistente comercial de NextWave",
      "close": "Cerrar el asistente comercial de NextWave",
      "loading": "Abriendo asistente…",
      "back": "Volver",
      "restart": "Reiniciar",
      "whatsapp": "Conversar por WhatsApp",
      "messages": "Conversación con NextWave Assistant",
      "assistant": "NextWave Assistant",
      "visitor": "Tú",
      "continue": "Continuar",
      "skip": "Omitir esta pregunta",
      "finish": "Terminar con lo que ya conté",
      "edit": "Editar respuestas",
      "resume": "Continuar el briefing",
      "preview": "Tu mensaje para NextWave",
      "previewHelp": "Puedes editar el mensaje. Se abrirá en WhatsApp, donde confirmas el envío.",
      "resetMessage": "Restaurar mensaje sugerido",
      "send": "Conversar sobre mi proyecto",
      "service": "Servicio",
      "goal": "Objetivo principal",
      "business": "Negocio o sector",
      "materials": "Materiales disponibles",
      "timing": "Plazo deseado",
      "details": "Detalles adicionales",
      "alternative": "Otra posibilidad",
      "explore": "Explorar otra solución",
      "confirmRecommendation": "Continuar con esta opción",
      "anotherQuestion": "Otra pregunta",
      "chooseHelp": "Ayúdame a elegir un servicio",
      "optional": "Opcional. Puedes omitir la pregunta o contactarnos directamente.",
      "multiple": "Elige las opciones que tengan sentido para ti.",
      "progress": "Briefing · paso {current} de {total}",
      "editAnswer": "Editar {field}"
    },
    "welcome": {
      "diagnose": "Ayúdame a elegir un servicio",
      "choose": "Ya sé lo que quiero crear",
      "improve": "Quiero mejorar mi sitio actual",
      "questions": "Tengo algunas preguntas",
      "direct": "Hablar directamente por WhatsApp"
    },
    "prompts": {
      "situation": "¿Cuál de estas situaciones describe mejor lo que necesitas?",
      "diagnosticGoal": "¿Cuál es tu objetivo principal?",
      "companyScope": "¿Necesitas presentar varias clases de información, como servicios, equipo, historia o contacto?",
      "offerFocus": "¿Quieres una página centrada en una oferta y una acción principal, como pedir un presupuesto o contactar contigo?",
      "hasSite": "¿Ya tienes un sitio web?",
      "change": "¿Quieres cambiar el diseño y la estructura o necesitas principalmente actualizaciones y soporte?",
      "scope": "Para definir el rumbo, ¿cuál de estas necesidades es tu prioridad ahora?",
      "services": "¿Qué solución tienes en mente? Conoce las opciones y elige libremente.",
      "questions": "¿Qué duda te gustaría resolver?",
      "business": "Cuéntame un poco sobre tu negocio. ¿En qué sector trabajas?",
      "goal": "¿Qué te gustaría lograr con este proyecto?",
      "offer": "¿Qué producto, servicio u oferta quieres promocionar?",
      "action": "¿Qué acción principal quieres que realicen los visitantes?",
      "pages": "¿Qué información o páginas quieres presentar?",
      "currentUrl": "¿Cuál es la dirección de tu sitio actual?",
      "improvements": "¿Qué te gustaría mejorar?",
      "maintenance": "¿Qué necesitas mantener o actualizar?",
      "materials": "¿Ya tienes materiales para el proyecto, como logo, textos e imágenes?",
      "timing": "¿Cuándo te gustaría lanzar el proyecto?",
      "details": "¿Hay algún detalle importante que quieras añadir?"
    },
    "placeholders": {
      "business": "Ej.: barbería, clínica, tienda de ropa, servicios profesionales…",
      "offer": "Cuéntanos qué oferta o servicio quieres presentar…",
      "currentUrl": "Ej.: tusitio.com",
      "details": "Comparte un detalle que ayude a entender tu proyecto…"
    },
    "fieldLabels": {
      "business": "Negocio o sector",
      "goal": "Objetivo",
      "offer": "Producto, servicio u oferta",
      "action": "Acción principal",
      "pages": "Información y páginas",
      "currentUrl": "Sitio actual",
      "improvements": "Mejoras deseadas",
      "maintenance": "Actualizaciones y soporte",
      "materials": "Materiales",
      "timing": "Plazo deseado",
      "details": "Detalles adicionales"
    },
    "situations": {
      "offer": "Quiero promocionar un producto o servicio específico.",
      "company": "Quiero presentar mi empresa en internet.",
      "modernize": "Ya tengo un sitio, pero quiero modernizarlo.",
      "upkeep": "Mi sitio necesita actualizaciones o soporte.",
      "unsure": "Todavía no estoy seguro."
    },
    "goals": {
      "generate-leads": "Recibir más contactos y solicitudes de presupuesto.",
      "present-company": "Presentar mi empresa y sus servicios.",
      "campaign": "Promocionar una campaña, promoción o lanzamiento.",
      "improve-design": "Mejorar el diseño y la experiencia de mi sitio.",
      "keep-updated": "Mantener mi sitio actualizado y funcionando.",
      "explore": "Todavía estoy explorando posibilidades."
    },
    "clarifications": {
      "binary": {
        "yes": "Sí.",
        "no": "No.",
        "unsure": "Todavía no sé por dónde empezar."
      },
      "change": {
        "design": "Quiero mejorar el diseño y la estructura.",
        "support": "Necesito principalmente actualizaciones y soporte.",
        "both": "Necesito ambas cosas.",
        "unsure": "Primero necesito orientación."
      },
      "scope": {
        "landing": "Promocionar una oferta con una acción clara.",
        "website": "Presentar la empresa y distintos tipos de información.",
        "redesign": "Modernizar un sitio que ya existe.",
        "maintenance": "Actualizar o corregir mi sitio actual.",
        "unsure": "Prefiero comparar las opciones."
      }
    },
    "actions": {
      "whatsapp": "Contactar por WhatsApp.",
      "quote": "Solicitar presupuesto.",
      "booking": "Agendar una cita.",
      "offer": "Conocer una oferta.",
      "other": "Otra acción."
    },
    "pages": {
      "about": "Sobre la empresa",
      "services": "Servicios",
      "portfolio": "Portafolio",
      "contact": "Contacto",
      "unsure": "Todavía no lo he definido"
    },
    "improvements": {
      "visual": "Diseño",
      "navigation": "Navegación",
      "mobile": "Experiencia en el celular",
      "organization": "Organización de la información",
      "performance": "Rendimiento",
      "unsure": "Todavía no lo sé"
    },
    "maintenance": {
      "content": "Textos e imágenes",
      "fixes": "Correcciones",
      "periodic": "Actualizaciones periódicas",
      "improvements": "Mejoras puntuales",
      "guidance": "Necesito orientación"
    },
    "materials": {
      "ready": "Sí, tengo todo.",
      "partial": "Tengo una parte de los materiales.",
      "prepare": "Todavía necesito prepararlos.",
      "unsure": "No sé qué será necesario."
    },
    "timing": {
      "asap": "Lo antes posible.",
      "weeks": "En las próximas semanas.",
      "months": "En los próximos meses.",
      "unsure": "Todavía no tengo un plazo."
    },
    "services": {
      "landing": {
        "name": "Landing page",
        "description": "Una página centrada en una oferta y una acción principal.",
        "explanation": "Una landing page puede presentar tu oferta con claridad y guiar al visitante hacia el contacto, la solicitud de presupuesto u otra acción que definas.",
        "benefits": [
          "Contenido centrado en una oferta",
          "Un camino claro hacia la acción principal"
        ]
      },
      "website": {
        "name": "Sitio institucional",
        "description": "Una presencia completa para presentar tu empresa.",
        "explanation": "Un sitio institucional puede organizar la información de tu empresa y sus servicios, transmitir profesionalismo y facilitar el contacto de los visitantes.",
        "benefits": [
          "Información organizada por tema",
          "Espacio para presentar la identidad de la empresa"
        ]
      },
      "redesign": {
        "name": "Rediseño de sitio web",
        "description": "Una nueva experiencia para un sitio que ya existe.",
        "explanation": "El rediseño permite revisar el diseño, la navegación y la estructura de tu sitio. Las mejoras se definirán después de evaluar lo que ya tienes.",
        "benefits": [
          "Revisión de la experiencia y la navegación",
          "Diseño alineado con la identidad de tu marca"
        ]
      },
      "maintenance": {
        "name": "Mantenimiento y soporte",
        "description": "Actualizaciones y mejoras según tus necesidades.",
        "explanation": "El mantenimiento y soporte pueden ayudar con contenido, correcciones y mejoras puntuales en tu sitio actual, sin dar por hecho que haya que reconstruirlo. Acordaremos el alcance contigo.",
        "benefits": [
          "Contenido actualizado",
          "Correcciones y mejoras con un alcance definido"
        ]
      }
    },
    "recommendation": {
      "title": "Mi recomendación para tu proyecto",
      "guidance": "Es una orientación inicial. Confirmaremos la solución y el alcance en una conversación.",
      "confidence": {
        "clear": "Un rumbo claro",
        "tentative": "Una opción para explorar",
        "insufficient": "Comparemos las posibilidades"
      },
      "reasons": {
        "focused-offer": "Quieres promocionar una oferta o facilitar una acción principal.",
        "company-presence": "Quieres presentar tu empresa y su información.",
        "existing-design": "Tu sitio actual necesita una experiencia más adecuada.",
        "existing-upkeep": "Necesitas actualizar o cuidar tu sitio actual.",
        "uncertain": "Todavía no hay información suficiente para sugerir una sola solución. Estas opciones pueden ayudarte a empezar.",
        "conflict": "Tus respuestas apuntan a necesidades diferentes. Conviene comparar estas opciones antes de decidir."
      }
    },
    "summary": {
      "title": "¡Tu proyecto está tomando forma!",
      "description": "Revisa lo que nos contaste. Puedes editar, completar o conversar con NextWave ahora.",
      "scopeNote": "El presupuesto y el plazo se definirán después de conversar sobre el alcance. Este resumen no representa una contratación.",
      "empty": "Puedes iniciar la conversación aunque el briefing esté incompleto."
    },
    "errors": {
      "invalidUrl": "Escribe una dirección válida, como tusitio.com, u omite esta pregunta.",
      "tooLong": "El texto supera el límite del campo. Acórtalo un poco para continuar.",
      "emptyMessage": "Escribe un mensaje antes de abrir WhatsApp."
    },
    "faq": {
      "difference": {
        "question": "¿Cuál es la diferencia entre landing page y sitio institucional?",
        "answer": "Una landing page se centra en una oferta y una acción principal. Un sitio institucional presenta la empresa y distinta información, como servicios, historia y contacto. La mejor opción depende del objetivo del proyecto."
      },
      "timeline": {
        "question": "¿Cuánto se tarda en crear un sitio?",
        "answer": site.faq.items[1].answer
      },
      "mobile": {
        "question": "¿El sitio funciona en el celular?",
        "answer": site.faq.items[2].answer
      },
      "domain": {
        "question": "¿Necesito comprar un dominio?",
        "answer": "El dominio es la dirección que usan las personas para acceder a tu sitio. " + site.faq.items[4].answer
      },
      "hosting": {
        "question": "¿Cómo funciona el alojamiento web?",
        "answer": "El alojamiento mantiene los archivos de tu sitio disponibles en internet. " + site.faq.items[4].answer
      },
      "materials": {
        "question": "¿Debo proporcionar textos e imágenes?",
        "answer": site.faq.items[3].answer
      },
      "maintenance": {
        "question": "¿Ofrecen mantenimiento?",
        "answer": "Ofrecemos mantenimiento y soporte, con actualizaciones y mejoras según las necesidades. El trabajo y las condiciones del acompañamiento se definen en la propuesta."
      },
      "hiring": {
        "question": "¿Cómo funciona la contratación?",
        "answer": "Empezamos con una conversación para entender tu negocio y tus objetivos. Después acordamos el alcance y la propuesta antes del desarrollo. Los ajustes, la publicación y los siguientes pasos se definen a lo largo del proceso."
      },
      "quote": {
        "question": "¿Cómo solicito un presupuesto?",
        "answer": site.faq.items[0].answer
      },
      "payment": {
        "question": "¿Cómo funciona el pago?",
        "answer": "Las condiciones de pago se aclaran al conversar sobre la propuesta. Contáctanos por WhatsApp antes de contratar."
      }
    },
    "message": {
      "greeting": "¡Hola! ¿Qué tal?",
      "intro": "Conversé con el asistente virtual de NextWave.",
      "generic": "Me gustaría conversar sobre un proyecto para mi negocio.",
      "closing": "¿Podemos conversar sobre las posibilidades y un presupuesto?",
      "requests": {
        "landing": "Me gustaría crear una landing page.",
        "website": "Me gustaría desarrollar un sitio institucional.",
        "redesign": "Me gustaría modernizar mi sitio web.",
        "maintenance": "Busco soporte para actualizaciones y mejoras en mi sitio web."
      },
      "business": "El proyecto es para un negocio del sector de {value}.",
      "offer": "Quiero promocionar {value}.",
      "currentUrl": "Mi sitio actual es {value}.",
      "details": "También quisiera compartir este detalle: {value}.",
      "goals": {
        "generate-leads": "Mi objetivo es facilitar nuevos contactos y solicitudes de presupuesto.",
        "present-company": "Quiero presentar mi empresa y sus servicios.",
        "campaign": "Quiero promocionar una campaña, promoción o lanzamiento.",
        "improve-design": "Quiero mejorar el diseño y la experiencia de mi sitio.",
        "keep-updated": "Quiero mantener mi sitio actualizado y funcionando."
      },
      "actions": {
        "whatsapp": "Me gustaría que los visitantes contactaran por WhatsApp.",
        "quote": "La acción principal será solicitar presupuesto.",
        "booking": "Me gustaría que los visitantes pudieran agendar una cita.",
        "offer": "La acción principal será conocer la oferta."
      },
      "pages": "Me gustaría presentar {value}.",
      "pageNames": {
        "about": "información sobre la empresa",
        "services": "nuestros servicios",
        "portfolio": "el portafolio",
        "contact": "un canal de contacto"
      },
      "improvements": "Las mejoras que tengo en mente son {value}.",
      "improvementNames": {
        "visual": "el diseño",
        "navigation": "la navegación",
        "mobile": "la experiencia en el celular",
        "organization": "la organización de la información",
        "performance": "el rendimiento"
      },
      "maintenance": "Necesito ayuda con {value}.",
      "maintenanceNames": {
        "content": "textos e imágenes",
        "fixes": "correcciones",
        "periodic": "actualizaciones periódicas",
        "improvements": "mejoras puntuales",
        "guidance": "orientación sobre lo que hace falta"
      },
      "materials": {
        "ready": "Ya tengo logo, textos e imágenes para el proyecto.",
        "partial": "Tengo una parte de los materiales del proyecto.",
        "prepare": "Todavía necesito preparar los materiales."
      },
      "timing": {
        "asap": "Me gustaría lanzar el proyecto lo antes posible, según la viabilidad.",
        "weeks": "Me gustaría lanzar el proyecto en las próximas semanas.",
        "months": "Me gustaría lanzar el proyecto en los próximos meses."
      },
      "conjunction": "y"
    }
  };
}
