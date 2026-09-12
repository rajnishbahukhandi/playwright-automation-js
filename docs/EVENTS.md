# Playwright Notes – Dropdown, Links & Dialog Boxes

## 1. Dropdown Handling

### A. HTML `<select>` Dropdown

If the dropdown is a real HTML `<select>` element, use:

```javascript
await page.locator('#dropdown-class-example').selectOption('option1');
```

### Select by value

```javascript
await page.locator('#dropdown-class-example').selectOption('option1');
```

### Select by visible text / label

```javascript
await page.locator('#dropdown-class-example')
    .selectOption({ label: 'Option1' });
```

### Important

`selectOption()` is used only with a real HTML `<select>` element.

You do **not** need:

```javascript
await page.locator('#dropdown-class-example').click();
```

before `selectOption()`.

Also, `selectOption()` already performs the selection, so this is unnecessary:

```javascript
await page.locator('#dropdown-class-example')
    .selectOption('option1')
    .click();
```

Correct:

```javascript
await page.locator('#dropdown-class-example').selectOption('option1');
```

---

## 2. Custom Dropdown

Modern applications such as Angular/React applications may use custom dropdowns instead of `<select>`.

Example:

```html
<div>Select Country</div>
```

In this case, `selectOption()` will not work.

Use:

```javascript
await page.getByText('Select Country').click();
await page.getByText('India', { exact: true }).click();
```

### Searchable Dropdown

For a searchable dropdown:

```javascript
await page.getByPlaceholder('Select Country').fill('ind');
await page.getByText('India', { exact: true }).click();
```

If you want to simulate slower user typing:

```javascript
await page.getByPlaceholder('Select Country')
    .pressSequentially('ind');

await page.getByText('India', { exact: true }).click();
```

### Quick Rule

```text
<select> element
      ↓
selectOption()

Custom dropdown
      ↓
click()
      ↓
click/select option

Searchable dropdown
      ↓
fill() / pressSequentially()
      ↓
click/select option
```

---

# 3. Link Locator – `getByRole()`

Consider this HTML:

```html
<a id="opentab"
   class="btn-style class1 class2"
   href="https://www.qaclickacademy.com"
   target="_blank">
   Open Tab
</a>
```

The HTML element is:

```html
<a>
```

But its accessible/ARIA role is:

```text
link
```

Therefore, use:

```javascript
await page.getByRole('link', { name: 'Open Tab' }).click();
```

### Important

Do not use:

```javascript
await page.getByRole('a', { name: 'Open Tab' }).click();
```

because `a` is the HTML tag, not the role used by `getByRole()`.

### Other possible locators

Using ID:

```javascript
await page.locator('#opentab').click();
```

Using CSS:

```javascript
await page.locator('a#opentab').click();
```

Using text:

```javascript
await page.getByText('Open Tab', { exact: true }).click();
```

### Recommended

Prefer the role-based locator when it is clear and reliable:

```javascript
await page.getByRole('link', { name: 'Open Tab' }).click();
```

### Remember

```text
HTML tag       → <a>
Accessible role → link
Visible name   → Open Tab
```

So:

```javascript
getByRole('link', { name: 'Open Tab' })
```

---

# 4. Dialog Boxes

Playwright can handle browser dialogs such as:

* Alert
* Confirm
* Prompt
* Beforeunload

Common methods:

```javascript
dialog.accept()
dialog.dismiss()
dialog.message()
dialog.defaultValue()
dialog.type()
```

---

## 5. Accept an Alert Dialog

Example:

```javascript
page.once('dialog', dialog => dialog.accept());

await page.locator('#alertbtn').click();
```

### Explanation

First register the dialog handler:

```javascript
page.once('dialog', dialog => dialog.accept());
```

Then perform the action that opens the dialog:

```javascript
await page.locator('#alertbtn').click();
```

`accept()` means:

```text
OK / Accept
```

---

# 6. Dismiss a Confirm Dialog

For a confirmation dialog:

```javascript
page.once('dialog', dialog => dialog.dismiss());

await page.locator('#confirmbtn').click();
```

`dismiss()` means:

```text
Cancel / Dismiss
```

---

# 7. Why `once()` Is Useful

Avoid continuously registering the same dialog handler with:

```javascript
page.on('dialog', dialog => dialog.accept());
```

`page.on()` keeps the listener active.

For a one-time dialog, use:

```javascript
page.once('dialog', dialog => dialog.accept());
```

The listener automatically runs once and is then removed.

### Example

```javascript
// Alert
page.once('dialog', dialog => dialog.accept());
await page.locator('#alertbtn').click();

// Confirm
page.once('dialog', dialog => dialog.dismiss());
await page.locator('#confirmbtn').click();
```

This is cleaner than registering permanent listeners.

---

# 8. `page.on()` vs `page.once()`

| Method        | Behavior                |
| ------------- | ----------------------- |
| `page.on()`   | Listener remains active |
| `page.once()` | Listener runs only once |

### `page.on()`

```javascript
page.on('dialog', dialog => dialog.accept());
```

Useful when you intentionally want to handle multiple matching events.

### `page.once()`

```javascript
page.once('dialog', dialog => dialog.accept());
```

Useful when you expect one specific dialog.

---

# 9. Recommended Dialog Pattern

Another controlled approach is:

```javascript
const dialogPromise = page.waitForEvent('dialog');

await page.locator('#alertbtn').click();

const dialog = await dialogPromise;
await dialog.accept();
```

For dismiss:

```javascript
const dialogPromise = page.waitForEvent('dialog');

await page.locator('#confirmbtn').click();

const dialog = await dialogPromise;
await dialog.dismiss();
```

### Why this pattern?

It explicitly:

1. Waits for the dialog event.
2. Performs the action that triggers the dialog.
3. Gets the dialog object.
4. Accepts or dismisses it.

---

# 10. Dialog Message

You can read the dialog message:

```javascript
page.once('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.accept();
});

await page.locator('#alertbtn').click();
```

Example output:

```text
Hello , Share This practice page and share your knowledge
```

---

# 11. Dialog Type

You can check the dialog type:

```javascript
page.once('dialog', async dialog => {
    console.log(dialog.type());
    await dialog.accept();
});

await page.locator('#alertbtn').click();
```

Possible types include:

```text
alert
confirm
prompt
beforeunload
```

---

# Interview Points

### Dropdown

**Q: How do you handle a dropdown in Playwright?**

If it is a native HTML `<select>` dropdown, use:

```javascript
await page.locator('#dropdown').selectOption('option1');
```

For a custom dropdown, click the dropdown and then select the required option.

---

### Link

**Q: What role does an `<a>` element generally have in Playwright's `getByRole()`?**

Answer:

```text
link
```

Example:

```javascript
await page.getByRole('link', { name: 'Open Tab' }).click();
```

---

### Dialog

**Q: How do you handle an alert in Playwright?**

```javascript
page.once('dialog', dialog => dialog.accept());
await page.locator('#alertbtn').click();
```

**Q: How do you handle a confirmation dialog?**

```javascript
page.once('dialog', dialog => dialog.dismiss());
await page.locator('#confirmbtn').click();
```

---

# Quick Revision

```text
Native Dropdown
    ↓
selectOption()

Custom Dropdown
    ↓
click() → click option

Searchable Dropdown
    ↓
fill()/pressSequentially() → click option

<a>
    ↓
getByRole('link')

Alert
    ↓
dialog.accept()

Confirm Cancel
    ↓
dialog.dismiss()

One-time Dialog Handler
    ↓
page.once('dialog', ...)

Persistent Event Handler
    ↓
page.on('dialog', ...)
```

# Playwright Dialog Event Handling

Playwright handles browser dialogs such as:

* `alert`
* `confirm`
* `prompt`
* `beforeunload`

The main methods are:

```javascript
dialog.accept();
dialog.dismiss();
dialog.message();
dialog.type();
dialog.defaultValue();
```

---

## 1. Accept an Alert

Register the dialog handler **before** clicking the element that opens the dialog:

```javascript
page.once('dialog', dialog => dialog.accept());

await page.locator('#alertbtn').click();
```

### What happens?

1. `page.once('dialog', ...)` prepares Playwright to handle the next dialog.
2. `#alertbtn` is clicked.
3. The alert appears.
4. Playwright calls `dialog.accept()`.
5. The one-time listener is removed.

---

## 2. Dismiss a Confirm Dialog

```javascript
page.once('dialog', dialog => dialog.dismiss());

await page.locator('#confirmbtn').click();
```

`dismiss()` is equivalent to choosing **Cancel** on a confirm dialog.

---

## 3. Why `page.on()` Can Be a Problem

This code:

```javascript
page.on('dialog', dialog => dialog.accept());

await page.locator('#alertbtn').click();

page.on('dialog', dialog => dialog.dismiss());

await page.locator('#confirmbtn').click();
```

is **not recommended** for two separate dialogs.

The first `page.on()` listener remains active after the first dialog.

When the second dialog appears, both listeners may be attached:

```text
Listener 1 → accept()
Listener 2 → dismiss()
```

This can cause unwanted behavior.

### Better:

Use `page.once()` when each listener is intended for only one dialog:

```javascript
// Alert
page.once('dialog', dialog => dialog.accept());
await page.locator('#alertbtn').click();

// Confirm
page.once('dialog', dialog => dialog.dismiss());
await page.locator('#confirmbtn').click();
```

---

# 4. `page.on()` vs `page.once()`

### `page.on()`

```javascript
page.on('dialog', handler);
```

The listener remains registered and can handle multiple dialog events.

Use it when you intentionally want a **persistent event listener**.

### `page.once()`

```javascript
page.once('dialog', handler);
```

The listener handles **one occurrence** and is then automatically removed.

For individual alert/confirm actions, `page.once()` is usually the cleaner approach.

---

# 5. Alternative: `waitForEvent('dialog')`

You can explicitly wait for the dialog event:

```javascript
const dialogPromise = page.waitForEvent('dialog');

await page.locator('#alertbtn').click();

const dialog = await dialogPromise;
await dialog.accept();
```

For a confirm dialog:

```javascript
const dialogPromise = page.waitForEvent('dialog');

await page.locator('#confirmbtn').click();

const dialog = await dialogPromise;
await dialog.dismiss();
```

### Important

The `waitForEvent('dialog')` promise should be created **before** the action that triggers the dialog.

Correct:

```javascript
const dialogPromise = page.waitForEvent('dialog');
await page.locator('#alertbtn').click();
const dialog = await dialogPromise;
```

Not:

```javascript
await page.locator('#alertbtn').click();
const dialogPromise = page.waitForEvent('dialog');
```

The dialog may already have appeared before Playwright starts waiting for it.

---

# 6. Reading Dialog Information

You can inspect the dialog before accepting/dismissing it:

```javascript
page.once('dialog', async dialog => {
    console.log(dialog.type());
    console.log(dialog.message());

    await dialog.accept();
});

await page.locator('#alertbtn').click();
```

Useful properties/methods:

```javascript
dialog.type()
dialog.message()
dialog.defaultValue()
```

---

# 7. Recommended Practice

For simple one-time dialogs:

```javascript
page.once('dialog', dialog => dialog.accept());
await page.locator('#alertbtn').click();
```

For more control or when you need to inspect the dialog:

```javascript
const dialogPromise = page.waitForEvent('dialog');

await page.locator('#alertbtn').click();

const dialog = await dialogPromise;

console.log(dialog.message());

await dialog.accept();
```

### Key Rule

> **Set up the dialog handler/wait before performing the action that triggers the dialog.**

And avoid leaving unnecessary `page.on('dialog')` listeners attached throughout the test.
