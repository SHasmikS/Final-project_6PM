import { expect, Page } from '@playwright/test';
import { productPageLocators } from './productPageLocators';
import { ProductPage } from './productPagePOM';

export class ProductPageAssertions {
  private productPage: ProductPage;
  private page: Page;

  constructor(page: Page) {
    this.page = page;
    this.productPage = new ProductPage(page);
  }


  async expectSubtotalEqualToItemsSum() {
    const calculated = await this.productPage.calculateSubtotalOfTwoItems();
    const displayed = await this.productPage.getDisplayedSubtotal();
    expect(displayed).toBeCloseTo(calculated);
  }

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

  async expectSignInToFavoritesModalHidden() {
    await expect(this.page.locator(productPageLocators.signInToFavoritesModal)).toBeHidden();
  }

  async expectCartModalContainsProduct(productName: string) {
    const cartModalTitle = this.page.locator(productPageLocators.cartModalTitle);
    await expect(cartModalTitle).toBeVisible();
    await expect(cartModalTitle).toContainText('Added to Bag');

  }

  async expectEmptyCartMessageVisible() {
    await expect(this.page.locator(productPageLocators.cartEmptyMessage)).toBeVisible();
  }
}
