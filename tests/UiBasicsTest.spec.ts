import { test, expect } from '@playwright/test';

test('Playwright test', async ({ page }) => {
    // const context = await browser.newContext();
    // const page = await context.newPage();
    // await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const usernameInput = page.locator('#username');
    const passwordInput = page.locator('[type="password"]');
    const signInButton = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');

    // page.route('**/*.css', route => route.abort());
    // page.route('**/*.{png,jpg,jpeg}', route => route.abort());
    page.on("request", request => {
        console.log(request.url())
    })
    page.on("response", response => 
        console.log(response.url(), response.status())
    )
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    await usernameInput.fill('rahulshettyacademy');
    await passwordInput.fill('Learning');
    await signInButton.click();
    
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect username/password.');
    
    await usernameInput.fill('rahulshettyacademy');
    await passwordInput.fill('Learning@830$3mK2');
    await signInButton.click();
    
    console.log(await cardTitles.nth(0).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    
    await expect(cardTitles).toHaveCount(4);
    

});

test('Google test page', async ({ page }) => {
    await page.goto('https://google.com');
    console.log(await page.title());
    await expect(page).toHaveTitle(/Google/);
});

test("UI Controls", async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const dropdown = page.locator('select.form-control');
    const documentLink = page.locator('[href="https://rahulshettyacademy.com/documents-request"]');
    
    await dropdown.selectOption('consult');
    
    await page.locator('.radiotextsty').last().click();
    await expect(page.locator('#okayBtn')).toBeVisible();
    await page.locator('#okayBtn').click();

    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    await expect(page.locator('.radiotextsty').first()).not.toBeChecked();

    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy(); 
    
    await expect(documentLink).toHaveAttribute('class', 'blinkingText');

})

test("Child windows handler", async ({ page, context }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator('[href*="documents-request"]');
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ]);
    await newPage.waitForLoadState();
    const text = await newPage.locator('.red').textContent();
    const arrayText = text!.split('@');
    const domain = arrayText[1].split(' ')[0];
    console.log(domain);

    await page.locator('#username').fill(domain);
    console.log(await page.locator('#username').inputValue());
});