import type { ChatContent, ChatFAQSource } from "./types";

export function createChatContent(site: ChatFAQSource): ChatContent {
  return {
    "locale": "en",
    "panelId": "nextwave-chat-panel",
    "title": "NextWave Assistant",
    "subtitle": "Virtual project assistant",
    "greeting": "Hi! I'm NextWave's virtual assistant. I can help you find the right solution for your business.",
    "labels": {
      "open": "Open the NextWave sales assistant",
      "close": "Close the NextWave sales assistant",
      "loading": "Opening assistant…",
      "back": "Back",
      "restart": "Start again",
      "whatsapp": "Chat on WhatsApp",
      "messages": "Conversation with NextWave Assistant",
      "assistant": "NextWave Assistant",
      "visitor": "You",
      "continue": "Continue",
      "skip": "Skip this question",
      "finish": "Finish with what I've shared",
      "edit": "Edit answers",
      "resume": "Continue the brief",
      "preview": "Your message to NextWave",
      "previewHelp": "You can edit this message. It will open in WhatsApp, where you confirm sending it.",
      "resetMessage": "Restore suggested message",
      "send": "Discuss my project",
      "service": "Service",
      "goal": "Main goal",
      "business": "Business or industry",
      "materials": "Available materials",
      "timing": "Preferred timing",
      "details": "Additional details",
      "alternative": "Another possibility",
      "explore": "Explore another solution",
      "confirmRecommendation": "Continue with this option",
      "anotherQuestion": "Another question",
      "chooseHelp": "Help me choose a service",
      "optional": "Optional. You can skip or contact us directly.",
      "multiple": "Select the options that make sense for you.",
      "progress": "Project brief · step {current} of {total}",
      "editAnswer": "Edit {field}"
    },
    "welcome": {
      "diagnose": "Help me choose a service",
      "choose": "I already know what I want to create",
      "improve": "I want to improve my current website",
      "questions": "I have a few questions",
      "direct": "Chat directly on WhatsApp"
    },
    "prompts": {
      "situation": "Which situation best describes what you need?",
      "diagnosticGoal": "What is your main goal?",
      "companyScope": "Do you need to present several kinds of information, such as services, your team, company history or contact details?",
      "offerFocus": "Would you like a page focused on one offer and one main action, such as requesting a quote or getting in touch?",
      "hasSite": "Do you already have a website?",
      "change": "Would you like to change the design and structure, or do you mainly need updates and support?",
      "scope": "To find the right direction, which need is your priority right now?",
      "services": "Which solution do you have in mind? Explore the options and choose what works for you.",
      "questions": "What would you like to know?",
      "business": "Tell me a little about your business. What industry do you work in?",
      "goal": "What would you most like to achieve with this project?",
      "offer": "Which product, service or offer would you like to promote?",
      "action": "What main action would you like visitors to take?",
      "pages": "Which information or pages would you like to include?",
      "currentUrl": "What is your current website address?",
      "improvements": "What would you most like to improve?",
      "maintenance": "What do you need to maintain or update?",
      "materials": "Do you already have project materials, such as a logo, copy and images?",
      "timing": "When would you like to launch the project?",
      "details": "Is there any important detail you'd like to add?"
    },
    "placeholders": {
      "business": "E.g. barber shop, clinic, clothing store, professional services…",
      "offer": "Tell us which offer or service you'd like to present…",
      "currentUrl": "E.g. yourwebsite.com",
      "details": "Share a detail that helps us understand your project…"
    },
    "fieldLabels": {
      "business": "Business or industry",
      "goal": "Goal",
      "offer": "Product, service or offer",
      "action": "Main action",
      "pages": "Information and pages",
      "currentUrl": "Current website",
      "improvements": "Desired improvements",
      "maintenance": "Updates and support",
      "materials": "Materials",
      "timing": "Preferred timing",
      "details": "Additional details"
    },
    "situations": {
      "offer": "I want to promote a specific product or service.",
      "company": "I want to present my business online.",
      "modernize": "I have a website, but I'd like to modernize it.",
      "upkeep": "My website needs updates or support.",
      "unsure": "I'm not sure yet."
    },
    "goals": {
      "generate-leads": "Receive more enquiries and quote requests.",
      "present-company": "Present my business and its services.",
      "campaign": "Promote a campaign, special offer or launch.",
      "improve-design": "Improve my website's design and user experience.",
      "keep-updated": "Keep my website up to date and working well.",
      "explore": "I'm still exploring the possibilities."
    },
    "clarifications": {
      "binary": {
        "yes": "Yes.",
        "no": "No.",
        "unsure": "I'm not sure where to start."
      },
      "change": {
        "design": "I'd like to improve the design and structure.",
        "support": "I mainly need updates and support.",
        "both": "I need both.",
        "unsure": "I'd like some guidance first."
      },
      "scope": {
        "landing": "Promote an offer with a clear call to action.",
        "website": "Present my business and a range of information.",
        "redesign": "Modernize an existing website.",
        "maintenance": "Update or fix my current website.",
        "unsure": "I'd rather compare the options."
      }
    },
    "actions": {
      "whatsapp": "Get in touch on WhatsApp.",
      "quote": "Request a quote.",
      "booking": "Book an appointment.",
      "offer": "Learn about an offer.",
      "other": "Something else."
    },
    "pages": {
      "about": "About the business",
      "services": "Services",
      "portfolio": "Portfolio",
      "contact": "Contact",
      "unsure": "Not decided yet"
    },
    "improvements": {
      "visual": "Design",
      "navigation": "Navigation",
      "mobile": "Mobile experience",
      "organization": "Information structure",
      "performance": "Performance",
      "unsure": "Not sure yet"
    },
    "maintenance": {
      "content": "Copy and images",
      "fixes": "Fixes",
      "periodic": "Regular updates",
      "improvements": "Specific improvements",
      "guidance": "I need guidance"
    },
    "materials": {
      "ready": "Yes, I have everything.",
      "partial": "I have some of the materials.",
      "prepare": "I still need to prepare them.",
      "unsure": "I'm not sure what will be needed."
    },
    "timing": {
      "asap": "As soon as possible.",
      "weeks": "In the next few weeks.",
      "months": "In the next few months.",
      "unsure": "I don't have a deadline yet."
    },
    "services": {
      "landing": {
        "name": "Landing page",
        "description": "A focused page built around one offer and one main action.",
        "explanation": "A landing page can present your offer clearly and guide visitors towards getting in touch, requesting a quote or another action you choose.",
        "benefits": [
          "Content focused on a specific offer",
          "A clear path to the main action"
        ]
      },
      "website": {
        "name": "Business website",
        "description": "A broader online presence for your business.",
        "explanation": "A business website can organize information about your company and services, present a professional image and make it easier for visitors to get in touch.",
        "benefits": [
          "Information organized by topic",
          "Space to present your business identity"
        ]
      },
      "redesign": {
        "name": "Website redesign",
        "description": "A refreshed experience for an existing website.",
        "explanation": "A redesign allows us to review your website's design, navigation and structure. We'll define the improvements after looking at what you already have.",
        "benefits": [
          "A review of the experience and navigation",
          "Design aligned with your brand identity"
        ]
      },
      "maintenance": {
        "name": "Maintenance and support",
        "description": "Updates and improvements to suit your needs.",
        "explanation": "Maintenance and support can help with content, fixes and specific improvements to your current website, without assuming a rebuild. We'll agree on the scope together.",
        "benefits": [
          "Up-to-date content",
          "Fixes and improvements with an agreed scope"
        ]
      }
    },
    "recommendation": {
      "title": "My recommendation for your project",
      "guidance": "This is an initial suggestion. We'll confirm the solution and scope together in a conversation.",
      "confidence": {
        "clear": "A clear direction",
        "tentative": "An option worth exploring",
        "insufficient": "Let's compare the options"
      },
      "reasons": {
        "focused-offer": "You want to promote an offer or guide visitors towards a main action.",
        "company-presence": "You want to present your business and its information.",
        "existing-design": "Your current website needs a more suitable experience.",
        "existing-upkeep": "You need to update or take care of your current website.",
        "uncertain": "There isn't enough information to suggest a single solution yet. These options can help you get started.",
        "conflict": "Your answers point to different needs. It's worth comparing these options before deciding."
      }
    },
    "summary": {
      "title": "Your project is taking shape!",
      "description": "Review what you've shared. You can edit, add more details or talk to NextWave now.",
      "scopeNote": "Pricing and timing will be discussed once we understand the scope. This summary is not a service agreement.",
      "empty": "You can start a conversation even without a complete brief."
    },
    "errors": {
      "invalidUrl": "Enter a valid website address, such as yourwebsite.com, or skip this question.",
      "tooLong": "This text exceeds the field limit. Shorten it a little to continue.",
      "emptyMessage": "Write a message before opening WhatsApp."
    },
    "faq": {
      "difference": {
        "question": "What's the difference between a landing page and a business website?",
        "answer": "A landing page focuses on one offer and one main action. A business website presents your company and different information, such as services, company background and contact details. The right choice depends on your project's goal."
      },
      "timeline": {
        "question": "How long does it take to create a website?",
        "answer": site.faq.items[1].answer
      },
      "mobile": {
        "question": "Will the website work on mobile?",
        "answer": site.faq.items[2].answer
      },
      "domain": {
        "question": "Do I need to buy a domain?",
        "answer": "A domain is the address people use to visit your website. " + site.faq.items[4].answer
      },
      "hosting": {
        "question": "How does hosting work?",
        "answer": "Hosting keeps your website files available on the internet. " + site.faq.items[4].answer
      },
      "materials": {
        "question": "Do I need to provide copy and images?",
        "answer": site.faq.items[3].answer
      },
      "maintenance": {
        "question": "Do you offer maintenance?",
        "answer": "We offer maintenance and support, including updates and improvements to suit your needs. The work involved and the terms of ongoing support are defined in the proposal."
      },
      "hiring": {
        "question": "How do we get started?",
        "answer": "We start with a conversation about your business and goals, then agree on the scope and proposal before development begins. Adjustments, publishing and next steps are defined throughout this process."
      },
      "quote": {
        "question": "How do I request a quote?",
        "answer": site.faq.items[0].answer
      },
      "payment": {
        "question": "How does payment work?",
        "answer": "Payment terms are discussed as part of the proposal. Contact us on WhatsApp before booking a project."
      }
    },
    "message": {
      "greeting": "Hi! How are you?",
      "intro": "I spoke with NextWave's virtual assistant.",
      "generic": "I'd like to discuss a project for my business.",
      "closing": "Could we discuss the possibilities and a quote?",
      "requests": {
        "landing": "I'd like to create a landing page.",
        "website": "I'd like to develop a business website.",
        "redesign": "I'd like to modernize my website.",
        "maintenance": "I'm looking for support with updates and improvements to my website."
      },
      "business": "The project is for a business in {value}.",
      "offer": "I'd like to promote {value}.",
      "currentUrl": "My current website is {value}.",
      "details": "I'd also like to share this detail: {value}.",
      "goals": {
        "generate-leads": "My goal is to make it easier to receive enquiries and quote requests.",
        "present-company": "I'd like to present my business and its services.",
        "campaign": "I'd like to promote a campaign, special offer or launch.",
        "improve-design": "I'd like to improve my website's design and user experience.",
        "keep-updated": "I'd like to keep my website up to date and working well."
      },
      "actions": {
        "whatsapp": "I'd like visitors to get in touch on WhatsApp.",
        "quote": "The main action will be requesting a quote.",
        "booking": "I'd like visitors to book an appointment.",
        "offer": "The main action will be learning about the offer."
      },
      "pages": "I'd like to include {value}.",
      "pageNames": {
        "about": "information about the business",
        "services": "our services",
        "portfolio": "a portfolio",
        "contact": "a way to get in touch"
      },
      "improvements": "The improvements I have in mind are {value}.",
      "improvementNames": {
        "visual": "the design",
        "navigation": "navigation",
        "mobile": "the mobile experience",
        "organization": "the information structure",
        "performance": "performance"
      },
      "maintenance": "I need help with {value}.",
      "maintenanceNames": {
        "content": "copy and images",
        "fixes": "fixes",
        "periodic": "regular updates",
        "improvements": "specific improvements",
        "guidance": "guidance on what needs to be done"
      },
      "materials": {
        "ready": "I already have a logo, copy and images for the project.",
        "partial": "I have some of the project materials.",
        "prepare": "I still need to prepare the materials."
      },
      "timing": {
        "asap": "I'd like to launch as soon as possible, subject to feasibility.",
        "weeks": "I'd like to launch in the next few weeks.",
        "months": "I'd like to launch in the next few months."
      },
      "conjunction": "and"
    }
  };
}
