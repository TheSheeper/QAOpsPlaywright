import {test as base, request} from "@playwright/test";
import { APIUtils } from "./APIUtils";
const loginPayload = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"}
const orderPayload = {orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }]}

export const customTest = base.extend<{authenticatedPage: any, createOrder: any, testDataForOrder: any}>({
  authenticatedPage: async ({ browser }: any, use: any) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator('[value="Login"]').click();

    await page.waitForLoadState('networkidle');
    await use(page);
    await context.close();
  },
  createOrder: async({}, use: any) =>{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    const response = await apiUtils.createOrder(orderPayload);
    await use(response);
    await apiContext.dispose();
  },
  testDataForOrder: {
    productName: "adidas original",
  }
});
