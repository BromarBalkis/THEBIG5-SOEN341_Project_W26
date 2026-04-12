# Fix 3 — Replace Non-Interactive Element with Accessible Button

- **Tool:** SonarQubeCloud
- **File:** `frontend/src/components/ui/Card.tsx`
- **Issue reported:** Avoid non-native interactive elements. If using native HTML is not possible, add an appropriate role and support for keyboard interaction
- **Category:** Reliability / Maintainability
- **Rule:** `typescript:S6848`

## Reason for Fix

Using a `<div>` with an `onClick` handler is not accessible:

- `<div>` elements are not in the keyboard tab order — users cannot Tab to them.
- They do not respond to `Enter` or `Space` key presses — keyboard-only users cannot trigger the action.
- Screen readers do not announce them as interactive, so assistive technology users have no indication the element is clickable.

This breaks usability for users relying on keyboards, screen readers, or other assistive technology.

## Fix Applied

Replaced the unconditional `<div onClick={...}>` with a conditional render:

- When `onClick` is provided → renders `<button type="button">` (native interactive element, keyboard-accessible, announced by screen readers)
- When `onClick` is absent → renders `<div>` (no interactive semantics needed)

All existing class names and styling are preserved identically. No props were changed. No behavior was changed.

### Before

```tsx
return (
  <div onClick={onClick} className={combinedClassName}>
    {children}
  </div>
);
```

### After

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

## Commit

`fix: replace div with button for accessibility flagged by SonarQubeCloud`
