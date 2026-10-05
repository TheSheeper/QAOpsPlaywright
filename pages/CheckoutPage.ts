import { Page } from "@playwright/test";
import { Locator } from "playwright-core";

export class CheckoutPage {
  private page: Page;
  private countryTextbox: Locator;
  private dropdown: Locator;
  private userNameText: Locator;
  private submitButton: Locator;
  private confirmationText: Locator;
  private orderIdText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.countryTextbox = page.locator('[placeholder*="Country"]');
    this.dropdown = page.locator(".ta-results");
    this.userNameText = page.locator('.user__name [type="text"]').first();
    this.submitButton = page.locator(".action__submit");
    this.confirmationText = page.locator(".hero-primary");
    this.orderIdText = page.locator(".em-spacer-1 .ng-star-inserted");
  }

  async selectCountry(country: string) {
    await this.countryTextbox.pressSequentially(country, { delay: 100 });

    await this.dropdown.waitFor();

    const optionsCount = await this.dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
      const text: string | null = await this.dropdown
        .locator("button")
        .nth(i)
        .textContent();
      if (text === " India") {
        await this.dropdown.locator("button").nth(i).click();
        break;
      }
    }
  }

  async getUsernameText(): Promise<string | null> {
    return await this.userNameText.textContent();
  }

  async submitAndGetOrderId(): Promise<string | null> {
    await this.submitButton.click();
    
    await this.orderIdText.first().waitFor()
    return await this.orderIdText.first().textContent();
  }
}
