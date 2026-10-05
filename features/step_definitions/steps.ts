import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";

Given(
  "A login to Ecommerce application with {string} and {string}",
  { timeout: 10 * 1000 },
  async function (email, password) {
    await this.loginPage.goTo();

    await this.loginPage.login(email, password);
  },
);

When("Add {string} to cart", async function (productName) {
  await this.dashboardPage.searchProductAndAddToCart(productName);
  await this.dashboardPage.navigateToCart();
});

Then("Verify {string} is displayed in the Cart", async function (productName) {
  expect(await this.cartPage.isProductVisible(productName)).toBeTruthy();
});

When("Enter valid details and Place the Order", async function () {
  await this.cartPage.goToCheckout();

  await this.checkoutPage.selectCountry("India");

  const orderId = await this.checkoutPage.submitAndGetOrderId();
  expect(orderId).not.toBeNull();

  await this.dashboardPage.navigateToMyOrders();
});

Then("Verify order is present in the OrderHistory", async function () {
  await this.myOrdersPage.clickOrderDetails(this.orderId);

  const orderIdDetails = await this.orderDetailsPage.getOrderDetailsText();
  if (orderIdDetails == null) {
    throw new Error("Order ID details not found");
  }
  expect(this.orderId?.includes(orderIdDetails)).toEqual(true);
});

Given(
  "A login to Ecommerce2 application with {string} and {string}",
  async function (username, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await this.page.locator("#username").fill(username);
    await this.page.locator('[type="password"]').fill(password);
    await this.page.locator("#signInBtn").click();
  },
);

Then("Verify Error message is displayed", async function () {
  await expect(this.page.locator('[style*="block"]')).toContainText(
    "Incorrect username/password.",
  );
});
