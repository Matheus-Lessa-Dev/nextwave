<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Convenções NextWave

- Stack: Next.js App Router, TypeScript estrito, Tailwind CSS v4, Motion e Lucide React. Consulte os guias instalados em `node_modules/next/dist/docs/` antes de alterar APIs do framework.
- `src/app/` contém rotas, layout, metadados e CSS global. `src/components/` contém as seções; `src/components/ui/` contém elementos reutilizáveis.
- Use Server Components por padrão. Isole `"use client"` em interações e animações; passe conteúdo estático como `children` para preservar a renderização no servidor.
- Centralize toda copy revisável em `src/i18n/dictionaries/{pt-BR,en,es}.ts`, incluindo labels acessíveis, SEO, assistant e mensagens de WhatsApp. `Dictionary` mantém paridade de chaves e IDs. `src/config/site.ts` guarda apenas configuração pública de publicação.
- Todos os links comerciais são gerados por `src/lib/whatsapp.ts` e apresentados com `WhatsAppButton`. O número oficial autorizado é `WHATSAPP_NUMBER = "5544997341655"`; não use placeholders ou overrides de ambiente. Passe copy e mensagem do idioma ativo e codifique com `encodeURIComponent`.
- Não invente números, e-mails, domínios ou contatos. `/` redireciona para `/pt-BR`; `/pt-BR`, `/en` e `/es` compartilham IDs de seção estáveis, independentemente da tradução.
- Configure `NEXT_PUBLIC_SITE_URL` com a URL pública real para habilitar canônicas, hreflang, URLs do Open Graph e sitemap. Sem domínio configurado, omita URLs absolutas de SEO e retorne sitemap vazio; não use domínio fictício. Variáveis `NEXT_PUBLIC_*` são públicas e exigem novo build quando alteradas.
- Não exiba preços de serviços. CTAs comerciais solicitam orçamento pelo WhatsApp. O assistente pode perguntar uma faixa de investimento opcional em BRL, sem conversão de moeda. Links internos podem explorar o conteúdo da página.
- O assistente usa IDs independentes de idioma em `src/config/chat.ts`. Reconstrua mensagens com o dicionário ativo. Preserve escolhas via `src/lib/chat-store.ts` (memória e sessionStorage); o snapshot do servidor é sempre inicial para evitar divergência de hidratação. Não guarde textos traduzidos, dados pessoais ou contatos nessa sessão.
- Use `Link`/router para troca de idioma, preservando a seção atual. O layout localizado define `html lang` no servidor. Não acrescente bibliotecas de i18n ou smooth scroll sem necessidade.
- Identifique conceitos do portfólio como demos. Não invente clientes, depoimentos, resultados, métricas ou selos de confiança.
- Identidade: fundo `#070B14`, superfícies `#111827`, destaque `#38BDF8`; use tokens do tema. Prefira utilitários Tailwind e classes compartilhadas em `@layer components`; CSS específico deve servir às composições visuais.
- Desenvolva primeiro para telas menores. Evite overflow horizontal, preserve alvos de toque e hierarquia semântica com um único `h1`.
- Mantenha foco visível, link para pular ao conteúdo, rótulos acessíveis e ícones decorativos com `aria-hidden`. Prefira controles nativos; a FAQ e o menu devem funcionar sem JavaScript.
- Respeite `prefers-reduced-motion` tanto no CSS quanto no Motion. Conteúdo inicial deve permanecer visível sem hidratação; anime somente propriedades leves e evite loops decorativos.
- Preserve assets e alterações preexistentes do usuário. Evite novas dependências sem necessidade.
- Antes de entregar, execute `npm run lint`, `npx tsc --noEmit` e `npm run build`, corrija falhas e relate limitações reais de verificação. Em PowerShell com scripts bloqueados, use `npm.cmd` e `npx.cmd`.
