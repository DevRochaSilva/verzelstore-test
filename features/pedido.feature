#language: pt

Funcionalidade: pedidos
 
Como um usuário do site starbuggies, eu quero selecionar e comprar e cafés
Para que eu possa receber os produtos em meu endereço e efetuar o pagamento na entrega.

Cenário: Compra bem sucedida

Dado que eu estou na página principal da starbuggies
     E que iniciei a compra do item "Expresso Tradicional"
Quando faço a busca do seguinte CEP: "25957030"
     E informo os demais dados do endereço:
       | number      | 1000    |
       | details     | Apto 22 |        
     E escolho a forma de pagamento "cartão de Crédito"
     E por fim finaliza a compra
Então sou redirecionado para a página de confirmação de Pedidos
     E deve ser informando o seguinte prazo e entrega: "20 min - 30 min"





