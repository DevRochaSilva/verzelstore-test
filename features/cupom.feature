#language :pt


Funcionalidade: Uso de cupom no checkout

Como um usuário da StarBuggies, Eu quero poder aplicar 
cupons de desconto na página de checkout, Para que eu possa obter reduções no 
preço de produtos específicos ou na minha compra total, aumentando a satisfação 
com a minha experiência de compra.

Cenario: Aplicar Desconto de 20%:

Dado que iniciei a compra do item:
    | name      | Café com Leite |
    | price     | R$  9,99       | 
    | delivery  | R$ 10,00       |  
    | total     | R$ 19,99       | 

Quando aplico o seguinte o cupom: "MEUCAFE"
Então o valor final da compra deve ser atualizado para "R$ 17,99"     

Cenario: Cupom Expirado

Dado que iniciei a compra do item:
    | name      | Café com Leite |
    | price     | R$  9,99       | 
    | delivery  | R$ 10,00       |  
    | total     | R$ 19,99       | 

Quando aplico o seguinte o cupom: "PROMO20"
Então devo ver a notificação "Cupom expirado!"
    E o valor final deve permanecer o mesmo  
   

Cenario: Cupom Inválido.   

Dado que iniciei a compra do item:
    | name      | Café com Leite |
    | price     | R$  9,99       | 
    | delivery  | R$ 10,00       |  
    | total     | R$ 19,99       | 

Quando aplico o seguinte o cupom: "PROMO100"
Então devo ver a notificação "Cupom inválido!"
    E o valor final deve permanecer o mesmo 

# @ddt
# Esquema do Cenário: Tentativa de aplicar o desconto

# Quando aplico o seguinte o cupom: "<cupom>"
# Então devo ver a notificação "<saida>"
#     E o valor final deve permanecer o mesmo 

#     Exemplos:
#     | cupom     | saida          |
#     | PROMO20   | Cupom expirad! |
#     | PROMO100  | Cupom inválido!|