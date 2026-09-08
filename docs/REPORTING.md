## Screenshots & Trace Notes:

Playwright provides options to capture screenshots and record detailed execution traces for debugging test failures.

### Screenshot Options

```typescript
screenshot: 'off'
```

* Screenshots are not captured.

```typescript
screenshot: 'on'
```

* Captures screenshots during test execution.

```typescript
screenshot: 'only-on-failure'
```

* Captures screenshots only when a test fails.
* Recommended for regular test execution to avoid unnecessary screenshots.

### Trace Options

```typescript
trace: 'on'
```

* Records a detailed Playwright trace for every test execution.
* Useful for debugging and analyzing test execution.

```typescript
trace: 'retain-on-failure'
```

* Records the trace during test execution.
* Retains the trace when the test fails.
* Useful for debugging failed tests while avoiding unnecessary trace files for successful tests.

### Recommended Configuration

```typescript
use: {
  /* Detailed automation execution report with screenshots and trace information. */
  screenshot: 'only-on-failure',  // Capture screenshot only when the test fails.
  trace: 'retain-on-failure',     // Retain detailed trace only when the test fails.
}
```

### View the Playwright Report

After test execution:

1. Refresh the project to view the generated Playwright report.
2. The report contains test execution results and screenshots for failed tests.
3. Failed tests with retained traces can be opened for detailed debugging.
4. To open the report manually, copy the path of the generated `index.html` file and open it in a browser.

Example:

```text
playwright-report/
└── index.html
```

The Playwright report helps analyze **which test failed, where it failed, screenshots, and detailed execution trace information**.
