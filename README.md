# Custom Agents

End-to-end testing with Playwright and custom Copilot Chat prompts.

## Setup

### Install Copilot Chat Prompts

This repository includes custom prompts to streamline Playwright test creation. To make them available:

**Windows (PowerShell):**

```powershell
.\setup-prompts.ps1
```

**macOS/Linux (Bash):**

```bash
bash setup-prompts.sh
```

After running the setup script, reload VS Code. The custom prompts will be available in Copilot Chat with `/` autocomplete:

- `/create-playwright-test` - Generate a new Playwright test for a scenario
- `/fix-playwright-test` - Debug and fix a failing Playwright test
- `/stabilize-playwright-test` - Fix flaky or unstable Playwright tests

**Manual Setup** (if scripts don't work):

1. Copy files from `.vscode/prompts/*.md`
2. Paste into `~/.config/Code/User/prompts/` (Linux) or `%APPDATA%\Code\User\prompts\` (Windows)
3. Reload VS Code

<div style="background-color: #f0f7ff; border: 1px solid #b3d9ff; border-radius: 8px; padding: 20px; margin: 20px 0;">

## Business Context

This repository includes a business context instructions file (`.github/instructions/business-context-instructions.md`) that guides test creation with product terminology and user workflows.

<div style="background-color: #fff3cd; border-left: 4px solid #ff9800; padding: 15px; margin: 20px 0; border-radius: 4px;">
  <strong>⚠️ Important: How to Use Business Context</strong>
</div>

Before creating or fixing tests:

1. **Review your product's business concepts** — Identify and define:
   - User roles (Admin, Standard user, Viewer, etc.)
   - Core entities (Tenant/Organization, Workspace/Project, etc.)
   - Permission boundaries

2. **Identify the test scenario** — For each test, determine:
   - What user role is involved?
   - What business outcome should be validated?
   - Is this a critical-path flow or a low-risk convenience feature?

3. **Choose high-priority scenarios** to test first:
   - Authentication and session continuity
   - Authorization and permission boundaries
   - User invitations and role management
   - Creation, editing, and deletion of core business entities
   - Approval, review, or publish workflows
   - Error handling for failed actions

4. **Validate business outcomes**, not UI mechanics:
   - Use your product's business language in test names and assertions
   - For permissions, test both allowed and denied behavior
   - For destructive actions, confirm both success and post-action state
   - For workflows, assert meaningful state transitions

5. **When business context is unclear** in your tests:
   - Infer it from neighboring tests and page objects
   - Check route names and fixture setup
   - Use existing helper patterns for terminology

The prompts use this context to generate tests that validate real user value and critical workflows rather than just UI interactions.

</div>

## Prompts

### Create Playwright Test

Generate a new Playwright test following repository standards and business context.

**Usage:** `/create-playwright-test`

**When to use:** When you need to write a new test for a user scenario or feature.

**Inputs:** Scenario description for the test

**Output:**

- Page object class with all selectors and interactions
- New test code using the page object
- Business outcome explanation
- Assumptions made

**What it does:**

- Inspects nearby tests, fixtures, helpers, and page objects for patterns and reuse
- Enforces stable locators (`getByTestId`, `getByRole`, `getByLabel`)
- Ensures deterministic setup and avoids brittle selectors
- Reuses existing page objects rather than duplicating logic
- Applies repository standards and Playwright best practices

---

### Fix Playwright Test

Debug and fix a failing Playwright test by identifying the root cause and applying a minimal fix.

**Usage:** `/fix-playwright-test`

**When to use:** When you have a test that's failing and need to determine the cause and fix it.

**Inputs:** Failure details (error message, test output, or description)

**Output:**

- Likely root cause analysis
- Minimal code change applied
- Test execution result (PASSED/FAILED)
- Explanation of why the fix resolved the issue

**What it does:**

- Analyzes failure context and identifies the root cause (selector drift, timing, test data, environment, or product regression)
- Inspects the failing test, related helpers, page objects, and similar tests
- Makes the smallest safe fix without adding arbitrary waits
- Avoids weakening assertions unless the original expectation is incorrect
- Verifies the fix by running the test and confirms it passes
- Identifies if the failure indicates a product bug

---

### Stabilize Playwright Test

Fix flaky or unstable Playwright tests by addressing the underlying cause of intermittent failures.

**Usage:** `/stabilize-playwright-test`

**When to use:** When a test passes sometimes but fails other times, or fails intermittently in CI.

**Inputs:** Context about the flakiness (recent failure logs, test code, observations)

**Output:**

- Likely source of flakiness
- Code change to resolve the instability
- Explanation of why the new approach is more deterministic
- Assessment of whether the instability may originate from the application itself

**What it does:**

- Inspects recent failures, timing assumptions, and selector stability
- Solves the actual race condition or unstable locator rather than patching with retries
- Reuses existing helpers for waiting on meaningful state changes
- Avoids adding broad retries or fixed delays unless required by suite policy
- Keeps the test intent unchanged while making it more reliable

## Code Quality

### Run ESLint

This repository uses ESLint to enforce code quality and consistency. Before committing code, run the linter to check for issues:

**Check for linting errors:**

```bash
npm run lint
```

**Fix linting errors automatically:**

```bash
npm run lint:fix
```

ESLint is configured to enforce:

- TypeScript best practices and strict type checking
- No usage of `any` type without proper justification
- Explicit function return types
- No unused variables
- Consistent naming conventions and code style

Run linting as part of your local development workflow and ensure all tests pass before submitting pull requests.
