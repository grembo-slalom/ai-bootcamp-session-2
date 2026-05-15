# Coding Guidelines

## General Principles

- Write code that is **readable first** — clarity over cleverness.
- Follow the **single responsibility principle**: each function, module, or component should do one thing well.
- Keep functions **small and focused**. If a function is hard to name, it is probably doing too much.
- **Don't repeat yourself (DRY)**: extract shared logic into reusable utilities or components.
- **YAGNI** (You Aren't Gonna Need It): do not add code for features that are not yet required.
- Delete dead code rather than commenting it out.

---

## Naming Conventions

- Use **camelCase** for variables, functions, and method names.
- Use **PascalCase** for React components and class names.
- Use **SCREAMING_SNAKE_CASE** for constants.
- Choose **descriptive, intention-revealing names** — avoid abbreviations and single-letter variables outside of loop indices.
- Boolean variables and functions should read as questions: `isLoading`, `hasError`, `canDelete`.

---

## JavaScript / Node.js

- Use **ES6+** syntax: `const`/`let` (never `var`), arrow functions, destructuring, template literals, and optional chaining.
- Prefer `async/await` over raw Promises or callbacks.
- Always handle errors in async functions with `try/catch`.
- Validate and sanitise all input **at the system boundary** (API endpoints, form submissions). Never trust external input.
- Avoid mutating function arguments or shared state.
- Use `===` for equality checks instead of `==`.

---

## React (Frontend)

- Prefer **functional components** with hooks over class components.
- Keep components **small and focused** — extract sub-components when JSX becomes hard to follow.
- Colocate state as close to where it is used as possible; lift state only when necessary.
- Avoid direct DOM manipulation; let React manage the DOM.
- Handle loading and error states explicitly in every component that fetches data.
- Do not hardcode API URLs — use environment variables or a central configuration module.

---

## Express (Backend)

- Organise routes, controllers, and data access into **separate layers**.
- Return consistent JSON response shapes across all endpoints.
- Use appropriate **HTTP status codes** (e.g. `200`, `201`, `400`, `404`, `500`).
- Never expose internal error details or stack traces to API consumers.
- Validate request bodies before processing them and return a `400` response with a clear message on invalid input.

---

## Error Handling

- Errors should be caught at the appropriate layer and either handled or propagated with context.
- Log errors with enough detail to diagnose the problem (message, stack, relevant input).
- User-facing error messages should be helpful but must not leak implementation details.

---

## Code Style & Formatting

- Use a consistent code formatter (e.g. **Prettier**) across the entire codebase.
- Use a linter (e.g. **ESLint**) and address all warnings before merging.
- Indentation: **2 spaces**.
- Maximum line length: **100 characters**.
- Always add a trailing newline at the end of files.
- Remove unused imports and variables before committing.

---

## Version Control

- Write **clear, imperative commit messages** that describe *what* and *why*, not *how* (e.g. `Add delete endpoint for TODO items`).
- Keep commits **small and focused** — one logical change per commit.
- Never commit secrets, credentials, or `.env` files. Use `.gitignore` and environment variables.
- Branches should be short-lived and merged via pull request with at least one review.

---

## Security

- Never store secrets in source code. Use environment variables.
- Sanitise all user-supplied data before using it in database queries or responses.
- Keep dependencies up to date and audit them regularly with `npm audit`.
- Apply the **principle of least privilege** — components and services should only have access to what they need.
