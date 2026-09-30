# API-Assisted Web Automation with Playwright

## 📌 Overview

Playwright is primarily used for **Web UI Automation**.

However, Playwright also provides API capabilities that can be used **smartly alongside UI automation** to make tests:

* ⚡ Faster
* 🛡️ More stable
* 🧹 Less dependent on repetitive UI steps
* 🔄 Easier to maintain
* 🎯 Focused on the actual business flow

The goal is **not to replace UI automation with API testing**.

Instead, we use APIs for **preconditions, setup, authentication, and test-data creation**, while keeping the **core business flow on the UI**.

---

# 🎯 Main Goal

Suppose our test scenario is:

> Login → Select Product → Add to Cart → Checkout → Place Order

A traditional UI automation script performs everything through the browser:

```text
Open Browser
     ↓
Login
     ↓
Wait for Login
     ↓
Load Products
     ↓
Select Product
     ↓
Add to Cart
     ↓
Checkout
     ↓
Place Order
```

The login portion is usually not the main objective of the test.

If the actual test objective is:

> **Place an order**

we can delegate the login/precondition to an API.

```text
API
 ↓
Login
 ↓
Get Token
 ↓
Set Token in Browser
 ↓
Open Application
 ↓
Select Product
 ↓
Add to Cart
 ↓
Checkout
 ↓
Place Order
```

This makes the test faster and reduces unnecessary UI interaction.

---

# 🧠 Core Concept

### Don't think:

> "Playwright is an API testing tool."

Instead, think:

> **"I am doing Web UI Automation, and I am using API capabilities to make my UI automation smarter."**

The **UI remains the core of the test**.

API is used where it provides a better and faster way to perform supporting operations.

---

# 🚀 Why Use API in Web Automation?

UI automation can sometimes be flaky because it depends on:

* Page loading
* Network speed
* Animations
* Rendering
* UI elements
* Browser state
* Waiting for elements
* Login screens
* Redirects
* Session initialization

For example, logging into an application through the UI may require:

```text
Enter username
      ↓
Enter password
      ↓
Click Login
      ↓
Wait for response
      ↓
Wait for navigation
      ↓
Wait for dashboard
      ↓
Verify login
```

If authentication can be performed through an API, we can remove these unnecessary UI steps.

---

# 🎯 Where Should API Be Used?

Use API assistance mainly for:

### 1. Authentication

Instead of:

```text
UI Login
```

Use:

```text
API Login
 ↓
Get Authentication Token
 ↓
Inject Token into Browser
```

---

### 2. Test Data Creation

Suppose a test requires a customer before starting.

Instead of:

```text
Open UI
 ↓
Create Customer
 ↓
Fill 10 fields
 ↓
Save
 ↓
Wait
```

We can create the customer through an API:

```text
API
 ↓
Create Customer
 ↓
Return Customer ID
 ↓
Start UI Test
```

The UI test can then focus on the actual business scenario.

---

### 3. Precondition Setup

APIs can be used to prepare the environment before the UI test.

Examples:

```text
Create User
Create Product
Create Order
Create Account
Generate Transaction
Set Configuration
```

Then perform the actual validation through the UI.

---

# 🔐 Authentication / Token Handling

When developing an automation framework, the developer may provide an authentication mechanism.

For example:

```text
Token
Bearer Token
Authorization Header
Cookie
Local Storage
Session Storage
```

The exact implementation depends on how the application manages authentication.

---

## Example: Token-Based Authentication

The API login may return something like:

```json
{
    "token": "eyJhbGciOiJIUzI1Ni..."
}
```

The token can then be stored and used by the browser.

For example:

```javascript
let token;

const loginResponse = await apiContext.post(
    'https://example.com/api/login',
    {
        data: loginPayload
    }
);

expect(loginResponse.ok()).toBeTruthy();

const loginResponseJson = await loginResponse.json();

token = loginResponseJson.token;
```

Then inject the token into browser storage:

```javascript
await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
}, token);
```

Now the browser can start with the authenticated state.

---

# 🧪 Example: Place Order Test

### Traditional UI Approach

```text
Login
 ↓
Enter Username
 ↓
Enter Password
 ↓
Click Login
 ↓
Wait for Dashboard
 ↓
Load Products
 ↓
Select Product
 ↓
Add to Cart
 ↓
Checkout
 ↓
Place Order
```

### API-Assisted UI Approach

```text
API Login
 ↓
Get Token
 ↓
Inject Token
 ↓
Open Application
 ↓
Load Products
 ↓
Select Product
 ↓
Add to Cart
 ↓
Checkout
 ↓
Place Order
```

The **login is delegated to API**, but the important business flow remains UI-based.

---

# 💻 Playwright Example

```javascript
const { test, expect, request } = require('@playwright/test');

const loginPayload = {
    userEmail: "test@example.com",
    userPassword: "Test@12345"
};

let token;

test.beforeAll(async () => {

    const apiContext = await request.newContext();

    const loginResponse = await apiContext.post(
        'https://example.com/api/login',
        {
            data: loginPayload
        }
    );

    expect(loginResponse.ok()).toBeTruthy();

    const loginResponseJson = await loginResponse.json();

    token = loginResponseJson.token;

    console.log(token);
});

test('Place the order', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto('https://example.com/client');

    // Core business flow remains UI-based

    await page.getByText('Product').click();

    await page.getByRole('button', {
        name: 'Add To Cart'
    }).click();

    await page.getByRole('button', {
        name: 'Checkout'
    }).click();

    // Continue UI validation...

});
```

---

# 🏗️ What Should Remain in UI?

The **core business functionality should remain on the UI**.

For example, if the objective is:

> Place an order

then these steps should be UI-driven:

```text
Select Product
 ↓
Add to Cart
 ↓
Checkout
 ↓
Enter Payment Details
 ↓
Place Order
 ↓
Verify Order Confirmation
```

Don't move the entire scenario to API simply because API is faster.

The purpose is to **optimize UI automation**, not eliminate it.

---

# ⚡ What Can Be Delegated to API?

| Activity           |         UI |      API |
| ------------------ | ---------: | -------: |
| Login              |   Optional |        ✅ |
| Authentication     |   Optional |        ✅ |
| Create Test User   | ❌/Optional |        ✅ |
| Create Test Data   | ❌/Optional |        ✅ |
| Environment Setup  |          ❌ |        ✅ |
| Select Product     |          ✅ |        ❌ |
| Add to Cart        |          ✅ | Optional |
| Checkout           |          ✅ | Optional |
| Place Order        |          ✅ | Optional |
| Verify UI Message  |          ✅ |        ❌ |
| Verify UI Behavior |          ✅ |        ❌ |

The important question is:

> **"Does this step belong to the actual business behavior I want to validate?"**

If the answer is **No**, API assistance may be useful.

---

# 🧩 Authentication Storage Options

Depending on the application architecture, authentication information may exist in different places.

### Token

```javascript
localStorage.setItem('token', token);
```

### Bearer Token

API requests may use:

```text
Authorization: Bearer <token>
```

### Cookies

Authentication may be maintained through:

```text
HTTP Cookie
```

### Local Storage

```text
localStorage
```

### Session Storage

```text
sessionStorage
```

The automation approach should match the application's actual authentication mechanism.

---

# 🛡️ Benefits

## Faster Execution

API calls are generally much faster than performing several UI interactions.

Instead of:

```text
Login UI
 ↓
Wait
 ↓
Dashboard
 ↓
Wait
 ↓
Products
```

we can:

```text
API Login
 ↓
Token
 ↓
UI
```

---

## Reduced Flakiness

Every unnecessary UI interaction introduces another possible synchronization point.

Reducing unnecessary UI steps can reduce failures caused by:

* Timing
* Rendering
* Network delays
* Animations
* Redirects
* Element availability

---

## Better Test Focus

If the test is called:

> `Place the order`

the test should primarily validate:

```text
Product
 ↓
Cart
 ↓
Checkout
 ↓
Order
```

It shouldn't spend most of its execution time repeatedly testing login.

---

# ⚠️ Important Principle

### Don't blindly replace UI steps with API calls.

Ask:

> **What am I actually testing?**

If you are testing **Login functionality**, use the UI and test the login UI.

If you are testing **Place Order functionality**, authentication can potentially be handled as a precondition.

---

# 🔄 The Strategy

Think of the automation architecture as:

```text
                 TEST
                  │
        ┌─────────┴─────────┐
        │                   │
   PRECONDITIONS        BUSINESS FLOW
        │                   │
       API                  UI
        │                   │
 Authentication        User Actions
 Test Data             UI Validation
 Setup                  Business Flow
```

### API

**Prepare the test.**

### UI

**Test the user/business experience.**

---

# 📌 Golden Rule

> **Use API where it makes the UI automation faster and more stable, but keep the core business flow on the UI.**

This approach allows us to build **smarter, faster and more maintainable web automation tests** without turning the test suite into an API-testing suite.

---

# 🔑 Key Takeaways

1. Playwright is primarily being used here for **Web UI Automation**.
2. API capabilities can support the UI automation framework.
3. Use API for **authentication and preconditions** when appropriate.
4. Use API to **create test data faster**.
5. Authentication may involve **tokens, bearer tokens, cookies, localStorage, or sessionStorage**.
6. Keep the **core business flow on the UI**.
7. Reduce unnecessary UI interactions.
8. Faster setup can reduce execution time.
9. Fewer unnecessary UI steps can reduce potential flakiness.
10. The objective is **smart UI automation**, not replacing UI testing with API testing.
