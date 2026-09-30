const {test, expect, request} = require('@Playwright/test');
//request library: Exposes API that can be used for the Web API testing.

const loginPayLoad = {userEmail:"rajnish1785398053843@gmail.com",userPassword:"Test@12345"};
//JS not need quotes with key. While JAVA and JSON have quotes in kye:value.
let token;
//public

//Will execute first before executing anything. And generate token.
//Integrating API testing with web.
test.beforeAll( async() => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data:loginPayLoad
        }
        //any data and any thing wrapped in {} bracket.
    );
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);

});

//Will execute the code before each and every test
test.beforeEach( () => {


});


test('place the order', async({page})=> {
    
    //Elements: CSS/DOM based Locators
    const loading = page.waitForLoadState('networkidle'); // Network request to complete
    const title = page.locator('.card-body b'); // Name of a prodeuct
    const productsAvailableOnPage = page.locator('.card-body'); // All infomation of product
    const cart = page.locator('button[routerlink="/dashboard/cart"]');
    const checkout = page.locator('text=Checkout');
    const creditCardNumber = page.locator('[value="4542 9931 9292 2293"]');
    const cvv = page.locator('[class="input txt"]').nth(0);
    const nameOnCard = page.locator('[class="input txt"]').nth(1);
    const applyName = page.locator('.field.small [name="coupon"]');
    const applyCouponBtn = page.locator('.field.small [type="submit"]');
    const couponText = page.locator('.field.small p');
    const selectCountry = page.locator('input[placeholder="Select Country"]');
    const placeOrder = page.locator('.btnn.action__submit.ng-star-inserted');
    const thankyou = page.locator('.hero-primary');
    const orderId = page.locator('.em-spacer-1 .ng-star-inserted');
    const ordersBtn = page.locator('.btn.btn-custom .fa.fa-handshake-o');
    const orderIDs = page.locator('tbody tr th');
    const viewButton = page.locator('tbody tr td .btn.btn-primary');
    const completeOrderMessage = page.locator('.tagline');

    let productName = "iphone 13 pro";
    let creditCard = "4000002500001001";
    let creditCVV = "881";
    let creditName = "Rajnish";
    let country = "India"; 
    let coupon = "rahulshettyacademy";

  
    //bypass the login screen by smaterway, call API. Save the time.
    page.addInitScript(value => {
        window.localStorage.setItem('token',value)
    }, token);+
    const email = "";
    await page.goto("https://rahulshettyacademy.com/client");
    await productsAvailableOnPage.first().waitFor();
    console.log(await title.allTextContents());
    const count = await productsAvailableOnPage.count();
    for (let i = 0; i < count; i++) {
        /**Match product in list.
         * Get the product name from the current product card and compare it with the expected product.*/
        if (await productsAvailableOnPage.nth(i).locator("b").textContent() === productName) // use tag as locator("b").
            {
            // Print the matched product name in the console.
            console.log(await productsAvailableOnPage.nth(i).locator("b").textContent());
            /**Add the product into cart.
            * Click the "Add To Cart" button for the matched product.*/
            await productsAvailableOnPage.nth(i).locator("text=Add To Cart").click();
            // Exit the loop after adding the required product to the cart.
            break;
        }
    }

    await cart.click();
    await page.locator("div li").first().waitFor();
    /** how to wait if the method what we are searching is not eligible for auto wait.
    then, how to wait untill the page is fully loaded. Need to select some items which will comfirm you that
    if they are loaded.*/
    const isProductVisible = await page.locator("h3:has-text('iphone 13 pro')").isVisible(); // find locator base upon text and with a tag.
    expect(isProductVisible).toBeTruthy();
    await checkout.click();
    await creditCardNumber.fill(creditCard);
    await cvv.fill(creditCVV);
    await nameOnCard.fill(creditName); // Types instantly
    await applyName.fill(coupon);
    await applyCouponBtn.click();
    const appliedText = await couponText.textContent();
    console.log(appliedText);
    await expect(appliedText).toContain("* Coupon Applied");
    await selectCountry.pressSequentially("ind",{ delay: 100 }); // Types slower, like a user
    const dropdown = await page.locator(".ta-results"); // complete div locator
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    console.log(optionsCount);
    for(let i=0; i<optionsCount;i++){
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await placeOrder.click();
    const thanyouText = await thankyou.textContent();
    console.log(thanyouText);
    await expect(thanyouText).toContain(" Thankyou for the order. ");
    const returnOrderID = await orderId.textContent();
    console.log(returnOrderID);
    const ExtractOrderId = await returnOrderID.split('|')[1].trim();
    console.log(ExtractOrderId); // Extract only the Order ID
    await ordersBtn.click();
    await orderIDs.first().waitFor();
    
    const ArrayorderList = await orderIDs.allTextContents();
    console.log(ArrayorderList);
    const counts = await orderIDs.count();
    console.log(counts);
    for(let i=0; i<counts; i++){
        if(ArrayorderList[i].trim() === ExtractOrderId){
            //trim() removes leading and trailing whitespace (spaces, tabs, and newlines) from a string.
            await expect(ArrayorderList).toContain(ExtractOrderId);
            await viewButton.nth(i).click();
            const Finalmessage = await completeOrderMessage.textContent();
            await expect(Finalmessage).toContain("Thank you for Shopping With Us");
            console.log(Finalmessage);
        }
        break;
    }
    
    await page.pause();
});