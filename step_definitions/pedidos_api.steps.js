const {
    Given,
    When,
    Then
} = require('@cucumber/cucumber');

const { expect } = require('@playwright/test');


Given(
    'que possuo um pedido válido',
    function () {

        this.pedido = {
            cliente: {
                nome: 'Maria Silva',
                email: 'maria@exemplo.com',
                cep: '01310-100'
            },

            itens: [
                {
                    produtoId: 'P005',
                    quantidade: 1
                }
            ]
        };
    }
);


When(
    'confirmo o pedido com o cupom {string}',
    async function (cupom) {

        this.response = await this.request.post(
            '/api/pedidos',
            {
                data: {
                    ...this.pedido,
                    cupom
                }
            }
        );

        this.responseBody = await this.response.json();
    }
);


Then(
    'a API de pedidos deve retornar status {int}',
    function (status) {

        expect(
            this.response.status()
        ).toBe(status);
    }
);


Then(
    'o número do pedido deve seguir o padrão {string}',
    function () {

        expect(
            this.responseBody.numero
        ).toMatch(/^VZ-\d{6}$/);
    }
);


Then(
    'o subtotal do pedido deve ser {float}',
    function (valor) {

        expect(
            this.responseBody.subtotal
        ).toBeCloseTo(valor, 2);
    }
);


Then(
    'o desconto do pedido deve ser {float}',
    function (valor) {

        expect(
            this.responseBody.desconto
        ).toBeCloseTo(valor, 2);
    }
);


Then(
    'o frete do pedido deve ser {float}',
    function (valor) {

        expect(
            this.responseBody.frete
        ).toBeCloseTo(valor, 2);
    }
);


Then(
    'o total do pedido deve ser {float}',
    function (valor) {

        expect(
            this.responseBody.total
        ).toBeCloseTo(valor, 2);
    }
);