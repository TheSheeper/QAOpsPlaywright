import test, { expect } from "@playwright/test";

// test.describe.configure({mode: "parallel"})
test.describe.configure({mode: "serial"})

test("@Web Popup validations", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click()
    await expect(page.locator("#displayed-text")).toBeHidden();

    page.on("dialog", dialog=>dialog.accept())
    await page.getByRole("button", {name: "Confirm"}).click()
    
    await page.pause()
    await page.getByRole("button", {name: "Mouse Hover"}).click()

    const framesPage = page.frameLocator("#courses-iframe")
    await framesPage.getByRole("link", {name: "NEW Learning paths"}).click()
    await expect(framesPage.getByRole("heading", {name: "LEARNING PATHS"})).toBeVisible()
})

test("Screenshots & visual comparison", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: "element.png"});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: "screenshot.png", fullPage: true});
    await expect(page.locator("#displayed-text")).toBeHidden();
})

test("Visual comparison", async({page})=>{
    await page.goto("https://www.rediff.com/");
    expect(await page.screenshot()).toMatchSnapshot("landing.png");
})