## Why

A interface atual do conversor de moedas usa elementos HTML nativos (`input`, `select`, `button`) com estilização manual em CSS puro, o que exige manutenção contínua de acessibilidade, foco, estados de erro e responsividade. Adotar o Angular Material traz componentes prontos, acessíveis e com Material Design consistente, reduzindo CSS customizado e acelerando futuras melhorias de UI.

## What Changes

- Instalar e configurar o Angular Material (`ng add @angular/material`) no projeto, incluindo tema, tipografia global e animações.
- Substituir o `<input>` de valor e o `<input readonly>` de resultado por `mat-form-field` + `matInput`.
- Substituir os `<select>` de moeda de origem/destino por `mat-select` com `mat-option` dentro de `mat-form-field`.
- Substituir o botão de trocar moedas (`⇄`) por `mat-icon-button` com `mat-icon`.
- Substituir as mensagens de erro/hint (`<p class="error">`, `<p class="hint">`) pelo padrão `mat-error`/`mat-hint` do `mat-form-field`.
- Remover CSS customizado do componente que se torna redundante com os estilos do Material.

## Capabilities

### New Capabilities
- `material-ui`: uso dos componentes Angular Material (form field, input, select, button, icon) na tela de conversão de moedas.

### Modified Capabilities
(nenhuma — não há specs existentes documentando a UI atual)

## Impact

- Dependências: adiciona `@angular/material`, `@angular/cdk` e `@angular/animations` a `package.json`.
- Configuração: `angular.json`/`styles.css` recebem tema do Material; `app.config.ts` recebe `provideAnimationsAsync()` (ou `provideAnimations()`).
- Código: `currency-converter.component.ts` (imports de módulos Material), `currency-converter.component.html` (marcação) e `currency-converter.component.css` (redução de estilos customizados).
- Testes: `currency-converter.component.spec.ts` pode precisar de ajustes para seletores/harnesses do Material.
