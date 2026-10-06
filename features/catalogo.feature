#language: pt

Funcionalidade: Catálogo de cafés
    Como um usuário do site
    Quero visualizar o catálogo de cafés
    Para escolher e saber mais sobre os produtos disponíveis

Cenário: Acessar o catálogo de cafés na página principal
    Quando acesso a página principal da starbuggies
    Então eu devo ver uma lista de cafés disponíveis


Cenário: Iniciar a compra de um café
    Dado que eu estou na página principal da starbuggies
    E que desejo comprar o seguinte produto:
       | name     | Expresso Gelado |
       | price    | R$ 9,99         |
       | delivery | R$ 10,00        |
    Quando inicio a compra desse café
    Então devo ver a página de checkout com o café
    E o custo total da compra deve ser de "R$ 19,99"


Cenário: Café indisponível
    Dado que eu estou na página principal da starbuggies
    E que desejo comprar o seguinte produto:
       | name | Expresso Cremoso |
    Quando inicio a compra desse café
    Então devo ver uma mensagem de erro informando que o café está indisponível

