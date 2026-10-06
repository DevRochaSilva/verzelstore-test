#language: pt

Funcionalidade: Cupom de desconto e frete grátis

  Como cliente da Verzel Store,
  quero aplicar um cupom de desconto
  e ganhar frete grátis em compras maiores,
  para pagar menos nas minhas compras.


  Cenário: Aplicar cupom BEMVINDO10 com sucesso
    Dado que adiciono 1 unidade de "Mochila Urbana 20L" ao carrinho
    E acesso o carrinho
    Quando aplico o cupom "BEMVINDO10"
    Então o desconto deve ser de "R$ 10,00"
    E o frete deve ser de "R$ 19,90"
    E o total deve ser de "R$ 109,90"


  Esquema do Cenário: Aceitar variações do cupom BEMVINDO10
    Dado que adiciono 1 unidade de "Mochila Urbana 20L" ao carrinho
    E acesso o carrinho
    Quando aplico o cupom "<cupom>"
    Então o cupom deve ser aplicado com sucesso

    Exemplos:
      | cupom          |
      | BEMVINDO10     |
      | bemvindo10     |
      | BemVindo10     |
      |  BEMVINDO10    |
      | BEMVINDO10     |


  Cenário: Informar cupom inexistente
    Dado que adiciono 1 unidade de "Mochila Urbana 20L" ao carrinho
    E acesso o carrinho
    Quando aplico o cupom "CUPOMINVALIDO"
    Então devo visualizar a mensagem "Cupom inválido."
    E nenhum desconto deve ser aplicado


  Cenário: Informar cupom expirado
    Dado que adiciono 1 unidade de "Mochila Urbana 20L" ao carrinho
    E acesso o carrinho
    Quando aplico o cupom "VERAO2026"
    Então devo visualizar a mensagem "Cupom expirado."
    E nenhum desconto deve ser aplicado


  Cenário: Aplicar frete grátis com subtotal exatamente igual a R$ 200,00
    Dado que adiciono 2 unidades de "Mochila Urbana 20L" ao carrinho
    E acesso o carrinho
    Então o subtotal deve ser de "R$ 200,00"
    E o frete deve ser de "R$ 0,00"


  Cenário: Cobrar frete quando subtotal estiver abaixo de R$ 200,00
    Dado que adiciono 1 unidade de "Tênis Casual Urbano" ao carrinho
    E acesso o carrinho
    Então o subtotal deve ser de "R$ 189,90"
    E o frete deve ser de "R$ 19,90"
    E deve ser informado que faltam "R$ 10,10" para o frete grátis


  Cenário: Calcular frete grátis antes do desconto do cupom
    Dado que adiciono 2 unidades de "Mochila Urbana 20L" ao carrinho
    E acesso o carrinho
    Quando aplico o cupom "BEMVINDO10"
    Então o subtotal deve ser de "R$ 200,00"
    E o desconto deve ser de "R$ 20,00"
    E o frete deve ser de "R$ 0,00"
    E o total deve ser de "R$ 180,00"


  Cenário: Não aplicar desconto do cupom sobre o frete
    Dado que adiciono 1 unidade de "Mochila Urbana 20L" ao carrinho
    E acesso o carrinho
    Quando aplico o cupom "BEMVINDO10"
    Então o subtotal deve ser de "R$ 100,00"
    E o desconto deve ser de "R$ 10,00"
    E o frete deve ser de "R$ 19,90"
    E o total deve ser de "R$ 109,90"


  Cenário: Permitir no máximo 5 unidades do mesmo produto
    Dado que adiciono 5 unidades de "Camiseta Essencial" ao carrinho
    Quando tento adicionar mais uma unidade do mesmo produto
    Então a quantidade de "Camiseta Essencial" deve permanecer em 5