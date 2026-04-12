# Fix 4 — Associate Form Labels with Inputs in Login Page

- **Tool:** SonarQubeCloud
- **File:** `frontend/src/app/(auth)/login/page.tsx`
- **Issue reported:** A form label must be associated with a control
- **Category:** Reliability / Code Smell
- **Rule:** `typescript:S6853`

## Reason for Fix

Labels that are not associated with their form controls reduce accessibility and can make forms harder to use with assistive technologies (screen readers, voice control, etc.). Without a programmatic link between a `<label>` and its `<input>`:

- Screen readers cannot announce which field a label describes.
- Clicking the label does not move focus to the corresponding input.
- Automated accessibility tools (SonarQube, axe, Lighthouse) flag this as a reliability code smell.

## Fix Applied

Added stable `id` attributes to the two affected `<input>` elements, and matching `htmlFor` attributes to their corresponding `<label>` elements.

**Email field — before:**

```tsx
<label className="block text-sm font-semibold text-gray-900 mb-2">Email or Username</label>
<input type="text" ... />
```

**Email field — after:**

```tsx
<label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">Email or Username</label>
<input id="email" type="text" ... />
```

**Password field — before:**

```tsx
<label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
<input type={showPassword ? 'text' : 'password'} ... />
```

**Password field — after:**

```tsx
<label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
<input id="password" type={showPassword ? 'text' : 'password'} ... />
```

No styling, user-facing text, validation logic, or login behavior was changed. The "Remember me" checkbox was not modified as its label wraps the input inline (implicitly associated).

## Commit

`fix: associate login labels with inputs flagged by SonarQubeCloud`
