# Playwright Locators

Locators are used to identify and interact with elements on a web page. Playwright recommends using user-facing locators whenever possible because they are generally more readable and maintainable.

## 1. Get by Placeholder

Use `getByPlaceholder()` when an input element has a `placeholder` attribute.

```javascript
page.getByPlaceholder('enter your password');
```

Example:

```html
<input placeholder="enter your password">
```

```javascript
await page.getByPlaceholder('enter your password').fill('Password123');
```

---

## 2. Get by Role

Use `getByRole()` to locate an element based on its accessible role.

```javascript
page.getByRole('button', { name: 'Login' });
```

Example:

```javascript
await page.getByRole('button', { name: 'Login' }).click();
```

Other commonly used roles include:

```javascript
getByRole('button')
getByRole('textbox')
getByRole('checkbox')
getByRole('radio')
getByRole('link')
getByRole('heading')
getByRole('listitem')
```

Using the accessible role and name usually makes the locator easier to understand.

---

## 3. When to Use CSS / `locator()`

Not every HTML element has a suitable user-facing locator such as a role, label, placeholder, or text.

For example, if a `div` is simply a component/container and does not have a useful accessible role, label, placeholder, or meaningful text, you may need to use `locator()` with a CSS selector.

```javascript
page.locator('div.title');
```

There is no generic `getByComponent()` locator in Playwright.

Common user-facing locator methods include:

```javascript
getByRole()
getByLabel()
getByPlaceholder()
getByText()
getByAltText()
getByTitle()
```

Use CSS/XPath-based locators when a suitable user-facing locator is not available.

---

## 4. Filtering a Product Before Clicking

Suppose a page contains multiple products, each with an **Add To Cart** button.

Instead of locating every Add To Cart button, first identify the product using its text and then locate the button inside that product.

```javascript
await productsAvailableOnPage
    .filter({ hasText: 'ADIDAS ORIGINAL' })
    .getByRole('button', { name: 'Add To Cart' })
    .click();
```

### How it works

```javascript
.filter({ hasText: 'ADIDAS ORIGINAL' })
```

Finds the product/component containing the specified text.

Then:

```javascript
.getByRole('button', { name: 'Add To Cart' })
```

Finds the **Add To Cart** button inside that product.

This approach is better than simply selecting the first Add To Cart button because it connects the action to the correct product.

---

## 5. Chaining Locators

Sometimes the same text or role appears multiple times on a page.

For example:

```javascript
await page.getByRole('listitem')
    .getByRole('button', { name: 'Cart' })
    .click();
```

Instead of directly using:

```javascript
await page.getByRole('button', { name: 'Cart' }).click();
```

### Why use the parent/container?

If multiple elements on the page contain or match **Cart**, the direct locator may identify multiple elements.

The page structure may contain the Cart button inside a `listitem`.

So we first locate:

```javascript
getByRole('listitem')
```

and then locate the Cart button inside it:

```javascript
getByRole('button', { name: 'Cart' })
```

This creates a more specific locator by **narrowing the search scope**.

> **Note:** Do not use a parent locator simply because it is available. Use it when it makes the locator more specific and reliable.

---

## 6. Get by Text

Use `getByText()` when the visible text itself is a useful way to identify an element.

```javascript
const productTextOnCartPage = page.getByText('ADIDAS ORIGINAL');
```

You can then use an assertion:

```javascript
await expect(productTextOnCartPage).toBeVisible();
```

This verifies that **ADIDAS ORIGINAL** is visible on the cart page.

---

## 7. Store a Locator in a Variable

If a locator is used more than once, store it in a variable.

Example:

```javascript
const applyCouponBtn = page.getByRole('button', {
    name: 'Apply Coupon'
});
```

Then use it:

```javascript
await applyCouponBtn.click();
```

This makes the test easier to read and maintain.

---

## Locator Strategy – Recommended Order

When creating a locator, prefer a stable and user-facing locator first.

A practical order is:

```text
1. getByRole()
2. getByLabel()
3. getByPlaceholder()
4. getByText()
5. getByAltText()
6. getByTitle()
7. locator() with CSS
8. XPath – only when necessary
```

### Example

Prefer:

```javascript
page.getByRole('button', { name: 'Login' });
```

over:

```javascript
page.locator('#loginButton');
```

if the role-based locator is available and uniquely identifies the element.

### Key Principle

**Choose locators that are readable, stable, and uniquely identify the intended element.**

Avoid relying on automatically generated or highly fragile CSS/XPath selectors when a reliable user-facing locator is available.