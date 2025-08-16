import { Locator, Page } from "@playwright/test";
import { homePageLocators } from "./homePageLocators";
import { BasePage } from "../basePage";

export class homePage extends BasePage {
  readonly searchField: Locator;
  readonly searchIcon: Locator;
  readonly cartIcon: Locator;
  readonly myAccountIcon: Locator;
  readonly favoritesIcon: Locator;
  readonly itemName:Locator;
  readonly link: Locator

  constructor(page: Page) {
    super(page);
    this.searchField = page.locator(homePageLocators.searchField);
    this.searchIcon = page.locator(homePageLocators.searchIcon);
    this.cartIcon = page.locator(homePageLocators.cartIcon);
    this.myAccountIcon = page.locator(homePageLocators.myAccountIcon);
    this.favoritesIcon = page.locator(homePageLocators.favoritesIcon);
    this.itemName = page.locator(homePageLocators.itemName);
    this.link = page.locator(homePageLocators.link);
    
  }

  async doSearch(searchKey: string) {
    await this.searchField.fill(searchKey);
    await this.link.click();
  }

  async search (searchKey:string) {
    await this.searchField.fill(searchKey);
    await this.searchIcon.click();
  }
async openCart() {
  await this.cartIcon.click();
}
async openFavorites() {
  await this.favoritesIcon.click();
}

async goToMyAccount() {
  await this.myAccountIcon.click();
}

async clickCrocsKidsLink() {
    await this.link.click();
  }

}
 
