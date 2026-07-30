## Context

O repositório está vazio; esta é uma aplicação greenfield. O objetivo é construir um conversor de moedas single-page em Angular 22, usando o estilo idiomático atual do framework (standalone components, Signals, `inject()`), consumindo a Frankfurter API (`https://api.frankfurter.dev`) — pública, gratuita e sem necessidade de chave de API — para lista de moedas e taxas de câmbio.

## Goals / Non-Goals

**Goals:**
- Entrada de valor com até 9 dígitos, com validação de que o conteúdo é numérico.
- Dois dropdowns (origem/destino) com moedas ordenadas alfabeticamente.
- Recalcular e exibir o valor convertido (2 casas decimais) automaticamente a cada mudança de valor, moeda de origem ou moeda de destino.
- Alertar o usuário quando o valor digitado não for um número válido.
- Botão de swap entre moeda de origem e destino (bônus).

**Non-Goals:**
- Histórico de conversões ou persistência de dados.
- Autenticação/autorização.
- Múltiplas telas ou roteamento — é uma aplicação de tela única.
- Suporte a taxas históricas (apenas taxa atual/"latest").

## Decisions

### Angular 22, standalone + Signals
Sem NgModules; `bootstrapApplication` com `provideHttpClient`. Estado local do componente modelado com `signal`/`computed`/`effect` em vez de `BehaviorSubject`/RxJS manual, alinhado ao estilo recomendado nas versões recentes do Angular. Alternativa considerada: RxJS puro — descartada por exigir mais boilerplate para um estado simples e local.

### Frankfurter API como fonte de câmbio
Escolhida por não exigir chave de API (elimina gestão de segredos/env vars) e por fornecer tanto `/v1/currencies` (lista de moedas) quanto `/v1/latest` (taxas atuais) em endpoints simples e gratuitos. Alternativa considerada: exchangerate-api.com — descartada por exigir cadastro/chave de API, o que adicionaria complexidade desnecessária para este escopo.

### Serviço único `ExchangeRateService`
Encapsula as duas chamadas HTTP (`getCurrencies()` e `getRate(from, to)`), retornando tipos tipados (`CurrencyOption[]`, `number`). Mantém o componente livre de lógica de acesso a rede, facilitando testes com `HttpTestingController`.

### Estado via Signals no componente
- `amountInput: signal<string>` — valor bruto digitado (permite detectar entrada inválida antes de converter para número).
- `fromCurrency: signal<string>`, `toCurrency: signal<string>` — códigos de moeda selecionados.
- `currencies: signal<CurrencyOption[]>` — carregado uma vez ao inicializar o componente.
- `rate: signal<number | null>` — taxa atual entre `fromCurrency` e `toCurrency`; atualizada via `effect()` sempre que qualquer um dos dois signals mudar.
- `isAmountValid: computed<boolean>` e `convertedAmount: computed<string>` — derivados de `amountInput` e `rate`; recalculam sem nova chamada de rede quando só o valor muda.

Essa separação evita chamadas HTTP desnecessárias: a taxa só é buscada quando as moedas mudam; o valor convertido é puramente derivado (computed) e reage instantaneamente à digitação.

### Validação de entrada
Regra: até 9 dígitos, aceitando um separador decimal opcional. Entradas não numéricas (letras, símbolos) marcam `isAmountValid` como `false` e exibem uma mensagem de alerta inline abaixo do campo — sem usar `window.alert()` nativo, para não bloquear a thread de UI nem prejudicar testes automatizados. O campo de output não é atualizado enquanto a entrada for inválida.

### Swap de moedas
Botão que troca os valores de `fromCurrency` e `toCurrency` num único evento, disparando o `effect()` de busca de taxa uma única vez (evita duas chamadas HTTP intermediárias).

## Risks / Trade-offs

- [Indisponibilidade da Frankfurter API] → Exibir mensagem de erro amigável na UI e preservar o último valor convertido conhecido, sem quebrar a aplicação.
- [Limite de moedas/precisão da API pública] → Aceitável para o escopo de demonstração; não há SLA contratado.
- [Ambiguidade sobre "9 dígitos"] → Interpretado como até 9 dígitos numéricos no total (contando parte inteira e decimal, sem contar o separador), validado via expressão regular no input.
