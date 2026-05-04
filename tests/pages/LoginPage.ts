import { Page, Locator, expect } from '@playwright/test';
import { getEnvironmentConfig } from '../utils/config';

/**
 * LoginPage represents the login page of Demoblaze application.
 * It encapsulates all selectors and interactions for the login page.
 */
export class LoginPage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  /**
   * Creates an instance of LoginPage.
   * @param page - The Playwright page object
   */
  constructor(page: Page) {
    this.page = page;
    this.loginLink = this.page.getByRole('link', { name: 'Log in' });
    this.usernameField = this.page.locator('#loginusername');
    this.passwordField = this.page.locator('#loginpassword');
    this.loginButton = this.page.getByRole('button', { name: 'Log in' });
  }

  /**
   * Navigates to the Demoblaze homepage.
   */
  async goto(): Promise<void> {
    const config = getEnvironmentConfig();
    await this.page.goto(config.baseUrl);
  }

  /**
   * Clicks the "Log in" link to open the login modal.
   */
  async clickLoginLink(): Promise<void> {
    await this.loginLink.click();
  }

  /**
   * Fills the username field with the provided username.
   * @param username - The username to enter
   */
  async fillUsername(username: string): Promise<void> {
    await expect(this.usernameField).toBeVisible();
    await this.usernameField.fill(username);
  }

  /**
   * Fills the password field with the provided password.
   * @param password - The password to enter
   */
  async fillPassword(password: string): Promise<void> {
    await expect(this.passwordField).toBeVisible();
    await this.passwordField.fill(password);
  }

  /**
   * Clicks the login button to submit the login form.
   */
  async clickLoginButton(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.loginButton).toBeEnabled();
    await this.loginButton.click();
  }

  /**
   * Logs in with the provided credentials and verifies the username is displayed.
   * @param username - The username to enter
   * @param password - The password to enter
   */
  async loginAndVerifyUsername(username: string, password: string): Promise<void> {
    // Click the Log in link to open the login modal
    await this.clickLoginLink();

    // Fill in the username field with the registered username
    await expect(this.usernameField).toBeVisible();
    await this.fillUsername(username);

    // Fill in the password field with the registered password
    await expect(this.passwordField).toBeVisible();
    await this.fillPassword(password);

    // Click the Log in button to submit the login form
    await expect(this.loginButton).toBeEnabled();
    await this.clickLoginButton();

    // Verify that the username is displayed on the homepage
    const welcomeLink = this.page.getByRole('link', { name: `Welcome ${username}` });
    await expect(welcomeLink).toBeVisible({timeout: 15000});
  }
}
