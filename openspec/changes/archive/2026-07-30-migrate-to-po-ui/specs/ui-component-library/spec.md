## ADDED Requirements

### Requirement: Uso de componentes PO-UI no formulário de conversão
O sistema SHALL construir os controles de entrada e saída da tela de conversão de moedas (campo de valor, seletores de moeda de origem e destino, botão de troca de moedas e campo de resultado) utilizando os componentes da biblioteca PO-UI (`po-angular`), em vez de elementos HTML nativos não estilizados.

#### Scenario: Campo de valor usa componente PO-UI
- **WHEN** a tela de conversão de moedas é renderizada
- **THEN** o campo de entrada de valor é um componente `po-input` (ou equivalente do PO-UI), preservando a validação de até 9 dígitos numéricos

#### Scenario: Seletores de moeda usam componente PO-UI
- **WHEN** a tela de conversão de moedas é renderizada
- **THEN** os seletores de moeda de origem e de destino são componentes `po-select` (ou equivalente do PO-UI), preservando a listagem ordenada alfabeticamente das moedas

#### Scenario: Botão de swap usa componente PO-UI
- **WHEN** a tela de conversão de moedas é renderizada
- **THEN** o botão de troca de moedas é um componente `po-button` (ou equivalente do PO-UI), preservando a funcionalidade de trocar as moedas selecionadas

#### Scenario: Campo de resultado usa componente PO-UI
- **WHEN** a tela de conversão de moedas é renderizada
- **THEN** o campo de resultado é um componente `po-input` (ou equivalente do PO-UI) em modo somente leitura/desabilitado, exibindo o valor convertido

### Requirement: Feedback de erro e carregamento com componentes PO-UI
O sistema SHALL exibir mensagens de erro (moedas indisponíveis, taxa de câmbio indisponível, valor inválido) e o indicador de carregamento da taxa de câmbio utilizando componentes de feedback do PO-UI, mantendo o mesmo conteúdo informativo apresentado atualmente.

#### Scenario: Erro ao carregar moedas
- **WHEN** ocorre um erro ao carregar a lista de moedas
- **THEN** o sistema exibe a mensagem de erro utilizando um componente de feedback do PO-UI (ex.: `po-info`)

#### Scenario: Erro ao carregar taxa de câmbio
- **WHEN** ocorre um erro ao buscar a taxa de câmbio entre as moedas selecionadas
- **THEN** o sistema exibe a mensagem de erro utilizando um componente de feedback do PO-UI (ex.: `po-info`)

#### Scenario: Indicador de carregamento da taxa
- **WHEN** o sistema está buscando a taxa de câmbio atual
- **THEN** o sistema exibe um indicador de carregamento visualmente consistente com o design system do PO-UI
