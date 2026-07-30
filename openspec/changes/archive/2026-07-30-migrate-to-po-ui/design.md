## Context

O projeto é uma SPA Angular 22 standalone (`ng new` padrão, sem NgModules), com um único componente de negócio (`CurrencyConverterComponent`) usando `FormsModule` (`ngModel`) sobre elementos HTML nativos (`input`, `select`, `button`) e CSS customizado (`currency-converter.component.css`). Não há testes e2e; há testes unitários com Vitest (`*.spec.ts`).

O PO-UI (`po-angular`) é uma biblioteca de componentes Angular (PO-UI Community) mantida pela TOTVS, distribuída via `@po-ui/ng-components`. Publica componentes standalone a partir da v6+ e módulos (`PoModule`) nas versões anteriores. É necessário confirmar a versão compatível com Angular 22 antes de instalar (a matriz de compatibilidade do PO-UI normalmente segue as major versions do Angular com defasagem).

## Goals / Non-Goals

**Goals:**
- Substituir os controles nativos do formulário de conversão pelos componentes equivalentes do PO-UI (`po-input`, `po-select` ou `po-combo`, `po-button`).
- Preservar 100% do comportamento funcional descrito em `openspec/specs/currency-conversion/spec.md` (validação de 9 dígitos, ordenação alfabética, swap, atualização automática, mensagens de erro/loading).
- Reduzir/eliminar CSS customizado em favor do tema padrão do PO-UI.

**Non-Goals:**
- Não migrar o layout geral do app (`app.html`/`app.css`) para o template PO (ex.: `po-page`, `po-toolbar`) — escopo restrito ao componente `currency-converter`.
- Não introduzir um design system próprio ou tema customizado do PO-UI nesta mudança.
- Não alterar `ExchangeRateService` nem a lógica de negócio em `currency-converter.component.ts` além do necessário para adequar aos `Output`/`Input` dos novos componentes.

## Decisions

- **Biblioteca**: usar `@po-ui/ng-components` (pacote principal de componentes de UI do PO-UI). Não é necessário `@po-ui/ng-templates` pois não estamos adotando `po-page`/layout de página nesta mudança.
  - *Alternativa considerada*: manter HTML nativo e apenas restilizar com CSS — descartada porque o objetivo explícito da mudança é adotar o design system PO-UI.
- **Import standalone**: como o app usa Angular standalone components, os componentes PO-UI serão importados diretamente no array `imports` do `CurrencyConverterComponent` (ex.: `PoInputModule`, `PoSelectModule`, `PoButtonModule`), sem introduzir `NgModule`.
- **Campo de valor**: usar `po-input` com `p-type="number"` ou `p-type="currency"` e validação client-side (`p-error-pattern`/`p-required`) para manter a regra de máximo 9 dígitos, reaproveitando o `computed isAmountValid` existente para exibir mensagem de erro custom quando necessário.
- **Selects de moeda**: usar `po-select` (lista estática/fechada, já ordenada) em vez de `po-combo` (que é mais indicado para busca/autocomplete) — a lista de moedas é finita e já vem ordenada do serviço.
- **Botão de swap**: usar `po-button` com `p-icon="po-icon-swap"` (ou ícone equivalente disponível na versão instalada) e `p-kind="secondary"`.
- **Resultado**: usar `po-input` com `[p-disabled]="true"` (em vez de `readonly` nativo) para manter a aparência consistente com os demais inputs PO.
- **Mensagens de erro/loading**: usar `po-info` para mensagens de erro de moedas/taxa e um indicador simples de texto (ou `po-loading-overlay` restrito à seção do card) para o estado de carregamento da taxa.
- **Manter os `signal`s e a lógica reativa existentes** (`amountInput`, `fromCurrency`, `toCurrency`, `effect` de busca de taxa) — a migração é só na camada de template/apresentação, refatorando apenas os bindings (`[ngModel]`/`(ngModelChange)` continuam funcionando com componentes PO-UI, que suportam `ControlValueAccessor`).

## Risks / Trade-offs

- [Risco] Incompatibilidade de versão entre `@po-ui/ng-components` e Angular 22 (biblioteca pode não ter release testado contra a versão mais recente do Angular) → Mitigação: verificar a matriz de compatibilidade oficial do PO-UI antes de instalar; se necessário, usar a versão mais recente disponível e rodar `ng build`/testes para validar; considerar `--legacy-peer-deps` apenas como último recurso e documentar a decisão.
- [Risco] Diferenças de acessibilidade/semântica entre `<select>` nativo e `po-select` podem alterar o comportamento dos testes existentes (seletores CSS) → Mitigação: atualizar `currency-converter.component.spec.ts` (se existir) para os seletores/API do PO-UI e rodar a suíte após a migração.
- [Risco] Bundle size aumenta com a nova dependência → Mitigação: aceitar o trade-off, dado que o ganho de consistência visual/acessibilidade justifica o custo neste projeto pequeno.
- [Trade-off] Perda de controle fino sobre estilos customizados (ex.: `.swap-button` circular) em favor da consistência do design system — aceito como resultado esperado da migração.

## Open Questions

- Qual a versão exata de `@po-ui/ng-components` a instalar (a mais recente compatível com Angular 22 no momento da implementação)? A ser resolvido durante a fase de implementação, consultando o `peerDependencies` do pacote publicado no npm.
- O ícone de swap (`po-icon-swap` ou similar) existe na versão instalada? Caso não exista, usar um ícone alternativo disponível no PO Icon.
