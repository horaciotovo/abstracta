---
title: Fix Playwright Test
description: Debug and fix a failing Playwright test
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

Deliver:

1. Likely root cause
2. Minimal code change
3. Why this fix is safer than a generic workaround
4. Any remaining risk or follow-up suggestion
