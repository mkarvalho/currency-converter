## 1. Instalação e configuração do Angular Material

- [x] 1.1 Rodar `ng add @angular/material` e escolher um tema pré-construído
- [x] 1.2 Revisar as alterações geradas em `angular.json`, `styles.css`, `index.html` e `app.config.ts` (confirmar que `provideHttpClient()` e `provideBrowserGlobalErrorListeners()` continuam presentes)
- [x] 1.3 Confirmar que `ng build` roda sem erros após a instalação

## 2. Campo de valor e campo de resultado

- [x] 2.1 Atualizar `currency-converter.component.ts` importando `MatFormFieldModule` e `MatInputModule`
- [x] 2.2 Substituir o `<input id="amount">` por `mat-form-field` + `matInput`, movendo a mensagem de erro para `mat-error`
- [x] 2.3 Substituir o `<input id="result">` por `mat-form-field` + `matInput` somente leitura, exibindo "—" quando não houver resultado

## 3. Seleção de moedas

- [x] 3.1 Importar `MatSelectModule` no componente
- [x] 3.2 Substituir os `<select id="from-currency">` e `<select id="to-currency">` por `mat-select`/`mat-option`, preservando `[ngModel]`/`(ngModelChange)` e o `@for` sobre `currencies()`

## 4. Botão de troca de moedas

- [x] 4.1 Importar `MatButtonModule` e `MatIconModule` no componente
- [x] 4.2 Substituir o `<button class="swap-button">⇄</button>` por `mat-icon-button` com `mat-icon` (`swap_horiz`), preservando `(click)="onSwap()"` e `aria-label="Trocar moedas"`

## 5. Estados de erro e carregamento

- [x] 5.1 Atualizar a mensagem de erro de carregamento de moedas (`currenciesError`) para o padrão Material
- [x] 5.2 Substituir o indicador textual de "Atualizando taxa de câmbio…" por um indicador visual do Angular Material (ex.: `mat-progress-spinner` ou `mat-hint`) mantendo a mensagem de erro de taxa (`rateError`)

## 6. Limpeza de estilos

- [x] 6.1 Remover de `currency-converter.component.css` as regras de estilo redundantes com o Angular Material (bordas, cores de foco de input/select), mantendo apenas o necessário para layout (`.converter`, `.currencies-row`, espaçamentos)

## 7. Testes e validação

- [x] 7.1 Atualizar `currency-converter.component.spec.ts` para os seletores/estrutura DOM do Angular Material (ou usar Component Test Harnesses) — não houve necessidade: os testes existentes interagem apenas com a API do componente (signals), sem seletores DOM nativos
- [x] 7.2 Rodar `npm test` e garantir que todos os testes passam (11/11 passaram)
- [x] 7.3 Rodar `ng serve` e validar manualmente: valor inválido exibe erro, troca de moedas funciona, seleção de moeda atualiza a taxa, erro/loading de taxa são exibidos corretamente. Durante a validação foi encontrado e corrigido um bug real: `mat-error` não aparecia porque o `NgControl` do campo de valor nunca ficava "invalid" (sem `Validators`) — corrigido com um `ErrorStateMatcher` customizado ligado ao signal `isAmountValid()`.
