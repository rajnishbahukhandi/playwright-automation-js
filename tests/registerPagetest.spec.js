const{test,expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');

test('register test',async({browser})=>{
    const context = await browser.newContext();
    /* browser.newContext() → creates a new browser context. 
    first will open a new browser, and from that browser will open new context/new session
    */
    const page = await context.newPage();
    /*context.newPage() → creates a new tab/page inside that context.
    That browser will create one new page.
    */
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    //page.goto() → navigates that page.
    
   //Elements
    const newUserRegister = page.locator("[class='text-reset']");
    const firstName = page.locator("#firstName");
    const lastName = page.locator("#lastName");
    const email = page.locator("[type='email']");
    const phoneNumber = page.locator("[type='text']");
    const dropDown = page.locator("select[formcontrolname='occupation']");
    const radio = page.locator("[value='Male']");
    const password = page.locator("[formcontrolname='userPassword']");
    const conformPassword = page.locator("[formcontrolname='confirmPassword']");
    const ageVerify = page.locator("[type='checkbox']");
    const register = page.locator("#login");
    const successfullCreate = page.locator("[routerlink='/auth']");
    const successPageText = page.locator("[class='headcolor']");
    const emailEnter = page.locator("#userEmail");
    const passwordEnter = page.locator("#userPassword");
    const loginUserBtn = page.locator("#login");
    const listOfItems = page.locator(".card-body b");
    const listofImage = page.locator(".card-img-top");
   

    //Global userEntity
    //unique eamil : use backticks ` `
    let loginEmailid = `rajnish${Date.now()}@gmail.com`;
    console.log("unique email_id: "+loginEmailid);
    let loginPassword = "Test@12345";

    //Perform Action
    await newUserRegister.click();
    //page.url() is synchronous, so you do not need await.
    const urlVerify = page.url();
    console.log(urlVerify);
    //(assertion) approach: Verify only partially of the URL
    expect(urlVerify).toContain("/auth/register");
    console.log(await page.title());

    //--New user registration
    await firstName.fill("Rajnish");
    await lastName.fill("Bahukhandi");
    await email.fill(loginEmailid);
    await phoneNumber.fill("9902336611");
    //Select by value
    await dropDown.selectOption({ value: "3: Engineer" });
    //Verify the selected option
    await expect(dropDown).toHaveValue("3: Engineer");
    await radio.click();
    //Verify radio/checkbox is checked
    await expect(radio).toBeChecked();
    await password.fill(loginPassword);
    await conformPassword.fill(loginPassword);
    //Verify checkbox is checked
    await ageVerify.click();
    await expect(ageVerify).toBeChecked();
    //Verify checkbox is checked
    await register.click();
    const pageText = await successPageText.textContent();
    console.log(pageText);
    expect(pageText).toBe("Account Created Successfully");
    await successfullCreate.click();

    //--Login page
    await emailEnter.fill(loginEmailid);
    await passwordEnter.fill(loginPassword);
    await loginUserBtn.click();

    //items shop page
    // wait method: wait untill the page load successfully, method: waitForLoadState()
    // await page.waitForLoadState('networkidle');
    
    //Another wait method: dynamically keep on checking the Dom untill this element is visible.
    await listOfItems.first().waitFor();
    const allListing = await listOfItems.allTextContents();
    console.log(allListing);

    //get Images from shop page. 
    // const imageUrlsList = await listofImage.evaluateAll( images => images.map(img => img.src));
    // console.log(imageUrlsList);  


    for (let i = 0; i < await listofImage.count(); i++) {
        console.log(await listofImage.nth(i).getAttribute("src"));
    }
});