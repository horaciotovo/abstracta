# Allure Report Metadata Guide

This document describes the Allure metadata structure implemented in the test suite to improve report organization and filtering.

## Overview

Allure metadata is added to all tests using decorators from the `allure-playwright` package. This helps organize tests into logical hierarchies and assign attributes for better reporting and analysis.

## Metadata Structure

Each test includes the following metadata attributes:

### 1. **Epic** (`allure.epic()`)

High-level business capabilities or features. Used to group related functionality.

Current Epics:

- `User Management` - Authentication and user account management
- `E-Commerce Operations` - Shopping and transaction features
- `Product Management` - Product catalog and discovery
- `Test Infrastructure` - Utilities and setup operations

### 2. **Feature** (`allure.feature()`)

Specific features within an epic. Represents a distinct functionality area.

Current Features:

- `Authentication` - Login and signup functionality
- `Purchase Flow` - Checkout and order processing
- `Cart Management` - Shopping cart operations
- `Product Discovery` - Product listing and search
- `Data Seeding` - Test data setup

### 3. **Story** (`allure.story()`)

User stories or specific test scenarios. The most granular business-level grouping.

Examples:

- `User Login` - Logging in with existing credentials
- `User Registration` - Creating a new account
- `Authenticated User Checkout` - Purchase flow for logged-in users
- `Guest Checkout` - Purchase flow for guest users
- `Cart Item Management` - Adding/removing items from cart
- `Extract Product Data` - Retrieving product information

### 4. **Severity** (`allure.severity()`)

Impact level of test failures on the system.

Levels:

- `blocker` - Application is completely unavailable
- `critical` - Major functionality is broken
- `normal` - Standard functionality issue
- `minor` - Small issues that don't affect core functionality
- `trivial` - Cosmetic issues

Current Assignment:

- `critical` - Authentication tests and purchase flows (core business value)
- `high` - Cart management (essential for shopping)
- `normal` - Product discovery and data seeding

### 5. **Tags** (`allure.tags()`)

Flexible labels for filtering and reporting. Multiple tags can be assigned per test.

Current Tags:

- **Functional Area**: `auth`, `cart`, `products`, `purchase`, `checkout`
- **User Type**: `authenticated`, `guest`
- **Test Type**: `smoke`, `e2e`, `functional`, `data-extraction`, `data-validation`
- **Operational**: `setup`, `seed`, `utility`

Example:

```typescript
await allure.tags("purchase", "checkout", "e2e", "authenticated");
```

### 6. **Owner** (`allure.owner()`)

Person or team responsible for the test. Currently set to `automation-team`.

## Test-to-Metadata Mapping

### Authentication Tests

- **File**: `tests/auth/login.spec.ts`
- **Epic**: User Management
- **Feature**: Authentication
- **Story**: User Login
- **Severity**: critical
- **Tags**: auth, login, smoke

- **File**: `tests/auth/signup.spec.ts`
- **Epic**: User Management
- **Feature**: Authentication
- **Story**: User Registration
- **Severity**: critical
- **Tags**: auth, signup, smoke

### Purchase Tests

- **File**: `tests/buy/logged-in-user-buy-item.spec.ts`
- **Epic**: E-Commerce Operations
- **Feature**: Purchase Flow
- **Story**: Authenticated User Checkout
- **Severity**: critical
- **Tags**: purchase, checkout, e2e, authenticated

- **File**: `tests/buy/not-logged-in-user-buy-item.spec.ts`
- **Epic**: E-Commerce Operations
- **Feature**: Purchase Flow
- **Story**: Guest Checkout
- **Severity**: critical
- **Tags**: purchase, checkout, e2e, guest

### Cart Tests

- **File**: `tests/cart/cart-management.spec.ts`
- **Epic**: E-Commerce Operations
- **Feature**: Cart Management
- **Story**: Cart Item Management
- **Severity**: high
- **Tags**: cart, e2e, functional

### Product Tests

- **File**: `tests/products/product-listing.spec.ts` (First test)
- **Epic**: Product Management
- **Feature**: Product Discovery
- **Story**: Extract Product Data
- **Severity**: normal
- **Tags**: products, data-extraction, functional

- **File**: `tests/products/product-listing.spec.ts` (Second test)
- **Epic**: Product Management
- **Feature**: Product Discovery
- **Story**: Verify Product Data Consistency
- **Severity**: normal
- **Tags**: products, data-validation, functional

### Seed Tests

- **File**: `tests/seed.spec.ts`
- **Epic**: Test Infrastructure
- **Feature**: Data Seeding
- **Story**: Test Data Setup
- **Severity**: normal
- **Tags**: seed, setup, utility

## Using Allure Reports

### Generate Report

```bash
npm run allure:generate
```

### View Report

```bash
npm run allure:report
```

### View Test Results HTML Report

```bash
npm test
# Open playwright-report/index.html
```

## Filtering in Allure Report

The metadata enables filtering by:

1. **Epic**: Group tests by business capability
2. **Feature**: Show tests for specific features
3. **Story**: View individual user story test coverage
4. **Severity**: Prioritize high-impact failures
5. **Tags**: Custom filters for test categories
6. **Owner**: Assign responsibility

### Example Filter Combinations

- Show all `critical` severity tests
- Show all tests with `smoke` tag
- Show all `E-Commerce Operations` epic tests
- Show tests owned by `automation-team` with `purchase` tag

## Adding Metadata to New Tests

When creating new tests, follow this template:

```typescript
import { test } from "@playwright/test";
import { allure } from "allure-playwright";

test.describe("Feature Name", () => {
  test("test description", async ({ page }) => {
    await allure.epic("Epic Name");
    await allure.feature("Feature Name");
    await allure.story("Story Name");
    await allure.severity("critical"); // critical, high, normal, minor, trivial
    await allure.tags("tag1", "tag2", "tag3");
    await allure.owner("owner-name");

    // Test implementation
  });
});
```

## Best Practices

1. **Be Consistent**: Use the same epic/feature names across all tests
2. **Use Severity Wisely**: Reserve `critical` for tests that validate core functionality
3. **Tag Strategically**: Use tags to enable useful filtering and reporting
4. **Owner Assignment**: Ensure tests are assigned to the team member responsible
5. **Update Metadata**: Keep metadata in sync with test changes
6. **Meaningful Stories**: Write story names that clearly describe test intent

## CI/CD Integration

The Allure report configuration in `playwright.config.ts` automatically captures:

- Test status (pass/fail/skip)
- Failure messages and stack traces
- Screenshots (on failure)
- Video recordings (on failure)
- Trace files (on failure)

All metadata is included in the Allure results directory (`allure-results/`) and can be used to generate detailed reports.
