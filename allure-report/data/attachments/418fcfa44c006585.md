# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart\cart-management.spec.ts >> Cart Management >> should add 2 products to cart, verify total, delete one, and verify updated total
- Location: tests\cart\cart-management.spec.ts:13:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('tbody#tbodyid') to be visible
    6 × locator resolved to hidden <tbody id="tbodyid">↵            </tbody>

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - text:             
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - link "PRODUCT STORE" [ref=e4] [cursor=pointer]:
        - /url: index.html
        - img [ref=e5]
        - text: PRODUCT STORE
      - list [ref=e7]:
        - listitem [ref=e8]:
          - link "Home (current)" [ref=e9] [cursor=pointer]:
            - /url: index.html
            - text: Home
            - generic [ref=e10]: (current)
        - listitem [ref=e11]:
          - link "Contact" [ref=e12] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e13]:
          - link "About us" [ref=e14] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e15]:
          - link "Cart" [ref=e16] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e17]:
          - link "Log in" [ref=e18] [cursor=pointer]:
            - /url: "#"
        - listitem
        - listitem
        - listitem [ref=e19]:
          - link "Sign up" [ref=e20] [cursor=pointer]:
            - /url: "#"
  - generic [ref=e22]:
    - generic [ref=e23]:
      - heading "Products" [level=2] [ref=e24]
      - table [ref=e26]:
        - rowgroup [ref=e27]:
          - row "Pic Title Price x" [ref=e28]:
            - columnheader "Pic" [ref=e29]
            - columnheader "Title" [ref=e30]
            - columnheader "Price" [ref=e31]
            - columnheader "x" [ref=e32]
        - rowgroup
    - generic [ref=e33]:
      - heading "Total" [level=2] [ref=e34]
      - generic:
        - generic:
          - heading [level=3]
      - button "Place Order" [ref=e35]
  - generic [ref=e37]:
    - generic [ref=e40]:
      - heading "About Us" [level=4] [ref=e41]
      - paragraph [ref=e42]: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
    - generic [ref=e45]:
      - heading "Get in Touch" [level=4] [ref=e46]
      - paragraph [ref=e47]: "Address: 2390 El Camino Real"
      - paragraph [ref=e48]: "Phone: +440 123456"
      - paragraph [ref=e49]: "Email: demo@blazemeter.com"
    - heading "PRODUCT STORE" [level=4] [ref=e53]:
      - img [ref=e54]
      - text: PRODUCT STORE
  - contentinfo [ref=e55]:
    - paragraph [ref=e56]: Copyright © Product Store
```

# Test source

```ts
  1   | import { Locator, Page, expect } from '@playwright/test';
  2   | 
  3   | /**
  4   |  * CartPage represents the shopping cart page of Demoblaze.
  5   |  * It encapsulates all selectors and interactions for cart operations.
  6   |  */
  7   | export class CartPage {
  8   |   readonly cartTable: Locator;
  9   |   readonly cartItems: Locator;
  10  |   readonly totalPrice: Locator;
  11  |   readonly placeOrderButton: Locator;
  12  |   readonly deleteButtons: Locator;
  13  |   readonly emptyCartMessage: Locator;
  14  | 
  15  |   /**
  16  |    * Creates an instance of CartPage.
  17  |    * @param page - The Playwright page object
  18  |    */
  19  |   constructor(readonly page: Page) {
  20  |     this.cartTable = this.page.locator('tbody#tbodyid');
  21  |     this.cartItems = this.page.locator('tbody#tbodyid tr');
  22  |     this.totalPrice = this.page.locator('h3#totalp');
  23  |     this.placeOrderButton = this.page.getByRole('button', { name: 'Place Order' });
  24  |     this.deleteButtons = this.page.getByRole('link', { name: 'Delete' });
  25  |     this.emptyCartMessage = this.page.locator('text=No products in your cart');
  26  |   }
  27  | 
  28  |   /**
  29  |    * Waits for the cart page to load.
  30  |    */
  31  |   async waitForPageToLoad(): Promise<void> {
> 32  |     await this.cartTable.waitFor({ state: 'visible' });
      |                          ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  33  |   }
  34  | 
  35  |   /**
  36  |    * Gets the number of items in the cart.
  37  |    * @returns The count of cart items
  38  |    */
  39  |   async getCartItemCount(): Promise<number> {
  40  |     return await this.cartItems.count();
  41  |   }
  42  | 
  43  |   /**
  44  |    * Gets the total price displayed on the cart page.
  45  |    * @returns The total price text
  46  |    */
  47  |   async getTotalPrice(): Promise<string> {
  48  |     return await this.totalPrice.textContent() || '';
  49  |   }
  50  | 
  51  |   /**
  52  |    * Gets all product names currently in the cart.
  53  |    * @returns An array of product name text content
  54  |    */
  55  |   async getCartProductNames(): Promise<string[]> {
  56  |     const names: string[] = [];
  57  |     const count = await this.cartItems.count();
  58  | 
  59  |     for (let i = 0; i < count; i++) {
  60  |       const row = this.cartItems.nth(i);
  61  |       const nameCell = row.locator('td').nth(1);
  62  |       const name = await nameCell.textContent() || '';
  63  |       names.push(name.trim());
  64  |     }
  65  | 
  66  |     return names;
  67  |   }
  68  | 
  69  |   /**
  70  |    * Clicks the "Place Order" button to initiate checkout.
  71  |    */
  72  |   async clickPlaceOrder(): Promise<void> {
  73  |     await this.placeOrderButton.click();
  74  |   }
  75  | 
  76  |   /**
  77  |    * Checks if the cart is empty.
  78  |    * @returns True if cart is empty, false otherwise
  79  |    */
  80  |   async isCartEmpty(): Promise<boolean> {
  81  |     try {
  82  |       await this.emptyCartMessage.waitFor({ state: 'visible', timeout: 3000 });
  83  |       return true;
  84  |     } catch {
  85  |       return false;
  86  |     }
  87  |   }
  88  | 
  89  |   /**
  90  |    * Deletes an item from the cart by index.
  91  |    * @param index - The 0-based index of the item to delete
  92  |    */
  93  |   async deleteCartItem(index: number): Promise<void> {
  94  |     await this.deleteButtons.nth(index).click();
  95  |     // Wait for the delete operation to complete
  96  |     await this.page.waitForTimeout(800);
  97  |   }
  98  | 
  99  |   /**
  100 |    * Deletes an item from the cart by product name.
  101 |    * @param productName - The name of the product to delete
  102 |    */
  103 |   async deleteCartItemByName(productName: string): Promise<void> {
  104 |     // Find the row containing this product name
  105 |     const row = this.cartItems.filter({
  106 |       has: this.page.locator('td').filter({ hasText: productName }).first(),
  107 |     }).first();
  108 |     
  109 |     const deleteLink = row.getByRole('link', { name: 'Delete' });
  110 |     
  111 |     // Set up dialog handler to accept the first confirmation dialog
  112 |     this.page.once('dialog', (dialog) => {
  113 |       dialog.accept();
  114 |     });
  115 |     
  116 |     await deleteLink.click();
  117 |     // Wait a moment for the delete operation to complete
  118 |     await this.page.waitForTimeout(500);
  119 |   }
  120 | 
  121 |   /**
  122 |    * Clears all items from the cart.
  123 |    */
  124 |   async clearCart(): Promise<void> {
  125 |     let itemCount = await this.getCartItemCount();
  126 |     const maxAttempts = 10;
  127 |     let attempts = 0;
  128 |     
  129 |     while (itemCount > 0 && attempts < maxAttempts) {
  130 |       try {
  131 |         await this.deleteCartItem(0);
  132 |         // Wait a moment for the DOM to update
```