# Testing Guidelines

## Framework

- Use **Jest** as the testing framework for all unit tests.
- Use **Jest + Supertest** for integration tests that test backend API endpoints.
- Use **Playwright** for End-to-End (E2E) tests that test complete UI workflows through browser automation.

## File Naming

- Unit and integration test files must be named using the pattern `*.test.js` or `*.test.ts`.
- Names should be simple but descriptive, clearly reflecting the module or behaviour being tested (e.g. `todo.test.js`, `auth.test.js`).
- E2E test files must be named using the pattern `*.spec.js` or `*.spec.ts`.
- E2E test file names should reflect the user journey they test (e.g. `create-todo.spec.js`, `complete-todo.spec.js`).

## File Locations

- **Backend** unit tests: `packages/backend/__tests__/`
- **Backend** integration tests: `packages/backend/__tests__/`
- **Frontend** unit tests: `packages/frontend/__tests__/`
- **E2E** tests: `tests/e2e/`

## General Principles

- All tests must be **independent and isolated** — no test should rely on the state left by another.
- **Setup and teardown hooks** are required to establish and clean up test state (e.g. `beforeEach`, `afterEach`, `beforeAll`, `afterAll`).
- All new features must include appropriate tests.
- Tests should be maintainable and follow best practices — avoid duplication, keep assertions focused, and prefer clear naming over comments.

## E2E Test Guidelines (Playwright)

- Use **one browser only** for all Playwright tests.
- All E2E tests must use the **Page Object Model (POM)** pattern to keep tests maintainable and logic reusable.
- Limit E2E tests to **5–8 critical user journeys**.
- Focus on **happy paths** and important edge cases — avoid low-value or redundant coverage.
