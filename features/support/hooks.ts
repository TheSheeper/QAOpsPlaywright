import { AfterStep, Before, Status } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { DashboardPage } from "../../pages/DashboardPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";
import { MyOrdersPage } from "../../pages/MyOrdersPage";
import { OrderDetailsPage } from "../../pages/OrderDetailsPage";

Before(async function () {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  this.page = await context.newPage();
  this.loginPage = new LoginPage(this.page);
  this.dashboardPage = new DashboardPage(this.page);
  this.cartPage = new CartPage(this.page);
  this.checkoutPage = new CheckoutPage(this.page);
  this.myOrdersPage = new MyOrdersPage(this.page);
  this.orderDetailsPage = new OrderDetailsPage(this.page);
  this.orderId = "";
});

AfterStep(async function({result}) {
    if(result.status === Status.FAILED){
        await this.page.screenshot({path: "screenshots/screenshot1.png"})
    }
})