# Fix 5 — Add Keyboard Accessibility to Clickable Element

- **Tool:** SonarQubeCloud
- **File:** `frontend/src/components/ui/Card.tsx`
- **Issue reported:** Visible, non-interactive elements with click handlers must have at least one keyboard listener
- **Category:** Reliability / Bug
- **Rule:** `typescript:S1082`

## Reason for Fix

A `<div>` with an `onClick` handler is not keyboard-accessible. `<div>` elements are not in the tab order by default and receive no native keyboard events, meaning keyboard-only users and screen reader users cannot activate the element. This is both a reliability bug and an accessibility violation.

## Fix Applied

Replaced the clickable `<div>` with a `<button type="button">` when an `onClick` prop is provided. `<button>` elements are natively focusable and trigger the `click` event on both `Enter` and `Space` keystrokes, satisfying the keyboard accessibility requirement without any additional `onKeyDown` handlers.

**Before:**

```tsx
return (
  <div className={combinedClassName} onClick={onClick}>
    {children}
  </div>
);
```

**After:**

```tsx
if (onClick) {
  return (
    <button type="button" onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
}

return <div className={combinedClassName}>{children}</div>;
```

The `<div>` path is kept for cards that have no `onClick`, since a non-interactive container does not need to be a button.

## Commit

`fix: add keyboard accessibility to clickable element flagged by SonarQubeCloud`
