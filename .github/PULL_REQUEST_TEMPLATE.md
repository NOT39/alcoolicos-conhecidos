## Resumo

<!-- O que mudou e por quê. Foque no motivo, não na lista de arquivos. -->

## Tipo

- [ ] Feature
- [ ] Bugfix
- [ ] Refactor
- [ ] Chore / CI / docs
- [ ] Breaking change

## Apps

- [ ] `api` (`apps/api`)
- [ ] `web` (`apps/web`)

## Test plan

<!-- Como validar. Marque o que rodou. CI cobre só a API. -->

- [ ] `bun run typecheck:api`
- [ ] `bun run lint:api`
- [ ] `bun run test:api`
- [ ] Fluxo manual no web (se aplicável)

## Checklist

- [ ] Só Bun (`bun --filter <app> <script>`; nunca npm/yarn/pnpm)
- [ ] Sem secrets no diff (`.env`, credenciais)
- [ ] Schema Drizzle novo/alterado: `db:generate` + `db:migrate` (não `db:push`)
- [ ] Variável de ambiente nova: schema em `env.ts` + `.env.example`
- [ ] UI: comportamento conferido, não só screenshot
