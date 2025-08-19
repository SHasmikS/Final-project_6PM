import { test, expect } from "@playwright/test";
import { homePage } from "../POM/homePage/homePagePOM";
import { SearchResultsPage } from "../POM/searchResults/searchResultsPOM";
import { ProductPage } from "../POM/productPage/productPagePOM";
import { searchResults } from "../POM/searchResults/searchResultsLocators";
import { SearchResultsAssertions } from "../POM/searchResults/searchResultsAssertions";
import { ProductPageAssertions } from "../POM/productPage/productPageAssertions";

test.describe("Home Page Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.6pm.com/", { waitUntil: "load" });
  });

  test("User can search for an item and to cart ", async ({ page }) => {
    const homepage = new homePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const productPage = new ProductPage(page);
    const productPageAssertions = new ProductPageAssertions(page);

    await homepage.doSearch("crocs kids");
    await searchResultsPage.clickProductCard();
    await productPage.selectBigKid();
    await productPage.selectSize("4");
    await productPage.clickAddToCart();
    await productPage.waitForCartModal();
    await productPageAssertions.expectCartModalContainsProduct("Crocs Kids");
  });

  
  test("User can add items to favorites", async ({ page }) => {
    const homepage = new homePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const productPage = new ProductPage(page);
    const searchResultsAssertions = new SearchResultsAssertions(page);
    const productPageAssertions = new ProductPageAssertions(page);

    const searchKeyword = "crocs kids";
    await homepage.doSearch(searchKeyword);
    await searchResultsAssertions.expectPageHeaderToContainSearchKeyword(
      searchKeyword
    );

    await searchResultsPage.clickProductCard();

    await productPage.saveToFavorites();
    await productPage.waitForSignInToFavoritesModal();
    await productPage.closeSignInToFavoritesModal();
    await productPageAssertions.expectSignInToFavoritesModalHidden();
  });

  test("User can remove item from cart", async ({ page }) => {
    const homepage = new homePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const productPage = new ProductPage(page);
    const productPageAssertions = new ProductPageAssertions(page);

    await homepage.doSearch("crocs kids");
    await searchResultsPage.clickProductCard();
    await productPage.selectBigKid();
    await productPage.selectSize("4");
    await productPage.clickAddToCart();
    await productPage.waitForCartModal();
    await productPage.removeItem();
    await productPageAssertions.expectEmptyCartMessageVisible();
  });

  
  test("User can add multiple items to the cart", async ({ page }) => {
    const homepage = new homePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const productPage = new ProductPage(page);
    const productPageAssertions = new ProductPageAssertions(page);

    await homepage.doSearch("crocs kids");
    await searchResultsPage.clickProductCard();
    await productPage.selectBigKid();
    await productPage.selectSize("4");
    await productPage.clickAddToCart();
    await productPage.closeCartModal();
    await page.goBack({ waitUntil: "domcontentloaded" });
    await searchResultsPage.clickProductCard2();
    await productPage.selectLittleKid();
    await productPage.selectLittleKidSize("13");
    await productPage.clickAddToCart();
    await productPage.waitForCartModal();
    await productPage.calculateSubtotalOfTwoItems();
    await productPage.getDisplayedSubtotal();
    await productPageAssertions.expectSubtotalEqualToItemsSum();
  });
});
