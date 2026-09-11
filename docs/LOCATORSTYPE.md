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