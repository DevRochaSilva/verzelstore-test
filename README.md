# Verzel Store — Desafio de QA

Projeto de testes da **Verzel Store**, desenvolvido a partir da documentação e dos critérios de aceite fornecidos no desafio.

## Objetivo

Validar as principais regras de negócio da aplicação, com foco em:

- frete grátis;
- cobrança de frete abaixo do limite;
- cálculo de subtotal, frete e total;
- regras de cálculo da API;
- fluxo principal do carrinho.

A automação foi implementada utilizando **Playwright + Cucumber**, com cenários escritos em **Gherkin** e geração de relatórios em **HTML e JSON**.

---

## Ambiente

- Aplicação: `https://verzel-store.qa-test-verzel-store.workers.dev/`
- Documentação: `https://verzel-store.qa-test-verzel-store.workers.dev/documentacao`
- API base: `https://verzel-store.qa-test-verzel-store.workers.dev/api`
- Node.js
- Playwright
- Cucumber JS

> O ambiente é compartilhado entre candidatos.  
> O carrinho é mantido apenas na aba atual do navegador e a API não persiste dados entre as requisições.

---

## Estrutura do projeto

```text
VerzelStore-Test/
├── features/
│   ├── regras_carrinho.feature
│   └── bug_frete_api.feature
│
├── step_definitions/
│   ├── carrinho.steps.js
│   └── carrinho_api.steps.js
│
├── pages/
│   ├── HomePage.js
│   └── CarrinhoPage.js
│
├── support/
│   └── hooks.js
│
├── logs/
│   ├── cucumber-report.html
│   ├── cucumber-report.json
│   └── screenshots/
│
├── docs/
│   └── Testes_Manuais_Exploratorios.md
│
├── cucumber.js
├── package.json
└── README.md
```

---

## Pré-requisitos

É necessário possuir:

- Node.js
- npm

---

## Instalação

Na raiz do projeto, instale as dependências:

```bash
npm install
```

Em seguida, instale o Chromium utilizado pelo Playwright:

```bash
npx playwright install chromium
```

---

## Como executar

### Executar toda a suíte

```bash
npm test
```

### Executar somente os testes de interface

```bash
npm run test:ui
```

### Executar somente o teste de API

```bash
npm run test:api
```
### Executar Smoke Test

```bash
npm run test:smoke
```


---

## Relatórios

Após a execução, os relatórios são gerados em:

```text
logs/cucumber-report.html
logs/cucumber-report.json
```

Para abrir o relatório HTML no Windows:

```bash
npm run report
```

ou:

```powershell
start .\logs\cucumber-report.html
```

O relatório HTML apresenta:

- cenários aprovados;
- cenários reprovados;
- steps executados;
- mensagem de erro;
- duração;
- evidências anexadas pelo Cucumber.

---

## Evidências

O projeto diferencia evidências de falhas de **interface** e **API**.

### Falhas de interface

Quando um cenário marcado com `@ui` falha, o hook `After` captura automaticamente uma screenshot.

As imagens são armazenadas em:

```text
logs/screenshots/
```

Exemplo:

```text
verzel_001_FAILED.png
```

A screenshot também é anexada ao relatório do Cucumber.

### Falhas de API

Quando um cenário marcado com `@api` falha, a resposta JSON retornada pela API é anexada diretamente ao relatório.

Isso permite visualizar os valores efetivamente retornados pelo backend sem depender de screenshots.

---

# Resultado da automação

A suíte foi refinada para demonstrar os principais cenários do desafio de forma objetiva e com baixo acoplamento.

Resultado final:

```text
4 scenarios (1 failed, 3 passed)
21 steps (1 failed, 1 skipped, 19 passed)
```

## Cenários aprovados

### 1. Frete grátis no limite de R$ 200,00

Valida que uma compra com subtotal exatamente igual a:

```text
R$ 200,00
```

recebe:

```text
Frete: R$ 0,00
```

**Resultado:** ✅ PASS

---

### 2. Cobrança de frete abaixo de R$ 200,00

Valida uma compra de:

```text
Subtotal: R$ 189,90
```

com resultado esperado de:

```text
Frete: R$ 19,90
Faltante para frete grátis: R$ 10,10
```

**Resultado:** ✅ PASS

---

### 3. Cálculo de compra abaixo do limite de frete grátis

Valida uma compra contendo:

```text
1x Mochila Urbana 20L
```

com:

```text
Subtotal: R$ 100,00
Frete: R$ 19,90
Total: R$ 119,90
```

**Resultado:** ✅ PASS

---

## Cenário reprovado

### Frete grátis calculado pela API

Foi realizado o cálculo do carrinho utilizando:

```text
Produto: P005 - Mochila Urbana 20L
Quantidade: 2
Subtotal: R$ 200,00
Cupom: BEMVINDO10
Desconto: R$ 20,00
```

De acordo com os critérios de aceite, o frete deve ser calculado com base no subtotal **antes do desconto**.

Portanto, o esperado era:

```text
Subtotal: R$ 200,00
Desconto: R$ 20,00
Frete: R$ 0,00
Total: R$ 180,00
```

Entretanto, a API retornou:

```text
Frete recebido: R$ 19,90
```

A validação automatizada registrou:

```text
Expected: 0
Received: 19.9
```

**Resultado:** ❌ FAIL

O comportamento apresenta divergência em relação aos critérios:

- **CA06** — Frete grátis para compras com subtotal a partir de R$ 200,00, inclusive.
- **CA08** — A regra de frete grátis considera o subtotal antes do desconto do cupom.

A resposta JSON da API foi anexada ao relatório automatizado como evidência.

---

# Estratégia da automação

A suíte final foi propositalmente mantida enxuta.

Foram selecionados:

- **3 cenários de interface aprovados**, cobrindo regras essenciais do carrinho;
- **1 cenário de API reprovado**, evidenciando uma divergência real entre a documentação e o comportamento observado.

A intenção foi evitar uma suíte excessivamente extensa para o desafio e priorizar cenários de maior valor e fácil rastreabilidade.

Fluxo utilizado:

```text
Feature / Gherkin
        ↓
Step Definitions
        ↓
Page Objects
        ↓
Playwright
        ↓
Aplicação / API
        ↓
Relatório HTML + JSON
```

---

# Testes manuais e exploratórios

Os cenários manuais, testes exploratórios, resultados esperados e pontos de atenção estão documentados em:

```text
docs/Testes_Manuais_Exploratorios.md
```

O documento complementa a automação e contempla os demais critérios de aceite que não fazem parte da suíte automatizada final.

---

# Bug Report

## BUG-001 — API cobra frete para subtotal exatamente igual a R$ 200,00

**Tipo:** Regra de negócio / API  
**Severidade sugerida:** Alta  
**Critérios afetados:** CA06 e CA08

### Pré-condições

- API disponível.
- Produto `P005` disponível.
- Cupom `BEMVINDO10` válido.

### Request

```json
{
  "itens": [
    {
      "produtoId": "P005",
      "quantidade": 2
    }
  ],
  "cupom": "BEMVINDO10"
}
```

### Resultado esperado

```text
Subtotal: 200.00
Desconto: 20.00
Frete: 0.00
Total: 180.00
```

### Resultado atual

A API retorna:

```text
Frete: 19.90
```

mesmo com subtotal de `200.00`.

### Evidências

Disponíveis em:

```text
logs/cucumber-report.html
logs/cucumber-report.json
```

A resposta JSON da API também é anexada automaticamente ao cenário que falhou.

---

# Fora do escopo

Conforme definido no desafio, não fazem parte desta avaliação:

- login;
- cadastro de clientes;
- pagamento online;
- consulta de pedidos;
- testes de carga;
- testes de stress;
- testes de segurança.

---

# Entregáveis

- [x] Cenários derivados da documentação
- [x] Testes manuais
- [x] Testes exploratórios
- [x] Automação com Playwright
- [x] Pelo menos 3 cenários automatizados
- [x] Testes de interface
- [x] Teste de API
- [x] Evidências de execução
- [x] Relatório HTML
- [x] Relatório JSON
- [x] Evidência automática de falhas
- [x] Bug Report
- [x] README com instruções de instalação e execução

---

## Tecnologias utilizadas

- **Playwright**
- **Cucumber JS**
- **Gherkin**
- **Node.js**
- **JavaScript**
- **Page Object Model**
- **API Testing**
- **HTML Report**
- **JSON Report**
