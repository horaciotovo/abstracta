import { Locator, Page } from '@playwright/test';

/**
 * CartPage represents the shopping cart page of Demoblaze.
 * It encapsulates all selectors and interactions for cart operations.
 */
export class CartPage {
  readonly cartTable: Locator;
  readonly cartItems: Locator;
  readonly totalPrice: Locator;
  readonly placeOrderButton: Locator;
  readonly deleteButtons: Locator;
  readonly emptyCartMessage: Locator;

  /**
   * Creates an instance of CartPage.
   * @param page - The Playwright page object
   */
  constructor(readonly page: Page) {
    this.cartTable = this.page.locator('tbody#tbodyid');
    this.cartItems = this.page.locator('tbody#tbodyid tr');
    this.totalPrice = this.page.locator('h3#totalp');
    this.placeOrderButton = this.page.getByRole('button', { name: 'Place Order' });
    this.deleteButtons = this.page.getByRole('link', { name: 'Delete' });
    this.emptyCartMessage = this.page.locator('text=No products in your cart');
  }

  /**
   * Waits for the cart page to load.
   */
  async waitForPageToLoad(): Promise<void> {
    await this.cartTable.waitFor({ state: 'visible' });
  }

  /**
   * Gets the number of items in the cart.
   * @returns The count of cart items
   */
  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Gets the total price displayed on the cart page.
   * @returns The total price text
   */
  async getTotalPrice(): Promise<string> {
    return await this.totalPrice.textContent() || '';
  }

  /**
   * Gets all product names currently in the cart.
   * @returns An array of product name text content
   */
  async getCartProductNames(): Promise<string[]> {
    const names: string[] = [];
    const count = await this.cartItems.count();

    for (let i = 0; i < count; i++) {
      const row = this.cartItems.nth(i);
      const nameCell = row.locator('td').nth(1);
      const name = await nameCell.textContent() || '';
      names.push(name.trim());
    }

    return names;
  }

  /**
   * Clicks the "Place Order" button to initiate checkout.
   */
  async clickPlaceOrder(): Promise<void> {
    await this.placeOrderButton.click();
  }

  /**
   * Checks if the cart is empty.
   * @returns True if cart is empty, false otherwise
   */
  async isCartEmpty(): Promise<boolean> {
    try {
      await this.emptyCartMessage.waitFor({ state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Deletes an item from the cart by index.
   * @param index - The 0-based index of the item to delete
   */
  async deleteCartItem(index: number): Promise<void> {
    await this.deleteButtons.nth(index).click();
    // Wait for the delete operation to complete
    await this.page.waitForTimeout(800);
  }

  /**
   * Deletes an item from the cart by product name.
   * @param productName - The name of the product to delete
   */
  async deleteCartItemByName(productName: string): Promise<void> {
    // Find the row containing this product name
    const row = this.cartItems.filter({
      has: this.page.locator('td').filter({ hasText: productName }).first(),
    }).first();
    
    const deleteLink = row.getByRole('link', { name: 'Delete' });
    
    // Set up dialog handler to accept the first confirmation dialog
    this.page.once('dialog', (dialog) => {
      dialog.accept();
    });
    
    await deleteLink.click();
    // Wait a moment for the delete operation to complete
    await this.page.waitForTimeout(500);
  }

  /**
   * Clears all items from the cart.
   */
  async clearCart(): Promise<void> {
    let itemCount = await this.getCartItemCount();
    const maxAttempts = 10;
    let attempts = 0;
    
    while (itemCount > 0 && attempts < maxAttempts) {
      try {
        await this.deleteCartItem(0);
        // Wait a moment for the DOM to update
        await this.page.waitForTimeout(500);
        const newCount = await this.getCartItemCount();
        
        if (newCount === itemCount && newCount > 0) {
          // Count didn't decrease, stop trying
          break;
        }
        itemCount = newCount;
      } catch {
        // If delete fails, check if cart is already empty
        itemCount = await this.getCartItemCount();
        if (itemCount === 0) {
          break;
        }
      }
      attempts++;
    }
  }
}
