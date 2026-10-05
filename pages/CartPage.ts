import { Page } from "@playwright/test";
import {Locator} from "playwright-core"

export class CartPage {
  private page: Page;
  private checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator("text=Checkout");
  }

  async isProductVisible(productName: string): Promise<boolean> {
    return await this.page.locator(`h3:has-text('${productName}')`).isVisible();
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }
}
