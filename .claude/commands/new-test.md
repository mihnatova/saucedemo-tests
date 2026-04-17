---
description: Create a new E2E test from a natural-language description, wiring up Page Objects and test data as needed.
argument-hint: <test description>
---

You are creating a new Playwright test for the saucedemo suite.

## Input

`$ARGUMENTS` — a freeform description of the scenario to cover (e.g. "locked-out user cannot log in and sees the error banner").

## Steps

1. **Read project context** — `CLAUDE.md`, `playwright.config.ts`, existing Page Objects in `pages/`, and nearby specs in `tests/e2e/` so your test matches the suite's style.

2. **Identify dependencies**
   - Which Page Objects does this scenario need? If one is missing, invoke the `/new-page` command (or the `test-writer` agent) first.
   - Does this test need new test data? If yes, add to an existing file in `test-data/` or create a new one with a TypeScript `interface` for the shape. Reuse existing fixtures rather than duplicating.

3. **Design the test**
   - File: `tests/e2e/<feature>.spec.ts`. Group with `test.describe`. Use `test.beforeEach` for shared setup.
   - Interact **only through Page Object methods** — no raw `page.locator(...)` in the spec.
   - Assertions: web-first matchers on Page Object locators (`expect(page.cartBadge).toHaveText('1')`). Every test must assert something meaningful.
   - **No `waitForTimeout`**. Use `expect(...).toBeVisible()` etc. for synchronization.

4. **Run the test**
   ```
   npx playwright test --project=chromium <path>
   ```
   If it fails, diagnose and fix — don't report a red test as done.

5. **Self-audit**
   - `grep -n "waitForTimeout" tests/e2e/<file>` — must be empty.
   - `grep -n "page\.locator\|page\.\$" tests/e2e/<file>` — must be empty.

## Output

- Spec file path and test names added.
- One-sentence description of what each test asserts.
- Any new Page Object or test-data files created.
- Test run result (pass count / fail count / command used).
