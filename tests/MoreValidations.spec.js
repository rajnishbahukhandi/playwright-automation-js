const{test, expect} = require('@playwright/test')
//Import annotation require('@playwright/test')

test("Popup validations", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://www.udemy.com/course/playwright-tutorials-automation-testing/learn/lecture/31110666#content");
    await page.goBack();
    await page.goForward();
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    //Radio
    await page.locator('input[value="radio3"]').click();

    //Input for countries
    const selectCountry = page.getByPlaceholder("Type to Select Countries");
    await selectCountry.click();
    await selectCountry.pressSequentially('Jap',{delay: 200});
    await page.locator('#ui-id-2',{name: "Japan"}).nth(0).click();

    //Dropdown
    await page.locator('#dropdown-class-example').selectOption("option2");
    await page.locator('#dropdown-class-example').selectOption('option1');

    //Checkbox
    await page.locator('#checkBoxOption1').click();

    //Button
    await page.getByRole('button',{name:'Open Window'}).click();

    //Switch/new tab Window
    await page.getByRole('link', { name: 'Open Tab' }).click();

    //Hide button verify
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();

    //Dialog box - dialog listener
    //Also, dialog.accept() = OK / Accept, while dialog.dismiss() = Cancel / Dismiss.
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#alertbtn').click();

    //Better approach: use page.once()
    // page.on('dialog', dialog => dialog.dismiss());
    // await page.locator('#confirmbtn').click();

    //Hovwer
    await page.locator('#mousehover').hover();
    await page.getByRole('link',{name: 'Reload'}).click();

    await page.pause();
})