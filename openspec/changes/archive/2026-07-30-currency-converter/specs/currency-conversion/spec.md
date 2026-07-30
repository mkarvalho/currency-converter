## ADDED Requirements

### Requirement: Entrada de valor a converter
O sistema SHALL fornecer um campo de entrada de texto onde o usuário pode digitar um valor numérico de até 9 dígitos para ser convertido.

#### Scenario: Usuário digita um valor válido
- **WHEN** o usuário digita um número de até 9 dígitos no campo de entrada
- **THEN** o sistema aceita o valor e o utiliza como base para o cálculo de conversão

#### Scenario: Usuário digita um valor não numérico
- **WHEN** o usuário digita um valor que não é numérico (por exemplo, contém letras ou símbolos inválidos)
- **THEN** o sistema exibe um alerta informando que o valor deve ser numérico e não atualiza o valor convertido

### Requirement: Seleção da moeda de origem
O sistema SHALL exibir um dropdown com a lista de moedas disponíveis, ordenada alfabeticamente, permitindo ao usuário selecionar a moeda de origem da conversão.

#### Scenario: Lista de moedas de origem ordenada
- **WHEN** o dropdown de moeda de origem é exibido
- **THEN** as moedas disponíveis aparecem ordenadas alfabeticamente por nome

#### Scenario: Usuário seleciona moeda de origem
- **WHEN** o usuário seleciona uma moeda diferente no dropdown de origem
- **THEN** o sistema recalcula e exibe o valor convertido usando a nova moeda de origem

### Requirement: Seleção da moeda de destino
O sistema SHALL exibir um dropdown com a lista de moedas disponíveis, ordenada alfabeticamente, permitindo ao usuário selecionar a moeda de destino da conversão.

#### Scenario: Lista de moedas de destino ordenada
- **WHEN** o dropdown de moeda de destino é exibido
- **THEN** as moedas disponíveis aparecem ordenadas alfabeticamente por nome

#### Scenario: Usuário seleciona moeda de destino
- **WHEN** o usuário seleciona uma moeda diferente no dropdown de destino
- **THEN** o sistema recalcula e exibe o valor convertido usando a nova moeda de destino

### Requirement: Exibição automática do valor convertido
O sistema SHALL calcular e exibir, em um único campo de saída, o valor de origem convertido para a moeda de destino, arredondado a duas casas decimais, sempre que o valor de entrada, a moeda de origem ou a moeda de destino forem alterados.

#### Scenario: Atualização ao alterar o valor de entrada
- **WHEN** o usuário altera o valor no campo de entrada e o valor é numérico válido
- **THEN** o sistema exibe o valor convertido correspondente, arredondado a duas casas decimais

#### Scenario: Atualização ao alterar a moeda de origem ou destino
- **WHEN** o usuário altera a moeda de origem ou a moeda de destino
- **THEN** o sistema busca a taxa de câmbio atual entre as duas moedas e exibe o valor convertido atualizado, arredondado a duas casas decimais

### Requirement: Troca rápida de moedas
O sistema SHALL fornecer um botão que permite ao usuário trocar simultaneamente as moedas selecionadas nos dropdowns de origem e destino.

#### Scenario: Usuário aciona o botão de swap
- **WHEN** o usuário clica no botão de swap
- **THEN** o sistema troca a moeda de origem pela moeda de destino e vice-versa, e recalcula o valor convertido com base na nova combinação
