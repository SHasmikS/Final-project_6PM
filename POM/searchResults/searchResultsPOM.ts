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
  
  constructor(page: Page) {
    this.page = page;
    this.pageHeader = page.locator(searchResults.pageHeader);
    this.selectionsText = page.locator(searchResults.selectionsText);
    this.sortByLabel = page.locator(searchResults.sortBy);
    this.sortSelect = page.locator(searchResults.sortSelect);
    this.productCard = page.locator(searchResults.productCard);
    this.invalidItemHeader = page.locator(searchResults.invalidItemHeader);
  
  }

  async getPageHeaderText() {
    return await this.pageHeader.textContent();
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

  async isSelectionsTextVisible() {
    return await this.selectionsText.isVisible();
  }
}



