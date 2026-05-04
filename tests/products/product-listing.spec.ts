import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import {
  ProductListPage,
  Product,
} from '../pages/ProductListPage';
import { exportProducts } from '../utils/productExporter';

test.describe('Demoblaze Product Listing', () => {
  let productPage: ProductListPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductListPage(page);
    await productPage.goto();
  });

    test('should extract all products from first and second page', async () => {
    await allure.epic('Product Management');
    await allure.feature('Product Discovery');
    await allure.story('Extract Product Data');
    await allure.severity('normal');
    await allure.tags('products', 'data-extraction', 'functional');
    await allure.owner('automation-team');
    await allure.testCaseId('TC004');
    // Arrange & Act
    const products = await productPage.getAllProductsFromMultiplePages(2);

    // Assert to verify that product list is not empty
    expect(products.length).toBeGreaterThan(0);

    //Assert to verify the products amount is greather than 1 page
    expect(products.length).toBeGreaterThan(9);

    // Verify each product has required fields
    products.forEach((product: Product) => {
      expect(product.name).toBeTruthy();
      expect(product.price).toBeTruthy();
      expect(product.href).toBeTruthy();
    });

    // Log the product list for verification
    console.log('=== Demoblaze Product List (Page 1 & 2) ===');
    console.table(products);

    // Export products to JSON and text files
    await exportProducts(products);
  });


  test('should verify all products have consistent data structure', async () => {
    await allure.epic('Product Management');
    await allure.feature('Product Discovery');
    await allure.story('Verify Product Data Consistency');
    await allure.severity('normal');
    await allure.tags('products', 'data-validation', 'functional');
    await allure.owner('automation-team');
    await allure.testCaseId('TC005');
    // Arrange & Act
     const products = await productPage.getAllProductsFromMultiplePages(2);

    // Assert
    products.forEach((product: Product) => {
      // Verify price format (should contain $ or digit)
      expect(product.price).toMatch(/\d+|\$|,/);

      // Verify name is not empty
      expect(product.name.length).toBeGreaterThan(0);

      // Verify href is not empty
      expect(product.href.length).toBeGreaterThan(0);
    });
  });


});
