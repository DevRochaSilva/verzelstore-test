const { Given, Then } = require("@cucumber/cucumber");

const { expect } = require("@playwright/test");

const HomePage = require("../pages/HomePage");

const CarrinhoPage = require("../pages/CarrinhoPage");

Given(
  "que adiciono {int} unidade de {string} ao carrinho",
  async function (quantidade, produto) {
    this.homePage = new HomePage(this.page);

    this.carrinhoPage = new CarrinhoPage(this.page);

    await this.homePage.acessar();

    await this.homePage.adicionarProduto(produto, quantidade);
  },
);

Given(
  "que adiciono {int} unidades de {string} ao carrinho",
  async function (quantidade, produto) {
    this.homePage = new HomePage(this.page);

    this.carrinhoPage = new CarrinhoPage(this.page);

    await this.homePage.acessar();

    await this.homePage.adicionarProduto(produto, quantidade);
  },
);

Given("acesso o carrinho", async function () {
  await this.homePage.acessarCarrinho();
});

Then("o subtotal deve ser de {string}", async function (valor) {
  const texto = await this.carrinhoPage.obterTextoPagina();

  expect(texto).toContain(valor);
});

Then("o frete deve ser de {string}", async function (valor) {
  const texto = await this.carrinhoPage.obterTextoPagina();

  expect(texto).toContain(valor);
});

Then("o total deve ser de {string}", async function (valor) {
  const texto = await this.carrinhoPage.obterTextoPagina();

  expect(texto).toContain(valor);
});

Then(
  "deve ser informado que faltam {string} para o frete grátis",
  async function (valor) {
    const texto = await this.carrinhoPage.obterTextoPagina();

    expect(texto).toContain(valor);
  },
);
