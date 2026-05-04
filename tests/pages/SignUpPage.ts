import { Page, Locator } from '@playwright/test';
import { getEnvironmentConfig } from '../utils/config';

/**
 * SignUpPage represents the sign-up functionality on Demoblaze.
 * It encapsulates all selectors and interactions for creating a new account.
 */
export class SignUpPage {
  readonly page: Page;
  readonly signUpLink: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly signUpButton: Locator;
  readonly signUpModal: Locator;
  readonly loginLink: Locator;
  readonly loginModal: Locator;
  readonly loginUsernameField: Locator;
  readonly loginPasswordField: Locator;
  readonly loginButton: Locator;
  readonly logoutButton: Locator;

  /**
   * Creates an instance of SignUpPage.
   * @param page - The Playwright page object
   */
  constructor(page: Page) {
    this.page = page;
    this.signUpLink = page.locator('#signin2');
    this.usernameField = page.locator('#sign-username');
    this.passwordField = page.locator('#sign-password');
    this.signUpButton = page.locator('button[onclick="register()"]');
    this.signUpModal = page.locator('#signInModal');
    this.loginLink = page.locator('#login2');
    this.loginModal = page.locator('#logInModal');
    this.loginUsernameField = page.locator('#loginusername');
    this.loginPasswordField = page.locator('#loginpassword');
    this.loginButton = page.locator('button[onclick="logIn()"]');
    this.logoutButton = page.locator('#logout2');
  }

  /**
   * Navigates to the Demoblaze home page using the base URL from environment configuration.
   */
  async goto(): Promise<void> {
    const config = getEnvironmentConfig();
    await this.page.goto(config.baseUrl);
  }

  /**
   * Clicks the "Sign up" link in the navigation to open the sign-up modal.
   */
  async clickSignUpLink(): Promise<void> {
    await this.signUpLink.click();
  }

  /**
   * Fills the username field in the sign-up form with the provided username.
   * @param username - The username to enter
   */
  async fillUsername(username: string): Promise<void> {
    await this.usernameField.fill(username);
  }

  /**
   * Fills the password field in the sign-up form with the provided password.
   * @param password - The password to enter
   */
  async fillPassword(password: string): Promise<void> {
    await this.passwordField.fill(password);
  }

  /**
   * Clicks the "Sign up" button to submit the registration form.
   */
  async clickSignUpButton(): Promise<void> {
    // Listen for the alert dialog before clicking
    this.page.once('dialog', (dialog) => {
      dialog.accept();
    });
    await this.signUpButton.click();
  }

  /**
   * Registers a new account with the provided credentials.
   * @param username - The username to register
   * @param password - The password to register
   */
  async registerNewAccount(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickSignUpButton();
  }

  /**
   * Generates a random username with timestamp to ensure uniqueness.
   * @returns A unique random username
   */
  generateRandomUsername(): string {
    const timestamp = Date.now();
    return `testuser_${timestamp}`;
  }

  /**
   * Generates a random password with special characters for security testing.
   * @returns A random password
   */
  generateRandomPassword(): string {
    const timestamp = Date.now();
    return `TestPass_${timestamp}!`;
  }

  /**
   * Waits for the sign-up modal to become visible.
   */
  async waitForSignUpModalVisible(): Promise<void> {
    await this.signUpModal.waitFor({ state: 'visible', timeout: 5000 });
  }

  /**
   * Checks if the sign-up modal is visible.
   * @returns True if the sign-up modal is displayed, false otherwise
   */
  async isSignUpModalVisible(): Promise<boolean> {
    return this.signUpModal.isVisible();
  }

  /**
   * Waits for the sign-up modal to close after successful registration.
   */
  async waitForSuccessMessage(): Promise<void> {
    // Wait for the modal to be hidden after successful registration
    await this.signUpModal.waitFor({ state: 'hidden' });
  }

  /**
   * Clicks the "Log in" link in the navigation to open the login modal.
   */
  async clickLoginLink(): Promise<void> {
    await this.loginLink.click();
  }

  /**
   * Logs in with the provided credentials.
   * @param username - The username to log in with
   * @param password - The password to log in with
   */
  async login(username: string, password: string): Promise<void> {
    await this.clickLoginLink();
    await this.loginModal.waitFor({ state: 'visible' });
    await this.loginUsernameField.fill(username);
    await this.loginPasswordField.fill(password);

    // Listen for the alert dialog to accept it
    await this.acceptSignUpDialog();
    await this.loginButton.click();
    await this.loginModal.waitFor({ state: 'hidden' });
  }

  /**
   * Checks if the user is logged in by verifying the logout button is visible.
   * @returns True if logged in (logout button visible), false otherwise
   */
  async isLoggedIn(): Promise<boolean> {
    return this.logoutButton.isVisible();
  }

  /**
   * Accepts the sign-up dialog that appears after form submission.
   * Listens for and handles the alert dialog.
   */
  async acceptSignUpDialog(): Promise<void> {
    this.page.once('dialog', (dialog) => dialog.accept());
  }
}
