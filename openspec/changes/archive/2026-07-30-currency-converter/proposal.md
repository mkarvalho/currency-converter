## Why

Não existe hoje nenhuma aplicação neste repositório. Precisamos construir, do zero, um conversor de moedas em Angular 22 — uma aplicação de intermediate tier que converte um valor de uma moeda de origem para uma moeda de destino usando taxas de câmbio atuais, servindo como demonstração de consumo de API externa, formulários reativos e validação de entrada.

## What Changes

- Criar um novo workspace Angular 22 (standalone components, sem NgModules) para a aplicação Currency Converter.
- Adicionar um campo de entrada de valor que aceita até 9 dígitos.
- Adicionar dois dropdowns (origem e destino) com a lista de moedas disponíveis, ordenada alfabeticamente.
- Calcular e exibir automaticamente o valor convertido (arredondado a 2 casas decimais) sempre que o valor de entrada, a moeda de origem ou a moeda de destino mudar.
- Exibir um alerta ao usuário quando o valor digitado não for numérico.
- Adicionar um botão de swap para trocar as moedas de origem e destino de uma só vez (bônus).
- Integrar com a Frankfurter API (`https://api.frankfurter.dev`) para obter a lista de moedas suportadas e as taxas de câmbio atuais.

## Capabilities

### New Capabilities
- `currency-conversion`: entrada de valor, seleção de moedas de origem/destino, cálculo e exibição do valor convertido em tempo real, incluindo validação de entrada numérica e swap de moedas.

### Modified Capabilities
- (nenhuma — não há capacidades existentes neste repositório)

## Impact

- Novo workspace Angular 22 a ser criado na raiz do repositório (`D:\currency-converter`).
- Novo serviço HTTP (`ExchangeRateService`) que depende da disponibilidade da Frankfurter API pública.
- Nenhum backend próprio, banco de dados ou autenticação é introduzido.
