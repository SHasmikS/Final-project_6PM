import { Locator, Page } from "@playwright/test";
import { searchResults } from "./searchResultsLocators";
import { BasePage } from "../basePage";

export class SearchResultsPage {
  readonly page: Page;
  readonly pageHeader: Locator;
  readonly selectionsText: Locator;
  readonly sortByLabel: Locator;
  readonly sortSelect: Locator;
  readonly productCard: Locator;
  readonly invalidItemHeader: Locator;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly productCard2: Locator;
  readonly 
  
  
  constructor(page: Page) {
    this.page = page;
    this.pageHeader = page.locator(searchResults.pageHeader);
    this.selectionsText = page.locator(searchResults.selectionsText);
    this.sortByLabel = page.locator(searchResults.sortBy);
    this.sortSelect = page.locator(searchResults.sortSelect);
    this.productCard = page.locator(searchResults.productCard);
    this.invalidItemHeader = page.locator(searchResults.invalidItemHeader);
    this.productTitle = page.locator(searchResults.productTitle);
    this.productPrice = page.locator(searchResults.productPrice);
    this.productCard2 = page.locator(searchResults.productCard2);
  }

  async getPageHeaderText() {
    await this.pageHeader.waitFor({ state: 'visible', timeout: 10000 });
    return await this.pageHeader.textContent();
  }

  async getPageHeaderTextLowerCase() {
    await this.pageHeader.waitFor({ state: 'visible', timeout: 10000 });
    const text = await this.pageHeader.textContent();
    return text?.toLowerCase() || '';
  }

  async getInvalidItemPageHeaderText () {
    return await this.invalidItemHeader.textContent ();
  }

  async sortByOption(option: string) {
    await this.sortSelect.selectOption({ label: option });
  }

  async clickProductCard() {
    await this.productCard.click();
  }

  async clickProductCard2() {
    await this.productCard2.click();
  }


  async isSelectionsTextVisible() {
    return await this.selectionsText.isVisible();
  }

  async getProductTitle() {
    await this.productTitle.waitFor({ state: 'visible', timeout: 10000 });
    return await this.productTitle.textContent();
  }

  async getProductPrice() {
    await this.productPrice.waitFor({ state: 'visible', timeout: 10000 });
    return await this.productPrice.textContent();
  }
}







