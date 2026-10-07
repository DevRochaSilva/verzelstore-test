const {
    Given,
    When,
    Then
} = require('@cucumber/cucumber');

const {
    expect
} = require('@playwright/test');


Given(
    'que possuo os seguintes itens para cálculo:',
    function (dataTable) {

        this.itens =
            dataTable
                .hashes()
                .map(item => ({
                    produtoId:
                        item.produtoId,

                    quantidade:
                        Number(
                            item.quantidade
                        )
                }));
    }
);


When(
    'calculo o carrinho com o cupom {string}',
    async function (cupom) {

        this.response =
            await this.request.post(
                '/api/carrinho/calcular',
                {
                    data: {
                        itens:
                            this.itens,

                        cupom
                    }
                }
            );

        this.responseBody =
            await this.response.json();
    }
);


Then(
    'a API deve retornar status {int}',
    function (status) {

        expect(
            this.response.status()
        ).toBe(status);
    }
);


Then(
    'o subtotal da API deve ser {float}',
    function (valor) {

        expect(
            this.responseBody.subtotal
        ).toBeCloseTo(
            valor,
            2
        );
    }
);


Then(
    'o desconto da API deve ser {float}',
    function (valor) {

        expect(
            this.responseBody.desconto
        ).toBeCloseTo(
            valor,
            2
        );
    }
);


Then(
    'o frete da API deve ser {float}',
    function (valor) {

        expect(
            this.responseBody.frete
        ).toBeCloseTo(
            valor,
            2
        );
    }
);


Then(
    'o total da API deve ser {float}',
    function (valor) {

        expect(
            this.responseBody.total
        ).toBeCloseTo(
            valor,
            2
        );
    }
);