import { expect, Page } from "@playwright/test";
import { homePageLocators } from "./homePageLocators";
import { BasePage } from "../basePage";

export class HomePageAssertions {
  constructor(private page: Page) {}

  async expectSearchFieldVisible() {
    await expect(this.page.locator(homePageLocators.searchField)).toBeVisible();
  }

  async expectCartIconVisible() {
    await expect(this.page.locator(homePageLocators.cartIcon)).toBeVisible();
  }

  async expectFavoritesIconVisible() {
    await expect(this.page.locator(homePageLocators.favoritesIcon)).toBeVisible();
  }

  async expectMyAccountIconVisible() {
    await expect(this.page.locator(homePageLocators.myAccountIcon)).toBeVisible();
  }

  async expectSearchResultsContain(text: string) {
    const results = this.page.locator(homePageLocators.itemName);
    await expect(results).toContainText(text);
  }

}

