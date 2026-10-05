import test, { expect } from "@playwright/test";

test("@Web Security test request intercept", async({page})=>{
    //Login and reach orders page
    const email = 'anshika@gmail.com';
    const titles = page.locator('.card-body b');

    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill('Iamking@000');
    await page.locator('[value="Login"]').click();

    await titles.first().waitFor();
    await page.locator('button[routerlink*="myorders"]').click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", route=>{
        route.continue({
            url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6"
        })
    })
    await page.getByRole('button', { name: 'View' }).first().click();
    await expect(page.getByText('You are not authorize to view')).toBeVisible();
})

//Other network test
