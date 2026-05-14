# UI Guidelines

## Overview

This document defines the core UI guidelines for the TODO application. All frontend changes should follow these conventions for consistency.

---

## Layout

- The app is centered with a maximum width of **800px** and `margin: 0 auto`.
- The page uses a single-column layout with a header at the top followed by stacked content sections.
- Sections are visually separated with `20px` gap between them.
- All content is padded with `20px` inside each section.

---

## Color Palette

| Role            | Color     | Hex       |
|-----------------|-----------|-----------|
| Header background | Dark     | `#282c34` |
| Header text     | White     | `#ffffff` |
| Primary button  | Cyan      | `#61dafb` |
| Primary button hover | Dark cyan | `#21a1c9` |
| Delete button   | Red       | `#f44336` |
| Delete button hover | Dark red | `#d32f2f` |
| Section background | Light gray | `#f5f5f5` |
| Error text      | Dark red  | `#d32f2f` |
| Input border    | Light gray | `#dddddd` |

---

## Typography

- Header (`h1`) font size: **1.8rem**, white text on dark background.
- Section headings use `h2`.
- Body text uses the browser default (sans-serif is expected via host OS).
- Error messages are styled **bold** and in dark red (`#d32f2f`).
- Button text is **bold**.

---

## Components

### Header
- Dark background (`#282c34`), white text, `8px` border radius.
- Contains the app title (`h1`) and a short subtitle (`p`).

### Sections
- Light gray background (`#f5f5f5`), `8px` border radius, subtle box shadow (`0 2px 4px rgba(0,0,0,0.1)`).
- Used to group related content (e.g., the add form, the item list).

### Add Item Form
- Displays inline: a full-width text input and a submit button side by side with a `10px` gap.
- Input has `8px` padding, `1px` gray border, and `4px` border radius.
- Submit button uses the primary cyan style.

### Item List
- Rendered as an unstyled `<ul>` (no bullets, no padding).
- Each `<li>` displays the item name on the left and a Delete button on the right, separated by flexbox `justify-content: space-between`.
- Items are separated by a bottom border except for the last item.
- If the list is empty, display the message: *"No items found. Add some!"*

### Buttons
- All buttons share: `8px 16px` padding, `4px` border radius, `bold` font, no border, pointer cursor.
- **Primary (Add Item):** cyan background (`#61dafb`), dark text (`#282c34`).
- **Destructive (Delete):** red background (`#f44336`), white text, smaller padding (`6px 12px`), `0.8rem` font size.

---

## State Feedback

- **Loading:** Display the text *"Loading data..."* while items are being fetched.
- **Error:** Display the error message in a `<p class="error">` styled bold and dark red.
- **Empty state:** Display *"No items found. Add some!"* when the list is empty and not loading.

---

## Accessibility & Behavior

- Form submission via the Enter key is supported (standard HTML form behavior).
- The Delete button has `type="button"` to prevent accidental form submission.
- Empty or whitespace-only input is ignored on submit — no API call is made.
- The app is responsive within its `800px` max-width container.
