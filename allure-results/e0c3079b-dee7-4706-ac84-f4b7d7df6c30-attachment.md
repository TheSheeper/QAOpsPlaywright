# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppPOM.spec.ts >> App test 2 for ADIDAS ORIGINAL
- Location: tests\ClientAppPOM.spec.ts:19:7

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
  1  | import { Page } from "@playwright/test";
  2  | import { Locator } from "playwright-core";
  3  | 
  4  | export class DashboardPage {
  5  |   private page: Page;
  6  |   private products: Locator;
  7  |   private productsText: Locator;
  8  |   private cartButton: Locator;
  9  |   private myOrdersButton: Locator;
  10 | 
  11 |   constructor(page: Page) {
  12 |     this.page = page;
  13 |     this.products = page.locator(".card-body");
  14 |     this.productsText = page.locator(".card-body b");
  15 |     this.cartButton = page.locator('[routerlink*="cart"]');
  16 |     this.myOrdersButton = page.locator('button[routerlink*="myorders"]');
  17 |   }
  18 | 
  19 |   async searchProductAndAddToCart(productName: string) {
  20 |     console.log(await this.productsText.allTextContents());
  21 | 
  22 |     const count = await this.products.count();
  23 |     console.log(count);
  24 |     for (let i = 0; i < count; ++i) {
  25 |       if (
  26 |         (await this.products.nth(i).locator("b").textContent()) === productName
  27 |       ) {
  28 |         await this.products.nth(i).locator("text= Add To Cart").click();
  29 |         break;
  30 |       }
  31 |     }
  32 |   }
  33 | 
  34 |   async navigateToCart() {
  35 |     await this.cartButton.click();
> 36 |     await this.page.locator("div li").first().waitFor();
     |                                               ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  37 |   }
  38 | 
  39 |   async navigateToMyOrders() {
  40 |     await this.myOrdersButton.click();
  41 |   }
  42 | }
  43 | 
```