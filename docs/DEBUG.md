## How to Debug (flag) a Playwright Script Notes:

Playwright provides a built-in debugging tool called **Playwright Inspector**. It is part of Playwright and does **not require any third-party plugin**.

The Inspector helps you:

* Debug Playwright scripts step by step.
* Pause test execution and inspect what is happening.
* Run the script step by step.
* Identify and generate locators for web elements.
* Test locators at runtime.
* Add and verify assertions.
* Investigate why a locator or test step is failing.

### Run a Test in Debug Mode

Open the **VS Code Terminal** and run:

```bash
npx playwright test registerPagetest.spec.js --debug
```

Replace `registerPagetest.spec.js` with the name of your test file.

### How Debug Mode Works

1. Execute the command in the VS Code terminal.
2. Playwright opens the **Playwright Inspector**.
3. The browser opens with the application under test.
4. Click the **Run** button in the Inspector to start execution.
5. Playwright pauses execution so you can inspect and execute the test step by step.
6. Use **Step Over** to execute the next action and observe what happens in the browser.
7. A **red circle/indicator** highlights the element or location where Playwright will perform the next action.

### Using Multiple Monitors

In a company environment, you may use multiple monitors:

* **Monitor 1:** Playwright Inspector
* **Monitor 2:** Browser/application under test

This makes it easier to debug the script step by step while simultaneously watching the actual browser execution.

---

## 1. Identify a Locator During Debugging

If a test is failing because of a locator, you can use the **locator/spy tool** in the Playwright Inspector.

### Steps

1. Open the Playwright Inspector in debug mode.
2. Select the **locator/spy icon**.
3. Go to the application in the browser.
4. Select an element such as:

   * Checkbox
   * Radio button
   * Input field
   * Button
   * Link
5. Playwright identifies the locator for the selected element.
6. Check whether the generated locator matches the element used in your test.
7. If the existing locator is incorrect or has changed, replace it with the new locator.
8. Run the test again to verify the fix.

Playwright can generate different locator strategies, such as:

```javascript
getByRole()
getByLabel()
getByText()
```

It can also generate CSS selectors when appropriate.

---

## 2. Check a Locator at Runtime

You can also test a locator directly in the Playwright Inspector while debugging.

For example:

```css
input[name='name']
```

Enter the locator into the locator field in the Inspector and verify whether it identifies the expected element.

This is useful when a test is failing because:

* The locator is incorrect.
* The element has changed.
* The element is not available at the expected time.
* Multiple elements match the locator.
* The selector needs to be updated.

### Runtime Locator Validation

You can try different locator strategies in the Inspector and immediately check whether Playwright identifies the correct element.

For example:

```javascript
page.locator("input[name='name']")
```

or:

```javascript
page.getByLabel("Name")
```

Once the correct locator is identified, update the test script and execute the test again.

### Why Debug Mode Is Useful

Debug mode is especially useful when a test fails and you need to determine **exactly which step is failing and why**.

It allows a tester to:

* Stop execution at the required point.
* Observe browser behavior.
* Verify locators.
* Generate alternative locators.
* Test locators at runtime.
* Execute actions one step at a time.
* Identify and fix failures more efficiently.
