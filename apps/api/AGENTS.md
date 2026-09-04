# API (`apps/api`)

Backend Bun + Elysia. PostgreSQL via Drizzle. Auth via Better Auth (cookie). Validação TypeBox / drizzle-typebox. Logs Pino. Lint Biome.

## Arquitetura

```
src/index.ts          → listen + shutdown
src/app.ts            → composition root (createApp)
src/common/           → config, db, logger, middleware
src/modules/<recurso>/ → plugins Elysia por domínio
tests/                → bun:test + Testcontainers
```

`createApp()` em `src/app.ts` registra, nesta ordem: request logger, rate limit, CORS, Swagger (`/docs`), `.onError()`, depois os módulos via `.use()`. Auth só entra se `ENABLE_AUTH=true`.

Módulos atuais: `health`, `groups`, `auth` (condicional). Prefixo de recurso: `/api/<recurso>` (health é `/health`).

## Anatomia de um módulo

Não existe camada repository. Services falam com Drizzle direto.

| Arquivo | Papel |
|---------|--------|
| `index.ts` | Plugin Elysia, rotas, handlers, `detail` OpenAPI |
| `service.ts` | Funções async com queries Drizzle |
| `schemas.ts` | `createInsertSchema` / `createUpdateSchema` |

Exportar o plugin como `<nome>Module` e registrar em `app.ts`.

Aliases: preferir `@common/*` e `@modules/*` (não misturar com relativos longos).

## Novo recurso

1. Schema em `src/common/db/schema/<entidade>.ts`
2. Reexportar em `src/common/db/schema/index.ts`
3. `bun run db:generate` e `bun run db:migrate`
4. Criar `src/modules/<entidade>/` (index + service + schemas)
5. `.use(<entidade>Module)` em `src/app.ts` + tag no Swagger
6. Teste em `tests/<entidade>.test.ts`

## Auth

- Envolver o módulo com `withAuth()` (`src/common/middleware/auth-guard.ts`).
- Rota protegida: `{ auth: true }` na definição da rota.
- Checagem de dono fica no handler (`403` se `ownerId !== user.id`).
- **Não alterar** `src/common/db/schema/auth.ts` fora do que a Better Auth documentar.
- O módulo `auth` só faz proxy para `auth.handler(request)` — configurar em `src/common/config/auth.ts`.

## Env, DB, respostas

- Env validado com TypeBox em `src/common/config/env.ts` (fail-fast no import). Variável nova = schema + `.env.example`.
- Migrations: editar schema → `db:generate` → `db:migrate`. Não usar `db:push` em fluxo que precisa de histórico.
- Lista: `{ data, total }`. Mutação: `{ data, message }`. Erro: `{ error, message? }`.

## Testes

- Runner: `bun test --env-file=.env.test` (Postgres efêmero via Testcontainers).
- Sem servidor HTTP: `createApp()` + `app.handle(new Request(...))`.
- Auth: sign-up/sign-in, ler `set-cookie`, reenviar como `Cookie`.
- Rate limit desligado em `.env.test`.

## Referência de domínio

`groups` é o módulo de referência. CRUD ainda incompleto (só `GET /`). Completar groups; **não reativar** `src/modules/posts` (código legado, fora do `app.ts`).

Não adotar deps instaladas e não usadas: `@elysiajs/bearer`, `elysia-rate-limit`, `@bogeychan/elysia-logger`.

## Comandos

```bash
bun run dev          # watch
bun run test
bun run lint         # bun run lint:fix para corrigir
bun run typecheck
bun run db:up        # Postgres local (docker-compose)
bun run db:generate && bun run db:migrate
bun run db:seed
```

Na raiz: `bun --filter api <script>`.
