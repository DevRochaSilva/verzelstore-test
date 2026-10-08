#language: pt

@smoke
Funcionalidade: Smoke Test da Verzel Store

  Como responsável pela qualidade da Verzel Store,
  quero validar rapidamente as funcionalidades críticas
  para garantir que o sistema está operacional para o cliente.


  @ui
  Cenário: Calcular compra básica no carrinho
    Dado que adiciono 1 unidade de "Mochila Urbana 20L" ao carrinho
    E acesso o carrinho
    Então o subtotal deve ser de "R$ 100,00"
    E o frete deve ser de "R$ 19,90"
    E o total deve ser de "R$ 119,90"


  @ui
  Cenário: Aplicar frete grátis no valor limite
    Dado que adiciono 2 unidades de "Mochila Urbana 20L" ao carrinho
    E acesso o carrinho
    Então o subtotal deve ser de "R$ 200,00"
    E o frete deve ser de "R$ 0,00"


  @api
  Cenário: Calcular carrinho básico pela API
    Dado que possuo os seguintes itens para cálculo:
      | produtoId | quantidade |
      | P005      | 1          |
    Quando calculo o carrinho sem cupom
    Então a API deve retornar status 200
    E o subtotal da API deve ser 100.00
    E o frete da API deve ser 19.90
    E o total da API deve ser 119.90