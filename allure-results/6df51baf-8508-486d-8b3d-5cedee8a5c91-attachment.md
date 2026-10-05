# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppOtherWay.spec.ts >> Browser test
- Location: tests\ClientAppOtherWay.spec.ts:3:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('div li').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e11] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [aria-hidden] [ref=e24]: 
          - text: Sign Out
  - generic [ref=e25]:
    - generic [ref=e26]:
      - heading "My Cart" [level=1] [ref=e27]
      - button "Continue Shopping❯" [ref=e28] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e30]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('Browser test', async ({ page }) => {
  4  |     const productName = "ZARA COAT 3";
  5  |     const email = 'anshika@gmail.com';
  6  |     const titles = page.locator('.card-body b');
  7  |     const products = page.locator('.card-body');
  8  | 
  9  |     await page.goto('https://rahulshettyacademy.com/client/');
  10 |     await page.getByPlaceholder('email@example.com').fill(email);
  11 |     await page.getByPlaceholder('enter your passsword').fill('Iamking@000');
  12 |     await page.getByRole('button', { name: 'Login' }).click();
  13 | 
  14 |     // await page.waitForLoadState('networkidle');
  15 |     await titles.first().waitFor();
  16 |     console.log(await titles.allTextContents());
  17 | 
  18 |     await products.filter({ hasText: productName }).getByRole('button', { name: 'Add To Cart' }).click();
  19 |  
  20 |     await page.getByRole("listitem").getByRole('button', { name: 'Cart' }).click();
  21 | 
> 22 |     await page.locator('div li').first().waitFor();
     |                                          ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  23 | 
  24 |     expect(await page.getByText(productName).isVisible()).toBeTruthy();
  25 | 
  26 |     await page.getByRole('button', { name: 'Checkout' }).click();
  27 |     
  28 |     await page.getByPlaceholder('Select Country').pressSequentially('ind', { delay: 100 });
  29 | 
  30 |     const dropdown = page.locator('.ta-results');
  31 |     await dropdown.waitFor();
  32 | 
  33 |     await page.getByRole('button', { name: 'India' }).nth(1).click();
  34 |     
  35 |     await expect(page.locator('.user__name [type="text"]').first()).toHaveText(email);
  36 | 
  37 |     await page.getByText('PLACE ORDER').click();
  38 | 
  39 |     await expect(page.getByText("Thank you for the order")).toBeVisible();
  40 | });
```