# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppPOM.spec.ts >> App test with custom parametized text
- Location: tests\ClientAppPOM.spec.ts:62:11

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

Expected: false
Received: true
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
  - generic [ref=e28]:
    - paragraph [ref=e30]: Thank you for Shopping With Us
    - generic [ref=e31]:
      - generic [ref=e32]: order summary
      - generic [ref=e34]:
        - text: Order Id
        - generic [ref=e35]: 6ac3ca2b2be7a4bc2b8bf31a
      - generic [ref=e37]:
        - generic [ref=e39]:
          - generic [ref=e40]: Billing Address
          - paragraph [ref=e41]: anshika@gmail.com
          - paragraph [ref=e42]: Country - India
        - generic [ref=e44]:
          - generic [ref=e45]: Delivery Address
          - paragraph [ref=e46]: anshika@gmail.com
          - paragraph [ref=e47]: Country - India
      - generic [ref=e48]: Product Ordered
      - generic [ref=e56]:
        - generic [ref=e57]: ZARA COAT 3
        - generic [ref=e58]:
          - generic [ref=e59]: by ECOM
          - generic [ref=e60]: $ 11500
      - generic [ref=e61]: View Orders
```

# Test source

```ts
  1   | import { POManager } from "./../pages/POManager";
  2   | import { test, expect } from "@playwright/test";
  3   | import { LoginPage } from "../pages/LoginPage";
  4   | import { DashboardPage } from "../pages/DashboardPage";
  5   | import { CartPage } from "../pages/CartPage";
  6   | import { CheckoutPage } from "../pages/CheckoutPage";
  7   | import { MyOrdersPage } from "../pages/MyOrdersPage";
  8   | import { OrderDetailsPage } from "../pages/OrderDetailsPage";
  9   | import dataSet from "../dataprovider/placeOrderData.json";
  10  | import { customTest } from "../utils/test-base";
  11  | 
  12  | interface DataSet {
  13  |   email: string;
  14  |   password: string;
  15  |   productName: string;
  16  | }
  17  | 
  18  | for (const [index, data] of (dataSet as DataSet[]).entries()) {
  19  |   test(`App test ${index + 1} for ${data.productName}`, async ({ page }) => {
  20  |     // const poManager = new POManager(page);
  21  |     const loginPage = new LoginPage(page);
  22  |     const dashboardPage = new DashboardPage(page);
  23  |     const cartPage = new CartPage(page);
  24  |     const checkoutPage = new CheckoutPage(page);
  25  |     const myOrdersPage = new MyOrdersPage(page);
  26  |     const orderDetailsPage = new OrderDetailsPage(page);
  27  | 
  28  |     const email = data.email;
  29  |     const password = data.password;
  30  |     const productName = data.productName;
  31  | 
  32  |     await loginPage.goTo();
  33  | 
  34  |     await loginPage.login(email, password);
  35  | 
  36  |     await dashboardPage.searchProductAndAddToCart(productName);
  37  |     await dashboardPage.navigateToCart();
  38  | 
  39  |     expect(await cartPage.isProductVisible(productName)).toBeTruthy();
  40  | 
  41  |     await cartPage.goToCheckout();
  42  | 
  43  |     await checkoutPage.selectCountry("India");
  44  | 
  45  |     expect(await checkoutPage.getUsernameText()).toEqual(email);
  46  | 
  47  |     const orderId = await checkoutPage.submitAndGetOrderId();
  48  |     expect(orderId).not.toBeNull();
  49  | 
  50  |     await dashboardPage.navigateToMyOrders();
  51  | 
  52  |     await myOrdersPage.clickOrderDetails(orderId!);
  53  | 
  54  |     const orderIdDetails = await orderDetailsPage.getOrderDetailsText();
  55  |     if (orderIdDetails == null) {
  56  |       throw new Error("Order ID details not found");
  57  |     }
  58  |     expect(orderId?.includes(orderIdDetails!)).toEqual(true);
  59  |   });
  60  | }
  61  | 
  62  | customTest(`App test with custom parametized text`, async ({ page, testDataForOrder }) => {
  63  |     // const poManager = new POManager(page);
  64  |     const loginPage = new LoginPage(page);
  65  |     const dashboardPage = new DashboardPage(page);
  66  |     const cartPage = new CartPage(page);
  67  |     const checkoutPage = new CheckoutPage(page);
  68  |     const myOrdersPage = new MyOrdersPage(page);
  69  |     const orderDetailsPage = new OrderDetailsPage(page);
  70  | 
  71  |     const email = testDataForOrder.email;
  72  |     const password = testDataForOrder.password;
  73  |     const productName = testDataForOrder.productName;
  74  | 
  75  |     await loginPage.goTo();
  76  | 
  77  |     await loginPage.login(email, password);
  78  | 
  79  |     await dashboardPage.searchProductAndAddToCart(productName);
  80  |     await dashboardPage.navigateToCart();
  81  | 
  82  |     expect(await cartPage.isProductVisible(productName)).toBeTruthy();
  83  | 
  84  |     await cartPage.goToCheckout();
  85  | 
  86  |     await checkoutPage.selectCountry("India");
  87  | 
  88  |     expect(await checkoutPage.getUsernameText()).toEqual(email);
  89  | 
  90  |     const orderId = await checkoutPage.submitAndGetOrderId();
  91  |     expect(orderId).not.toBeNull();
  92  | 
  93  |     await dashboardPage.navigateToMyOrders();
  94  | 
  95  |     await myOrdersPage.clickOrderDetails(orderId!);
  96  | 
  97  |     const orderIdDetails = await orderDetailsPage.getOrderDetailsText();
  98  |     if (orderIdDetails == null) {
  99  |       throw new Error("Order ID details not found");
  100 |     }
> 101 |     expect(orderId?.includes(orderIdDetails!)).toEqual(false);
      |                                                ^ Error: expect(received).toEqual(expected) // deep equality
  102 |   });
```