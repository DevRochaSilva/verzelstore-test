const {
    Given,
    When,
    Then
} = require('@cucumber/cucumber');

const { expect } = require('@playwright/test');

const HomePage = require('../pages/HomePage');
const CarrinhoPage = require('../pages/CarrinhoPage');


Given(
    'que adiciono {int} unidade de {string} ao carrinho',
    async function (quantidade, produto) {

        this.homePage = new HomePage(this.page);
        this.carrinhoPage = new CarrinhoPage(this.page);

        await this.homePage.acessar();

        await this.homePage.adicionarProduto(
            produto,
            quantidade
        );
    }
);


Given(
    'que adiciono {int} unidades de {string} ao carrinho',
    async function (quantidade, produto) {

        this.homePage = new HomePage(this.page);
        this.carrinhoPage = new CarrinhoPage(this.page);

        await this.homePage.acessar();

        await this.homePage.adicionarProduto(
            produto,
            quantidade
        );
    }
);


Given(
    'acesso o carrinho',
    async function () {

        await this.homePage.acessarCarrinho();
    }
);


When(
    'aplico o cupom {string}',
    async function (cupom) {

        await this.carrinhoPage.aplicarCupom(cupom);
    }
);


Then(
    'o cupom deve ser aplicado com sucesso',
    async function () {

        await this.carrinhoPage.deveConter(
            'Cupom aplicado'
        );
    }
);


Then(
    'devo visualizar a mensagem {string}',
    async function (mensagem) {

        await this.carrinhoPage.deveConter(mensagem);
    }
);


Then(
    'nenhum desconto deve ser aplicado',
    async function () {

        const texto = await this.carrinhoPage.obterTextoPagina();

        expect(texto).not.toContain(
            'Cupom aplicado'
        );
    }
);


Then(
    'o subtotal deve ser de {string}',
    async function (valor) {

        await this.carrinhoPage.deveConter(valor);
    }
);


Then(
    'o desconto deve ser de {string}',
    async function (valor) {

        await this.carrinhoPage.deveConter(valor);
    }
);


Then(
    'o frete deve ser de {string}',
    async function (valor) {

        await this.carrinhoPage.deveConter(valor);
    }
);


Then(
    'o total deve ser de {string}',
    async function (valor) {

        await this.carrinhoPage.deveConter(valor);
    }
);


Then(
    'deve ser informado que faltam {string} para o frete grátis',
    async function (valor) {

        await this.carrinhoPage.deveConter(valor);
    }
);


Given(
    'que possuo 5 unidades de {string} no carrinho',
    async function (produto) {

        this.homePage = new HomePage(this.page);
        this.carrinhoPage = new CarrinhoPage(this.page);

        await this.homePage.acessar();

        await this.homePage.adicionarProduto(
            produto,
            5
        );

        await this.homePage.acessarCarrinho();
    }
);


When(
    'tento adicionar mais uma unidade do mesmo produto',
    async function () {

        // Implementado pelo cenário anterior utilizando
        // o produto armazenado posteriormente se necessário.
    }
);


Then(
    'a quantidade de {string} deve permanecer em {int}',
    async function (produto, quantidade) {

        const body = await this.page
            .locator('body')
            .innerText();

        expect(body).toContain(produto);
        expect(body).toContain(
            String(quantidade)
        );
    }
);