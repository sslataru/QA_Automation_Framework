# QA Automation Practice — Playwright Framework

This repository is a Playwright-based end-to-end test framework demo. It shows a scalable, maintainable structure you can adapt to other web apps.

**Contents**
- **Project structure**: overview of folders and intent.
- **How it works**: test architecture and patterns used (Page objects, fixtures, data-driven tests).
- **Run & CI**: how to run tests locally and in CI.
- **Scaling & Adaptation**: how to extend the framework for larger apps and different projects.

**Project structure**
- [pages](pages): Page objects implementing UI interactions (e.g., `login.page.ts`, `inventory.page.ts`).
- [tests](tests): Playwright test suites using page objects and fixtures.
- [fixtures](fixtures): custom fixtures and shared test setup helpers.
- [data](data): test data (e.g., `users.json`) and fixtures for data-driven tests.
- [utils](utils): helper utilities and test-data helpers.
- `playwright.config.ts`: Playwright configuration (browsers, reporter, baseURL sourced from env).
- `.github/workflows/playwright.yml`: GitHub Actions workflow that runs tests and uploads artifacts.

How it works
- Tests are written using Playwright Test. Each test imports page objects from `pages/`.
- The project uses the Page Object Model (POM): UI selectors and interactions live in `pages/*`, keeping tests readable and stable.
- Shared test setup and teardown are implemented via fixtures in `fixtures/custom-fixtures.ts`.
- Test data is separated into `data/` for easy reuse and to support data-driven test runs.

Setup & run (local)
Prerequisites: Node.js (matching `playwright` requirements), npm.

1. Install dependencies:
```bash
npm ci
```
2. Install Playwright browsers:
```bash
npx playwright install --with-deps
```
3. Run the full test suite and generate an HTML report:
```bash
npx playwright test --reporter=html
```
4. Open the HTML report:
```bash
npx playwright show-report
```

Configuration & secrets
- `playwright.config.ts` loads environment variables (via dotenv) for `baseURL` and credentials. Do NOT commit secrets to git.
- Recommended approach for local development: create a `.env` file and add `.env` to `.gitignore`.
- For CI (GitHub Actions), configure repository Secrets: `BASE_URL`, `TEST_USER_EMAIL`, `TEST_USER_PASSWORD` (or other app-specific secrets). The workflow reads these from the environment.

CI (GitHub Actions)
- The repository includes `.github/workflows/playwright.yml` which:
  - Installs Node and caches dependencies.
  - Installs Playwright browsers.
  - Runs `npx playwright test --reporter=html`.
  - Uploads Playwright HTML report and `test-results` as workflow artifacts.
- To run: push to the target branch or trigger the workflow manually from the Actions tab.

Scaling & adapting to other projects
- Adding pages: create new page objects under `pages/` for each major UI area.
- Adding suites: add tests under `tests/` grouped by feature or component.
- Parallelization: Playwright Test runs tests in parallel by default; tune `workers` in `playwright.config.ts` and tag slow tests to control concurrency.
- Cross-browser matrix: extend the workflow to run a matrix strategy across browsers (chromium, firefox, webkit) and OS runners if desired.
- CI resources: consider splitting large suites into smaller jobs or use test sharding to reduce wall-clock time.
- Test data & environments: use environment-specific base URLs and test accounts. Use a seeded test database or fixtures for reliable results.

Best practices
- Keep selectors stable: prefer data-test-id attributes for reliability.
- Keep tests deterministic: avoid hard sleeps; use Playwright's `waitFor` and built-in auto-waiting.
- Isolate state: reset app state between tests, use dedicated test accounts or an isolated test environment.
- Secrets management: do not commit `.env`; use repo secrets for CI.
- Small focused tests: prefer many small, fast tests over a few large end-to-end flows.

Reporting & artifacts
- Playwright generates traces, videos, and HTML reports. Store or upload only what you need; traces can be large.
- Use the workflow artifact upload step to capture `playwright-report` and `test-results` for later inspection.

Extending for other app types
- Mobile / native: swap Playwright for Appium or Playwright Mobile (when available) and keep the POM pattern.
- API testing: add a separate `tests/api` folder and shared HTTP clients in `utils` or `fixtures`.
- Visual regression: integrate snapshot tools (e.g., Percy, Applitools) and add visual tests alongside functional tests.

Troubleshooting
- If tests fail locally but pass in CI, check environment parity: base URL, test data, and feature flags.
- Large trace/report assets: prune unnecessary traces or upload only failing-test artifacts to save storage.

Next steps & suggestions
- Add `.env.example` with placeholder values and ensure `.env` is gitignored.
- Consider expanding the GitHub Actions workflow into a browser/OS matrix.
- Add test tagging and selective runs (e.g., `@smoke`, `@regression`) for faster feedback loops.

Files to review
- [playwright.config.ts](playwright.config.ts)
- [pages](pages)
- [tests](tests)
- [.github/workflows/playwright.yml](.github/workflows/playwright.yml)

If you'd like, I can:
- add a `.env.example` and update `.gitignore` to exclude `.env`,
- expand the workflow into a cross-browser matrix, or
- add test tags and an example smoke suite — tell me which you'd prefer.

