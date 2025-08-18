import { test, expect } from '@playwright/test';
import { homePage } from '../POM/homePage/homePagePOM';
import { SearchResultsPage } from '../POM/searchResults/searchResultsPOM';
import { ProductPage } from '../POM/productPage/productPagePOM';
import { searchResults } from '../POM/searchResults/searchResultsLocators';
import { SearchResultsAssertions } from '../POM/searchResults/searchResultsAssertions';
import { ProductPageAssertions } from '../POM/productPage/productPageAssertions';

test.describe('Home Page Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.6pm.com/", { waitUntil: "load" });
  });

  test('User can search for an item and view results', async ({ page }) => {
    const homepage = new homePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const productPage = new ProductPage(page);

    const searchKeyword = 'crocs kids';
    await homepage.doSearch(searchKeyword);
    expect(await searchResultsPage.getPageHeaderText()).toContain(searchKeyword);
  });


  test ('No results message appears for invalid searches', async ({page}) =>{
    const homepage = new homePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const searchResultsAssertions = new SearchResultsAssertions(page);

    const searchKeyword = 'hsjkhjjkh';
    await homepage.search(searchKeyword);
    await searchResultsAssertions.expectInvalidItemHeaderToBeVisible();
    
  });

   

  test('User can search with brand name', async ({ page }) => {
    const homepage = new homePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const searchResultsAssertions = new SearchResultsAssertions(page);

    const searchKeyword = 'Nike';
    await homepage.search(searchKeyword);
    await searchResultsAssertions.expectPageHeaderToContainSearchKeyword(searchKeyword);
  });

  
  test('User can search with category term', async ({ page }) => {
    const homepage = new homePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const searchResultsAssertions = new SearchResultsAssertions(page);

    const searchKeyword = 'running pants';
    await homepage.search(searchKeyword);
    await searchResultsAssertions.expectPageHeaderToContainSearchKeyword(searchKeyword);
  });

  
  test('User can search with color and type combination', async ({ page }) => {
    const homepage = new homePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const searchResultsAssertions = new SearchResultsAssertions(page);

    const searchKeyword = 'red shoes';
    await homepage.search(searchKeyword);
    await searchResultsAssertions.expectPageHeaderToContainSearchKeyword(searchKeyword);
  });

  

});