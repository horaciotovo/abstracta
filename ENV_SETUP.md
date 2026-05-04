# Environment Configuration Guide

This project uses `.env` files to manage environment-specific configuration for different environments (QA, Staging, etc.).

## Setup

### 1. Install Dependencies

First, install the dotenv package:

```bash
npm install
```

### 2. Create Environment Files

The project includes pre-configured environment files:

- **`.env.qa`** - QA environment configuration
- **`.env.stg`** - Staging environment configuration
- **`.env.example`** - Example template for reference

### 3. Configure for Your Environment

Choose which environment to use by setting the `ENVIRONMENT` variable when running tests.

## Environment Variables

### Available Variables

| Variable        | Description                         | Default                    |
| --------------- | ----------------------------------- | -------------------------- |
| `ENVIRONMENT`   | Current environment (qa, stg, etc.) | qa                         |
| `BASE_URL`      | Application base URL                | https://www.demoblaze.com/ |
| `TEST_USERNAME` | Test user username                  | abstractaQA                |
| `TEST_PASSWORD` | Test user password                  | abstractaQA                |
| `HEADLESS`      | Run browser in headless mode        | false                      |

## Usage

### Running Tests with Different Environments

**QA Environment (default):**

```bash
npm run test
# or explicitly
ENVIRONMENT=qa npx playwright test
```

**Staging Environment:**

```bash
ENVIRONMENT=stg npx playwright test
```

**With specific project:**

```bash
ENVIRONMENT=stg npx playwright test --project=chromium
```

### Local Overrides

Create a `.env.local` file to override environment settings locally without affecting other environments:

```bash
# .env.local
BASE_URL=http://localhost:3000
HEADLESS=true
```

The `.env.local` file is automatically loaded last and takes precedence over all other environment files.

## Using Environment Configuration in Tests

Import the configuration utilities in your test files:

```typescript
import {
  getTestCredentials,
  getBaseUrl,
  getEnvironment,
} from "../utils/config";

test("my test", async ({ page }) => {
  const { username, password } = getTestCredentials();
  const environment = getEnvironment();

  console.log(`Running test in ${environment} environment`);
  // Use credentials in your test
});
```

### Available Utility Functions

- **`getTestCredentials()`** - Returns `{ username, password }`
- **`getBaseUrl()`** - Returns the base URL for current environment
- **`getEnvironment()`** - Returns the current environment name (qa, stg, etc.)
- **`getEnvironmentConfig()`** - Returns full environment configuration object

## File Structure

```
.
├── .env.qa              # QA environment config
├── .env.stg             # Staging environment config
├── .env.example         # Template for reference
├── .env.local           # Local overrides (gitignored)
├── playwright.config.ts # Loads env config on startup
└── tests/
    ├── utils/
    │   └── config.ts    # Environment configuration utilities
    ├── auth/
    │   └── login.spec.ts # Test using env config
    └── ...
```

## Best Practices

1. **Never commit `.env` files with secrets** - Only commit `.env.example`
2. **Use `.env.local` for local development** - This file is gitignored
3. **Keep environment-specific configurations** in `.env.qa`, `.env.stg`, etc.
4. **Document new variables** in `.env.example`
5. **Validate required variables** - The config utilities throw errors if required variables are missing

## CI/CD Integration

For CI/CD pipelines, set environment variables before running tests:

```bash
# GitHub Actions example
- name: Run tests
  env:
    ENVIRONMENT: qa
    TEST_USERNAME: ${{ secrets.QA_USERNAME }}
    TEST_PASSWORD: ${{ secrets.QA_PASSWORD }}
  run: npm run test
```

## Troubleshooting

### "TEST_USERNAME and TEST_PASSWORD must be set" error

Ensure you have the correct `.env` file for your environment and both variables are set.

### Environment variables not loading

1. Check that `.env.{environment}` file exists
2. Verify file is in project root directory
3. Clear node cache: `rm -rf node_modules/.cache`
4. Restart Playwright: `npx playwright clean`
