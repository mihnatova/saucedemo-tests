---
description: Run a full quality audit across the test suite and produce a quality report.
argument-hint: [optional path to narrow the review]
---

You are running a quality audit on the saucedemo test suite.

Scope: `$ARGUMENTS` if provided, otherwise all of `pages/`, `tests/e2e/`, and `test-data/`.

## Checks

Run each check and collect findings. Use `Grep` rather than shelling out.

### 1. Banned patterns
- `waitForTimeout` anywhere in `tests/` or `pages/`.
- Raw Playwright locators inside `tests/e2e/`: `page.locator(`, `page.$(`, `page.$$(`, CSS selectors like `text=`, XPath `xpath=`.
- Bare `await page.waitFor(` (deprecated).

### 2. Hardcoded values in tests
- Usernames / passwords that belong in `test-data/users.ts`.
- URLs starting with `http://` or `https://` inside `tests/e2e/` (BASE_URL lives in `.env`).
- Magic strings repeated across specs that should be named constants or fixtures.

### 3. Assertion quality
- Tests with zero `expect(` calls.
- `expect(true)` / `expect(1).toBe(1)` / other tautologies.
- Over-broad assertions (`toBeTruthy()` on a boolean-converted locator instead of `toBeVisible()`).

### 4. Test design
- Dead-weight tests: bodies that only navigate with no assertion.
- Duplicated tests covering the same behavior.
- Missing coverage: list the obvious gaps (negative auth paths, empty cart, checkout validation errors, logout) that are not covered.
- Test names that don't describe behavior (`test('test 1', ...)`).

### 5. Page Object hygiene
- Assertions inside `pages/` files (belongs in specs).
- Raw CSS / XPath selectors where `data-test` exists on the page.
- Public fields / methods that nothing consumes.

### 6. Run the suite
```
npx playwright test --project=chromium
```
Record pass / fail counts and failing spec names.

## Output: Quality Report

```
# Test Suite Quality Report — <date>

Scope: <paths reviewed>
Result: <PASS / ISSUES FOUND>

## Banned patterns
- <file:line> — <finding>
(or: "None found.")

## Hardcoded values
- <file:line> — <finding>

## Assertion quality
- <file:line> — <finding>

## Test design
- <file:line> — <finding>
- Missing coverage: <bullet list>

## Page Object hygiene
- <file:line> — <finding>

## Test run
<N passed, N failed>. Failing: <spec names>.

## Recommended next actions
1. <highest-impact fix>
2. ...
```

No padding. If a section has no findings, say "None found." and move on.
