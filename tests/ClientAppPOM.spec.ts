import { POManager } from "./../pages/POManager";
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { MyOrdersPage } from "../pages/MyOrdersPage";
import { OrderDetailsPage } from "../pages/OrderDetailsPage";
import dataSet from "../dataprovider/placeOrderData.json";
import { customTest } from "../utils/test-base";

interface DataSet {
  email: string;
  password: string;
  productName: string;
}

for (const [index, data] of (dataSet as DataSet[]).entries()) {
  test(`App test ${index + 1} for ${data.productName}`, async ({ page }) => {
    // const poManager = new POManager(page);
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const myOrdersPage = new MyOrdersPage(page);
    const orderDetailsPage = new OrderDetailsPage(page);

    const email = data.email;
    const password = data.password;
    const productName = data.productName;

    await loginPage.goTo();

    await loginPage.login(email, password);

    await dashboardPage.searchProductAndAddToCart(productName);
    await dashboardPage.navigateToCart();

    expect(await cartPage.isProductVisible(productName)).toBeTruthy();

    await cartPage.goToCheckout();

    await checkoutPage.selectCountry("India");

    expect(await checkoutPage.getUsernameText()).toEqual(email);

    const orderId = await checkoutPage.submitAndGetOrderId();
    expect(orderId).not.toBeNull();

    await dashboardPage.navigateToMyOrders();

    await myOrdersPage.clickOrderDetails(orderId!);

    const orderIdDetails = await orderDetailsPage.getOrderDetailsText();
    if (orderIdDetails == null) {
      throw new Error("Order ID details not found");
    }
    expect(orderId?.includes(orderIdDetails!)).toEqual(true);
  });
}

customTest(`App test with custom parametized text`, async ({ page, testDataForOrder }) => {
    // const poManager = new POManager(page);
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const myOrdersPage = new MyOrdersPage(page);
    const orderDetailsPage = new OrderDetailsPage(page);

    const email = testDataForOrder.email;
    const password = testDataForOrder.password;
    const productName = testDataForOrder.productName;

    await loginPage.goTo();

    await loginPage.login(email, password);

    await dashboardPage.searchProductAndAddToCart(productName);
    await dashboardPage.navigateToCart();

    expect(await cartPage.isProductVisible(productName)).toBeTruthy();

    await cartPage.goToCheckout();

    await checkoutPage.selectCountry("India");

    expect(await checkoutPage.getUsernameText()).toEqual(email);

    const orderId = await checkoutPage.submitAndGetOrderId();
    expect(orderId).not.toBeNull();

    await dashboardPage.navigateToMyOrders();

    await myOrdersPage.clickOrderDetails(orderId!);

    const orderIdDetails = await orderDetailsPage.getOrderDetailsText();
    if (orderIdDetails == null) {
      throw new Error("Order ID details not found");
    }
    expect(orderId?.includes(orderIdDetails!)).toEqual(false);
  });