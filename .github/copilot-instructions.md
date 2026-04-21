# Repository instructions

This repository uses Playwright for end-to-end and integration UI testing.

General rules:
- Reuse existing fixtures, helpers, and page objects before creating new ones.
- Prefer stable locators in this order:
  1. getByTestId
  2. getByRole with accessible name
  3. getByLabel
  4. text-based locator only as last resort
- Never use brittle CSS chains or nth-child unless no better option exists.
- Do not add arbitrary waits. Prefer Playwright auto-waiting and explicit assertions.
- When fixing a test, identify whether the failure is due to:
  - selector drift
  - timing/synchronization
  - test data
  - environment
  - product regression
- Minimize changes. Explain root cause in the final response.
- Always run the narrowest relevant test command first.
- When creating tests, follow existing file naming and describe-block conventions.

## Page Objects

When creating page objects:
- Add JSDoc comments to all public methods explaining their purpose, parameters, and return values
- Document what user action the method represents (e.g., "Clicks the login button")
- Include parameter descriptions with types and expected values
- Document return types and what they represent
- Keep comments concise but complete

Example:
```typescript
/**
 * Logs in with the provided credentials.
 * @param username - The username to enter
 * @param password - The password to enter
 */
async login(username: string, password: string) {
  // implementation
}

/**
 * Checks if the error message is visible on the page.
 * @returns True if error message is displayed, false otherwise
 */
async isErrorMessageVisible(): Promise<boolean> {
  // implementation
}
```

## TypeScript Best Practices

### Type Safety
- Always enable strict mode in `tsconfig.json` (`"strict": true`)
- Avoid using `any` type. Use `unknown` when type is truly uncertain, or define proper types/interfaces
- Always provide explicit return types for functions and methods
- Use `const` assertions for readonly data and literal types

### Interfaces and Types
- Prefer `interface` for defining object shapes and class contracts
- Use `type` for unions, tuples, and complex type combinations
- Define interfaces/types at module level, not inline
- Use `readonly` for properties that should not be modified
- Create specific types instead of using generic objects (`Record<string, any>`)

### Async and Promises
- Always specify return type `Promise<T>` for async functions
- Use `await` instead of `.then()` chains for better readability
- Handle promise rejections with proper error handling and type guards

### Naming Conventions
- Use `PascalCase` for classes, interfaces, and type names
- Use `camelCase` for variables, function names, and properties
- Use `UPPER_SNAKE_CASE` for constants
- Use descriptive names that clearly indicate purpose and type

### Generics
- Use generics to create reusable, type-safe utilities
- Always constrain generic types where appropriate (`<T extends SomeType>`)
- Document generic parameters in JSDoc comments

### Null and Undefined Handling
- Enable `strictNullChecks` to catch null/undefined errors at compile time
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Use type guards to narrow types before accessing properties: `if (value !== null && value !== undefined)`

### Error Handling
- Define specific error types instead of catching generic `Error`
- Use type guards to validate data before operations
- Document potential errors in JSDoc comments using `@throws`

### Imports and Exports
- Use explicit named exports instead of default exports when possible
- Group imports logically: external dependencies first, then internal modules
- Keep import paths consistent using project aliases when configured

## ESLint Configuration

ESLint should be configured to enforce code quality and consistency across the repository.

### Setup
- Ensure ESLint is installed: `npm install --save-dev eslint`
- Install TypeScript ESLint parser and plugin: `npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser`
- Create or update `.eslintrc.json` or `.eslintrc.js` in the repository root

### ESLint Configuration Best Practices
- Enable strict rules that align with TypeScript best practices
- Configure the parser to use `@typescript-eslint/parser` for TypeScript files
- Enable plugins: `@typescript-eslint` for TypeScript-specific rules
- Set recommended rulesets as a baseline: `extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended']`
- Use `@typescript-eslint/explicit-function-return-types` to enforce return type annotations
- Use `@typescript-eslint/no-explicit-any` to prevent usage of `any` type
- Use `@typescript-eslint/no-unused-vars` to catch unused variables at lint time

### CI Integration
- Add ESLint to your CI/CD pipeline by including a lint script in `package.json`:
  ```json
  "scripts": {
    "lint": "eslint src/**/*.ts tests/**/*.ts",
    "lint:fix": "eslint src/**/*.ts tests/**/*.ts --fix"
  }
  ```
- Run `npm run lint` in CI to catch linting errors before merging code
- Use `npm run lint:fix` locally to automatically fix fixable issues