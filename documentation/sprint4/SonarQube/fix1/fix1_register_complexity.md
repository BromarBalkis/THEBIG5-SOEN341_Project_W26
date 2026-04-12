# Fix 1 — Reduce Cognitive Complexity in RegisterPage

- **Tool:** SonarQubeCloud
- **File:** `frontend/src/app/(auth)/register/page.tsx`
- **Issue reported:** Refactor this function to reduce its Cognitive Complexity from 17 to the 15 allowed
- **Category:** Maintainability / Code Smell
- **Reason for fix:** High cognitive complexity makes the component harder to read, maintain, and review. Reducing complexity improves clarity without changing behavior.
- **Fix applied:** Extracted two nested ternary chains responsible for password-strength UI styling into two module-level pure helper functions (`getStrengthBarClass` and `getStrengthTextClass`) placed above the `RegisterPage` component. Each chain was a 3-level nested ternary (contributing ~6 complexity points each to the component). Replacing them with flat `if`-return functions moved those points outside `RegisterPage`'s complexity budget entirely, reducing the total from 17 to approximately 9 — well below the allowed 15. No logic, validation rules, UI text, API contracts, or visual behavior were changed.
- **Verification:** Frontend production build (`npm run build` in `frontend/`) passed with no errors. Only pre-existing deprecation warnings (middleware → proxy rename) appeared, unrelated to this change.
- **Commit:** `fix: reduce RegisterPage cognitive complexity flagged by SonarQubeCloud`
