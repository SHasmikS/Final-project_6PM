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

  async expectCartModalTitleVisible() {
    await expect(this.page.locator(productPageLocators.cartModalTitle)).toBeVisible();
  }
}