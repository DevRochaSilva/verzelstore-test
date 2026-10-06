#language: pt

Funcionalidade: Aplicação de cupom e frete grátis

  Como cliente da Verzel Store,
  quero aplicar um cupom de desconto
  e ganhar frete grátis em compras maiores,
  para pagar menos nas minhas compras.


  Cenário: Aplicar cupom de desconto válido
    Dado que estou na página de checkout da Verzel Store
    E possuo produtos no carrinho
    Quando aplico um cupom de desconto válido
    Então o desconto deve ser aplicado ao valor da compra
    E o valor total deve ser recalculado


  Cenário: Não aplicar cupom de desconto inválido
    Dado que estou na página de checkout da Verzel Store
    E possuo produtos no carrinho
    Quando aplico um cupom de desconto inválido
    Então devo visualizar uma mensagem informando que o cupom é inválido
    E o valor total da compra não deve ser alterado


  Cenário: Aplicar frete grátis ao atingir o valor mínimo
    Dado que estou na página de checkout da Verzel Store
    E o valor da minha compra atingiu o valor mínimo para frete grátis
    Quando visualizo o resumo da compra
    Então o valor do frete deve ser "R$ 0,00"
    E o benefício de frete grátis deve ser apresentado


  Cenário: Manter cobrança de frete abaixo do valor mínimo
    Dado que estou na página de checkout da Verzel Store
    E o valor da minha compra está abaixo do valor mínimo para frete grátis
    Quando visualizo o resumo da compra
    Então o valor do frete deve permanecer aplicado
    E o valor total deve considerar o custo do frete


  Cenário: Aplicar cupom de desconto e frete grátis na mesma compra
    Dado que estou na página de checkout da Verzel Store
    E possuo produtos que atingem o valor mínimo para frete grátis
    Quando aplico um cupom de desconto válido
    Então o desconto deve ser aplicado à compra
    E o frete deve ser gratuito
    E o valor total deve ser recalculado corretamente

