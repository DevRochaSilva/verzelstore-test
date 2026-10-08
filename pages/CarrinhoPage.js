class CarrinhoPage {
  constructor(page) {
    this.page = page;
  }

  async obterTextoPagina() {
    return await this.page
      .locator("body")
      .innerText();
  }

  async obterValorPorCampo(campo) {
    const texto = await this.obterTextoPagina();

    const linhas = texto
      .replace(/\u00A0/g, " ")
      .split(/\r?\n/)
      .map((linha) => linha.trim())
      .filter(Boolean);

    const campoEscapado = campo.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&",
    );

    const regexCampo = new RegExp(
      `^${campoEscapado}\\b`,
      "i",
    );

    const regexValor =
      /R\$\s*[0-9.]+,[0-9]{2}/;

    for (let i = 0; i < linhas.length; i++) {
      const linha = linhas[i];

      // Localiza exatamente o campo:
      // Subtotal, Frete ou Total
      if (!regexCampo.test(linha)) {
        continue;
      }

      // Caso:
      // Subtotal R$ 100,00
      const valorMesmaLinha =
        linha.match(regexValor);

      if (valorMesmaLinha) {
        return valorMesmaLinha[0]
          .replace(/\s+/g, " ")
          .trim();
      }

      // Caso:
      // Subtotal
      // R$ 100,00
      for (
        let proxima = i + 1;
        proxima <= i + 3 &&
        proxima < linhas.length;
        proxima++
      ) {
        const valor =
          linhas[proxima].match(regexValor);

        if (valor) {
          return valor[0]
            .replace(/\s+/g, " ")
            .trim();
        }

        // Se encontrar outro campo antes do valor,
        // interrompe a busca.
        if (
          /^(Subtotal|Frete|Total)\b/i.test(
            linhas[proxima],
          )
        ) {
          break;
        }
      }
    }

    throw new Error(
      `Não foi possível localizar o valor do campo "${campo}".\n` +
      `Conteúdo encontrado no carrinho:\n\n${texto}`,
    );
  }

  async obterSubtotal() {
    return await this.obterValorPorCampo(
      "Subtotal",
    );
  }

  async obterFrete() {
    return await this.obterValorPorCampo(
      "Frete",
    );
  }

  async obterTotal() {
    return await this.obterValorPorCampo(
      "Total",
    );
  }
}

module.exports = CarrinhoPage;