import { expect, Page } from "@playwright/test";
import { searchResults } from "./searchResultsLocators";

export class SearchResultsAssertions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectPageHeaderToBeVisible() {
    await expect(this.page.locator(searchResults.pageHeader)).toBeVisible();
  }

  async expectSelectionsTextToBeVisible() {
    await expect(this.page.locator(searchResults.selectionsText)).toBeVisible();
  }

  async expectProductCardToBeVisible() {
    await expect(this.page.locator(searchResults.productCard)).toBeVisible();
  }

  async expectSortByLabelToHaveText(expectedText: string) {
    await expect(this.page.locator(searchResults.sortBy)).toHaveText(expectedText);
  }
}