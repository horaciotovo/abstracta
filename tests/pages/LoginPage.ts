import { Page } from '@playwright/test';

/**
 * LoginPage represents the login page of Sauce Demo application.
 * It encapsulates all selectors and interactions for the login page.
 */
export class LoginPage {
  /**
   * Creates an instance of LoginPage.
   * @param page - The Playwright page object
   */
  constructor(readonly page: Page) {}

  /**
   * Navigates to the Sauce Demo login page.
   */
  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  /**
   * Fills the username field with the provided username.
   * @param username - The username to enter
   */
  async fillUsername(username: string): Promise<void> {
    await this.page.locator('[data-test="username"]').fill(username);
  }

  /**
   * Fills the password field with the provided password.
   * @param password - The password to enter
   */
  async fillPassword(password: string): Promise<void> {
    await this.page.locator('[data-test="password"]').fill(password);
  }

  /**
   * Clicks the login button to submit the login form.
   */
  async clickLoginButton(): Promise<void> {
    await this.page.locator('[data-test="login-button"]').click();
  }

  /**
   * Logs in with the provided credentials.
   * @param username - The username to enter
   * @param password - The password to enter
   */
  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Checks if the login page is visible.
   * @returns True if the login container is visible, false otherwise
   */
  async isLoginPageVisible(): Promise<boolean> {
    return this.page.locator('.login_container').isVisible();
  }
}
