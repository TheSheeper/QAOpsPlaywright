import test, { expect, Page } from "@playwright/test";
import { BASE_URL, USER_DATA } from "../utils/constants";

const loginWithCredentials = async (page: Page)=>{
    const { email, password } = USER_DATA;
    await page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder("you@email.com").fill(email)
    await page.getByLabel("password").fill(password)
    await page.locator("#login-btn").click()
    await expect(page.getByRole("link", {name: "Browse Events"})).toBeVisible()
}

test("Login Test", async ({ page }) => {
    await loginWithCredentials(page)
    
    
});
