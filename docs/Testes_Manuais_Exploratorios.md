# Testes Manuais e Exploratórios — Verzel Store

## 1. Objetivo

Validar manualmente os principais comportamentos descritos na história de usuário e nos critérios de aceite da Verzel Store, complementando a automação com verificações funcionais e exploratórias.

## 2. Escopo

### Dentro do escopo

- catálogo e carrinho;
- aplicação e remoção de cupom;
- mensagens de cupom inválido e expirado;
- frete grátis;
- valor faltante para frete grátis;
- cálculo de subtotal, desconto, frete e total;
- limite máximo de 5 unidades;
- arredondamento monetário;
- API de produtos;
- API de cálculo de carrinho;
- API de pedidos;
- validação básica dos dados do cliente.

### Fora do escopo

- login;
- cadastro de clientes;
- pagamento online;
- consulta de pedidos;
- testes de carga;
- stress;
- segurança.

## 3. Ambiente

- Loja: `https://verzel-store.qa-test-verzel-store.workers.dev/`
- API: `https://verzel-store.qa-test-verzel-store.workers.dev/api`
- Ambiente compartilhado entre candidatos
- Carrinho armazenado somente na aba atual

## 4. Massa de teste principal

| ID | Produto | Preço |
|---|---|---:|
| P001 | Camiseta Essencial | R$ 59,90 |
| P002 | Calça Jeans Slim | R$ 139,90 |
| P003 | Tênis Casual Urbano | R$ 189,90 |
| P004 | Boné Aba Curva | R$ 49,90 |
| P005 | Mochila Urbana 20L | R$ 100,00 |
| P006 | Kit 3 Pares de Meias | R$ 29,90 |
| P007 | Jaqueta Corta-Vento | R$ 229,90 |
| P008 | Garrafa Térmica 750ml | R$ 50,00 |

### Cupons

| Código | Situação | Regra |
|---|---|---|
| BEMVINDO10 | Válido | 10% de desconto |
| VERAO2026 | Expirado | Deve informar "Cupom expirado." |

---

# 5. Casos de teste manuais

## TM-001 — Aplicar cupom BEMVINDO10

**Critério:** CA01  
**Prioridade:** Alta

**Pré-condições**
- Carrinho vazio.
- Produto P005 disponível.

**Passos**
1. Acessar a loja.
2. Adicionar 1 Mochila Urbana 20L.
3. Acessar o carrinho.
4. Informar `BEMVINDO10`.
5. Aplicar o cupom.

**Resultado esperado**
- Subtotal: R$ 100,00.
- Desconto: R$ 10,00.
- Frete: R$ 19,90.
- Total: R$ 109,90.
- Cupom indicado como aplicado.

**Resultado da execução:** `PASS`

**Resultado obtido:**  

O cupom BEMVINDO10 foi aplicado corretamente. Foram apresentados subtotal de R$ 100,00, desconto de R$ 10,00, frete de R$ 19,90 e total de R$ 109,90.

**Evidência:** `evidencias/TM/TM-001_PASS.png`

**Ambiente:** Google Chrome / Windows 11  
**Data da execução:** 08/10/2026

---

## TM-002 — Validar normalização do código do cupom

**Critério:** CA02  
**Prioridade:** Alta

**Dados de teste**
- `BEMVINDO10`
- `bemvindo10`
- `BemVindo10`
- ` BEMVINDO10 `
- ` bemvindo10 `

**Passos**
1. Adicionar 1 Mochila Urbana 20L ao carrinho.
2. Para cada variação, aplicar o cupom.
3. Remover o cupom antes de testar a próxima variação.

**Resultado esperado**
- Todas as variações são aceitas.
- O desconto calculado permanece em 10%.

**Resultado da execução:** `PASS`

**Resultado obtido:**  

Aplicado variações  BEMVINDO10, bemvindo10, BemVindo10, BEMVINDO10, bemvindo10, espaços inicio e fim. 

**Teste bônus:**

 Aplicado cupom com caracteres especiais antes e depois
 
 Resultado: cupom recusado.


**Evidência:** `evidencias/TM/TM-002_BONUS-FAIL.png`

**Ambiente:** Google Chrome / Windows 11  
**Data da execução:** 08/10/2026

---

## TM-003 — Cupom inexistente

**Critério:** CA03  
**Prioridade:** Alta

**Passos**
1. Adicionar 1 Mochila Urbana 20L ao carrinho.
2. Informar `CUPOMINVALIDO`.
3. Aplicar.

**Resultado esperado**
- Mensagem: `Cupom inválido.`
- Desconto: R$ 0,00.
- Total sem desconto.

**Resultado da execução:** `PASS`

**Resultado obtido:**  

O cupom Inávlio foi aplicado e não houve desconto, mantendo o frete de R$ 19,90 e total de R$ 109,90.

**Evidência:** `evidencias/TM/TM-003_PASS.png`

**Ambiente:** Google Chrome / Windows 11  
**Data da execução:** 08/10/2026


---

## TM-004 — Cupom expirado

**Critério:** CA04  
**Prioridade:** Alta

**Passos**
1. Adicionar 1 Mochila Urbana 20L ao carrinho.
2. Informar `VERAO2026`.
3. Aplicar.

**Resultado esperado**
- Mensagem: `Cupom expirado.`
- Nenhum desconto aplicado.

**Resultado da execução:** `PASS`

**Resultado obtido:**  

O cupom expirado foi aplicado e não houve desconto, mantendo o frete de R$ 19,90 e total de R$ 109,90.

**Evidência:** `evidencias/TM/TM-004_PASS.png`

**Ambiente:** Google Chrome / Windows 11  
**Data da execução:** 08/10/2026

---

## TM-005 — Apenas um cupom por vez

**Critério:** CA05  
**Prioridade:** Média

**Passos**
1. Adicionar um produto ao carrinho.
2. Aplicar `BEMVINDO10`.
3. Tentar informar outro cupom sem remover o atual.
4. Remover o cupom.
5. Tentar informar outro código.

**Resultado esperado**
- Apenas um cupom fica aplicado por vez.
- Para trocar o cupom, o atual precisa ser removido.

**Resultado da execução:** `PASS`

**Resultado obtido:**  

O cupom BEMVINDO10 foi aplicado, não foi possível adicionar outro cupom, para inserir outro deve-se remover o aplicado. 
Inserido cupom DESCONTO15 recebe mensagem: "Cupom Inválido"

**Evidência:** `evidencias/TM/TM-005_PASS_CUPOM_VALIDO.png` 
               `evidencias/TM/TM-005_PASS_CUPOM_INVALIDO.png` 

**Ambiente:** Google Chrome / Windows 11  
**Data da execução:** 08/10/2026

---

## TM-006 — Frete grátis exatamente em R$ 200,00

**Critério:** CA06  
**Prioridade:** Crítica

**Massa**
- 2 x Mochila Urbana 20L = R$ 200,00.

**Passos**
1. Adicionar 2 Mochilas Urbana 20L.
2. Abrir o carrinho.

**Resultado esperado**
- Subtotal: R$ 200,00.
- Frete: R$ 0,00.
- Indicador de frete grátis ativo.

**Resultado observado na automação de UI:** `FAIL`

**Resultado obtido:**  

Adicionado 2x Mochilas Urbana 20L com total de R$200,00, portanto o frete se mnatém fixo R$19,00 com total = R$219,00 com mensagem "Faltam R$ 0,00 para o frete grátis" sem validar o FRETE GRATIS.

**Teste bônus:**

Adicionado mais 1x do produto onde o frete aplicou-se grátis.


**Evidência:** `evidencias/TM/TM-006_FAIL.png` 
               `evidencias/TM/TM-006_BONUS.png` 

**Ambiente:** Google Chrome / Windows 11  
**Data da execução:** 08/10/2026

---

## TM-007 — Frete abaixo do limite

**Critério:** CA07  
**Prioridade:** Alta

**Massa**
- 1 x Tênis Casual Urbano = R$ 189,90.

**Resultado esperado**
- Subtotal: R$ 189,90.
- Frete: R$ 19,90.
- Informação de que faltam R$ 10,10 para frete grátis.

**Resultado observado na automação de UI:** `PASS`

**Resultado obtido:**  

Adicionado 1x Tênis Casual Urbano com total de R$189,90, frete R$ 19,90, total R$ 209,80, mensagem mostrada "Faltam R$ 10,10 para o frete grátis."


**Evidência:** `evidencias/TM/TM-007_PASS.png` 
               `

**Ambiente:** Google Chrome / Windows 11  
**Data da execução:** 08/10/2026

---

## TM-008 — Frete grátis calculado antes do desconto

**Critério:** CA08  
**Prioridade:** Crítica

**Massa**
- 2 x Mochila Urbana 20L = R$ 200,00.
- Cupom `BEMVINDO10`.

**Resultado esperado**
- Subtotal: R$ 200,00.
- Desconto: R$ 20,00.
- Frete: R$ 0,00.
- Total: R$ 180,00.

**Resultado de API observado na automação:** `FAIL`  

**Observação:** em uma execução, a API retornou frete `19.90` em vez de `0`. 

**Bug relacionado:** `BUG-001`

**Resultado obtido:**  

Adicionado 2 x Mochila Urbana 20L com valor R$200,00 onde o Frete se manteve R$ 19,90 com desconto de R$ 20,00 e total R$ 199,90.

Cálculo:

R$ 200,00 - R$ 20,00 = R$ 180,00 + R$19,90 = R$ 199,90


**Evidência:** `evidencias/TM/TM-008_FAIL.png` 
               `

**Ambiente:** Google Chrome / Windows 11  
**Data da execução:** 08/10/2026

---

## TM-009 — Desconto não incide sobre frete

**Critério:** CA09  
**Prioridade:** Alta

**Massa**
- 1 x Mochila Urbana 20L = R$ 100,00.
- BEMVINDO10.

**Resultado esperado**
- Subtotal: R$ 100,00.
- Desconto: R$ 10,00.
- Frete: R$ 19,90.
- Total: R$ 109,90.


**Resultado observado na automação de UI:** `PASS`

**Resultado obtido:**  

Adicionado 1x Mochila Urbana 20L com total de R$100,00, deconto com cupom:BEMVINDO10 R$ 10,00, frete R$ 19,90 e total R$ R$ 109,90.
Mensagem exibida: "Faltam R$ 100,00 para o frete grátis."


**Evidência:** `evidencias/TM/TM-009_PASS.png` 
               `

**Ambiente:** Google Chrome / Windows 11  
**Data da execução:** 08/10/2026

---

## TM-010 — Limite máximo de 5 unidades na interface

**Critério:** CA10  
**Prioridade:** Alta

**Passos**
1. Adicionar Camiseta Essencial.
2. Aumentar a quantidade até 5.
3. Tentar aumentar para 6.

**Resultado esperado**
- Quantidade máxima permanece em 5.
- A interface não permite uma sexta unidade.

**Resultado observado na automação de UI:** `PASS`

**Resultado obtido:**  

Adicionado 5x Camiseta Essencial, botão desabilita, não permitindo adicionar o mesmo item mais de 5x.

**Teste Bônus**

Feito teste em todos os itens da interface em busca de bug, todos itens aceitam apenas 5 unidade.

**Evidência:** `evidencias/TM/TM-010_PASS.png` 
               `evidencias/TM/TM-010_BONUS.png`

**Ambiente:** Google Chrome / Windows 11  
**Data da execução:** 08/10/2026

---

## TM-011 — Limite máximo de 5 unidades na API

**Critério:** CA10  
**Prioridade:** Crítica

**Request**
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

**Resultado esperado**
- HTTP 422.
- Código `QUANTIDADE_MAXIMA_EXCEDIDA`.

**Resultado observado na automação:** `FAIL`  
**Resultado recebido em uma execução:** HTTP 200.

**Resultado obtido:**  
A API aceitou a quantidade `6` para o produto `P001` e retornou HTTP `200`, realizando normalmente o cálculo do carrinho.

**Resultado esperado:**  
A API deveria retornar HTTP `422` com o código `QUANTIDADE_MAXIMA_EXCEDIDA`.

**Evidência:** `evidencias/TM/TM-011_FAIL.png`

**Bug relacionado:** `BUG-002`

**Ambiente:** Apidog / API Verzel Store  
**Data da execução:** 08/10/2026

**Ambiente:** Google Chrome / Windows 11  
**Data da execução:** 08/10/2026
---

## TM-012 — Arredondamento monetário

**Critério:** CA11  
**Prioridade:** Alta

**Request**
```json
{
  "itens": [
    {
      "produtoId": "P002",
      "quantidade": 1
    },
    {
      "produtoId": "P004",
      "quantidade": 2
    }
  ],
  "cupom": "BEMVINDO10"
}
```

**Massa**
- P002 x 1 = 139,90.
- P004 x 2 = 99,80.
- Subtotal = 239,70.
- BEMVINDO10 = 23,97.
- FRETE = 0,00

**Resultado esperado**
- Todos os valores com 2 casas decimais.
- Total: 215,73.
- Sem discrepâncias de ponto flutuante visíveis ao usuário.

**Resultado observado na automação de API:** `PASS`

**Evidência:** `evidencias/TM/TM-012_PASS.png`

---

# 6. Testes exploratórios

## TE-001 — Manipulação do carrinho

**Charter**
Explorar o comportamento do carrinho ao adicionar, remover e alterar quantidades em sequências não previstas nos cenários principais.

**Explorar**
- adicionar/remover repetidamente;
- reduzir quantidade para 1;
- remover o único item;
- alternar produtos;
- atualizar a página;
- abrir outra aba;
- tentar ultrapassar 5 unidades.

**Resultado esperado**
- Carrinho consistente.
- Nenhum valor negativo.
- Nenhuma quantidade acima de 5.
- Outra aba inicia com carrinho próprio, conforme documentação.

**Resultado:** `Preencher após execução`

---

## TE-002 — Cupons e entradas inesperadas

**Charter**
Explorar variações de entrada no campo de cupom.

**Explorar**
- somente espaços;
- espaços internos;
- caracteres especiais;
- cupom muito longo;
- copiar/colar;
- maiúsculas/minúsculas;
- aplicar e remover repetidamente.

**Resultado esperado**
- Sistema não quebra.
- Mensagens coerentes.
- Apenas as normalizações previstas pela documentação são aceitas.

**Resultado:** `Preencher após execução`

---

## TE-003 — Limites do frete grátis

**Charter**
Explorar valores próximos ao limite de R$ 200,00.

**Explorar**
- R$ 199,80;
- R$ 199,90;
- R$ 200,00;
- R$ 200,10;
- subtotal superior a R$ 200,00;
- subtotal que cai abaixo de R$ 200 após desconto.

**Resultado esperado**
- A decisão de frete usa o subtotal anterior ao desconto.
- R$ 200,00 inclusive recebe frete grátis.

**Resultado:** `Preencher após execução`

---

## TE-004 — Dados do cliente no pedido

**Charter**
Explorar validações dos campos de cliente.

**Explorar**
- nome com apenas uma palavra;
- nome e sobrenome;
- e-mail sem `@`;
- e-mail válido;
- CEP com hífen;
- CEP sem hífen;
- CEP com menos/mais de 8 dígitos.

**Resultado esperado**
- Nome exige nome e sobrenome.
- E-mail deve ter formato válido.
- CEP aceita 8 dígitos com ou sem hífen.

**Resultado:** `Preencher após execução`

---

## TE-005 — Resiliência visual básica

**Charter**
Explorar a interface em condições comuns sem executar testes de carga, stress ou segurança.

**Explorar**
- redimensionar a janela;
- rolar páginas;
- voltar/avançar no navegador;
- recarregar carrinho;
- navegação rápida entre catálogo e carrinho.

**Resultado esperado**
- Fluxo principal permanece utilizável.
- Nenhuma informação importante fica inacessível.

**Resultado:** `Preencher após execução`

---

# 7. Matriz de rastreabilidade

| Critério | Caso(s) |
|---|---|
| CA01 | TM-001 |
| CA02 | TM-002 |
| CA03 | TM-003 |
| CA04 | TM-004 |
| CA05 | TM-005 |
| CA06 | TM-006 |
| CA07 | TM-007 |
| CA08 | TM-008 |
| CA09 | TM-009 |
| CA10 | TM-010, TM-011 |
| CA11 | TM-012 |

---

# 8. Bugs candidatos identificados na automação

## BUG-CAND-001 — API cobra frete quando subtotal é exatamente R$ 200,00

**Origem:** CA06 / CA08  
**Severidade sugerida:** Alta

**Esperado**
```text
subtotal = 200.00
frete = 0.00
```

**Observado em execução automatizada**
```text
subtotal = 200.00
frete = 19.90
```

**Status**
`Confirmar manualmente/API antes de registrar como bug definitivo.`

---

## BUG-CAND-002 — API aceita quantidade acima do máximo permitido

**Origem:** CA10  
**Severidade sugerida:** Alta

**Esperado**
```text
HTTP 422
QUANTIDADE_MAXIMA_EXCEDIDA
```

**Observado em execução automatizada**
```text
HTTP 200
```

**Status**
`Confirmar no Postman/Apidog antes de registrar como bug definitivo.`

---

# 9. Evidências

Utilizar:

```text
logs/cucumber-report.html
logs/cucumber-report.json
logs/screenshots/
```

Para cada execução manual, preencher no respectivo caso:

- status: PASS / FAIL / BLOCKED;
- data/hora;
- navegador;
- evidência;
- Bug ID, quando aplicável.

---


