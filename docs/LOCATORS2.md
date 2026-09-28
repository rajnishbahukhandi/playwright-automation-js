# Playwright Notes

## 1. Switching to an iframe

When an element is inside an iframe, we need to switch from the **main page** to the iframe before interacting with elements inside it.

### Example

```javascript
const framepage = page.frameLocator('#courses-iframe');
```

Here:

* `page` represents the main page.
* `frameLocator()` locates the iframe.
* `#courses-iframe` is the iframe ID.
* `framepage` stores the iframe locator.

### Why don't we use `await`?

We don't use `await` here because we are only **storing the locator/reference in a variable**.

We are not performing an action such as:

* `click()`
* `fill()`
* `textContent()`
* `getAttribute()`

Example:

```javascript
const framepage = page.frameLocator('#courses-iframe');
```

After storing the iframe locator, we can use `framepage` to interact with elements inside the iframe.

```javascript
await framepage.locator("a[href*='lifetime-access']").click();
```

---

# 2. CSS Locator - Attribute Contains

We can use `*=` when we want to find an element whose attribute contains a particular value.

### Example

```javascript
a[href*='lifetime-access']
```

This means:

> Find an `<a>` element whose `href` attribute contains `lifetime-access`.

For example:

```html
<a href="/courses/lifetime-access">
    Courses
</a>
```

The locator:

```javascript
a[href*='lifetime-access']
```

can find this element because `href` contains:

```text
lifetime-access
```

---

# 3. When a Locator Has Multiple Matches

Sometimes a locator can match multiple elements.

For example:

```javascript
a[href*='lifetime-access']
```

If multiple `<a>` elements have `href` values containing `lifetime-access`, we can make the locator more specific by adding the parent tag.

### Example

```javascript
li a[href*='lifetime-access']
```

Here:

```text
li  → parent element
a   → child element
```

The space between `li` and `a` means:

> Find the `<a>` element inside an `<li>` element.

### General Pattern

```css
parent child
```

Example:

```javascript
li a[href*='lifetime-access']
```

This helps us narrow down the locator when multiple elements match.

---

# 4. Selecting Only a Visible Element

Sometimes multiple elements match the same locator, but some of them are hidden.

In that situation, we can use:

```text
:visible
```

to select only the visible matching element.

### Example

```javascript
await framepage
    .locator("li a[href*='lifetime-access']:visible")
    .click();
```

`:visible` tells Playwright to select the matching element that is visible.

### Important

Correct:

```javascript
li a[href*='lifetime-access']:visible
```

Incorrect:

```javascript
li a[href*='lifetime-access'] :visible
```

There should be **no space** before `:visible`.

---

# 5. Finding a Child Element Using a Class

Suppose we have HTML like:

```html
<div class="text">
    <h2>1355 Happy Subscribers!</h2>
</div>
```

We can use:

```javascript
.text h2
```

### Example

```javascript
const textcheck = await framepage
    .locator(".text h2")
    .textContent();
```

Here:

```text
.text  → parent element
h2     → child element
```

The space means:

> Find the `<h2>` element inside the element having the class `text`.

### General Pattern

```css
.parent-class child-tag
```

Example:

```css
.text h2
```

---

# 6. Getting Text Using `textContent()`

We can use `textContent()` to get the text from an element.

### Example

```javascript
const textcheck = await framepage
    .locator(".text h2")
    .textContent();
```

If the element contains:

```text
1355 Happy Subscribers!
```

then:

```javascript
textcheck
```

will contain:

```text
1355 Happy Subscribers!
```

---

# 7. Splitting Text Using `split()`

If we want to separate the text into individual words, we can use:

```javascript
textcheck.split(" ");
```

For example:

```text
1355 Happy Subscribers!
```

will become:

```javascript
[
    "1355",
    "Happy",
    "Subscribers!"
]
```

The text is split wherever there is a space.

---

# 8. Array Indexing

JavaScript arrays use **zero-based indexing**.

That means:

```javascript
[0] → First element
[1] → Second element
[2] → Third element
```

### Example

```javascript
const textcheck = "1355 Happy Subscribers!";
```

```javascript
textcheck.split(" ")[0];
```

Output:

```text
1355
```

```javascript
textcheck.split(" ")[1];
```

Output:

```text
Happy
```

```javascript
textcheck.split(" ")[2];
```

Output:

```text
Subscribers!
```

### Getting Subscriber Count

If we want to extract `1355`:

```javascript
const subscriberCount = textcheck.split(" ")[0];
```

---

# Quick Revision

| Concept            | Example                                | Meaning                               |
| ------------------ | -------------------------------------- | ------------------------------------- |
| Frame locator      | `page.frameLocator('#courses-iframe')` | Locate an iframe                      |
| Attribute contains | `a[href*='lifetime-access']`           | `href` contains the given text        |
| Parent + child     | `li a[...]`                            | Find `a` inside `li`                  |
| Visible element    | `a:visible`                            | Select only visible matching elements |
| Class + child      | `.text h2`                             | Find `h2` inside `.text`              |
| Get text           | `.textContent()`                       | Extract text from an element          |
| Split text         | `.split(" ")`                          | Split text into an array              |
| First array item   | `[0]`                                  | Get the first value                   |
| Second array item  | `[1]`                                  | Get the second value                  |
| Third array item   | `[2]`                                  | Get the third value                   |

---

# Complete Example

```javascript
const framepage = page.frameLocator('#courses-iframe');

// Locate the visible lifetime-access link
await framepage
    .locator("li a[href*='lifetime-access']:visible")
    .click();

// Get subscriber text
const textcheck = await framepage
    .locator(".text h2")
    .textContent();

// Extract subscriber count
const subscriberCount = textcheck.split(" ")[0];

console.log(subscriberCount);
```

### Expected Output

```text
1355
```

---

# Key Points to Remember

1. Use `frameLocator()` to work with elements inside an iframe.
2. `frameLocator()` does not need `await` when simply storing the locator.
3. Use `*=` for **attribute contains**.
4. Add the parent tag to make a CSS locator more specific.
5. Use `:visible` when you need to target a visible matching element.
6. `.text h2` means `h2` inside the element with class `text`.
7. Use `textContent()` to retrieve text.
8. Use `split(" ")` to separate text into an array.
9. JavaScript arrays start with index `0`.
10. Use `[0]`, `[1]`, `[2]` to retrieve individual values.
