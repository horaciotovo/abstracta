# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth\signup.spec.ts >> User Authentication >> should create a new account with random credentials
- Location: tests\auth\signup.spec.ts:21:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button[onclick="register()"]')
    - locator resolved to <button type="button" onclick="register()" class="btn btn-primary">Sign up</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable

```

# Test source

```ts
  1   | import { Page, Locator, expect } from '@playwright/test';
  2   | import { getEnvironmentConfig } from '../utils/config';
  3   | 
  4   | /**
  5   |  * SignUpPage represents the sign-up functionality on Demoblaze.
  6   |  * It encapsulates all selectors and interactions for creating a new account.
  7   |  */
  8   | export class SignUpPage {
  9   |   readonly page: Page;
  10  |   readonly signUpLink: Locator;
  11  |   readonly usernameField: Locator;
  12  |   readonly passwordField: Locator;
  13  |   readonly signUpButton: Locator;
  14  |   readonly signUpModal: Locator;
  15  |   readonly loginLink: Locator;
  16  |   readonly loginModal: Locator;
  17  |   readonly loginUsernameField: Locator;
  18  |   readonly loginPasswordField: Locator;
  19  |   readonly loginButton: Locator;
  20  |   readonly logoutButton: Locator;
  21  | 
  22  |   /**
  23  |    * Creates an instance of SignUpPage.
  24  |    * @param page - The Playwright page object
  25  |    */
  26  |   constructor(page: Page) {
  27  |     this.page = page;
  28  |     this.signUpLink = page.locator('#signin2');
  29  |     this.usernameField = page.locator('#sign-username');
  30  |     this.passwordField = page.locator('#sign-password');
  31  |     this.signUpButton = page.locator('button[onclick="register()"]');
  32  |     this.signUpModal = page.locator('#signInModal');
  33  |     this.loginLink = page.locator('#login2');
  34  |     this.loginModal = page.locator('#logInModal');
  35  |     this.loginUsernameField = page.locator('#loginusername');
  36  |     this.loginPasswordField = page.locator('#loginpassword');
  37  |     this.loginButton = page.locator('button[onclick="logIn()"]');
  38  |     this.logoutButton = page.locator('#logout2');
  39  |   }
  40  | 
  41  |   /**
  42  |    * Navigates to the Demoblaze home page using the base URL from environment configuration.
  43  |    */
  44  |   async goto(): Promise<void> {
  45  |     const config = getEnvironmentConfig();
  46  |     await this.page.goto(config.baseUrl);
  47  |   }
  48  | 
  49  |   /**
  50  |    * Clicks the "Sign up" link in the navigation to open the sign-up modal.
  51  |    */
  52  |   async clickSignUpLink(): Promise<void> {
  53  |     await this.signUpLink.click();
  54  |   }
  55  | 
  56  |   /**
  57  |    * Fills the username field in the sign-up form with the provided username.
  58  |    * @param username - The username to enter
  59  |    */
  60  |   async fillUsername(username: string): Promise<void> {
  61  |     await this.usernameField.fill(username);
  62  |   }
  63  | 
  64  |   /**
  65  |    * Fills the password field in the sign-up form with the provided password.
  66  |    * @param password - The password to enter
  67  |    */
  68  |   async fillPassword(password: string): Promise<void> {
  69  |     await this.passwordField.fill(password);
  70  |   }
  71  | 
  72  |   /**
  73  |    * Clicks the "Sign up" button to submit the registration form.
  74  |    */
  75  |   async clickSignUpButton(): Promise<void> {
  76  |     // Listen for the alert dialog before clicking
  77  |     this.page.once('dialog', (dialog) => {
  78  |       dialog.accept();
  79  |     });
> 80  |     await this.signUpButton.click();
      |                             ^ Error: locator.click: Test timeout of 30000ms exceeded.
  81  |   }
  82  | 
  83  |   /**
  84  |    * Registers a new account with the provided credentials.
  85  |    * @param username - The username to register
  86  |    * @param password - The password to register
  87  |    */
  88  |   async registerNewAccount(username: string, password: string): Promise<void> {
  89  |     await this.fillUsername(username);
  90  |     await this.fillPassword(password);
  91  |     await this.clickSignUpButton();
  92  |   }
  93  | 
  94  |   /**
  95  |    * Generates a random username with timestamp to ensure uniqueness.
  96  |    * @returns A unique random username
  97  |    */
  98  |   generateRandomUsername(): string {
  99  |     const timestamp = Date.now();
  100 |     return `testuser_${timestamp}`;
  101 |   }
  102 | 
  103 |   /**
  104 |    * Generates a random password with special characters for security testing.
  105 |    * @returns A random password
  106 |    */
  107 |   generateRandomPassword(): string {
  108 |     const timestamp = Date.now();
  109 |     return `TestPass_${timestamp}!`;
  110 |   }
  111 | 
  112 |   /**
  113 |    * Waits for the sign-up modal to become visible.
  114 |    */
  115 |   async waitForSignUpModalVisible(): Promise<void> {
  116 |     await this.signUpModal.waitFor({ state: 'visible', timeout: 5000 });
  117 |   }
  118 | 
  119 |   /**
  120 |    * Checks if the sign-up modal is visible.
  121 |    * @returns True if the sign-up modal is displayed, false otherwise
  122 |    */
  123 |   async isSignUpModalVisible(): Promise<boolean> {
  124 |     return this.signUpModal.isVisible();
  125 |   }
  126 | 
  127 |   /**
  128 |    * Waits for the sign-up modal to close after successful registration.
  129 |    */
  130 |   async waitForSuccessMessage(): Promise<void> {
  131 |     // Wait for the modal to be hidden after successful registration
  132 |     await this.signUpModal.waitFor({ state: 'hidden' });
  133 |   }
  134 | 
  135 |   /**
  136 |    * Clicks the "Log in" link in the navigation to open the login modal.
  137 |    */
  138 |   async clickLoginLink(): Promise<void> {
  139 |     await this.loginLink.click();
  140 |   }
  141 | 
  142 |   /**
  143 |    * Logs in with the provided credentials.
  144 |    * @param username - The username to log in with
  145 |    * @param password - The password to log in with
  146 |    */
  147 |   async login(username: string, password: string): Promise<void> {
  148 |     await this.clickLoginLink();
  149 |     await this.loginModal.waitFor({ state: 'visible' });
  150 |     await this.loginUsernameField.fill(username);
  151 |     await this.loginPasswordField.fill(password);
  152 | 
  153 |     // Listen for the alert dialog to accept it
  154 |     await this.acceptSignUpDialog();
  155 |     await this.loginButton.click();
  156 |     await this.loginModal.waitFor({ state: 'hidden' });
  157 |   }
  158 | 
  159 |   /**
  160 |    * Checks if the user is logged in by verifying the logout button is visible.
  161 |    * @returns True if logged in (logout button visible), false otherwise
  162 |    */
  163 |   async isLoggedIn(): Promise<boolean> {
  164 |     return this.logoutButton.isVisible();
  165 |   }
  166 | 
  167 |   /**
  168 |    * Accepts the sign-up dialog that appears after form submission.
  169 |    * Listens for and handles the alert dialog.
  170 |    */
  171 |   async acceptSignUpDialog(): Promise<void> {
  172 |     this.page.once('dialog', (dialog) => dialog.accept());
  173 |   }
  174 | }
  175 | 
```