import { Locator, Page } from '@playwright/test';
import { getEnvironmentConfig } from '../utils/config';
import { Product } from '../utils/dto/product.dto';

/**
 * DemoblazeProductPage represents the product listing page of Demoblaze.
 * It encapsulates all selectors and interactions for discovering and listing products.
 */
export class ProductListPage {
  readonly productLinks: Locator;
  readonly productContainers: Locator;
  readonly paginationContainer: Locator;
  readonly nextButton: Locator;

  /**
   * Creates an instance of DemoblazeProductPage.
   * @param page - The Playwright page object
   */
  constructor(readonly page: Page) {
    this.productLinks = this.page.locator('.hrefch');
    this.productContainers = this.page.locator('div.col-lg-4.col-md-6');
    this.paginationContainer = this.page.locator('ul.pagination');
    this.nextButton = this.paginationContainer.getByRole('button', { name: 'Next' });
  }

  /**
   * Navigates to the Demoblaze home page using the base URL from environment configuration.
   */
  async goto(): Promise<void> {
    const config = getEnvironmentConfig();
    await this.page.goto(config.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Waits for the product list to be fully loaded on the page.
   */
  async waitForProductsToLoad(): Promise<void> {
    await this.productLinks.first().waitFor({ state: 'visible' });
  }

  /**
   * Retrieves all products from the store with their name, price, and href.
   * @returns An array of Product objects containing name, price, and href
   */
  async getAllProducts(): Promise<Product[]> {
    await this.waitForProductsToLoad();

    const products = await this.page.evaluate(() => {
      const productItems = Array.from(
        // eslint-disable-next-line no-undef
        document.querySelectorAll('div.col-lg-4.col-md-6')
      );

      return productItems.map((item) => {
        const nameElement = item.querySelector('h4.card-title a.hrefch');
        const priceElement = item.querySelector('.card-block h5');
        const linkElement = item.querySelector('a.hrefch');

        const name = nameElement?.textContent?.trim() || '';
        const price = priceElement?.textContent?.trim() || '';
        const href = linkElement?.getAttribute('href') || '';

        return {
          name,
          price,
          href,
        };
      });
    });

    return products;
  }

  /**
   * Gets the count of products currently displayed on the page.
   * @returns The number of products visible
   */
  async getProductCount(): Promise<number> {
    await this.waitForProductsToLoad();
    const count = await this.productContainers.count();
    return count;
  }

  /**
   * Navigates to the next page of products.
   * @returns True if navigation was successful, false if there is no next page
   */
  async goToNextPage(): Promise<boolean> {
    // Check if the Next button is disabled
    const isDisabled = await this.nextButton.evaluate((el) => {
      return el.classList.contains('disabled');
    }).catch(() => true);

    if (isDisabled) {
      return false;
    }

    // Click the Next button
    await this.nextButton.click();
    await this.waitForProductsToLoad();
    return true;
  }

  /**
   * Retrieves all products from multiple pages up to a specified page number.
   * @param pageCount - The number of pages to retrieve products from
   * @returns An array of Product objects from all specified pages
   */
  async getAllProductsFromMultiplePages(pageCount: number): Promise<Product[]> {
    const allProducts: Product[] = [];

    for (let i = 0; i < pageCount; i++) {
      const products = await this.getAllProducts();
      allProducts.push(...products);

      // Navigate to next page if not on the last page
      if (i < pageCount - 1) {
        const hasNext = await this.goToNextPage();
        if (!hasNext) {
          break;
        }
      }
    }

    return allProducts;
  }

  /**
   * Clicks on the first product in the list to view its details.
   */
  async clickFirstProduct(): Promise<void> {
    await this.productLinks.first().click();
  }

  /**
   * Clicks on a product by its exact name.
   * @param productName - The exact name of the product to click
   */
  async clickProductByName(productName: string): Promise<void> {
    await this.page.getByRole('link', { name: productName, exact: true }).click();
  }
}
export { Product };

