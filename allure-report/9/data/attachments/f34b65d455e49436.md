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
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Thank you for your purchase!' })
Expected: visible
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
            - textbox "Country:" [ref=e16]: USA
          - generic [ref=e17]:
            - generic [ref=e18]: "City:"
            - textbox "City:" [ref=e19]: New York
          - generic [ref=e20]:
            - generic [ref=e21]: "Credit card:"
            - textbox "Credit card:" [ref=e22]: "1234567890123456"
          - generic [ref=e23]:
            - generic [ref=e24]: "Month:"
            - textbox "Month:" [ref=e25]: "12"
          - generic [ref=e26]:
            - generic [ref=e27]: "Year:"
            - textbox "Year:" [ref=e28]: "2025"
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
        - listitem
        - listitem [ref=e48]:
          - link "Log out" [ref=e49]:
            - /url: "#"
        - listitem [ref=e50]:
          - link "Welcome abstractaQA" [ref=e51]:
            - /url: "#"
        - listitem
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
  1   | // spec: specs/plan.md
  2   | // seed: tests/seed.spec.ts
  3   | 
  4   | import { test, expect } from '@playwright/test';
  5   | import { allure } from 'allure-playwright';
  6   | import { LoginPage } from '../pages/LoginPage';
  7   | import { ProductListPage } from '../pages/ProductListPage';
  8   | import { ProductDetailPage } from '../pages/ProductDetailPage';
  9   | import { CartPage } from '../pages/CartPage';
  10  | import { PlaceOrderPage } from '../pages/PlaceOrderPage';
  11  | import { getEnvironmentConfig } from '../utils/config';
  12  | 
  13  | test.describe('Buy Item Workflow', () => {
  14  |   // TODO: Implement API call to delete endpoint in beforeAll to ensure the cart is totally empty for this user before running this test
  15  |   test.beforeAll(async () => {
  16  |     // Clear cart via API
  17  |   });
  18  | 
  19  |   test('Logged-in user can successfully purchase an item', async ({ page }) => {
  20  |     await allure.epic('E-Commerce Operations');
  21  |     await allure.feature('Purchase Flow');
  22  |     await allure.story('Authenticated User Checkout');
  23  |     await allure.severity('critical');
  24  |     await allure.tags('purchase', 'checkout', 'e2e', 'authenticated');
  25  |     await allure.owner('automation-team');
  26  |     await allure.testCaseId('TC007');
  27  |     // 1. Navigate to Demoblaze homepage and log in with valid credentials
  28  |     const config = getEnvironmentConfig();
  29  |     const loginPage = new LoginPage(page);
  30  |     await loginPage.goto();
  31  | 
  32  |     // Click the Log in link to open the login modal
  33  |     await loginPage.clickLoginLink();
  34  | 
  35  |     // Fill in the username and password fields
  36  |     await loginPage.fillUsername(config.testUsername);
  37  |     await loginPage.fillPassword(config.testPassword);
  38  | 
  39  |     // Click the Log in button
  40  |     await loginPage.clickLoginButton();
  41  | 
  42  |     // Wait for login to complete and verify user is logged in
  43  |     const welcomeLink = page.getByRole('link', { name: /Welcome/ });
  44  |     await expect(welcomeLink).toBeVisible();
  45  | 
  46  |     // 2. Navigate to products and click on the specified product
  47  |     const productName = config.testProductName;
  48  |     const productPage = new ProductListPage(page);
  49  |     await productPage.waitForProductsToLoad();
  50  | 
  51  |     // Click on the specified product
  52  |     await productPage.clickProductByName(productName);
  53  | 
  54  |     // 3. Verify product details are displayed
  55  |     const detailPage = new ProductDetailPage(page);
  56  |     await detailPage.waitForPageToLoad();
  57  |     const title = await detailPage.getProductTitle();
  58  |     expect(title).toContain(productName);
  59  | 
  60  |     // 4. Add product to cart
  61  |     await detailPage.addProductToCart();
  62  | 
  63  |     // 5. Navigate to cart and verify product is there
  64  |     await detailPage.goToCart();
  65  | 
  66  |     const cartPage = new CartPage(page);
  67  |     await cartPage.waitForPageToLoad();
  68  | 
  69  |     // Verify the product is in cart
  70  |     const cartItems = await cartPage.getCartProductNames();
  71  |     expect(cartItems).toContain(productName);
  72  | 
  73  |     // Verify the total price is at least 360 (the product price)
  74  |     const totalPrice = await cartPage.getTotalPrice();
  75  |     const priceValue = parseInt(totalPrice);
  76  |     expect(priceValue).toBeGreaterThanOrEqual(360);
  77  | 
  78  |     // 6. Click Place Order and verify order form appears
  79  |     await cartPage.clickPlaceOrder();
  80  | 
  81  |     // Fill in the order form
  82  |     const placeOrderPage = new PlaceOrderPage(page);
  83  |     await placeOrderPage.fillOrderForm({
  84  |       name: 'Test Buyer',
  85  |       country: 'USA',
  86  |       city: 'New York',
  87  |       creditCard: '1234567890123456',
  88  |       month: '12',
  89  |       year: '2025',
  90  |     });
  91  | 
  92  |     // 7. Click Purchase and verify order confirmation
  93  |     await placeOrderPage.clickPurchase();
  94  | 
  95  |     // Verify the success message appears
  96  |     const successHeading = page.getByRole('heading', { name: 'Thank you for your purchase!' });
> 97  |     await expect(successHeading).toBeVisible();
      |                                  ^ Error: expect(locator).toBeVisible() failed
  98  | 
  99  |     // Verify order details are displayed
  100 |     const idText = page.getByText(/Id: \d+/);
  101 |     await expect(idText).toBeVisible();
  102 |   });
  103 | });
  104 | 
```