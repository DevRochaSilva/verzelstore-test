class CarrinhoPage {
  constructor(page) {
    this.page = page;
  }

  async obterTextoPagina() {
    return await this.page.locator("body").innerText();
  }

  async localizarProduto(nomeProduto) {
    return this.page
      .getByText(nomeProduto, {
        exact: true,
      })
      .first();
  }

  async localizarContainerProduto(nomeProduto) {
    const produto = await this.localizarProduto(nomeProduto);

    return produto.locator("xpath=ancestor::*[self::div or self::article][1]");
  }

  async tentarAumentarQuantidade(nomeProduto) {
    const container = await this.localizarContainerProduto(nomeProduto);

    const botaoMais = container
      .getByRole("button", {
        name: /\+|aumentar|adicionar/i,
      })
      .last();

    /*
     * Se o sistema desabilitar o botão ao chegar em 5,
     * isso também representa comportamento válido.
     */

    if (await botaoMais.isDisabled().catch(() => false)) {
      return;
    }

    await botaoMais.click();
  }

  async obterQuantidadeProduto(nomeProduto) {
    const container = await this.localizarContainerProduto(nomeProduto);

    /*
     * Primeiro tenta encontrar um input numérico.
     */

    const inputQuantidade = container.locator('input[type="number"]');

    if ((await inputQuantidade.count()) > 0) {
      const valor = await inputQuantidade.first().inputValue();

      return Number(valor);
    }

    /*
     * Caso a quantidade seja apenas texto,
     * procura pelo número dentro do container.
     */

    const texto = await container.innerText();

    const numeros = texto.match(/\b\d+\b/g) || [];

    for (const numero of numeros) {
      const valor = Number(numero);

      if (valor >= 1 && valor <= 6) {
        return valor;
      }
    }

    throw new Error(
      `Não foi possível identificar a quantidade do produto "${nomeProduto}".`,
    );
  }
}

module.exports = CarrinhoPage;
