#language: pt

@desafio @ui
Funcionalidade: Regras do carrinho da Verzel Store

  Como cliente da Verzel Store,
  quero que os valores do meu carrinho sejam calculados corretamente
  para saber o valor final da minha compra.


  @ui @pass
  Cenário: Aplicar frete grátis com subtotal exatamente igual a R$ 200,00
    Dado que adiciono 2 unidades de "Mochila Urbana 20L" ao carrinho
    E acesso o carrinho
    Então o subtotal deve ser de "R$ 200,00"
    E o frete deve ser de "R$ 0,00"


  @ui @pass
  Cenário: Cobrar frete abaixo do limite de R$ 200,00
    Dado que adiciono 1 unidade de "Tênis Casual Urbano" ao carrinho
    E acesso o carrinho
    Então o subtotal deve ser de "R$ 189,90"
    E o frete deve ser de "R$ 19,90"
    E deve ser informado que faltam "R$ 10,10" para o frete grátis


  @ui @pass
  Cenário: Calcular corretamente uma compra abaixo do limite de frete grátis
    Dado que adiciono 1 unidade de "Mochila Urbana 20L" ao carrinho
    E acesso o carrinho
    Então o subtotal deve ser de "R$ 100,00"
    E o frete deve ser de "R$ 19,90"
    E o total deve ser de "R$ 119,90"