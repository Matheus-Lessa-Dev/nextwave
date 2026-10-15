# NextWave

Landing page comercial trilíngue (pt-BR, en e es), com Next.js App Router, TypeScript, Tailwind CSS v4, Motion e Lucide React.

## Desenvolvimento

```bash
npm install
npm run dev
```

Acesse http://localhost:3000. A rota `/` redireciona para `/pt-BR`.
As versões traduzidas estão em `/pt-BR`, `/en` e `/es`.

## Conteúdo e idiomas

Os dicionários revisáveis em `src/i18n/dictionaries/` contêm a copy da página, metadados, labels acessíveis, demos, mensagens comerciais e o NextWave Assistant.
`pt-BR.ts` define a estrutura; inglês e espanhol usam `satisfies Dictionary` para verificar as mesmas chaves, âncoras, nomes próprios e identificadores.

Para adicionar um texto, inclua a chave nos três dicionários e consuma o conteúdo tipado recebido pelo componente. Não coloque traduções diretamente nos componentes. As respostas do assistant sobre prazo, mobile e domínio reutilizam o FAQ do mesmo dicionário.

As páginas carregam apenas o dicionário da rota no servidor. O seletor PT | EN | ES usa navegação interna do Next.js e preserva a seção atual. Os IDs das seções não mudam de idioma.

O assistant guarda IDs estáveis de diagnóstico, serviço, objetivo, etapa e escolhas, além dos textos livres do briefing informados pelo visitante, em memória e `sessionStorage`. A interface, histórico, resumo e mensagem comercial são reconstruídos no idioma ativo. As respostas persistem durante a troca de idioma e recarregamentos na mesma sessão; o painel pode fechar na navegação e permanece acessível pelo botão flutuante. Sem acesso ao storage, a memória preserva escolhas durante navegação interna.

## NextWave Assistant v2.2

O painel é carregado sob demanda e não abre automaticamente. O visitante pode pedir ajuda para escolher, selecionar qualquer um dos quatro serviços, melhorar um site atual, consultar a central de dúvidas ou abrir o WhatsApp imediatamente.

O diagnóstico faz de uma a três perguntas, conforme o caminho escolhido. `recommendService` usa regras determinísticas: oferta e campanha indicam landing page; apresentação da empresa indica site institucional; melhorias de visual e estrutura indicam redesign; atualizações e correções indicam manutenção. Respostas insuficientes ou conflitantes geram uma pergunta de esclarecimento ou alternativas. A confiança é qualitativa, sem porcentagens ou promessas. O visitante pode escolher outro serviço.

O briefing faz uma pergunta por vez, com até sete interações opcionais. Reutiliza o objetivo do diagnóstico e adapta os detalhes ao serviço escolhido. Há seleção múltipla, campos livres com limite, validação de URL, opção de pular, finalização antecipada, edição do resumo e retomada. Nenhuma informação pessoal é solicitada. As respostas sobre prazo, mobile, materiais, domínio, hospedagem e orçamento reutilizam o FAQ real do site.

A sessão usa a chave `nextwave.assistant.v2.2`; escolhas de serviço da versão anterior são migradas. Os dados ficam somente no navegador durante a sessão. Reiniciar limpa o fluxo. Se o armazenamento estiver bloqueado, a memória ainda preserva o briefing na navegação interna.

Os textos do assistant ficam em `src/i18n/chat/{pt-BR,en,es}.ts`, com contrato explícito em `types.ts`. As fábricas recebem o conteúdo público do idioma para reutilizar o FAQ. Não há tradução automática, backend ou API de IA.

## WhatsApp e publicação

Todos os links são gerados por `src/lib/whatsapp.ts`, usando o número oficial `5544997341655` (+55 44 99734-1655) e `encodeURIComponent`.
Cada CTA recebe uma mensagem traduzida; os cards especificam o serviço.
O assistant compõe frases naturais a partir do serviço e das respostas efetivamente informadas. Campos vazios e escolhas sem informação útil são omitidos. O resumo mostra uma prévia editável; edições da mensagem são preservadas por idioma e invalidadas quando o briefing muda. Textos livres do briefing permanecem como foram escritos. O link abre o WhatsApp preenchido; o visitante confirma o envio no aplicativo.

Não há preços de serviços na landing page nem pergunta de investimento no fluxo do assistant.

Configure o domínio real em um arquivo `.env.local` (ignorado pelo Git):

```dotenv
NEXT_PUBLIC_SITE_URL=
```

Preencha com a URL pública definitiva antes de publicar. Ela habilita canônicas por idioma, hreflang pt-BR/en/es, x-default para pt-BR, URLs do Open Graph e sitemap multilíngue.
Sem configuração válida, nenhuma URL de produção é inventada e o sitemap fica vazio. A variável é pública e incorporada no build: gere um novo build após alterá-la.

## Estrutura

- `src/app/[locale]/`: página, layout localizado e estados de página não encontrada.
- `src/app/sitemap.ts`: sitemap com as três versões e alternates.
- `src/i18n/`: idiomas suportados, tipos, carregamento dos dicionários e SEO.
- `src/config/site.ts`: configuração pública de publicação.
- `src/config/chat.ts`: identificadores estáveis do assistant.
- `src/components/`: seções e seletor de idioma.
- `src/components/ui/`: marca, CTAs, menu móvel e animações.
- `src/components/chat/`: botão flutuante, painel, mensagens e opções.
- `src/lib/chat.ts`: estado previsível, navegação e ações do fluxo.
- `src/lib/service-recommendation.ts`: regras puras de recomendação.
- `src/lib/project-briefing.ts`: sequência adaptativa e validação dos campos.
- `src/lib/whatsapp-message-builder.ts`: composição natural das mensagens.
- `src/lib/chat-session.ts`: validação e migração da sessão.
- `src/i18n/chat/`: traduções tipadas do assistant.
- `tests/assistant.test.ts`: testes automatizados de recomendação, fluxo, sessão, tradução e mensagens.
- `src/lib/chat-store.ts`: preservação das respostas na sessão.
- `src/lib/whatsapp.ts`: contato oficial e URLs comerciais.
- `AGENTS.md`: convenções do projeto e instruções locais do Next.js.

Orbit Studio, Botânica e Nexus Workspace são demos visuais autorais, identificadas nos três idiomas. Não representam clientes, resultados comerciais ou sistemas funcionais.

O conteúdo é renderizado no servidor. FAQ e menu usam controles nativos. Smooth scrolling, reveal, hover, iluminação e parallax preservam movimento reduzido e a experiência mobile.

## Analytics e desempenho

O layout compartilhado em `src/app/[locale]/layout.tsx` inclui `Analytics` e `SpeedInsights`, usando as integrações oficiais da Vercel para Next.js nos três idiomas.

- **Web Analytics**: visitantes, visualizações, origem dos acessos, países e dispositivos.
- **Speed Insights**: métricas de desempenho da experiência dos visitantes, conforme os recursos disponíveis no plano.

No painel do projeto na Vercel, habilite **Analytics** e **Speed Insights**, publique um novo deploy e visite o site para iniciar a coleta. Consulte os resultados nas respectivas abas. Bloqueadores de conteúdo podem impedir o envio dos eventos. A integração não exige banco de dados próprio nem chaves de API no projeto.

Guias oficiais: [Web Analytics](https://vercel.com/docs/analytics/quickstart) e [Speed Insights](https://vercel.com/docs/speed-insights/quickstart).

## Validação e produção

```bash
npm run lint
npm test
npx next typegen
npx tsc --noEmit
npm run build
npm start
```

`npm test` compila os testes para a pasta ignorada `.next/assistant-tests` e usa `node:test`, disponível no Node 20+. Reutiliza TypeScript e o runner nativo do Node, sem dependências novas.

`next typegen` atualiza os tipos após mudanças de rotas. Em PowerShell com scripts bloqueados, use `npm.cmd` e `npx.cmd`.
O build pode baixar Geist via `next/font/google` e precisar de rede na primeira execução; a fonte é servida pelo próprio site em produção.

Antes de publicar, revise as traduções, configure o domínio e confira as rotas, o seletor desktop/mobile, os fluxos do assistant, a persistência das escolhas, os destinos do WhatsApp, os metadados e a experiência com movimento reduzido.
