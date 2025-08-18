import { Locator, Page, expect } from '@playwright/test';
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
  readonly saveToFavoritesButton: Locator;
  readonly signInToFavoritesModal: Locator;
  readonly signInToFavoritesCloseButton: Locator;
  readonly cartEmptyMessage: Locator;
  readonly sizeLable: Locator;
  readonly littleKidSizeButton: Locator;
  readonly bigKidLabel2: Locator;
  readonly subtotalValue: Locator;

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
    this.saveToFavoritesButton = page.locator(productPageLocators.saveToFavoritesButton);
    this.signInToFavoritesModal = page.locator(productPageLocators.signInToFavoritesModal);
    this.signInToFavoritesCloseButton = page.locator(productPageLocators.signInToFavoritesCloseButton);
    this.cartEmptyMessage = page.locator(productPageLocators.cartEmptyMessage);
    this.sizeLable = page.locator(productPageLocators.sizeLable);
    this.littleKidSizeButton = page.locator(productPageLocators.littleKidSizeButton);
    this.bigKidLabel2 = page.locator(productPageLocators.bigKidLabel2);
    
    this.subtotalValue = page.locator(productPageLocators.subtotalValue).nth(1);
  }
  
  async selectLittleKid() {
    await this.littleKidLabel.click();
  }

  async selectBigKid() {
    await this.bigKidLabel.click();
  }
  async selectBigKid2 (){
    await this.bigKidLabel2.click ();
  }
  async selectSize(size: string) {
  await this.sizeButton.click();
}

async selectLittleKidSize (size: string) {
  await this.littleKidSizeButton.click();
}

async selectSizeLable () {
  await this.sizeLable.click();
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

  async goToViewBag() {
    await this.viewBagLink.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async saveToFavorites() {
    await this.saveToFavoritesButton.click();
  }

  async waitForSignInToFavoritesModal() {
    await expect(this.signInToFavoritesModal).toBeVisible();
  }

  async closeSignInToFavoritesModal() {
    await this.signInToFavoritesCloseButton.click();
  }

  getProductTitleText() {
    return this.productTitle.first().textContent();
  }

  async getCartProductTitle() {
    await this.cartModalTitle.waitFor({ state: 'visible' });
    return await this.cartModalTitle.textContent();
  }
  async isEmptyCartMessageVisible() {
    return await this.cartEmptyMessage.isVisible();
  }
 

async getCartProductQuantity() {
  return await this.quantitySelect.inputValue();
}

  parsePrice(text: string): number {
    const cleaned = text.replace(/[^0-9.\-]+/g, '');
    return parseFloat(cleaned);
  }

  async getItemPricesFromCartModal(): Promise<number[]> {
    await this.cartModalTitle.waitFor({ state: 'visible' });
    const modalContainer = this.cartModalTitle.locator('xpath=ancestor::div').first();
    const priceLocators = modalContainer.locator(productPageLocators.firstItemPrice);
    const count = await priceLocators.count();
    const prices: number[] = [];
    for (let i = 0; i < count; i++) {
      const text = (await priceLocators.nth(i).innerText()).trim();
      prices.push(this.parsePrice(text));
    }
    return prices;
  }

  async getFirstItemPrice() {
    const prices = await this.getItemPricesFromCartModal();
    return prices[0];
  }

  async getSecondItemPrice() {
    const prices = await this.getItemPricesFromCartModal();
    return prices[1];
  }

 async calculateSubtotalOfTwoItems() {
    const prices = await this.getItemPricesFromCartModal();
    const subtotal = (prices[0] ?? 0) + (prices[1] ?? 0);
    return Number(subtotal.toFixed(2));
  }

  async getDisplayedSubtotal() {
    const text = await this.page.locator(productPageLocators.subtotalValue).nth(1).textContent();
    return this.parsePrice(text ?? '');
  }

async isDisplayedSubtotalEqualToItemsSum(precision = 2) {
  const calculated = await this.calculateSubtotalOfTwoItems();
  const displayed = await this.getDisplayedSubtotal();
  const round = (num: number) => parseFloat(num.toFixed(precision));
  return round(calculated) === round(displayed);
}

}





