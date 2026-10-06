class CarrinhoPage {

    constructor(page) {
        this.page = page;
    }

    async aplicarCupom(cupom) {

        const campoCupom = this.page.getByPlaceholder(
            /cupom/i
        );

        await campoCupom.fill(cupom);

        await this.page.getByRole('button', {
            name: /aplicar/i
        }).click();
    }

    async removerCupom() {
        await this.page.getByRole('button', {
            name: /remover/i
        }).click();
    }

    async obterTextoPagina() {
        return await this.page.locator('body').innerText();
    }

    async deveConter(texto) {
        const body = this.page.locator('body');

        await body
            .getByText(texto, { exact: false })
            .waitFor({
                state: 'visible'
            });
    }

    async tentarAumentarQuantidade(nomeProduto) {

        const produto = this.page
            .getByText(nomeProduto, { exact: true })
            .first();

        const container = produto.locator(
            'xpath=ancestor::*[self::div or self::article][1]'
        );

        const botaoMais = container.getByRole('button', {
            name: /\+|aumentar/i
        });

        await botaoMais.click();
    }
}

module.exports = CarrinhoPage;