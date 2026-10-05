import { test, expect, BrowserContext } from '@playwright/test';

let webContext: BrowserContext;
//Login UI
//Test, cart, order, orderdetails, history
test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('#userEmail').fill('anshika@gmail.com');
    await page.locator('#userPassword').fill('Iamking@000');
    await page.locator('[value="Login"]').click();
    await page.waitForLoadState('networkidle');
    
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});
    
    
})

test('Browser test', async () => {
    const page = await webContext.newPage();
    
    const productName = "ZARA COAT 3";
    const email = 'anshika@gmail.com';
    const titles = page.locator('.card-body b');
    const products = page.locator('.card-body');
    await page.goto('https://rahulshettyacademy.com/client/');
    
    await titles.first().waitFor();
    console.log(await titles.allTextContents());
    
    const count = await products.count();
    console.log(count);
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator('b').textContent() === productName) {
            await products.nth(i).locator('text= Add To Cart').click();
            break;
        }  
    }   
    await page.locator('[routerlink*="cart"]').click();
    await page.locator('div li').first().waitFor();

    const isProductVisible = await page.locator(`h3:has-text('${productName}')`).isVisible();
    expect(isProductVisible).toBeTruthy();

    await page.locator('text=Checkout').click();
    
    await page.locator('[placeholder*="Country"]').pressSequentially('ind', { delay: 100 });

    const dropdown = page.locator('.ta-results');
    await dropdown.waitFor();

    const optionsCount = await dropdown.locator('button').count();
    for(let i = 0; i < optionsCount; ++i) {
        const text: string | null = await dropdown.locator('button').nth(i).textContent();
        if(text ===" India") {
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }
    
    await expect(page.locator('.user__name [type="text"]').first()).toHaveText(email);

    await page.locator('.action__submit').click();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderId);

    await page.locator('button[routerlink*="myorders"]').click();

    await page.locator('tbody').waitFor();
    const rows = page.locator('tbody tr');
    const rowsCount = await rows.count();

    for(let i = 0; i < rowsCount; ++i) {
        const rowOrderId: string | null = await rows.nth(i).locator('th').textContent();
        if(rowOrderId == null) continue;
        if(orderId?.includes(rowOrderId)) {
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator('.col-text').textContent();
    console.log(orderIdDetails);
    console.log(orderId);
    if(orderIdDetails == null) {
        throw new Error('Order ID details not found');
    }
    expect(orderId?.includes(orderIdDetails!)).toEqual(true);
});