import { test, expect, request } from "@playwright/test";
import { APIUtils } from "../utils/APIUtils";

const loginPayload = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};
const orderPayload = {
  orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }],
};
const fakePayload = {
  data: [],
  message: "No Orders",
};

let orderId: string;
let token: string;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  const result = await apiUtils.createOrder(orderPayload);
  orderId = result.orderId;
  token = result.token;
});

test("Client App login", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client/");

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const response = await page.request.fetch(route.request());
      const body = JSON.stringify(fakePayload);

      route.fulfill({
        response,
        body,
      });
    },
  );

  await page.locator('button[routerlink*="myorders"]').click();
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
  );

  console.log(await page.locator(".mt-4").textContent());
});
