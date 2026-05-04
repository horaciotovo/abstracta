// spec: specs/plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { ProductListPage } from '../pages/ProductListPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';
import { PlaceOrderPage } from '../pages/PlaceOrderPage';
import { getEnvironmentConfig } from '../utils/config';

test.describe('Buy Item Workflow', () => {
  test('Not logged-in user can add to cart and complete purchase as guest', async ({ page }) => {
    await allure.epic('E-Commerce Operations');
    await allure.feature('Purchase Flow');
    await allure.story('Guest Checkout');
    await allure.severity('critical');
    await allure.tags('purchase', 'checkout', 'e2e', 'guest');
    await allure.owner('automation-team');
    await allure.testCaseId('TC008');
    // 1. Navigate to Demoblaze homepage without logging in
    const config = getEnvironmentConfig();
    const productPage = new ProductListPage(page);
    await productPage.goto();

    // Verify the user is not logged in
    const loginLink = page.getByRole('link', { name: 'Log in' });
    await expect(loginLink).toBeVisible();

    // Wait for products to load
    await productPage.waitForProductsToLoad();

    // 2. Click on the specified product
    const productName = config.testProductName;
    await productPage.clickProductByName(productName);

    // 3. Verify product details are displayed
    const detailPage = new ProductDetailPage(page);
    await detailPage.waitForPageToLoad();
    const title = await detailPage.getProductTitle();
    expect(title).toContain(productName);

    // 4. Add product to cart (guest user)
    await detailPage.addProductToCart();

    // 5. Navigate to cart
    await detailPage.goToCart();

    // 6. Verify product is in cart with correct details
    const cartPage = new CartPage(page);
    await cartPage.waitForPageToLoad();

    const cartItems = await cartPage.getCartProductNames();
    expect(cartItems).toContain(productName);

    const totalPrice = await cartPage.getTotalPrice();
    const priceValue = parseInt(totalPrice);
    expect(priceValue).toBeGreaterThanOrEqual(360);

    // 7. Click Place Order to proceed with guest checkout
    await cartPage.clickPlaceOrder();

    // 8. Fill in guest order form
    const placeOrderPage = new PlaceOrderPage(page);
    await placeOrderPage.fillOrderForm({
      name: 'Guest Buyer',
      country: 'Canada',
      city: 'Toronto',
      creditCard: '9876543210987654',
      month: '06',
      year: '2026',
    });

    // 9. Complete the purchase
    await placeOrderPage.clickPurchase();

    // 10. Verify order confirmation (no login required)
    const successHeading = page.getByRole('heading', { name: 'Thank you for your purchase!' });
    await expect(successHeading).toBeVisible();

    // Verify order details
    const idText = page.getByText(/Id: \d+/);
    await expect(idText).toBeVisible();
  });
});
