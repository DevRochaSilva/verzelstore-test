# Verzel Store — Desafio de QA

Projeto de testes da **Verzel Store**, desenvolvido a partir da documentação, dos critérios de aceite e das evidências obtidas durante as execuções manuais e automatizadas.

## Objetivo

Validar as principais regras de negócio da aplicação, com foco em:

- frete grátis;

- cobrança de frete abaixo do limite;

- cálculo de subtotal, desconto, frete e total;

- regras de cálculo da API;

- fluxo principal do carrinho;

- consistência entre interface, API e documentação.

A automação foi implementada com **Playwright + Cucumber**, utilizando cenários em **Gherkin**, Page Object Model e geração de relatórios em **HTML e JSON**.

---

## Ambiente

- Aplicação: `https://verzel-store.qa-test-verzel-store.workers.dev/`

- Documentação: `https://verzel-store.qa-test-verzel-store.workers.dev/documentacao`

- API base: `https://verzel-store.qa-test-verzel-store.workers.dev/api`

- Node.js

- Playwright

- Cucumber JS

- Google Chrome / Chromium

- Windows 11

> O ambiente é compartilhado entre candidatos.  

> O carrinho é mantido apenas na aba atual do navegador e a API não persiste dados entre as requisições.

---

## Estrutura do projeto

```text

VerzelStore-Test/

├── features/

│   ├── regras_carrinho.feature

│   ├── bug_frete_api.feature

│   └── smoke.feature

│

├── step_definitions/

│   ├── carrinho.steps.js

│   └── carrinho_api.steps.js

│

├── pages/

│   ├── HomePage.js

│   └── CarrinhoPage.js

│

├── support/

│   └── hooks.js

│

├── logs/

│   ├── cucumber-report.html

│   ├── cucumber-report.json

│   └── screenshots/

│

├── docs/

│   ├── Testes_Manuais_Exploratorios.md

│   └── evidencias/

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

Na raiz do projeto:

```bash

npm install

```

Instale o Chromium utilizado pelo Playwright:

```bash

npx playwright install chromium

```

---

## Como executar

### Suíte principal

```bash

npm test

```

### Testes de interface

```bash

npm run test:ui

```

### Teste de API

```bash

npm run test:api

```

### Smoke Test

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

O relatório apresenta:

- cenários aprovados e reprovados;

- steps executados;

- mensagens de erro;

- duração;

- evidências anexadas pelo Cucumber.

---

## Evidências

O projeto diferencia evidências de **interface** e **API**.

### Falhas de interface

Quando um cenário marcado com `@ui` falha, o hook `After` captura uma screenshot automaticamente.

```text

logs/screenshots/

```

Exemplo:

```text

verzel_001_FAILED.png

```

### Falhas de API

Quando um cenário marcado com `@api` falha, a resposta JSON retornada pela API é anexada ao relatório do Cucumber.

As evidências dos testes manuais e exploratórios estão documentadas em:

[Ver testes manuais e evidências](docs/Testes_Manuais_Exploratorios.md)

---

# Status atual da validação

Durante a comparação entre os testes automatizados e a execução manual do **TM-006**, foi identificado um falso positivo no cenário de frete grátis com subtotal exatamente igual a R$ 200,00.

A primeira execução automatizada havia registrado:

```text

4 scenarios (1 failed, 3 passed)

21 steps (1 failed, 1 skipped, 19 passed)

```

O falso positivo ocorreu porque a validação procurava apenas a ocorrência de:

```text

R$ 0,00

```

no conteúdo da página. Entretanto, a interface apresentava:

```text

Frete: R$ 19,90

Faltam R$ 0,00 para o frete grátis

```

Dessa forma, o valor `R$ 0,00` presente na mensagem de progresso era interpretado incorretamente como sendo o valor do frete.

A automação foi refinada para validar especificamente os campos **Subtotal**, **Frete** e **Total**.

Após o refinamento, o Smoke Test foi reexecutado e confirmou corretamente a divergência:

```text

3 scenarios (1 failed, 2 passed)

15 steps (1 failed, 14 passed)

```

O cenário de frete grátis no limite de R$ 200,00 passou a falhar corretamente com:

```text

Expected: "R$ 0,00"

Received: "R$ 19,90"

```

O falso positivo foi, portanto, eliminado e a automação passou a refletir o comportamento real da aplicação.

---

# Resultado do Smoke Test

O Smoke Test foi executado para validar rapidamente os fluxos críticos da aplicação e verificar sua aderência às regras de negócio acordadas.

Resultado da execução:

```text

3 scenarios (1 failed, 2 passed)

15 steps (1 failed, 14 passed)

```

| Cenário | Resultado |

|---|---|

| Carrinho / cálculo básico | ✅ PASS |

| Frete grátis no limite de R$ 200,00 | ❌ FAIL |

| API / cálculo básico | ✅ PASS |

**Resultado:** `2 PASS / 1 FAIL`

## Conclusão do Smoke

❌ **SMOKE REPROVADO**

Os fluxos básicos de carrinho e cálculo da API estão operacionais.

Entretanto, foi identificada uma divergência em uma regra crítica de negócio.

Para uma compra com subtotal exatamente igual a:

```text

R$ 200,00

```

o comportamento esperado é:

```text

Frete: R$ 0,00

```

Porém, a aplicação retornou:

```text

Frete: R$ 19,90

```

A automação registrou:

```text

Expected: "R$ 0,00"

Received: "R$ 19,90"

```

Após o refinamento da validação do campo de frete, o Smoke Test foi reexecutado e confirmou automaticamente a divergência registrada no **BUG-001**, relacionada aos critérios **CA06 / CA08**.

---

# Cenários validados

# Cenários confirmados

## 1. Cobrança de frete abaixo de R$ 200,00

Massa utilizada:

```text

1x Tênis Casual Urbano

Subtotal: R$ 189,90

```

Resultado esperado e obtido:

```text

Frete: R$ 19,90

Faltante para frete grátis: R$ 10,10

```

**Resultado:** ✅ PASS

---

## 2. Cálculo de compra abaixo do limite

Massa utilizada:

```text

1x Mochila Urbana 20L

```

Resultado esperado e obtido:

```text

Subtotal: R$ 100,00

Frete: R$ 19,90

Total: R$ 119,90

```

**Resultado:** ✅ PASS

---

## 3. Frete grátis no limite de R$ 200,00

Resultado esperado:

```text

Subtotal: R$ 200,00

Frete: R$ 0,00

```

Resultado obtido na execução manual:

```text

Subtotal: R$ 200,00

Frete: R$ 19,90

Mensagem: "Faltam R$ 0,00 para o frete grátis"

```

**Resultado manual:** ❌ FAIL  

**Resultado automatizado anterior:** ⚠️ FALSO POSITIVO  

**Resultado automatizado após refinamento:** ❌ FAIL

Após a correção da validação do campo de frete, a automação passou a identificar corretamente:

```text

Expected: "R$ 0,00"

Received: "R$ 19,90"

```

O cenário está confirmado como falha tanto na execução manual quanto na execução automatizada.

---

## 4. Frete grátis calculado pela API

Massa utilizada:

```text

Produto: P005 - Mochila Urbana 20L

Quantidade: 2

Subtotal: R$ 200,00

Cupom: BEMVINDO10

Desconto: R$ 20,00

```

Resultado esperado:

```text

Subtotal: R$ 200,00

Desconto: R$ 20,00

Frete: R$ 0,00

Total: R$ 180,00

```

Resultado observado:

```text

Frete recebido: R$ 19,90

```

Validação automatizada:

```text

Expected: 0

Received: 19.9

```

**Resultado:** ❌ FAIL

---

# Estratégia da automação

A suíte foi mantida propositalmente enxuta para priorizar cenários de maior valor e fácil rastreabilidade.

Foram selecionados:

- cenários de interface para regras essenciais do carrinho;

- cenário de API para reprodução objetiva da divergência de frete;

- Smoke Test para validação rápida dos fluxos críticos;

- relatórios automáticos para evidenciar falhas de UI e API.

A execução manual foi utilizada também como mecanismo de revisão da qualidade da própria automação. Essa comparação permitiu identificar e corrigir um falso positivo.

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

Os testes manuais, resultados obtidos e respectivas evidências estão documentados em:

[Ver testes manuais e evidências](docs/Testes_Manuais_Exploratorios.md)

O documento complementa a automação e contempla os demais critérios de aceite.

---

# Premissas e ambiguidades identificadas

Durante a análise da documentação foram encontrados pontos em que a regra principal está definida, mas o comportamento esperado em situações específicas não está totalmente detalhado.

| Referência | Ambiguidade identificada | Interpretação adotada |

|---|---|---|

| **CA05 — Apenas um cupom por vez** | Não é detalhado o comportamento da interface ao tentar aplicar um segundo cupom sem remover o primeiro. | O segundo cupom não deve substituir automaticamente o atual. |

| **CA10 — Máximo de 5 unidades** | O limite é definido, mas a reação visual ao tentar adicionar a 6ª unidade não é especificada. | A quantidade deve permanecer limitada a 5, independentemente de o botão ser desabilitado, o clique ser ignorado ou uma mensagem ser exibida. |

| **CA11 — Arredondamento** | Não é especificado em qual etapa do cálculo o arredondamento ocorre. | Valores monetários apresentados e utilizados no resultado final são considerados com duas casas decimais. |

| **Nome do cliente** | Não existem regras detalhadas para nomes compostos, hífen, apóstrofo ou múltiplos espaços. | Considerado válido quando possui pelo menos dois termos não vazios. |

| **E-mail válido** | Não é definido um padrão específico de validação. | Utilizada validação convencional de formato de e-mail. |

| **CEP** | São aceitos 8 dígitos com ou sem hífen, mas não há detalhamento sobre caracteres adicionais ou espaços externos. | Aceitos formatos equivalentes a `01310100` e `01310-100`. |

| **Quantidade inválida na API** | Não são detalhados todos os valores inválidos possíveis. | Quantidade interpretada como inteiro positivo entre 1 e 5. |

| **Espaços no cupom** | A documentação trata espaços externos, mas não espaços internos. | Apenas espaços no início e no fim são ignorados. |

## CA06 e CA08 não são ambíguos

A divergência de frete encontrada **não foi tratada como ambiguidade**.

Os critérios determinam que:

- subtotal a partir de **R$ 200,00**, inclusive, recebe frete grátis;

- a elegibilidade deve considerar o subtotal **antes do desconto do cupom**.

Logo:

```text

Subtotal antes do desconto: R$ 200,00

Cupom BEMVINDO10: -R$ 20,00

Frete esperado: R$ 0,00

```

O retorno de `R$ 19,90` caracteriza divergência de regra de negócio.

---

# Bug Report

## BUG-001 — Frete grátis não é aplicado quando o subtotal é exatamente R$ 200,00

**Tipo:** Regra de negócio / UI + API  

**Severidade sugerida:** Alta  

**Critérios afetados:** CA06 e CA08  

**Status:** `CONFIRMADO`

### Resultado esperado

```text

Subtotal: 200.00

Frete: 0.00

```

### Reprodução na interface

Massa:

```text

Produto: P005 - Mochila Urbana 20L

Quantidade: 2

Subtotal: R$ 200,00

```

Resultado observado:

```text

Frete: R$ 19,90

Mensagem: "Faltam R$ 0,00 para o frete grátis"

```

**Resultado:** ❌ FAIL

### Reprodução na API

Request:

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

Resultado esperado:

```text

Subtotal: 200.00

Desconto: 20.00

Frete: 0.00

Total: 180.00

```

Resultado observado:

```text

Frete: 19.90

```

Validação automatizada:

```text

Expected: 0

Received: 19.9

```

**Resultado:** ❌ FAIL

---

## BUG-002 — API aceita quantidade acima do máximo permitido

**Tipo:** Regra de negócio / API  

**Severidade sugerida:** Alta  

**Critério afetado:** CA10  

**Status:** `CONFIRMADO`

Request utilizado:

```json

{

  "itens": [

    {

      "produtoId": "P001",

      "quantidade": 6

    }

  ]

}

```

Resultado esperado:

```text

HTTP 422

QUANTIDADE_MAXIMA_EXCEDIDA

```

Resultado observado:

```text

HTTP 200

quantidade: 6

subtotal: 359.40

frete: 0

total: 359.40

```

A API aceitou 6 unidades e realizou normalmente o cálculo do carrinho, contrariando o limite máximo de 5 unidades definido pelo CA10.

**Resultado:** ❌ FAIL

---

## Evidências dos bugs

Disponíveis em:

```text

docs/Testes_Manuais_Exploratorios.md

logs/cucumber-report.html

logs/cucumber-report.json

logs/screenshots/

```

---

# Fora do escopo

Conforme definido no desafio:

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

- [x] Registro de premissas e ambiguidades

- [x] Smoke Test

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

- **Smoke Testing**

- **HTML Report**

- **JSON Report**
