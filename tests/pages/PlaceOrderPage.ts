import { Locator, Page } from '@playwright/test';

/**
 * PlaceOrderPage represents the order placement form on Demoblaze.
 * It encapsulates all selectors and interactions for placing orders.
 */
export class PlaceOrderPage {
  readonly nameField: Locator;
  readonly countryField: Locator;
  readonly cityField: Locator;
  readonly creditCardField: Locator;
  readonly monthField: Locator;
  readonly yearField: Locator;
  readonly purchaseButton: Locator;

  /**
   * Creates an instance of PlaceOrderPage.
   * @param page - The Playwright page object
   */
  constructor(readonly page: Page) {
    this.nameField = this.page.getByRole('textbox', { name: /Name/ });
    this.countryField = this.page.getByRole('textbox', { name: 'Country:' });
    this.cityField = this.page.getByRole('textbox', { name: 'City:' });
    this.creditCardField = this.page.getByRole('textbox', { name: 'Credit card:' });
    this.monthField = this.page.getByRole('textbox', { name: 'Month:' });
    this.yearField = this.page.getByRole('textbox', { name: 'Year:' });
    this.purchaseButton = this.page.getByRole('button', { name: 'Purchase' });
  }

  /**
   * Fills in the order form with the provided details.
   * @param orderDetails - The order details including name, country, city, credit card, month, and year
   */
  async fillOrderForm(orderDetails: {
    name: string;
    country: string;
    city: string;
    creditCard: string;
    month: string;
    year: string;
  }): Promise<void> {
    await this.nameField.fill(orderDetails.name);
    await this.countryField.fill(orderDetails.country);
    await this.cityField.fill(orderDetails.city);
    await this.creditCardField.fill(orderDetails.creditCard);
    await this.monthField.fill(orderDetails.month);
    await this.yearField.fill(orderDetails.year);
  }

  /**
   * Clicks the Purchase button to complete the order.
   */
  async clickPurchase(): Promise<void> {
    await this.purchaseButton.click();
  }
}
