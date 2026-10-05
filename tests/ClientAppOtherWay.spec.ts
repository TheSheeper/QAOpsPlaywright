import { test, expect } from '@playwright/test';

test('Browser test', async ({ page }) => {
    const productName = "ZARA COAT 3";
    const email = 'anshika@gmail.com';
    const titles = page.locator('.card-body b');
    const products = page.locator('.card-body');

    await page.goto('https://rahulshettyacademy.com/client/');
    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByPlaceholder('enter your passsword').fill('Iamking@000');
    await page.getByRole('button', { name: 'Login' }).click();

    // await page.waitForLoadState('networkidle');
    await titles.first().waitFor();
    console.log(await titles.allTextContents());

    await products.filter({ hasText: productName }).getByRole('button', { name: 'Add To Cart' }).click();
 
    await page.getByRole("listitem").getByRole('button', { name: 'Cart' }).click();

    await page.locator('div li').first().waitFor();

    expect(await page.getByText(productName).isVisible()).toBeTruthy();

    await page.getByRole('button', { name: 'Checkout' }).click();
    
    await page.getByPlaceholder('Select Country').pressSequentially('ind', { delay: 100 });

    const dropdown = page.locator('.ta-results');
    await dropdown.waitFor();

    await page.getByRole('button', { name: 'India' }).nth(1).click();
    
    await expect(page.locator('.user__name [type="text"]').first()).toHaveText(email);

    await page.getByText('PLACE ORDER').click();

    await expect(page.getByText("Thank you for the order")).toBeVisible();
});