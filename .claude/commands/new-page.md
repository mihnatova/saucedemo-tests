---
description: Analyze a page URL, discover its data-test attributes, and generate a Page Object in pages/.
argument-hint: <url-or-page-name> [additional notes]
---

You are creating a new Page Object for the saucedemo test suite.

## Input

`$ARGUMENTS` — a URL (e.g. `https://www.saucedemo.com/inventory.html`) or a page name (e.g. "checkout step two"). Additional freeform notes may follow.

## Steps

1. **Read project context** — open `CLAUDE.md`, `playwright.config.ts`, and at least one existing Page Object in `pages/` (e.g. `LoginPage.ts`) to match style, imports, and base patterns.

2. **Inspect the live page** — use Chrome DevTools MCP (if connected) to navigate to the URL and enumerate interactive elements:
   - form inputs, buttons, links, selects, checkboxes
   - elements bearing `data-test` attributes
   - header / footer / navigation regions relevant to the page
   If Chrome DevTools MCP is unavailable, ask the user to run it or provide an HTML snapshot — **do not guess selectors**.

3. **Design the Page Object**
   - Class name: PascalCase, suffix `Page` (e.g. `InventoryPage`).
   - File path: `pages/<ClassName>.ts` following the pattern of existing files.
   - Fields: one readonly `Locator` per interactive element, named by role/intent (`addToCartButton`, not `btn1`).
   - Locators: prefer `page.getByTestId('<data-test value>')`; fall back to `getByRole` / `getByLabel` when no `data-test` exists.
   - Methods: intent-revealing actions (`addToCart(productName: string)`, `goToCheckout()`); no assertions inside.
   - Include a `goto()` method when the page has a stable URL.

4. **Write the file** with `Write`.

5. **Smoke-check** — run `npx tsc --noEmit` to confirm the file type-checks. If a test already exercises this page, run it:
   ```
   npx playwright test --project=chromium <relevant spec>
   ```

## Output

Report:
- Page Object file path.
- Locators discovered (element name → `data-test` value or fallback locator).
- Any elements you could not resolve a stable locator for, with a recommendation to the user (e.g. "ask dev to add `data-test` to the sort dropdown").
