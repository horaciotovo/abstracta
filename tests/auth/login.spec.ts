import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Sauce Demo Authentication', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should successfully log in with valid credentials', async ({ page }) => {
    // Arrange
    const username = 'standard_user';
    const password = 'secret_sauce';

    // Act
    await loginPage.login(username, password);

    // Assert
    await expect(page).toHaveURL(/.*inventory/);
    await expect(page.getByText('Swag Labs')).toBeVisible();
  });
});
