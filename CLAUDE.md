# Saucedemo UI Tests

Playwright + TypeScript end-to-end test suite for [saucedemo.com](https://www.saucedemo.com).

## Stack

- Test runner: Playwright
- Language: TypeScript
- Pattern: Page Object Model
- Env config: `dotenv`
- Browser inspection: Chrome DevTools MCP

## Project Structure

- `pages/` — Page Object Model classes
- `tests/e2e/` — End-to-end test files
- `test-data/` — Test data files (JSON fixtures, etc.)
- `playwright.config.ts` — Playwright configuration (reads BASE_URL from .env)

## Conventions

- Use the Page Object Model pattern: keep selectors and page interactions in `pages/`, tests in `tests/e2e/`.
- Name test files `*.spec.ts`.
- Name page objects `*.page.ts`.
- Use `dotenv` for environment variables — copy `.env.example` to `.env` and fill in values.
- HTML reporter is configured by default; reports go to `playwright-report/`.
- Screenshots are captured only on failure; traces are recorded on first retry.

## Commands

- `npx playwright test` — run all tests
- `npx playwright test --project=chromium` — run tests in a specific browser
- `npx playwright show-report` — open the HTML report

## Agents

Two specialized agents are defined under `.claude/agents/`:

- **`test-writer`** (green, sonnet) — implements Page Objects, E2E tests, and typed test data. It reads `CLAUDE.md` before writing, runs the suite after implementing, and self-audits for `waitForTimeout` and raw locators in tests.
- **`test-reviewer`** (red, sonnet) — read-only reviewer (no `Write` / `Edit` tools). Audits convention compliance, assertion quality, test design, and Page Object hygiene. Runs the suite as part of the review and returns `APPROVED` or `NEEDS_IMPROVEMENT` with file-and-line findings.

Typical workflow: invoke `test-writer` to author the change, then `test-reviewer` to gate it. The reviewer **cannot** modify code — if it returns `NEEDS_IMPROVEMENT`, hand the findings back to `test-writer` (or a human) to address.

Slash commands under `.claude/commands/` automate common flows: `/new-page`, `/new-test`, `/review-tests`, `/fix-failure`.

## Workflow

1. Read `CLAUDE.md` and at least one existing Page Object before authoring anything new.
2. **Use Chrome DevTools MCP to inspect the live page** and discover `data-test` attributes before writing a new Page Object — do not guess selectors from memory.
3. Implement the Page Object, then test data, then the spec.
4. Run `npx playwright test --project=chromium <path>` until green.
5. Run `/review-tests` (or invoke the `test-reviewer` agent) before committing.
6. Copy `.mcp.json.example` to `.mcp.json` locally to enable Chrome DevTools MCP and any other servers you want active. `.mcp.json` is git-ignored.
