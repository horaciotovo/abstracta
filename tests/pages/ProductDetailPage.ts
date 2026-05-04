import { Locator, Page, expect } from '@playwright/test';

/**
 * ProductDetailPage represents the product detail page of Demoblaze.
 * It encapsulates all selectors and interactions for viewing product details and adding to cart.
 */
export class ProductDetailPage {
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly addToCartButton: Locator;
  readonly cartLink: Locator;

  /**
   * Creates an instance of ProductDetailPage.
   * @param page - The Playwright page object
   */
  constructor(readonly page: Page) {
    this.productTitle = this.page.locator('h2');
    this.productPrice = this.page.locator('h3.price.currency');
    this.productDescription = this.page.locator('div#more-information');
    this.addToCartButton = this.page.locator('a.btn.btn-success').first();
    this.cartLink = this.page.getByRole('link', { name: 'Cart', exact: true });
  }

  /**
   * Gets the product title from the detail page.
   * @returns The product title text
   */
  async getProductTitle(): Promise<string> {
    return await this.productTitle.textContent() || '';
  }

  /**
   * Gets the product price from the detail page.
   * @returns The product price text
   */
  async getProductPrice(): Promise<string> {
    return await this.productPrice.textContent() || '';
  }

  /**
   * Waits for the product detail page to load.
   */
  async waitForPageToLoad(): Promise<void> {
    await this.productTitle.waitFor({ state: 'visible' });
  }

  /**
   * Clicks the "Add to Cart" button to add the product to cart.
   */
  async clickAddToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  /**
   * Adds the current product to cart and handles the confirmation alert.
   */
  async addProductToCart(): Promise<void> {
    // Wait for dialog BEFORE clicking to ensure it's captured
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.clickAddToCart();
    const dialog = await dialogPromise;
    await dialog.accept();
  }

  /**
   * Navigates to the shopping cart page.
   */
  async goToCart(): Promise<void> {
    await expect(this.cartLink).toBeVisible();
    await this.cartLink.click();
  }
}
