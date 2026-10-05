import { test as base } from "@playwright/test";

type TestDataForOrder = {
  email: string;
  password: string;
  productName: string;
};

export const customTest = base.extend<{ testDataForOrder: TestDataForOrder }>({
  testDataForOrder: async ({}, use) => {
    await use({
      email: "anshika@gmail.com",
      password: "Iamking@000",
      productName: "ZARA COAT 3",
    });
  },
});
