import { expect, test } from "@playwright/test";
import { writeExcelTest } from "../utils/ExcelJS";
test("Validate Excel functionality", async ({ page }) => {
  const downloadPath = "/downloads/download.xlsx";
  const searchText = "Banana";
  const replaceValue = "Republic";

  await page.goto("https://rahulshettyacademy.com/upload-download-test/");

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "Download" }).click(),
  ]);

  await download.saveAs(downloadPath);

  await writeExcelTest(searchText, replaceValue, downloadPath);

  await page.locator("#fileinput").click();
  await page.locator("#fileinput").setInputFiles(downloadPath);
  
  const filteredRow = page.getByRole("row").filter({ hasText: replaceValue });
  await expect(filteredRow.locator("#cell-4-undefined")).toContainText("69");

  await expect(page.getByText(replaceValue)).toBeVisible();
});
