## Why

O conversor de moedas hoje usa apenas elementos HTML nativos (`input`, `select`, `button`) estilizados manualmente. Migrar para o [PO-UI](https://github.com/po-ui/po-angular) (`po-angular`) traz um design system consistente, componentes acessíveis prontos (`po-input`, `po-select`, `po-button`, `po-loading`, `po-info`), e reduz a manutenção de CSS customizado.

## What Changes

- Adicionar as dependências `@po-ui/ng-components` e `@po-ui/ng-templates` (ou apenas `ng-components`, conforme necessidade) ao projeto Angular.
- Importar o módulo/estilos globais do PO-UI (`PoModule` ou módulos standalone equivalentes) e a folha de estilos do tema PO no `angular.json` / `styles.css`.
- Substituir o campo de valor (`input` nativo) pelo componente `po-input` (com máscara/validação numérica).
- Substituir os dois `select` de moeda pelos componentes `po-select` (ou `po-combo`), mantendo a ordenação alfabética das opções.
- Substituir o botão de swap por `po-button` (ícone, `p-kind="tertiary"` ou similar).
- Substituir o campo de resultado (somente leitura) por `po-input` (`p-disabled` ou `readonly`) ou `po-info` conforme melhor encaixe visual.
- Substituir as mensagens de erro (`<p class="error">`) e o indicador de carregamento (`<p class="hint">`) pelos componentes de feedback do PO-UI (ex.: `po-info`, `po-loading-overlay` ou validação inline dos próprios componentes de input/select).
- Remover o CSS customizado (`currency-converter.component.css`) que for substituído por estilos/props nativos do PO-UI.
- **BREAKING**: a estrutura do template (`currency-converter.component.html`) muda significativamente; qualquer teste que dependa de seletores CSS/HTML nativos (`input#amount`, `select#from-currency`, etc.) precisará ser atualizado para os seletores/API do PO-UI.

## Capabilities

### New Capabilities
- `ui-component-library`: define que os controles de formulário da tela de conversão de moedas devem ser construídos com os componentes do PO-UI (`po-input`, `po-select`, `po-button`, `po-info`), em vez de elementos HTML nativos.

### Modified Capabilities
(nenhuma — o comportamento e as regras de negócio descritos em `currency-conversion` permanecem os mesmos; apenas a implementação visual/técnica dos componentes muda.)

## Impact

- **Código afetado**: `src/app/currency-converter/currency-converter.component.ts`, `.html`, `.css`; `src/app/currency-converter/currency-converter.component.spec.ts` (se existir, ajustar seletores de teste); `src/styles.css`; `angular.json` (estilos/tema globais); `package.json` (novas dependências).
- **Dependências**: adiciona `@po-ui/ng-components` (e módulos auxiliares, se necessário) como nova dependência de produção; possível impacto no tamanho do bundle.
- **Sistemas**: nenhum backend ou API afetado; mudança restrita ao frontend Angular.
