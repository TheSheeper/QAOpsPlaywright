import test, { expect } from "@playwright/test";
import { customTest } from "../utils/fixtures";

customTest("Fixtures demo", async ({ authenticatedPage, createOrder, testDataForOrder }) => {
  await authenticatedPage;
  const response = await createOrder;
  await authenticatedPage.locator("button[routerlink*='myorders']").click();
  await authenticatedPage.locator("tbody").waitFor();

  await expect(authenticatedPage.getByText(response.orderId)).toBeVisible();
  console.log(testDataForOrder.productName);
});
