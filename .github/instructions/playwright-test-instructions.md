---
applyTo: "tests/**/*.ts,e2e/**/*.ts,playwright/**/*.ts,src/**/*.spec.ts"
---

# Playwright test standards

- Use TypeScript.
- Reuse existing fixtures from the test framework setup.
- Prefer one business scenario per test unless nearby files use a different pattern.
- Use `test.step()` for major business actions when it improves readability.
- Keep assertions close to the outcome being verified.
- Avoid over-asserting cosmetic details unless the scenario explicitly requires them.
- Prefer API or backend helpers for setup when available instead of slow UI setup.
- Do not duplicate selectors that already exist in page objects or helpers.
- If no page object exists, only create one when it will be reused or when the flow is complex enough to justify it.
- Prefer robust assertions like visibility, enabled state, accessible name, and final persisted result.
- Avoid retry-based fixes unless the suite already relies on a documented retry policy.
- Do not weaken a valid assertion just to make the test pass.

When creating a test:
- Start by inspecting nearby test files for naming, fixture usage, and flow patterns.
- Match the repository's `describe` and test title conventions.
- Use business language in test names.
- Include only the assertions needed to verify the business outcome.

When fixing a test:
- Read the failure message first.
- Inspect the related test, helper, and page object before changing code.
- Prefer fixing the locator or synchronization logic over adding waits.
- Preserve the original intent of the test.