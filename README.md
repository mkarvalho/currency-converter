# Currency Converter

Conversor de moedas construído com Angular 22 e Angular Material, usando a [Frankfurter API](https://frankfurter.dev/) para taxas de câmbio atualizadas.

## Funcionalidades

- Conversão entre qualquer par de moedas suportado pela Frankfurter API
- Lista de moedas carregada dinamicamente
- Botão para inverter as moedas de origem e destino
- Validação do valor digitado (até 9 dígitos, aceita casas decimais)

## Stack

- [Angular](https://angular.dev/) 22 (standalone components, signals)
- [Angular Material](https://material.angular.io/)
- [Vitest](https://vitest.dev/) para testes unitários
- [OpenSpec](https://github.com/Fission-AI/OpenSpec) para gestão de specs e mudanças

## Desenvolvimento

Para iniciar o servidor de desenvolvimento local:

```bash
npm start
```

Acesse `http://localhost:4200/`. A aplicação recarrega automaticamente ao alterar os arquivos-fonte.

## Build

```bash
npm run build
```

Os artefatos de build são gerados em `dist/`.

## Testes

```bash
npm test
```

Executa os testes unitários com o Vitest.

## Estrutura do projeto

```
src/app/
  app.ts                          # Componente raiz
  exchange-rate.service.ts        # Cliente HTTP para a Frankfurter API
  currency-converter/             # Componente de conversão de moedas
openspec/
  specs/                          # Especificações vigentes do projeto
  changes/archive/                # Histórico de mudanças já implementadas
```

## Documentação adicional

Consulte o [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) para mais detalhes sobre os comandos disponíveis.
