## 1. Setup do projeto

- [x] 1.1 Gerar workspace Angular 22 na raiz do repositório (`ng new currency-converter --standalone --style=css --routing=false`, ajustando conforme a estrutura já existente do repositório)
- [x] 1.2 Configurar `provideHttpClient()` em `app.config.ts`
- [x] 1.3 Remover boilerplate padrão do `ng new` (template inicial do `AppComponent`)

## 2. Serviço de câmbio

- [x] 2.1 Criar `ExchangeRateService` (`inject(HttpClient)`) com tipos `CurrencyOption` e retorno tipado
- [x] 2.2 Implementar `getCurrencies()` consumindo `GET https://api.frankfurter.dev/v1/currencies`, mapeando para `CurrencyOption[]` ordenado alfabeticamente por nome
- [x] 2.3 Implementar `getRate(from: string, to: string)` consumindo `GET https://api.frankfurter.dev/v1/latest?base={from}&symbols={to}`, retornando a taxa numérica
- [x] 2.4 Tratar erros de rede/API nos dois métodos (retornar erro tipado ou `Observable` de erro tratável pelo componente)

## 3. Componente de conversão

- [x] 3.1 Criar `CurrencyConverterComponent` standalone com signals: `amountInput`, `fromCurrency`, `toCurrency`, `currencies`, `rate`
- [x] 3.2 Carregar `currencies` via `ExchangeRateService.getCurrencies()` na inicialização do componente e definir `fromCurrency`/`toCurrency` padrão
- [x] 3.3 Criar `effect()` que observa `fromCurrency`/`toCurrency` e busca a nova taxa via `getRate()`, atualizando o signal `rate`
- [x] 3.4 Criar `computed` `isAmountValid` validando até 9 dígitos numéricos (com separador decimal opcional) em `amountInput`
- [x] 3.5 Criar `computed` `convertedAmount` que deriva de `amountInput`, `rate` e `isAmountValid`, formatando o resultado com 2 casas decimais

## 4. Template e UI

- [x] 4.1 Implementar campo de entrada de valor ligado a `amountInput` (two-way binding)
- [x] 4.2 Implementar dropdown de moeda de origem populado a partir de `currencies`, ligado a `fromCurrency`
- [x] 4.3 Implementar dropdown de moeda de destino populado a partir de `currencies`, ligado a `toCurrency`
- [x] 4.4 Implementar campo de saída somente-leitura exibindo `convertedAmount`
- [x] 4.5 Exibir mensagem de alerta inline quando `isAmountValid()` for falso, sem atualizar o campo de saída
- [x] 4.6 Implementar botão de swap que troca os valores de `fromCurrency` e `toCurrency` num único evento
- [x] 4.7 Exibir mensagem de erro amigável na UI quando `ExchangeRateService` falhar (indisponibilidade de rede/API)
- [x] 4.8 Aplicar estilos básicos de layout (CSS simples, sem framework externo)

## 5. Testes

- [x] 5.1 Testes unitários de `ExchangeRateService` com `HttpTestingController` (sucesso e erro para `getCurrencies()` e `getRate()`)
- [x] 5.2 Testes unitários da validação de entrada (`isAmountValid`) cobrindo valores válidos, inválidos e limite de 9 dígitos
- [x] 5.3 Testes de componente cobrindo: atualização automática do valor convertido, seleção de moedas, e botão de swap

## 6. Validação final

- [x] 6.1 Rodar `ng build` e `ng test` garantindo que o projeto compila e os testes passam
- [x] 6.2 Validar manualmente os fluxos: conversão básica, entrada inválida, swap de moedas, e falha simulada de API
