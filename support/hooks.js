const { Before, After, Status } = require("@cucumber/cucumber");

const { chromium, request } = require("playwright");

const fs = require("fs");
const path = require("path");

const BASE_URL = "https://verzel-store.qa-test-verzel-store.workers.dev";

const screenshotsDir = path.join(process.cwd(), "logs", "screenshots");

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, {
    recursive: true,
  });
}

function proximoNumeroScreenshot() {
  const arquivos = fs.readdirSync(screenshotsDir);

  const numeros = arquivos.map((arquivo) => {
    const match = arquivo.match(/verzel_(\d+)_FAILED\.png/);

    return match ? parseInt(match[1], 10) : 0;
  });

  const maiorNumero = numeros.length ? Math.max(...numeros) : 0;

  return String(maiorNumero + 1).padStart(3, "0");
}

Before(async function () {
  // Browser para UI
  this.browser = await chromium.launch({
    headless: false,
  });

  this.context = await this.browser.newContext();

  this.page = await this.context.newPage();

  // Contexto HTTP para API
  this.request = await request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: {
      "Content-Type": "application/json",
    },
  });
});

After(async function (scenario) {
  const tags = scenario.pickle.tags.map((tag) => tag.name);

  const isUI = tags.includes("@ui");

  const isAPI = tags.includes("@api");

  const falhou = scenario.result?.status === Status.FAILED;

  // Screenshot apenas de falhas de UI
  if (falhou && isUI && this.page) {
    const numero = proximoNumeroScreenshot();

    const screenshotPath = path.join(
      screenshotsDir,
      `verzel_${numero}_FAILED.png`,
    );

    const screenshot = await this.page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });

    await this.attach(screenshot, "image/png");

    console.log(`\nScreenshot da falha: verzel_${numero}_FAILED.png`);
  }

  // JSON como evidência para falha de API
  if (falhou && isAPI && this.responseBody) {
    await this.attach(
      JSON.stringify(this.responseBody, null, 2),
      "application/json",
    );
  }

  if (this.request) {
    await this.request.dispose();
  }

  if (this.page) {
    await this.page.close();
  }

  if (this.context) {
    await this.context.close();
  }

  if (this.browser) {
    await this.browser.close();
  }
});
