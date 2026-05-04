// spec: specs/plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../pages/LoginPage';
import { ProductListPage } from '../pages/ProductListPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';
import { PlaceOrderPage } from '../pages/PlaceOrderPage';
import { getEnvironmentConfig } from '../utils/config';

test.describe('Buy Item Workflow', () => {
  // TODO: Implement API call to delete endpoint in beforeAll to ensure the cart is totally empty for this user before running this test
  test.beforeAll(async () => {
    // Clear cart via API
  });

  test('Logged-in user can successfully purchase an item', async ({ page }) => {
    await allure.epic('E-Commerce Operations');
    await allure.feature('Purchase Flow');
    await allure.story('Authenticated User Checkout');
    await allure.severity('critical');
    await allure.tags('purchase', 'checkout', 'e2e', 'authenticated');
    await allure.owner('automation-team');
    await allure.testCaseId('TC007');
    // 1. Navigate to Demoblaze homepage and log in with valid credentials
    const config = getEnvironmentConfig();
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Click the Log in link to open the login modal
    await loginPage.clickLoginLink();

    // Fill in the username and password fields
    await loginPage.fillUsername(config.testUsername);
    await loginPage.fillPassword(config.testPassword);

    // Click the Log in button
    await loginPage.clickLoginButton();

    // Wait for login to complete and verify user is logged in
    const welcomeLink = page.getByRole('link', { name: /Welcome/ });
    await expect(welcomeLink).toBeVisible();

    // 2. Navigate to products and click on the specified product
    const productName = config.testProductName;
    const productPage = new ProductListPage(page);
    await productPage.waitForProductsToLoad();

    // Click on the specified product
    await productPage.clickProductByName(productName);

    // 3. Verify product details are displayed
    const detailPage = new ProductDetailPage(page);
    await detailPage.waitForPageToLoad();
    const title = await detailPage.getProductTitle();
    expect(title).toContain(productName);

    // 4. Add product to cart
    await detailPage.addProductToCart();

    // 5. Navigate to cart and verify product is there
    await detailPage.goToCart();

    const cartPage = new CartPage(page);
    await cartPage.waitForPageToLoad();

    // Verify the product is in cart
    const cartItems = await cartPage.getCartProductNames();
    expect(cartItems).toContain(productName);

    // Verify the total price is at least 360 (the product price)
    const totalPrice = await cartPage.getTotalPrice();
    const priceValue = parseInt(totalPrice);
    expect(priceValue).toBeGreaterThanOrEqual(360);

    // 6. Click Place Order and verify order form appears
    await cartPage.clickPlaceOrder();

    // Fill in the order form
    const placeOrderPage = new PlaceOrderPage(page);
    await placeOrderPage.fillOrderForm({
      name: 'Test Buyer',
      country: 'USA',
      city: 'New York',
      creditCard: '1234567890123456',
      month: '12',
      year: '2025',
    });

    // 7. Click Purchase and verify order confirmation
    await placeOrderPage.clickPurchase();

    // Verify the success message appears
    const successHeading = page.getByRole('heading', { name: 'Thank you for your purchase!' });
    await expect(successHeading).toBeVisible();

    // Verify order details are displayed
    const idText = page.getByText(/Id: \d+/);
    await expect(idText).toBeVisible();
  });
});
