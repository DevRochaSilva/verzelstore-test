class HomePage {

    constructor(page) {

        this.page = page;

        this.url =
            'https://verzel-store.qa-test-verzel-store.workers.dev/';
    }

    async acessar() {

        await this.page.goto(
            this.url,
            {
                waitUntil: 'networkidle'
            }
        );
    }

    async adicionarProduto(
        nomeProduto,
        quantidade = 1
    ) {

        const produto =
            this.page
                .getByText(
                    nomeProduto,
                    {
                        exact: true
                    }
                )
                .first();

        await produto.scrollIntoViewIfNeeded();

        const card =
            produto.locator(
                'xpath=ancestor::*[self::div or self::article][1]'
            );

        const botaoAdicionar =
            card
                .getByRole('button')
                .first();

        for (
            let i = 0;
            i < quantidade;
            i++
        ) {

            await botaoAdicionar.click();
        }
    }

    async acessarCarrinho() {

        await this.page
            .getByRole(
                'link',
                {
                    name: /carrinho/i
                }
            )
            .click();
    }
}

module.exports = HomePage;