import { Locator, Page } from '@playwright/test';
import { productPageLocators } from './productPageLocators';
import { BasePage } from "../basePage";

export class ProductPage extends BasePage {
  readonly littleKidLabel: Locator;
  readonly bigKidLabel: Locator;
  readonly addToCartButton: Locator;
  readonly sizeButton: Locator;
  readonly cartModalTitle: Locator;
  readonly closeButton: Locator;
  readonly removeItemButton: Locator;
  readonly productImage: Locator;
  readonly productTitle: Locator;
  readonly quantitySelect: Locator;
  readonly subtotalPrice: Locator;
  readonly viewBagLink: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.littleKidLabel = page.locator(productPageLocators.littleKidLabel);
    this.bigKidLabel = page.locator(productPageLocators.bigKidLabel);
    this.addToCartButton = page.locator(productPageLocators.addToCartButton);
    this.sizeButton = page.locator(productPageLocators.sizeButton);
    this.cartModalTitle = page.locator(productPageLocators.cartModalTitle);
    this.closeButton = page.locator(productPageLocators.closeButton);
    this.removeItemButton = page.locator(productPageLocators.removeItemButton);
    this.productImage = page.locator(productPageLocators.productImage);
    this.productTitle = page.locator(productPageLocators.productTitle);
    this.quantitySelect = page.locator(productPageLocators.quantitySelect);
    this.subtotalPrice = page.locator(productPageLocators.subtotalPrice);
    this.viewBagLink = page.locator(productPageLocators.viewBagLink);
    this.checkoutButton = page.locator(productPageLocators.checkoutButton);
  }

  async selectLittleKid() {
    await this.littleKidLabel.click();
  }

  async selectBigKid() {
    await this.bigKidLabel.click();
  }

  async selectSize(sizeText: string = "11") {
    await this.page.locator(`label:has-text("${sizeText}")`).click();
  }

  async clickAddToCart() {
    await this.addToCartButton.click();
  }

  async waitForCartModal() {
    await this.cartModalTitle.waitFor({ state: 'visible' });
  }

  async closeCartModal() {
    await this.closeButton.click();
  }

  async removeItem() {
    await this.removeItemButton.click();
  }

  async selectQuantity(quantity: string) {
    await this.quantitySelect.selectOption(quantity);
  }

  async goToViewBag() {
    await this.viewBagLink.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}