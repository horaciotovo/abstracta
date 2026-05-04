# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: buy\logged-in-user-buy-item.spec.ts >> Buy Item Workflow >> Logged-in user can successfully purchase an item
- Location: tests\buy\logged-in-user-buy-item.spec.ts:19:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: 'Log in' })

```

# Test source

```ts
  1  | import { Page, Locator, expect } from '@playwright/test';
  2  | import { getEnvironmentConfig } from '../utils/config';
  3  | 
  4  | /**
  5  |  * LoginPage represents the login page of Demoblaze application.
  6  |  * It encapsulates all selectors and interactions for the login page.
  7  |  */
  8  | export class LoginPage {
  9  |   readonly page: Page;
  10 |   readonly loginLink: Locator;
  11 |   readonly usernameField: Locator;
  12 |   readonly passwordField: Locator;
  13 |   readonly loginButton: Locator;
  14 | 
  15 |   /**
  16 |    * Creates an instance of LoginPage.
  17 |    * @param page - The Playwright page object
  18 |    */
  19 |   constructor(page: Page) {
  20 |     this.page = page;
  21 |     this.loginLink = this.page.getByRole('link', { name: 'Log in' });
  22 |     this.usernameField = this.page.locator('#loginusername');
  23 |     this.passwordField = this.page.locator('#loginpassword');
  24 |     this.loginButton = this.page.getByRole('button', { name: 'Log in' });
  25 |   }
  26 | 
  27 |   /**
  28 |    * Navigates to the Demoblaze homepage.
  29 |    */
  30 |   async goto(): Promise<void> {
  31 |     const config = getEnvironmentConfig();
  32 |     await this.page.goto(config.baseUrl);
  33 |   }
  34 | 
  35 |   /**
  36 |    * Clicks the "Log in" link to open the login modal.
  37 |    */
  38 |   async clickLoginLink(): Promise<void> {
> 39 |     await this.loginLink.click();
     |                          ^ Error: locator.click: Test timeout of 30000ms exceeded.
  40 |   }
  41 | 
  42 |   /**
  43 |    * Fills the username field with the provided username.
  44 |    * @param username - The username to enter
  45 |    */
  46 |   async fillUsername(username: string): Promise<void> {
  47 |     await expect(this.usernameField).toBeVisible();
  48 |     await this.usernameField.fill(username);
  49 |   }
  50 | 
  51 |   /**
  52 |    * Fills the password field with the provided password.
  53 |    * @param password - The password to enter
  54 |    */
  55 |   async fillPassword(password: string): Promise<void> {
  56 |     await expect(this.passwordField).toBeVisible();
  57 |     await this.passwordField.fill(password);
  58 |   }
  59 | 
  60 |   /**
  61 |    * Clicks the login button to submit the login form.
  62 |    */
  63 |   async clickLoginButton(): Promise<void> {
  64 |     await this.page.waitForLoadState('domcontentloaded');
  65 |     await expect(this.loginButton).toBeEnabled();
  66 |     await this.loginButton.click();
  67 |   }
  68 | 
  69 |   /**
  70 |    * Logs in with the provided credentials and verifies the username is displayed.
  71 |    * @param username - The username to enter
  72 |    * @param password - The password to enter
  73 |    */
  74 |   async loginAndVerifyUsername(username: string, password: string): Promise<void> {
  75 |     // Click the Log in link to open the login modal
  76 |     await this.clickLoginLink();
  77 | 
  78 |     // Fill in the username field with the registered username
  79 |     await expect(this.usernameField).toBeVisible();
  80 |     await this.fillUsername(username);
  81 | 
  82 |     // Fill in the password field with the registered password
  83 |     await expect(this.passwordField).toBeVisible();
  84 |     await this.fillPassword(password);
  85 | 
  86 |     // Click the Log in button to submit the login form
  87 |     await expect(this.loginButton).toBeEnabled();
  88 |     await this.clickLoginButton();
  89 | 
  90 |     // Verify that the username is displayed on the homepage
  91 |     const welcomeLink = this.page.getByRole('link', { name: `Welcome ${username}` });
  92 |     await expect(welcomeLink).toBeVisible({timeout: 15000});
  93 |   }
  94 | }
  95 | 
```