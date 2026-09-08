## Codegen – Record and Playback Notes:

Playwright **Codegen** allows you to record user interactions in the browser and automatically generate Playwright test code based on those actions.

### Run Codegen

Open the **VS Code Terminal** and execute:

```bash
npx playwright codegen https://rahulshettyacademy.com/angularpractice
```

### How Codegen Works

1. **Invoke the Codegen tool**

   * The `codegen` command is part of the Playwright executable.
   * Provide the URL where you want to start recording.

2. **Start Recording**

   * Execute the command in the VS Code terminal.
   * A browser window opens in **recording mode**.
   * Perform the required actions on the application, such as clicking, entering text, selecting options, and navigating between pages.

3. **Automatically Generate Code**

   * Playwright generates the corresponding automation code while you interact with the application.
   * The generated code can be copied and used in your Playwright test files.

4. **Assertions**

   Codegen also provides different types of assertions that can be added while recording, such as:

   * Assert text
   * Assert visibility
   * Assert value

5. **Use the Generated Code**

   * Copy the recorded code.
   * Convert or select the required Playwright language/library format.
   * Add the generated code to a new test file.
   * Modify and maintain the generated code according to your automation framework and testing requirements.

### Example

```bash
npx playwright codegen https://rahulshettyacademy.com/angularpractice
```

**Note:** Codegen is useful for quickly creating an initial automation script and identifying locators. The generated code should be reviewed and cleaned up before using it as part of a maintainable automation framework.
