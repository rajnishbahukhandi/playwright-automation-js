## Types of Playwright Locators

In Playwright, locators can be broadly categorized into **user-facing locators** and **CSS/DOM-based locators**.

### 1. User-Facing Locators (`getBy...`)

These locators identify elements based on how users interact with or perceive them.

Common examples:

```javascript
page.getByRole()
page.getByLabel()
page.getByPlaceholder()
page.getByText()
page.getByAltText()
page.getByTitle()
```

Examples:

```javascript
page.getByPlaceholder('Enter your password');

page.getByRole('button', { name: 'Login' });

page.getByLabel('Username');

page.getByText('Place Order');
```

### 2. CSS / DOM-Based Locator

Use `locator()` when a suitable user-facing locator is not available or when a CSS selector is the appropriate choice.

```javascript
page.locator('input[name="username"]');

page.locator('div.title');

page.locator('#loginButton');
```

### Key Difference

**`getBy...` locators** → Locate elements using user-facing properties such as role, label, placeholder, or visible text.

**`locator()`** → Locate elements using CSS selectors or other DOM-based selectors.


### Recommended Approach

The locator approach may depend on the **company, project, and automation framework standards**.

As a QA Engineer, we should follow the **locator strategy defined for the project** and use it consistently throughout the automation scripts.

For example, if a project standard uses `getByRole()` and `getByLabel()`, we should continue using those locators wherever they are suitable. If the project uses CSS selectors with `locator()`, we should follow that approach consistently.

**Key Point:**

> Choose the locator strategy according to the project standard and follow the same approach consistently throughout the automation project.

The main goal is to keep the automation code **simple, consistent, readable, and easy for the entire QA team to understand and maintain**.

## How to Create CSS Locators from HTML

CSS locators are created by looking at the **HTML element and its attributes** such as `id`, `class`, `name`, `type`, `placeholder`, and other attributes.

### 1. Identify the HTML Tag

First, look at the HTML element.

```html
<input type="text">
```

CSS locator:

```javascript
page.locator('input');
```

---

### 2. Use `id` — Preferred When Unique

HTML:

```html
<input id="username" type="text">
```

CSS locator:

```javascript
page.locator('#username');
```

**Syntax:**

```text
#id
```

---

### 3. Use `class`

HTML:

```html
<input class="form-control" type="text">
```

CSS locator:

```javascript
page.locator('.form-control');
```

**Syntax:**

```text
.class
```

If there are multiple classes:

```html
<input class="form-control input-field">
```

You can use:

```javascript
page.locator('.form-control.input-field');
```

**Note:** Avoid using a class if the same class is used by many elements.

---

### 4. Use Attribute Selectors

HTML:

```html
<input type="text" name="username">
```

CSS locator:

```javascript
page.locator('input[name="username"]');
```

**General syntax:**

```text
tag[attribute="value"]
```

Examples:

```javascript
page.locator('input[type="text"]');

page.locator('input[name="username"]');

page.locator('input[placeholder="Enter Username"]');

page.locator('button[type="submit"]');
```

---

### 5. Use Multiple Attributes

When one attribute is not unique, combine multiple attributes.

HTML:

```html
<input type="text" name="username" class="form-control">
```

CSS:

```javascript
page.locator('input[name="username"][type="text"]');
```

This helps make the locator more specific.

---

### 6. Use Parent → Child Relationship

HTML:

```html
<div class="login-form">
    <input type="text" name="username">
</div>
```

CSS:

```javascript
page.locator('.login-form input[name="username"]');
```

Here:

```text
.login-form
     ↓
   input
     ↓
[name="username"]
```

This means: find the `username` input inside `.login-form`.

---

### 7. Use Direct Child `>`

HTML:

```html
<div class="login-form">
    <input type="text">
</div>
```

CSS:

```javascript
page.locator('.login-form > input');
```

`>` means the element must be a **direct child**.

---

### 8. Use Text Carefully

CSS itself does **not** normally locate elements by visible text in the same way Playwright's `getByText()` does.

For example:

```html
<button>Login</button>
```

Prefer:

```javascript
page.getByRole('button', { name: 'Login' });
```

rather than trying to create a CSS locator based on the text.

---

### 9. Use `nth()` When Multiple Elements Match

HTML:

```html
<button class="btn">Add To Cart</button>
<button class="btn">Add To Cart</button>
```

CSS:

```javascript
page.locator('.btn').nth(0);
```

Second button:

```javascript
page.locator('.btn').nth(1);
```

**Important:** Use `nth()` only when the position is stable and there is no better unique locator.

---

### 10. Check Whether the Locator Is Unique

After creating a CSS locator, check whether it identifies the expected element.

Example:

```javascript
const username = page.locator('input[name="username"]');

console.log(await username.count());
```

If the result is:

```text
1
```

the locator uniquely identifies one element.

If the result is:

```text
3
```

the locator matches three elements, so you should make it more specific.

---

## Common CSS Locator Patterns

| HTML                | CSS Locator                           |
| ------------------- | ------------------------------------- |
| `id`                | `#username`                           |
| `class`             | `.form-control`                       |
| tag                 | `input`                               |
| attribute           | `input[name="username"]`              |
| multiple attributes | `input[name="username"][type="text"]` |
| parent → child      | `.login-form input`                   |
| direct child        | `.login-form > input`                 |

## Practical Approach

When creating a CSS locator from HTML:

1. **Look at the HTML tag.**
2. **Check for a unique `id`.**
3. If no unique `id`, check `name`.
4. Check other useful attributes such as `type`, `placeholder`, `data-*`, etc.
5. Check whether a class is unique and stable.
6. Combine attributes if necessary.
7. Use parent → child relationships if required.
8. Use `nth()` only when appropriate.
9. **Verify that the locator identifies the correct element.**
10. Keep the locator **simple, readable, stable, and unique**.

### Example

HTML:

```html
<div class="login-form">
    <input type="text" name="username" class="form-control">
</div>
```

Possible CSS locators:

```javascript
page.locator('input[name="username"]');
```

or:

```javascript
page.locator('.login-form input[name="username"]');
```

The first one is preferable if it is already **unique and stable**. There is no need to create a more complicated locator when a simple one works.