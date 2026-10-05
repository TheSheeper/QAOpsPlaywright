import { Page } from "@playwright/test";
import { Locator } from "playwright-core";

export class DashboardPage {
  private page: Page;
  private products: Locator;
  private productsText: Locator;
  private cartButton: Locator;
  private myOrdersButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.cartButton = page.locator('[routerlink*="cart"]');
    this.myOrdersButton = page.locator('button[routerlink*="myorders"]');
  }

  async searchProductAndAddToCart(productName: string) {
    console.log(await this.productsText.allTextContents());

    const count = await this.products.count();
    console.log(count);
    for (let i = 0; i < count; ++i) {
      if (
        (await this.products.nth(i).locator("b").textContent()) === productName
      ) {
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  }

  async navigateToCart() {
    await this.cartButton.click();
    await this.page.locator("div li").first().waitFor();
  }

  async navigateToMyOrders() {
    await this.myOrdersButton.click();
  }
}
