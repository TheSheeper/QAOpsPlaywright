import { test, expect, request } from "@playwright/test";
import { APIUtils } from "../utils/APIUtils";

const loginPayload = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};
const orderPayload = {
  orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }],
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

  await page.locator('button[routerlink*="myorders"]').click();

  await page.locator("tbody").waitFor();
  const rows = page.locator("tbody tr");
  const rowsCount = await rows.count();

  for (let i = 0; i < rowsCount; ++i) {
    const rowOrderId: string | null = await rows
      .nth(i)
      .locator("th")
      .textContent();
    if (rowOrderId == null) continue;
    if (orderId?.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  console.log(orderIdDetails);
  console.log(orderId);
  if (orderIdDetails == null) {
    throw new Error("Order ID details not found");
  }
  expect(orderId?.includes(orderIdDetails!)).toEqual(true);
});

//Verify if order created is showing in history page
