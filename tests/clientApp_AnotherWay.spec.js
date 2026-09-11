const{test, expect} = require('@playwright/test');

test('Client App end to end test',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client");
    
    //Elements: User Facing Locators
    const loginUser = page.getByPlaceholder("email@example.com");
    const loginPassword = page.getByPlaceholder('enter your passsword');
    const loginBtn = page.getByRole("button",{name:'Login'});
    const loadingPage = page.waitForLoadState('networkidle'); // Network request to complete
    const productsAvailableOnPage = page.locator('.card-body'); // All infomation of product
    const title = page.locator('.card-body b'); // Name of a prodeuct
    const productTextOnCartPage = page.getByText("ADIDAS ORIGINAL");
    const checkout = page.getByRole("button",{name:'Checkout'});

    const creditCardNumber = page.locator('[value="4542 9931 9292 2293"]');
    const cvv = page.locator('[class="input txt"]').nth(0);
    const nameOnCard = page.locator('[class="input txt"]').nth(1);
    const applyName = page.locator('.field.small [name="coupon"]');
    const applyCouponBtn = page.getByRole('button',{name:"Apply Coupon"});
    const couponText = page.locator('.field.small p');

    let loginEmail = "rajnish1785398053843@gmail.com";
    let loginPass = "Test@12345";
    let creditCard = "4000002500001001";
    let creditCVV = "881";
    let creditName = "Rajnish";
    let country = "India"; 
    let coupon = "rahulshettyacademy";

    await loginUser.fill(loginEmail);
    await loginPassword.fill(loginPass);
    await loginBtn.click();
    await loadingPage;
    await productsAvailableOnPage.first().waitFor();
    console.log(await title.allTextContents());
    await productsAvailableOnPage.filter({hasText:'ADIDAS ORIGINAL'}).getByRole('button',{name:" Add To Cart"}).click();
    await page.getByRole("listitem").getByRole('button',{name:'  Cart '}).click();
    await expect(productTextOnCartPage).toBeVisible();
    await checkout.click();
    await creditCardNumber.fill(creditCard);
    await cvv.fill(creditCVV);
    await nameOnCard.fill(creditName); // Types instantly
    await applyName.fill(coupon);
    await applyCouponBtn.click();

    const selectCountry = page.getByRole('textbox', { name: 'Select Country' });
    await selectCountry.click();
    await selectCountry.pressSequentially('ind', { delay: 200 });
    await page.getByRole('button', { name: "India" }).nth(1).click();
    await page.getByText('Place Order').click();
}); 

