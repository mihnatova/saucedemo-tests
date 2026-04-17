---
description: Diagnose a failing Playwright test from its error output and propose (and verify) a fix.
argument-hint: <spec path or paste of failure output>
---

You are diagnosing a failing Playwright test.

## Input

`$ARGUMENTS` — a spec path, a failing test name, or a pasted error / stack trace. If the user provides only a hint, run the suite to reproduce the failure yourself before going further.

## Steps

1. **Reproduce** — run the failing test:
   ```
   npx playwright test --project=chromium <spec>
   ```
   Capture the exact error, stack trace, and the line/locator that failed.

2. **Read the evidence**
   - The failing test file (`tests/e2e/...`).
   - Every Page Object it imports.
   - Any test data it uses.
   - The HTML report / trace if available (`npx playwright show-report`).

3. **Diagnose — root cause, not symptom**
   - Selector drift (app changed `data-test`)? → fix the Page Object locator, not the test.
   - Timing (element appears asynchronously)? → replace any `waitForTimeout` with `expect(locator).toBeVisible()` or `waitFor({ state: 'visible' })`. **Never** paper over with a longer sleep.
   - Wrong assertion (expected text changed legitimately)? → update the assertion and note the app behavior change.
   - Test interdependence (state leaking between tests)? → isolate via `beforeEach` setup or storage state.
   - Environment (`BASE_URL`, credentials)? → report to the user; don't silently hardcode.

4. **Propose the fix** — state the root cause in one sentence, the minimal change that addresses it, and which file/line.

5. **Apply and verify**
   - Edit only the file(s) needed for the root cause. No drive-by refactors.
   - Re-run the failing test: `npx playwright test --project=chromium <spec>`.
   - Re-run the full suite once the target test is green to check for regressions.

## Output

- **Failure**: one-line summary of what broke.
- **Root cause**: one sentence.
- **Fix**: file/line changed and what changed.
- **Verification**: test-run output (target spec green, full suite green/red with counts).
- **Anything the user should know** (e.g. "this looks like a genuine app regression, not a test bug — consider filing a bug").
