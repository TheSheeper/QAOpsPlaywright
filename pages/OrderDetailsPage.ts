import { Page } from "@playwright/test";
import {Locator} from "playwright-core"

export class OrderDetailsPage {
  private page: Page;
  private orderDetailsText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderDetailsText = page.locator('.col-text');
  }

  async getOrderDetailsText(){
    await this.orderDetailsText.waitFor()
    return await this.orderDetailsText.textContent()
  }

  
}
