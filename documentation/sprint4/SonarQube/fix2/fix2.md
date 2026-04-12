# Fix 2 — Use Optional Chaining in Auth Middleware

- **Tool:** SonarQubeCloud
- **File:** `backend/src/middleware/auth.js`
- **Issue reported:** Prefer using an optional chain expression instead, as it's more concise and easier to read
- **Category:** Maintainability / Code Smell
- **Rule:** `javascript:S6582`
- **Reason for fix:** Optional chaining improves readability and reduces the risk of runtime errors when accessing potentially undefined values. The original manual null-guard pattern (`!header || !header.startsWith(...)`) is functionally equivalent to optional chaining but more verbose.
- **Fix applied:**
  - **Before:** `if (!header || !header.startsWith("Bearer ")) {`
  - **After:** `if (!header?.startsWith("Bearer ")) {`
  - When `header` is `undefined`/`null`, `header?.startsWith(...)` evaluates to `undefined`, so `!undefined` is `true` and the 401 response is returned — identical behavior to the original two-condition check.
- **Commit:** `fix: use optional chaining in auth middleware flagged by SonarQubeCloud`
