const{test,expect} = require('@playwright/test');

test('product page test',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    //Elements
    const loginUser = page.locator("#userEmail");
    const loginPassword = page.locator('#userPassword');
    const loginBtn = page.locator('#login');
    const filterSearch = page.locator('[name*="search"]').nth(1);
    // const productDetail = page.locator('.card-body b');
    const productDetail = page.locator('.card-body b').filter({hasText: "iphone 13 pro"});
    const addToCartBtn = page.locator('.btn.w-10.rounded');
    const cart = page.locator('button[routerlink="/dashboard/cart"]');
    const buyNowBtn = page.locator('.btn.btn-primary').filter({hasText: "Buy Now"});
    const creditCardNumber = page.locator('[value="4542 9931 9292 2293"]');
    const cvv = page.locator('[class="input txt"]').nth(0);
    const nameOnCard = page.locator('[class="input txt"]').nth(1);
    const selectCountry = page.locator('input[placeholder="Select Country"]');
    const placeOrder = page.locator('.btnn.action__submit.ng-star-inserted');


    let loginEmail = "rajnish1785398053843@gmail.com";
    let loginPass = "Test@12345";
    let creditCard = "4000002500001001";
    let searchItem = "iphone 13 pro";
    let creditCVV = "881";
    let creditName = "Rajnish";
    let country = "India"; 

    await loginUser.fill(loginEmail);
    await loginPassword.fill(loginPass);
    await loginBtn.click();

    await expect(filterSearch).toBeVisible();
    console.log(await page.url());
    await filterSearch.fill(searchItem);
    await filterSearch.press('Enter');
    await productDetail.first().waitFor();
    await expect(productDetail).toBeVisible();
    console.log(await productDetail.allTextContents());
    await addToCartBtn.click();
    await cart.click();
    await expect(buyNowBtn).toBeVisible();
    await buyNowBtn.click();
    await creditCardNumber.fill(creditCard);
    await cvv.fill(creditCVV);
    await nameOnCard.fill(creditName);
    await selectCountry.fill(country);
    await selectCountry.press("Enter");
    await placeOrder.click();

    // await page.pause();
});