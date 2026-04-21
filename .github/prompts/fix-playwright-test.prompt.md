---
name: Fix Playwright Test
description: Debug and fix a failing Playwright test
agent: playwright-test-healer
---

Fix this failing Playwright test.

Failure details:
${input:failure}

Instructions:

- Start by identifying the most likely root cause.
- Inspect the failing test, related helpers, page objects, and nearby similar tests.
- Make the smallest safe fix.
- Do not add arbitrary waits.
- Do not weaken assertions unless the original expectation is incorrect.
- If the failure looks like a product bug, state that explicitly.
- **After making any code changes, use test_run to execute the specific failing test and verify the fix works.**
- **If the test still fails after your fix, analyze the new failure output, identify the root cause, and apply another fix.**
- **Repeat the fix → test execution → analysis cycle until the test passes cleanly.**


Deliver:

1. Likely root cause
2. Minimal code change applied
3. Test execution result (PASSED / FAILED)
4. If PASSED: Summary of why the fix resolved the issue
5. If FAILED: New error analysis and next fix attempt (or mark test.fixme() if unfixable)
6. Why this fix is safer than a generic workaround
7. Any remaining risk or follow-up suggestions
