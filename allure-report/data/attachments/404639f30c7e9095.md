# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: buy\not-logged-in-user-buy-item.spec.ts >> Buy Item Workflow >> Not logged-in user can add to cart and complete purchase as guest
- Location: tests\buy\not-logged-in-user-buy-item.spec.ts:13:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Thank you for your purchase!' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Thank you for your purchase!' })

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - dialog "Place order" [active] [ref=e2]:
    - document [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]:
          - heading "Place order" [level=5] [ref=e6]
          - button "Close" [ref=e7] [cursor=pointer]: ×
        - generic [ref=e9]:
          - generic [ref=e10]: "Total: 360"
          - generic [ref=e11]:
            - generic [ref=e12]: "Name:"
            - 'textbox "Total: 360 Name:" [ref=e13]'
          - generic [ref=e14]:
            - generic [ref=e15]: "Country:"
            - textbox "Country:" [ref=e16]: Canada
          - generic [ref=e17]:
            - generic [ref=e18]: "City:"
            - textbox "City:" [ref=e19]: Toronto
          - generic [ref=e20]:
            - generic [ref=e21]: "Credit card:"
            - textbox "Credit card:" [ref=e22]: "9876543210987654"
          - generic [ref=e23]:
            - generic [ref=e24]: "Month:"
            - textbox "Month:" [ref=e25]: "06"
          - generic [ref=e26]:
            - generic [ref=e27]: "Year:"
            - textbox "Year:" [ref=e28]: "2026"
        - generic [ref=e30]:
          - button "Close" [ref=e31]
          - button "Purchase" [ref=e32]
  - text:            X 
  - navigation [ref=e33]:
    - generic [ref=e34]:
      - link "PRODUCT STORE" [ref=e35]:
        - /url: index.html
        - img [ref=e36]
        - text: PRODUCT STORE
      - list [ref=e38]:
        - listitem [ref=e39]:
          - link "Home (current)" [ref=e40]:
            - /url: index.html
            - text: Home
            - generic [ref=e41]: (current)
        - listitem [ref=e42]:
          - link "Contact" [ref=e43]:
            - /url: "#"
        - listitem [ref=e44]:
          - link "About us" [ref=e45]:
            - /url: "#"
        - listitem [ref=e46]:
          - link "Cart" [ref=e47]:
            - /url: "#"
        - listitem [ref=e48]:
          - link "Log in" [ref=e49]:
            - /url: "#"
        - listitem
        - listitem
        - listitem [ref=e50]:
          - link "Sign up" [ref=e51]:
            - /url: "#"
  - generic [ref=e53]:
    - generic [ref=e54]:
      - heading "Products" [level=2] [ref=e55]
      - table [ref=e57]:
        - rowgroup [ref=e58]:
          - row "Pic Title Price x" [ref=e59]:
            - columnheader "Pic" [ref=e60]
            - columnheader "Title" [ref=e61]
            - columnheader "Price" [ref=e62]
            - columnheader "x" [ref=e63]
        - rowgroup [ref=e64]:
          - row "Samsung galaxy s6 360 Delete" [ref=e65]:
            - cell [ref=e66]:
              - img [ref=e67]
            - cell "Samsung galaxy s6" [ref=e68]
            - cell "360" [ref=e69]
            - cell "Delete" [ref=e70]:
              - link "Delete" [ref=e71]:
                - /url: "#"
    - generic [ref=e72]:
      - heading "Total" [level=2] [ref=e73]
      - heading "360" [level=3] [ref=e76]
      - button "Place Order" [ref=e77]
  - generic [ref=e79]:
    - generic [ref=e82]:
      - heading "About Us" [level=4] [ref=e83]
      - paragraph [ref=e84]: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
    - generic [ref=e87]:
      - heading "Get in Touch" [level=4] [ref=e88]
      - paragraph [ref=e89]: "Address: 2390 El Camino Real"
      - paragraph [ref=e90]: "Phone: +440 123456"
      - paragraph [ref=e91]: "Email: demo@blazemeter.com"
    - heading "PRODUCT STORE" [level=4] [ref=e95]:
      - img [ref=e96]
      - text: PRODUCT STORE
  - contentinfo [ref=e97]:
    - paragraph [ref=e98]: Copyright © Product Store
```

# Test source

```ts
  1  | // spec: specs/plan.md
  2  | // seed: tests/seed.spec.ts
  3  | 
  4  | import { test, expect } from '@playwright/test';
  5  | import { allure } from 'allure-playwright';
  6  | import { ProductListPage } from '../pages/ProductListPage';
  7  | import { ProductDetailPage } from '../pages/ProductDetailPage';
  8  | import { CartPage } from '../pages/CartPage';
  9  | import { PlaceOrderPage } from '../pages/PlaceOrderPage';
  10 | import { getEnvironmentConfig } from '../utils/config';
  11 | 
  12 | test.describe('Buy Item Workflow', () => {
  13 |   test('Not logged-in user can add to cart and complete purchase as guest', async ({ page }) => {
  14 |     await allure.epic('E-Commerce Operations');
  15 |     await allure.feature('Purchase Flow');
  16 |     await allure.story('Guest Checkout');
  17 |     await allure.severity('critical');
  18 |     await allure.tags('purchase', 'checkout', 'e2e', 'guest');
  19 |     await allure.owner('automation-team');
  20 |     await allure.testCaseId('TC008');
  21 |     // 1. Navigate to Demoblaze homepage without logging in
  22 |     const config = getEnvironmentConfig();
  23 |     const productPage = new ProductListPage(page);
  24 |     await productPage.goto();
  25 | 
  26 |     // Verify the user is not logged in
  27 |     const loginLink = page.getByRole('link', { name: 'Log in' });
  28 |     await expect(loginLink).toBeVisible();
  29 | 
  30 |     // Wait for products to load
  31 |     await productPage.waitForProductsToLoad();
  32 | 
  33 |     // 2. Click on the specified product
  34 |     const productName = config.testProductName;
  35 |     await productPage.clickProductByName(productName);
  36 | 
  37 |     // 3. Verify product details are displayed
  38 |     const detailPage = new ProductDetailPage(page);
  39 |     await detailPage.waitForPageToLoad();
  40 |     const title = await detailPage.getProductTitle();
  41 |     expect(title).toContain(productName);
  42 | 
  43 |     // 4. Add product to cart (guest user)
  44 |     await detailPage.addProductToCart();
  45 | 
  46 |     // 5. Navigate to cart
  47 |     await detailPage.goToCart();
  48 | 
  49 |     // 6. Verify product is in cart with correct details
  50 |     const cartPage = new CartPage(page);
  51 |     await cartPage.waitForPageToLoad();
  52 | 
  53 |     const cartItems = await cartPage.getCartProductNames();
  54 |     expect(cartItems).toContain(productName);
  55 | 
  56 |     const totalPrice = await cartPage.getTotalPrice();
  57 |     const priceValue = parseInt(totalPrice);
  58 |     expect(priceValue).toBeGreaterThanOrEqual(360);
  59 | 
  60 |     // 7. Click Place Order to proceed with guest checkout
  61 |     await cartPage.clickPlaceOrder();
  62 | 
  63 |     // 8. Fill in guest order form
  64 |     const placeOrderPage = new PlaceOrderPage(page);
  65 |     await placeOrderPage.fillOrderForm({
  66 |       name: 'Guest Buyer',
  67 |       country: 'Canada',
  68 |       city: 'Toronto',
  69 |       creditCard: '9876543210987654',
  70 |       month: '06',
  71 |       year: '2026',
  72 |     });
  73 | 
  74 |     // 9. Complete the purchase
  75 |     await placeOrderPage.clickPurchase();
  76 | 
  77 |     // 10. Verify order confirmation (no login required)
  78 |     const successHeading = page.getByRole('heading', { name: 'Thank you for your purchase!' });
> 79 |     await expect(successHeading).toBeVisible();
     |                                  ^ Error: expect(locator).toBeVisible() failed
  80 | 
  81 |     // Verify order details
  82 |     const idText = page.getByText(/Id: \d+/);
  83 |     await expect(idText).toBeVisible();
  84 |   });
  85 | });
  86 | 
```