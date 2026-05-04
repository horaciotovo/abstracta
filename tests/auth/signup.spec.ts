// spec: specs/signup-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { SignUpPage } from '../pages/SignUpPage';
import { LoginPage } from '../pages/LoginPage';

test.describe('User Authentication', () => {
  let signUpPage: SignUpPage;
  let randomUsername: string;
  let randomPassword: string;

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    randomUsername = signUpPage.generateRandomUsername();
    randomPassword = signUpPage.generateRandomPassword();
    await signUpPage.goto();
  });

  test('should create a new account with random credentials', async ({ page }) => {
    await allure.epic('User Management');
    await allure.feature('Authentication');
    await allure.story('User Registration');
    await allure.severity('critical');
    await allure.tags('auth', 'signup', 'smoke');
    await allure.owner('automation-team');
    await allure.testCaseId('TC003');
    // Navigate to Demoblaze home page
    await signUpPage.goto();

    // Click on the "Sign up" link in the navigation
    await signUpPage.clickSignUpLink();

    // Wait for the sign-up modal to become visible
    await signUpPage.waitForSignUpModalVisible();

    // Fill in the sign-up form with random username
    await signUpPage.fillUsername(randomUsername);

    // Fill in the sign-up form with random password
    await signUpPage.fillPassword(randomPassword);

    // Click the "Sign up" button to submit the form
    // This also handles the success alert dialog automatically
    await signUpPage.clickSignUpButton();

    // Wait for success message to be processed
    await signUpPage.waitForSuccessMessage();

    // Verify the sign-up modal has closed after successful registration
    expect(await signUpPage.isSignUpModalVisible()).toBe(false);

    //Acept Sign up dialog
    await signUpPage.acceptSignUpDialog();

    // Login with the created credentials and verify username is displayed on homepage
    const loginPage = new LoginPage(signUpPage.page);
    await loginPage.loginAndVerifyUsername(randomUsername, randomPassword);
  });

});
