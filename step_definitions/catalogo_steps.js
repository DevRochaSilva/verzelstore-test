const {chromium} = require('playwright');

(async() => {
    const browser = await chromium.launch({headless:false})
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://verzel-store.qa-test-verzel-store.workers.dev/#/')
    await page.screenshot({ path: './logs/screenshots/verzel.png' })
    await browser.close()
}) ()