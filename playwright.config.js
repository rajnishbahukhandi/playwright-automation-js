import { defineConfig, devices } from '@playwright/test';
/**
 * See https://playwright.dev/docs/test-configuration.
 */

const config=({
  testDir: './tests',
  // Uncomment only one of the following when needed
  // testMatch: 'registerPagetest.spec.js',
  // testMatch: 'UIBasicstest.spec.js',
  // testMatch: 'loginPagetest.spec.js',
  // testMatch: 'childWindowHandle.spec.js',
  timeout: 30*1000,
  expect:{
    timeout: 10000,
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    // browserName: 'firefox',
    // browserName: 'webkit',
    headless: false,
  },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

});
module.exports= config


/**Note:
  30 * 1000 means: 
  1000 milliseconds = 1 second
  30 × 1000 milliseconds = 30,000 milliseconds
  30,000 milliseconds = 30 seconds
 * Code	Time:
  60 * 1000	1 minute
  2 * 60 * 1000	2 minutes
  5 * 60 * 1000	5 minutes
  Error: page.goto: Test ended.Test timeout of 3000ms exceeded.
*/