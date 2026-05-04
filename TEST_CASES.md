# Test Cases with Specifications and Expected Results

## TC001 - Test Utilities: Data Seeding

**Test Suite:** Test Utilities  
**File:** tests/seed.spec.ts  
**Severity:** Normal

### Specification

1. Setup test infrastructure for automated testing
2. Prepare test data and utilities for subsequent test execution

### Expected Result

- Test infrastructure is initialized
- Data seeding setup is completed successfully
- Test utilities are ready for use

---

## TC002 - User Authentication: Login with Credentials

**Test Suite:** User Authentication  
**File:** tests/auth/login.spec.ts  
**Severity:** Critical

### Specification

1. Load test credentials from environment configuration
2. Navigate to the login page
3. Enter valid username and password
4. Click login button
5. Verify user authentication is successful

### Expected Result

- Login page displays correctly
- User successfully logs in with valid credentials
- Username is displayed on the homepage
- User session is established

---

## TC003 - User Authentication: Create New Account

**Test Suite:** User Authentication  
**File:** tests/auth/signup.spec.ts  
**Severity:** Critical

### Specification

1. Generate random username and password
2. Navigate to the signup page
3. Click "Sign up" link in the navigation
4. Wait for sign-up modal to appear
5. Fill in username field with random username
6. Fill in password field with random password
7. Submit the sign-up form
8. Accept success alert dialog
9. Login with newly created credentials
10. Verify username is displayed on homepage

### Expected Result

- Sign-up modal displays successfully
- Random credentials are entered correctly
- Account is created successfully
- Success alert is shown
- Sign-up modal closes after registration
- User can successfully login with new credentials
- Username is displayed on homepage

---

## TC004 - Product Listing: Extract Products from Multiple Pages

**Test Suite:** Demoblaze Product Listing  
**File:** tests/products/product-listing.spec.ts  
**Severity:** Normal

### Specification

1. Navigate to Demoblaze homepage
2. Wait for products to load
3. Extract all products from first page
4. Navigate to second page
5. Extract all products from second page
6. Combine and verify product list data
7. Verify each product has required fields (name, price, href)
8. Export products to JSON and text files

### Expected Result

- Products load successfully from both pages
- Total product count is greater than 1 page (>9 products)
- Each product has all required fields (name, price, href)
- All data is properly exported to files
- No missing or malformed product data

---

## TC005 - Product Listing: Verify Product Data Consistency

**Test Suite:** Demoblaze Product Listing  
**File:** tests/products/product-listing.spec.ts  
**Severity:** Normal

### Specification

1. Navigate to Demoblaze homepage
2. Wait for products to load
3. Extract all products from first and second page
4. Validate each product has consistent data structure
5. Verify price format contains digits, $, or comma
6. Verify product name is not empty
7. Verify product href is not empty

### Expected Result

- Products are successfully retrieved from both pages
- All products have consistent data structure
- All prices are in valid format (contain digits, $, or comma)
- All product names are non-empty
- All product links (href) are non-empty
- No data inconsistencies found

---

## TC006 - Cart Management: Add, Verify, and Delete Items

**Test Suite:** Cart Management  
**File:** tests/cart/cart-management.spec.ts  
**Severity:** High

### Specification

1. Navigate to products page
2. Clear any existing cart items from previous tests
3. Retrieve all available products with prices
4. Click on first product and add to cart
5. Return to products page
6. Click on second product and add to cart
7. Navigate to cart page
8. Verify both products are in cart
9. Verify cart total equals sum of both product prices
10. Delete first product from cart
11. Verify cart item count decreased
12. Verify first product is no longer in cart

### Expected Result

- Both products are successfully added to cart
- Cart displays both products with correct names
- Cart total price is calculated correctly (sum of both products)
- First product is successfully deleted from cart
- Cart item count decreases after deletion
- Cart total is updated after deletion
- Remaining product is still in cart

---

## TC007 - Checkout: Logged-in User Purchase

**Test Suite:** Buy Item Workflow  
**File:** tests/buy/logged-in-user-buy-item.spec.ts  
**Severity:** Critical

### Specification

1. Navigate to Demoblaze homepage
2. Click login link and open login modal
3. Enter valid username and password
4. Verify user is logged in (welcome message displays)
5. Navigate to products page
6. Click on specified test product
7. Verify product details are displayed correctly
8. Click "Add to Cart" button
9. Navigate to cart page
10. Verify product is in cart
11. Verify cart total is >= product price (360)
12. Click "Place Order" button
13. Fill order form with valid information (name, country, city, credit card, month, year)
14. Click "Purchase" button
15. Verify order confirmation page displays
16. Verify success message "Thank you for your purchase!" is visible
17. Verify order ID is displayed

### Expected Result

- User successfully logs in
- Welcome message displays username
- Product page loads with correct product details
- Product is successfully added to cart
- Cart displays correct total price
- Order form appears when Place Order is clicked
- Order is successfully completed
- Order confirmation page displays
- Success message is visible
- Order ID is generated and displayed

---

## TC008 - Checkout: Guest User Purchase

**Test Suite:** Buy Item Workflow  
**File:** tests/buy/not-logged-in-user-buy-item.spec.ts  
**Severity:** Critical

### Specification

1. Navigate to Demoblaze homepage without logging in
2. Verify login link is visible (user is not logged in)
3. Wait for products to load
4. Click on specified test product
5. Verify product details are displayed correctly
6. Click "Add to Cart" button
7. Navigate to cart page
8. Verify product is in cart
9. Verify cart total is >= product price (360)
10. Click "Place Order" button
11. Fill order form with guest information (name: Guest Buyer, country: Canada, city: Toronto, etc.)
12. Click "Purchase" button
13. Verify order confirmation page displays
14. Verify success message "Thank you for your purchase!" is visible
15. Verify order ID is displayed

### Expected Result

- User remains logged out (login link is visible)
- Product page loads correctly
- Product is successfully added to cart as guest
- Cart displays correct product and total price
- Guest order form appears when Place Order is clicked
- Order is successfully completed without login
- Order confirmation page displays
- Success message is visible
- Order ID is generated and displayed
- Guest checkout flow completes without authentication
