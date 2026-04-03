# Saucedemo UI Tests

Playwright + TypeScript end-to-end test suite for [saucedemo.com](https://www.saucedemo.com).

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
