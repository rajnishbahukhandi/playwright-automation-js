const {test, expect} = require('@playwright/test');

test('Browser test', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://google.com");
});
/*Browser Context: An isolated browser session(like as Incognito window).
{Browser} for advance scenarios (TC)
Create multiple browser contexts.
Simulate multiple users.
Open multiple tabs in a corntrolled way.
Custom browser context configurations(Settings): (Permissions, storage state, viewport, geolocation etc).
Multiple tabs under user control.
*/

test('Page test', async ({page})=>{
    // with the page fixture, palywright automatically creats browser context and page.
    await page.goto("https://rahulshettyacademy.com");
});
/* Page: Browser tab
{Page} for login, registeration, product search, cart, checkout and other standard UI scenarios.
{Page} best for normal UI tests.
page and context created automatically.
Browser provide.
Before test starts/executes, with page fixtures, playwright automatically creates browser context and page.
*/ 

test('Browser test', async ({browser})=>{
    const context = await browser.newContext();
    /* browser.newContext() → creates a new browser context. 
    first will open a new browser, and from that browser will open new context/new session
    */
    const page = await context.newPage();
    /*context.newPage() → creates a new tab/page inside that context.
    From that browser/session will create one new page/base page.
    And this page automating.
    */
    await page.goto("https://google.com");
    //page.goto() → navigates that page.
});
