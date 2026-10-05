import { Page } from "@playwright/test";
import {Locator} from "playwright-core"

export class MyOrdersPage {
  private tableBody: Locator;

  constructor(page: Page) {
    this.tableBody = page.locator('tbody tr');
  }

  async clickOrderDetails(orderId: string){
    await this.tableBody.first().waitFor()
    const rows = this.tableBody;
    const rowsCount = await rows.count();

    for(let i = 0; i < rowsCount; ++i) {
        const rowOrderId: string | null = await rows.nth(i).locator('th').textContent();
        if(rowOrderId == null) continue;
        if(orderId?.includes(rowOrderId)) {
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }
  }

  
}
