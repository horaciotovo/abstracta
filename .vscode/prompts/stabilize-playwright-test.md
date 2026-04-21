---
title: Stabilize Playwright Test
description: Fix flaky or unstable Playwright tests
---

Stabilize this flaky Playwright test.

Context:
${input:context}

Instructions:

- Inspect recent failures, timing assumptions, selector stability, and setup dependencies.
- Prefer solving the actual race condition or unstable locator.
- Do not patch flakiness with broad retries or fixed delays unless already required by documented suite policy.
- Keep the test intent unchanged.
- Reuse existing helpers for waiting on meaningful state.

Deliver:

1. Likely source of flakiness
2. The code change
3. Why the new approach is more deterministic
4. Whether the instability may come from the application itself
