## 1. Instalação e configuração do PO-UI

- [x] 1.1 Verificar a versão de `@po-ui/ng-components` compatível com Angular 22 (checar `peerDependencies` no npm/registro do pacote)
- [ ] 1.2 Instalar `@po-ui/ng-components` (e dependências de ícones/tema, se exigidas pelo pacote) via npm

> **BLOQUEADO (2026-07-30)**: a versão mais recente publicada, `@po-ui/ng-components@21.26.0`, declara `peerDependencies` para `@angular/core@^21` (e demais pacotes `@angular/*` em `^21`). O projeto está em `@angular/core@22.1.0`, então `npm install @po-ui/ng-components` falha com `ERESOLVE` (conflito de peer dependency, via `@angular/animations@21.2.19` exigido transitivamente). Não há release do PO-UI com suporte declarado a Angular 22 no momento desta verificação. Decisão do usuário: não prosseguir com a instalação (nem via `--legacy-peer-deps` nem via downgrade do Angular) até nova orientação. Tarefas 1.2 em diante permanecem pendentes.
- [ ] 1.3 Importar a folha de estilos/tema padrão do PO-UI em `src/styles.css` (ou `angular.json`, conforme a documentação da versão instalada)
- [ ] 1.4 Rodar `ng build`/`ng serve` para validar que a instalação não quebra o build atual

## 2. Migração do campo de valor

- [ ] 2.1 Importar o módulo/standalone component de input do PO-UI (`PoFieldModule`/`PoInputModule`, conforme a versão) em `currency-converter.component.ts`
- [ ] 2.2 Substituir o `<input id="amount">` nativo por `po-input` em `currency-converter.component.html`, mantendo o binding `[ngModel]`/`(ngModelChange)` com `amountInput`
- [ ] 2.3 Reaproveitar `isAmountValid` para exibir a mensagem de erro de validação (via propriedade de erro do `po-input` ou mensagem condicional existente)

## 3. Migração dos seletores de moeda

- [ ] 3.1 Importar o módulo/standalone component de select do PO-UI em `currency-converter.component.ts`
- [ ] 3.2 Substituir o `<select id="from-currency">` por `po-select`, mapeando `currencies()` para o formato de opções esperado pelo componente (`p-options` com `value`/`label`)
- [ ] 3.3 Substituir o `<select id="to-currency">` por `po-select` da mesma forma
- [ ] 3.4 Confirmar que a ordenação alfabética das moedas é preservada nos dois seletores

## 4. Migração do botão de swap e do campo de resultado

- [ ] 4.1 Substituir o `<button class="swap-button">` por `po-button`, preservando o evento `(click)="onSwap()"` e o `aria-label`/tooltip equivalente
- [ ] 4.2 Substituir o `<input id="result" readonly>` por `po-input` em modo desabilitado/somente leitura, exibindo `convertedAmount()`

## 5. Migração das mensagens de erro e do indicador de carregamento

- [ ] 5.1 Substituir as mensagens de erro (`currenciesError()`, `rateError()`) por um componente de feedback do PO-UI (ex.: `po-info`)
- [ ] 5.2 Substituir o texto de "Atualizando taxa de câmbio…" por um indicador de carregamento do PO-UI

## 6. Limpeza e testes

- [ ] 6.1 Remover regras de CSS em `currency-converter.component.css` que ficaram redundantes após a migração para os componentes PO-UI
- [ ] 6.2 Atualizar `currency-converter.component.spec.ts` (se existir) para os novos seletores/API dos componentes PO-UI
- [ ] 6.3 Rodar a suíte de testes (`npm test`) e corrigir eventuais quebras
- [ ] 6.4 Validar manualmente o fluxo completo no navegador (digitar valor inválido/válido, trocar moedas, swap, estado de loading e erro)
