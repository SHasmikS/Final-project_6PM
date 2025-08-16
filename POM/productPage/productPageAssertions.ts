import { expect, Page } from '@playwright/test';
import { productPageLocators } from './productPageLocators';

export class ProductPageAssertions {
  constructor(private page: Page) {}

  async expectLittleKidLabelVisible() {
    await expect(this.page.locator(productPageLocators.littleKidLabel)).toBeVisible();
  }

  async expectBigKidLabelVisible() {
    await expect(this.page.locator(productPageLocators.bigKidLabel)).toBeVisible();
  }

  async expectAddToCartButtonVisible() {
    await expect(this.page.locator(productPageLocators.addToCartButton)).toBeVisible();
  }

  async expectRedirectedToCartPage() {
    await expect(this.page).toHaveURL(/\/cart/);
  }

  // Optional: after adding to cart, confirm success message or modal
  async expectSuccessNotification(message: string) {
    await expect(this.page.locator(`text=${message}`)).toBeVisible();
  }
}