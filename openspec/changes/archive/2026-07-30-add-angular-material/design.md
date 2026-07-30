## Context

O app é um único componente standalone (`CurrencyConverterComponent`) usando `FormsModule`/`ngModel`, sem Angular Material instalado. O projeto é Angular 22 com builder `@angular/build:application` (esbuild), sem NgModules. O objetivo é aplicar o guia oficial de "Getting started" do Angular Material (https://material.angular.dev/guide/getting-started) para instalar o pacote e trocar os controles nativos da tela de conversão por componentes Material equivalentes.

## Goals / Non-Goals

**Goals:**
- Instalar o Angular Material via `ng add @angular/material`, deixando tema, tipografia e animações configurados conforme o schematic oficial.
- Substituir os controles nativos (`input`, `select`, `button` de swap, mensagens de erro/hint) pelos componentes Material equivalentes, mantendo o comportamento funcional atual (validação de valor, troca de moedas, exibição de erros/loading).
- Manter os componentes standalone, importando diretamente os módulos Material necessários (`MatFormFieldModule`, `MatInputModule`, `MatSelectModule`, `MatButtonModule`, `MatIconModule`) no array `imports` do componente.

**Non-Goals:**
- Não é objetivo redesenhar o layout ou fluxo do conversor além da troca de componentes.
- Não é objetivo migrar `ngModel`/`FormsModule` para `ReactiveFormsModule` — o data binding atual é mantido.
- Não é objetivo customizar um tema Material próprio (paleta customizada); usa-se um tema pré-construído do schematic.

## Decisions

- **Instalação via `ng add @angular/material`**: usa o schematic oficial, que já instala `@angular/material`, `@angular/cdk`, `@angular/animations`, adiciona um tema pré-construído em `angular.json`/`styles.css`, configura `provideAnimationsAsync()` em `app.config.ts` e importa a fonte Roboto + Material Icons no `index.html`. Alternativa descartada: instalar pacotes manualmente e configurar cada peça à mão — mais propenso a erro e diverge do guia oficial referenciado.
- **Imports standalone por componente, não `MatModule` monolítico**: cada componente importa apenas os módulos Material que usa (`MatFormFieldModule`, `MatInputModule`, `MatSelectModule`, `MatIconModule`, `MatButtonModule`), seguindo o padrão standalone do Angular 22 já usado no projeto (`imports: [CommonModule, FormsModule]`).
- **`mat-form-field` com `matInput` para o campo de valor e de resultado**: substitui os dois `<input>` nativos, preservando `[ngModel]`/`(ngModelChange)` no de valor e `[value]`/`readonly` no de resultado. Erros passam a usar `<mat-error>` dentro do `mat-form-field`, exibido condicionalmente com `@if`.
- **`mat-select`/`mat-option` para seleção de moeda**: substitui os `<select>` nativos, mantendo o mesmo binding via `[ngModel]`/`(ngModelChange)` e o `@for` sobre `currencies()`.
- **`mat-icon-button` + `mat-icon` para o botão de swap**: substitui o `<button class="swap-button">⇄</button>` por um ícone Material (`swap_horiz`), preservando `(click)="onSwap()"` e `aria-label`.
- **Tema pré-construído do schematic**: opção padrão sugerida pelo `ng add` (ex.: Azure/Blue), sem customização de paleta nesta mudança, para manter escopo restrito à adoção do componente.

## Risks / Trade-offs

- [`ng add` sobrescreve `styles.css`/`app.config.ts` de forma automática] → Revisar o diff gerado pelo schematic antes de commitar; garantir que `provideHttpClient()` existente em `app.config.ts` não seja removido.
- [Aumento do bundle inicial pelo Angular Material/CDK/animations] → Aceitável para o escopo do projeto (SPA pequena); budgets em `angular.json` podem precisar de ajuste se excederem o limite de 500kB/1MB configurado.
- [CSS customizado (`currency-converter.component.css`) pode conflitar com estilos do Material] → Remover regras redundantes (bordas, cores de input/select) e manter apenas o necessário para layout (`.currencies-row`, espaçamentos).
- [Testes existentes (`currency-converter.component.spec.ts`) podem depender de seletores nativos como `select#from-currency`] → Atualizar os testes para os seletores/estrutura DOM gerados pelo Material (ou usar Component Test Harnesses do Angular Material, se necessário).

## Migration Plan

1. Rodar `ng add @angular/material` e revisar as alterações geradas (tema, `app.config.ts`, `index.html`, `styles.css`).
2. Atualizar `currency-converter.component.ts` com os imports Material necessários.
3. Atualizar `currency-converter.component.html` trocando os controles nativos pelos componentes Material.
4. Limpar `currency-converter.component.css` removendo estilos redundantes.
5. Ajustar `currency-converter.component.spec.ts` conforme necessário e rodar a suíte de testes (`npm test`).
6. Validar manualmente a tela (`ng serve`) cobrindo: input de valor com erro, troca de moedas, seleção de moeda, exibição de loading/erro de taxa.

Rollback: reverter os commits da mudança; não há migração de dados envolvida.

## Open Questions

- Nenhuma pendente — tema padrão e escopo (apenas os componentes já usados na tela) foram definidos nesta mudança.
