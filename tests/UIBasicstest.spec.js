const {test,expect} = require('@playwright/test')


test('Browser Context Playwright test', async ({browser})=>
{
    // chrome - plugin/ cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title());
    await userName.fill("rahulshetty");
    await page.locator("[name='password']").fill("learning");
    await signIn.click();
    //dynamic error message display: none attribute.
    console.log(await page.locator("[style*='block']").textContent());
    // contain partial text assertion
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
});

test.only('login with get element title test',async({page})=>
{
    // With the page fixture, Playwright automatically creates a browser context and a page for you.
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const passWord = page.locator("[name='password']");
    const itemsList = page.locator(".card-body a");

    console.log(await page.title());
    await userName.fill("rahulshettyacademy");
    await passWord.fill("Learning@830$3mK2");
    await signIn.click();

    // method nth() to gettext from list.
    console.log(await itemsList.nth(0).textContent());
    console.log(await itemsList.nth(1).textContent());
    console.log(await itemsList.nth(2).textContent());
    console.log(await itemsList.nth(3).textContent());

    // method first(), last() to gettext from list.
    console.log(await itemsList.first().textContent());
    console.log(await itemsList.last().textContent());
});

test.only('List of all elements titles test',async({page})=>
{
    // With the page fixture, Playwright automatically creates a browser context and a page for you.

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title());

    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const passWord = page.locator("[name='password']");
    const itemsList = page.locator(".card-body a");

    await userName.fill("rahulshettyacademy");
    await passWord.fill("Learning@830$3mK2");
    await signIn.click();

    // Wait for the first item to be visible
    await expect(itemsList.first()).toBeVisible();

    // This method use befor allTextContents() due, to page load and array should not [] empty.
    console.log(await itemsList.first().textContent());

    // get all product titles.
    const allTitles = await itemsList.allTextContents();
    console.log(allTitles);
});

test('Page Playwright test', async ({page})=>
{
    // With the page fixture, Playwright automatically creates a browser context and a page for you.
    // Get Title -- assertion
    await page.goto("https://google.com");
    console.log(await page.title());
    expect(page).toHaveTitle("Google");
});