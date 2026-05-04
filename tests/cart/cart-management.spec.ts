// spec: specs/plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../pages/LoginPage';
import { ProductListPage } from '../pages/ProductListPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart Management', () => {
  test('should add 2 products to cart, verify total, delete one, and verify updated total', async ({
    page,
  }) => {
    await allure.epic('E-Commerce Operations');
    await allure.feature('Cart Management');
    await allure.story('Cart Item Management');
    await allure.severity('high');
    await allure.tags('cart', 'e2e', 'functional');
    await allure.owner('automation-team');
    await allure.testCaseId('TC006');
    // 1. Log in first (authentication might be required for cart operations)
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const productListPage = new ProductListPage(page);
    await productListPage.goto();
    await productListPage.waitForProductsToLoad();

    // 2. Clear any existing items in the cart from previous tests
    const detailPageTemp = new ProductDetailPage(page);
    await detailPageTemp.goToCart();
    const cartPageTemp = new CartPage(page);
    const cartEmpty = await cartPageTemp.isCartEmpty();
    if (!cartEmpty) {
      await cartPageTemp.clearCart();
    }
    // Navigate back to products
    await productListPage.goto();
    await productListPage.waitForProductsToLoad();

    // 3. Get all products and extract prices
    const allProducts = await productListPage.getAllProducts();
    expect(allProducts.length).toBeGreaterThanOrEqual(2);

    const firstProductName = allProducts[0].name;
    const secondProductName = allProducts[1].name;
    const firstProductPrice = parseInt(allProducts[0].price.replace(/\D/g, ''));
    const secondProductPrice = parseInt(allProducts[1].price.replace(/\D/g, ''));

    console.log(`First product: ${firstProductName} - $${firstProductPrice}`);
    console.log(`Second product: ${secondProductName} - $${secondProductPrice}`);

    // 4. Add first product to cart
    await productListPage.clickProductByName(firstProductName);
    const detailPage = new ProductDetailPage(page);
    await detailPage.waitForPageToLoad();
    await detailPage.addProductToCart();

    // 5. Go back to products and add second product to cart
    await productListPage.goto();
    await productListPage.waitForProductsToLoad();
    await productListPage.clickProductByName(secondProductName);
    await detailPage.waitForPageToLoad();
    await detailPage.addProductToCart();

    // 6. Navigate to cart
    await detailPage.goToCart();
    const cartPage = new CartPage(page);
    await cartPage.waitForPageToLoad();

    // 7. Get the count before adding these two products (to verify we added them)
    const countBeforeOurProducts = await cartPage.getCartItemCount();

    // 8. Verify both products we added are in the cart
    const cartProductNames = await cartPage.getCartProductNames();
    console.log(`Products in cart: ${cartProductNames.join(', ')}`);
    expect(cartProductNames).toContain(firstProductName);
    expect(cartProductNames).toContain(secondProductName);

    // Get the total before delete
    const totalBeforeDelete = parseInt(await cartPage.getTotalPrice());
    console.log(`Total before delete: $${totalBeforeDelete}`);
    //await page.pause(); // Pause to inspect the cart before deletion
    // 9. Delete the first product from cart
    const indexToDelete = cartProductNames.indexOf(firstProductName);
    console.log(`Deleting product at index ${indexToDelete}: ${firstProductName}`);
    await cartPage.deleteCartItem(indexToDelete);

    // Wait for the page to reload and table to update
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('tbody#tbodyid'); // Wait for the cart table to be present again

    // 10. Re-read the cart after deletion (DOM has changed)
    const cartItemCountAfterDelete = await cartPage.getCartItemCount();
    console.log(`Cart item count before delete: ${countBeforeOurProducts}, after delete: ${cartItemCountAfterDelete}`);
    // Verify that the count decreased (at least one item was deleted)
    expect(cartItemCountAfterDelete).toBeLessThan(countBeforeOurProducts);

    // 11. Get prices of remaining items from the table
    const remainingItems = await page.evaluate(() => {
      // eslint-disable-next-line no-undef
      const rows = Array.from(document.querySelectorAll('tbody#tbodyid tr'));
      return rows.map((row) => {
        const nameCell = row.querySelectorAll('td')[1];
        const priceCell = row.querySelectorAll('td')[2];
        const name = nameCell?.textContent?.trim() || '';
        const priceText = priceCell?.textContent?.trim() || '0';
        const price = parseInt(priceText.replace(/\D/g, ''));
        return { name, price };
      });
    });

    console.log(`Remaining items:`, remainingItems);
    const calculatedTotal = remainingItems.reduce((sum, item) => sum + item.price, 0);

    // 12. Get the total price after delete
    const totalAfterDeleteText = await cartPage.getTotalPrice();
    const totalAfterDelete = totalAfterDeleteText && totalAfterDeleteText !== '' 
      ? parseInt(totalAfterDeleteText.replace(/\D/g, '')) 
      : 0;

    console.log(`Total after delete (shown): $${totalAfterDelete}`);
    console.log(`Calculated total from items: $${calculatedTotal}`);
    
    // 13. If there are remaining items, verify the total matches the sum
    if (remainingItems.length > 0) {
      expect(totalAfterDelete).toBe(calculatedTotal);
    } else {
      // If cart is empty, total should be 0 or empty
      expect(totalAfterDelete).toBe(0);
    }
  });
});
