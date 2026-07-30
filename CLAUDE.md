# CLAUDE.md

Guia de contexto para trabalhar neste repositório.

## Visão geral

Conversor de moedas em Angular 22 (standalone components + signals) com Angular Material, consumindo a [Frankfurter API](https://api.frankfurter.dev/v1) para taxas de câmbio.

## Stack e comandos

- `npm start` — servidor de desenvolvimento (`ng serve`)
- `npm run build` — build de produção
- `npm test` — testes unitários com Vitest
- `npm run watch` — build em modo watch (development)

## Arquitetura

- `src/app/exchange-rate.service.ts` — único ponto de acesso HTTP à Frankfurter API (`getCurrencies`, `getRate`). Erros são convertidos em mensagens em português antes de propagar.
- `src/app/currency-converter/` — componente principal da conversão. Estado é todo baseado em `signal`/`computed`/`effect`, sem `Validators` do Angular Forms — a validação do valor digitado é feita manualmente (`isAmountValid`) e refletida no Material através de um `ErrorStateMatcher` customizado.
- `openspec/` — specs e histórico de mudanças gerenciados via [OpenSpec](https://github.com/Fission-AI/OpenSpec). Specs vigentes ficam em `openspec/specs/`; mudanças já implementadas são arquivadas em `openspec/changes/archive/`.

## Convenções

- Código e identificadores em inglês; mensagens de erro voltadas ao usuário em português.
- Formatação via Prettier (`.prettierrc`): aspas simples, `printWidth` 100, parser `angular` para templates HTML.
- Testes ficam ao lado do arquivo testado (`*.spec.ts`), usando `TestBed` + `HttpTestingController` para mockar chamadas HTTP.
- Não usar `Validators` do Angular Forms para regras de negócio — este projeto prefere validação explícita via `computed` signals.

## Fluxo de trabalho com OpenSpec

Ao propor, atualizar ou arquivar mudanças de escopo maior, use os comandos/skills `opsx:propose`, `opsx:apply`, `opsx:update`, `opsx:sync` e `opsx:archive` em vez de editar `openspec/` manualmente.
