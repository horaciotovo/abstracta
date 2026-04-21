---
name: create-playwright-test.md
description: Describe when to use this prompt
---

<!-- Tip: Use /create-prompt in chat to generate content with agent assistance -->

Create a Playwright test for the following scenario:

${input:scenario}

Instructions:

- Inspect nearby tests, fixtures, helpers, and page objects before writing code.
- Reuse existing patterns, setup utilities, and selectors.
- Follow repository instructions and Playwright test standards.
- Use business terminology from the codebase.
- Prefer stable locators and deterministic setup.
- Do not add unnecessary assertions.
- If required, update or extend an existing page object rather than duplicating logic.

Deliver:

1. A page object class that encapsulates all selectors and interactions for the page
2. The new test code that uses the page object
3. A brief note explaining the business outcome covered
4. Any assumptions made

Page object requirements:
- Extract all locators (`getByTestId`, `getByRole`, etc.) into the page object
- Create methods for user actions (e.g., `login()`, `fillUsername()`, `clickLoginButton()`)
- Use meaningful method names that reflect business intent
- Keep page objects focused and single-purpose
- Never hardcode test data; pass it as parameters to methods
