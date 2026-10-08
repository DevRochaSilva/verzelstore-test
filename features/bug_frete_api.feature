#language: pt

@desafio @api @bug
Funcionalidade: Regra de frete grátis pela API

  @api @bug
  Cenário: Conceder frete grátis quando subtotal for exatamente R$ 200,00
    Dado que possuo os seguintes itens para cálculo:
      | produtoId | quantidade |
      | P005      | 2          |
    Quando calculo o carrinho com o cupom "BEMVINDO10"
    Então a API deve retornar status 200
    E o subtotal da API deve ser 200.00
    E o desconto da API deve ser 20.00
    E o frete da API deve ser 0
    E o total da API deve ser 180.00