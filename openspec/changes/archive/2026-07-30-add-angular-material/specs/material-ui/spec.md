## ADDED Requirements

### Requirement: Angular Material instalado e configurado
O projeto SHALL ter o Angular Material (`@angular/material`, `@angular/cdk`, `@angular/animations`) instalado e configurado via schematic oficial, com um tema pré-construído aplicado globalmente e animações do Angular habilitadas na configuração da aplicação.

#### Scenario: Build da aplicação com Angular Material
- **WHEN** a aplicação é compilada (`ng build`)
- **THEN** o build conclui com sucesso incluindo os estilos de tema do Angular Material carregados globalmente

#### Scenario: Animações habilitadas
- **WHEN** um componente Material que depende de animações (ex.: `mat-select`) é aberto pelo usuário
- **THEN** a transição de abertura/fechamento é animada, confirmando que o provider de animações está configurado

### Requirement: Campo de valor usa mat-form-field/matInput
O campo de entrada do valor a converter SHALL ser renderizado com `mat-form-field` e a diretiva `matInput`, preservando a validação existente (numérico, até 9 dígitos) e exibindo a mensagem de erro via `mat-error`.

#### Scenario: Valor inválido exibe erro no mat-error
- **WHEN** o usuário digita um valor não numérico ou com mais de 9 dígitos no campo de valor
- **THEN** o `mat-form-field` exibe a mensagem de erro "Digite um valor numérico de até 9 dígitos." dentro de um `mat-error`

#### Scenario: Valor válido não exibe erro
- **WHEN** o usuário digita um valor numérico válido de até 9 dígitos
- **THEN** nenhuma mensagem de erro é exibida e o valor convertido é recalculado

### Requirement: Seleção de moedas usa mat-select
Os seletores de moeda de origem e destino SHALL ser renderizados com `mat-select` e `mat-option`, populados a partir da lista de moedas retornada pelo serviço, preservando o binding bidirecional atual.

#### Scenario: Lista de moedas populada no mat-select
- **WHEN** o serviço de moedas retorna a lista de moedas disponíveis
- **THEN** cada moeda aparece como um `mat-option` dentro dos `mat-select` de origem e destino

#### Scenario: Troca de moeda atualiza a taxa
- **WHEN** o usuário seleciona uma nova moeda em um dos `mat-select`
- **THEN** a taxa de câmbio é recalculada para o novo par de moedas

### Requirement: Botão de troca usa mat-icon-button
O botão que inverte as moedas de origem e destino SHALL ser um `mat-icon-button` contendo um `mat-icon`, mantendo o rótulo acessível e o comportamento de troca.

#### Scenario: Troca de moedas ao clicar no botão
- **WHEN** o usuário clica no `mat-icon-button` de troca
- **THEN** os valores de moeda de origem e destino são invertidos, mantendo o rótulo acessível `aria-label="Trocar moedas"`

### Requirement: Campo de resultado usa mat-form-field somente leitura
O campo que exibe o resultado da conversão SHALL ser renderizado com `mat-form-field`/`matInput` em modo somente leitura, exibindo "—" quando não houver resultado calculado.

#### Scenario: Resultado exibido após conversão válida
- **WHEN** o valor de entrada e a taxa de câmbio são válidos
- **THEN** o campo de resultado exibe o valor convertido formatado com duas casas decimais

#### Scenario: Resultado indefinido
- **WHEN** o valor de entrada é inválido ou a taxa ainda não foi carregada
- **THEN** o campo de resultado exibe "—"

### Requirement: Estados de erro e carregamento da taxa usam padrão Material
As mensagens de erro ao carregar moedas ou taxa de câmbio, e o indicador de carregamento da taxa, SHALL utilizar componentes/estilos do Angular Material (ex.: `mat-error`, `mat-hint` ou `mat-progress-spinner`) em vez de parágrafos com classes CSS customizadas.

#### Scenario: Erro ao carregar lista de moedas
- **WHEN** a chamada para obter a lista de moedas falha
- **THEN** uma mensagem de erro é exibida usando o padrão de erro do Angular Material

#### Scenario: Indicador de carregamento da taxa
- **WHEN** uma nova taxa de câmbio está sendo buscada
- **THEN** um indicador visual de carregamento do Angular Material é exibido até a taxa retornar ou falhar
