const {test, expect}= require('@playwright/test');

// ChildWindowHandle: Instead of passing the {page} directly, initially hovered it start with {browser}.

test('Child window handle',async ({browser})=>{
    // Application URL
    let url = "https://rahulshettyacademy.com/loginpagePractise/";
    
    // Open a new browser tab (page) (Parent page)
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url);

    // Locate the link that opens a new window/tab: Parent page
    const documentLink = page.locator("[href*='documents-request']");

    // Wait for the new page (Child page) event and click the link simultaneously
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // Wait until a new page/tab is opened
        documentLink.click()          // Click the link that opens the new page
    ]);
    /**Why Promise.all() is used?: starts waiting for the event first, while also performing the click. This guarantees that 
     * Playwright captures the newly opened page reliably. This pattern is the recommended 
     * Playwright best practice for handling new tabs or windows.*/

    // Wait for the new page to finish loading
    await newPage.waitForLoadState();

    // Locate the email text displayed on the child page
    const textEmail = newPage.locator(".red");
    await expect(textEmail).toBeVisible();

    // Read the complete text content from the element: Child Page
    const childText = await textEmail.textContent();
    console.log("Child page text: " + childText);

    // Split the text at '@' to separate the username and domain
    const arrayText = childText.split("@");
    console.log(arrayText);

    /** Extract only the domain part (before the first space)
    Example:
    "mentor@rahulshettyacademy.com with Subject..." ->
    "rahulshettyacademy.com" */
    const domain = arrayText[1].split(" ")[0];
    console.log("Extracted domain: " + domain);

    // Locate the username input field
    const parentUser = page.locator("#username");

    // Fill the extracted domain
    await parentUser.fill(domain);

    // Verify the entered value
    console.log(await parentUser.inputValue());

    await expect(parentUser).toHaveValue("rahulshettyacademy.com");

    // Print the title of the new page: Parent Page
    console.log(await newPage.title());
    // Print the URL of the new page: Parent Page
    console.log(newPage.url());
});



/**Note:
 * await documentLink.click();
 * const newPage = await context.waitForEvent('page'); 
 * there is a risk that the new page opens before Playwright starts waiting for the 'page' event. 
 * In that case, the event can be missed and the test may time out.

 * 1. textContent(): Use it to read visible or hidden text inside an element.
    Use textContent() for: Headings (<h1>, <h2>), Labels, Paragraphs, Buttons, Links, Divs and spans
 * 2. inputValue(): Use it to read the value of an input field.
    Use inputValue() for: Username fields, Password fields, Search boxes, Textareas, Dropdowns (<select>)
*/