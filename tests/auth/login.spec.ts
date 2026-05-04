// spec: specs/plan.md
// seed: tests/seed.spec.ts

import { test } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../pages/LoginPage';
import { getTestCredentials } from '../utils/config';

test.describe('User Authentication', () => {
  test('should login with created credentials and display username on homepage', async ({ page }) => {
    await allure.epic('User Management');
    await allure.feature('Authentication');
    await allure.story('User Login');
    await allure.severity('critical');
    await allure.tags('auth', 'login', 'smoke');
    await allure.owner('automation-team');
    await allure.testCaseId('TC002');
    // Load credentials from environment configuration
    const { username, password } = getTestCredentials();

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    // Login with the created credentials and verify username is displayed on homepage
    await loginPage.loginAndVerifyUsername(username, password);
  });
});
