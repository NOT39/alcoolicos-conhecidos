# Web (`apps/web`)

Frontend Next.js 16.3 (App Router em `src/app/`), React 19, Tailwind CSS v4, React Compiler, Turbopack (`turbopack.root` aponta para a raiz do monorepo). Lint/format: Biome. Alias `@/*` → `./src/*`.

Ainda é um scaffold: não há client da API, auth, `src/components`, `src/lib` nem testes. Não prescrever shadcn, TanStack Query, Zustand ou equivalente até o projeto adotar.

## Convenções

- **Server Components por padrão.** `"use client"` só quando houver interatividade de browser.
- Só App Router (`src/app/`). Sem Pages Router.
- Tipos Next 16 (`LayoutProps`, `PageProps`, `params`/`searchParams` async). Antes de usar APIs antigas, ler `node_modules/next/dist/docs/`.
- Estilo: Tailwind v4 via `@import "tailwindcss"` e tokens em `@theme inline` (`src/app/globals.css`). Sem `tailwind.config.js`.
- Não adicionar ESLint nem Prettier.
- Não assumir `middleware.ts` do Next 15 sem conferir o guia local (Next 16 pode usar `proxy.ts`).

## Integração com a API

A API (`apps/api`) usa Better Auth com cookies (`credentials: true`). Quando integrar:

- Env: `NEXT_PUBLIC_API_URL` (ou `API_URL` só no servidor).
- Fetch/client: `credentials: 'include'`.
- Incluir a origem do web em `CORS_ORIGIN` da API.

API e Next defaultam na porta **3000**. Para rodar juntos, use outra porta no web (ex. `next dev -p 3001`).

## Comandos

```bash
bun run dev
bun run build
bun run lint
bun run typecheck
bun run format
```

Na raiz: `bun --filter web <script>`.
