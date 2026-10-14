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

O assistant guarda apenas IDs de etapa, serviço, faixa e dúvida em memória e `sessionStorage`. A interface, histórico, resumo e mensagem comercial são reconstruídos no idioma ativo. As respostas persistem durante a troca de idioma e recarregamentos na mesma sessão; o painel pode fechar na navegação e permanece acessível pelo botão flutuante. Sem acesso ao storage, a memória preserva escolhas durante navegação interna.

## WhatsApp e publicação

Todos os links são gerados por `src/lib/whatsapp.ts`, usando o número oficial `5544997341655` (+55 44 99734-1655) e `encodeURIComponent`.
Cada CTA recebe uma mensagem traduzida; os cards especificam o serviço.
O assistant acrescenta origem NextWave Assistant, serviço, faixa apenas quando informada, dúvida quando selecionada e pedido de orçamento. O link abre o WhatsApp preenchido; o visitante confirma o envio no aplicativo.

Não há preços de serviços na landing page. A faixa opcional do assistant permanece em reais brasileiros (BRL), sem conversão de moeda.

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
- `src/lib/chat.ts`: fluxo guiado e composição das mensagens traduzidas.
- `src/lib/chat-store.ts`: preservação das respostas na sessão.
- `src/lib/whatsapp.ts`: contato oficial e URLs comerciais.
- `AGENTS.md`: convenções do projeto e instruções locais do Next.js.

Orbit Studio, Botânica e Nexus Workspace são demos visuais autorais, identificadas nos três idiomas. Não representam clientes, resultados comerciais ou sistemas funcionais.

O conteúdo é renderizado no servidor. FAQ e menu usam controles nativos. Smooth scrolling, reveal, hover, iluminação e parallax preservam movimento reduzido e a experiência mobile.

## Validação e produção

```bash
npm run lint
npx next typegen
npx tsc --noEmit
npm run build
npm start
```

`next typegen` atualiza os tipos após mudanças de rotas. Em PowerShell com scripts bloqueados, use `npm.cmd` e `npx.cmd`.
O build pode baixar Geist via `next/font/google` e precisar de rede na primeira execução; a fonte é servida pelo próprio site em produção.

Antes de publicar, revise as traduções, configure o domínio e confira as rotas, o seletor desktop/mobile, os fluxos do assistant, a persistência das escolhas, os destinos do WhatsApp, os metadados e a experiência com movimento reduzido.
