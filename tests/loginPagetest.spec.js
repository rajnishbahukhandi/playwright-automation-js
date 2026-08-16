const{test, expect} = require('@playwright/test');

test('login page test', async ({page}) =>{

    //Elements
    const userName = page.locator("#username");
    const passWord = page.locator("#password");
    const radioBtn = page.locator("[class='radiotextsty']");
    const popupBtn = page.locator("[type='button']");
    const selectDropDown = page.locator("select.form-control");
    const termConditionBtn = page.locator("[type='checkbox']");
    const blinkDocument = page.locator("[href*='documents-request']");
    const requiterHire = page.locator("[href='https://techsmarthire.com/']");

    //Global Inputs
    let name = "rajnish";
    let passw = "test@3456";
    let url = "https://rahulshettyacademy.com/loginpagePractise/";

    //Executions
    await page.goto(url);
    await userName.fill(name);
    await passWord.fill(passw);
    // Method use if multiple option are there with same locator: last(), nth(n)
    await radioBtn.last().click();
    // Assertion to verify
    await expect(radioBtn.last()).toBeChecked();
    // print the boolean.
    console.log(await radioBtn.last().isChecked());
    await popupBtn.last().click();
    // select from dropdown list.
    await selectDropDown.selectOption("teach");
    // Assertion to verify have value.
    await expect(selectDropDown).toHaveValue("teach");
    // verify the check method()
    await termConditionBtn.check();
    // Assertion to verify
    await expect(termConditionBtn).toBeChecked();
    // verify the uncheck() method
    await termConditionBtn.uncheck();
    // Assertion to verify the boolean condition toBeFalsy() return: false.
    expect(await termConditionBtn.isChecked()).toBeFalsy();
    // HTML attribute method.
    await expect(blinkDocument).toHaveAttribute("class","blinkingText");
    // Visible test method.
    await expect(requiterHire).toHaveText("Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire");
    // some other method are: partial text, css class
    await page.pause();
});
