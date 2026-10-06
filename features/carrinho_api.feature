#language: pt

Funcionalidade: Cálculo do carrinho pela API

  Cenário: Calcular carrinho com cupom válido
    Dado que possuo os seguintes itens para cálculo:
      | produtoId | quantidade |
      | P002      | 1          |
      | P004      | 2          |
    Quando calculo o carrinho com o cupom "BEMVINDO10"
    Então a API deve retornar status 200
    E o subtotal da API deve ser 239.70
    E o desconto da API deve ser 23.97
    E o frete da API deve ser 0
    E o total da API deve ser 215.73
    E o cupom deve estar aplicado


  Cenário: Calcular carrinho abaixo do limite de frete grátis
    Dado que possuo os seguintes itens para cálculo:
      | produtoId | quantidade |
      | P005      | 1          |
    Quando calculo o carrinho sem cupom
    Então a API deve retornar status 200
    E o subtotal da API deve ser 100.00
    E o frete da API deve ser 19.90
    E o valor faltante para frete grátis deve ser 100.00
    E o total da API deve ser 119.90


  Cenário: Considerar subtotal antes do desconto para frete grátis
    Dado que possuo os seguintes itens para cálculo:
      | produtoId | quantidade |
      | P005      | 2          |
    Quando calculo o carrinho com o cupom "BEMVINDO10"
    Então a API deve retornar status 200
    E o subtotal da API deve ser 200.00
    E o desconto da API deve ser 20.00
    E o frete da API deve ser 0
    E o total da API deve ser 180.00


  Cenário: Retornar mensagem para cupom inexistente no cálculo
    Dado que possuo os seguintes itens para cálculo:
      | produtoId | quantidade |
      | P005      | 1          |
    Quando calculo o carrinho com o cupom "INVALIDO"
    Então a API deve retornar status 200
    E nenhum desconto deve ser aplicado pela API
    E a mensagem do cupom deve ser "Cupom inválido."


  Cenário: Retornar mensagem para cupom expirado no cálculo
    Dado que possuo os seguintes itens para cálculo:
      | produtoId | quantidade |
      | P005      | 1          |
    Quando calculo o carrinho com o cupom "VERAO2026"
    Então a API deve retornar status 200
    E nenhum desconto deve ser aplicado pela API
    E a mensagem do cupom deve ser "Cupom expirado."


  Cenário: Não permitir mais de 5 unidades de um produto
    Dado que possuo os seguintes itens para cálculo:
      | produtoId | quantidade |
      | P001      | 6          |
    Quando calculo o carrinho sem cupom
    Então a API deve retornar status 422
    E o código de erro deve ser "QUANTIDADE_MAXIMA_EXCEDIDA"