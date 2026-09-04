# Alcoólicos Conhecidos

Monorepo Bun (`workspaces: apps/*`). Sem pacotes compartilhados em `packages/`.

| App | Pasta | Papel |
|-----|--------|--------|
| `api` | `apps/api` | Backend Elysia + Drizzle + Better Auth |
| `web` | `apps/web` | Frontend Next.js 16 (App Router) |

Detalhes de cada app: [`apps/api/AGENTS.md`](apps/api/AGENTS.md) e [`apps/web/AGENTS.md`](apps/web/AGENTS.md).

## Runtime e workspaces

- Só **Bun**. Nunca npm, yarn, pnpm ou npx.
- Scripts de um workspace: `bun --filter <nome> <script>` (dois hífens).
- `bun -filter` quebra com `Invalid Argument '-f'`.

```bash
bun install
bun --filter api lint:fix
bun --filter web dev
```

## Scripts da raiz

| Script | O que faz |
|--------|-----------|
| `dev:api` | Sobe a API em watch |
| `dev:web` | Sobe o Next.js |
| `test:api` / `lint:api` / `typecheck:api` | Qualidade da API |

CI (`.github/workflows/ci.yml`) cobre **somente a API**.

## Portas

API e Next.js defaultam em **3000**. Para rodar os dois juntos, suba o web em outra porta (ex. `3001`) e inclua essa origem em `CORS_ORIGIN` da API.

## Ferramentas comuns

- TypeScript em modo strict
- **Biome** para lint e format (não ESLint/Prettier)
- Cada app tem o próprio `biome.json`
