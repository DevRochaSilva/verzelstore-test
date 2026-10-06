const {chromium} = require('playwright');

(async() => {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://verzel-store.qa-test-verzel-store.workers.dev/')

    // HTML attribute - class
     const signIn = await page.$('.btn')

    // CSS selector
     const signIn = await page.$('css=button')
     const signIn = await page.$('button')
    
    // XPath selector
    const signIn = await page.$('xpath=//button[@type = "submit"]')
    const signIn = await page.$('//button[@type = "submit"]')

    // Text content
    const signIn = await page.$('text="Sign in"')
    const signIn = await page.$('text=Sign in')
    const signIn = await page.$('"Sign in"')
    const signIn = await page.$("'Sign in'")

    // using Element handle
    const form = await page.$('css=form')
    const signIn = await form.$("'Sign in'")

    const signIn = await page.$("css=form >> 'Sign in'")
    const signIn = await page.$("form >> 'Sign in'")
    await signIn.click()


    // Identifying ALL the elements
    const input = await page.$$('.form-control')
    await input[0].click()
    await input[1].click()

    await browser.close()
}) ()