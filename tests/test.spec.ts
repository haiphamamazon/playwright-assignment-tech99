import { productsByCategory, users, customers } from '../data/testData'
import { test } from '../fixtures/fixture'

test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateTo('/');
    await loginPage.verifyURL();
});

// test.afterEach(async ({ homePage }) => {
//     await homePage.closeBrowser();
// });

test.describe('Login functionality', {
    tag: ['@ui', '@login']
}, () => {
    test('@TC001 - Login with valid username and password', async ({ loginPage, homePage }) => {
        await loginPage.clickLoginButton();
        await loginPage.inputUsername(users.validUser.username);
        await loginPage.inputPassword(users.validUser.password);
        await loginPage.clickLoginToProcess();
        await homePage.expectUserLoggedIn(users.validUser.username);
    });

    test('@TC002 - Login with empty username and password', async ({ loginPage }) => {
        await loginPage.clickLoginButton();
        await loginPage.inputUsername("");
        await loginPage.inputPassword("");
        await loginPage.clickLoginToProcess();
        await loginPage.expectPopupWrongPasswordDisplay();
    });

    test('@TC003 - Login with invalid username and password', async ({ page, loginPage }) => {
        await loginPage.clickLoginButton();
        await loginPage.inputUsername(users.inValidUser.username);
        await loginPage.inputPassword(users.inValidUser.password);
        await loginPage.clickLoginToProcess();
        await loginPage.expectPopupWrongPasswordDisplay();
    });

    test('@TC004 - Login with non-existing username', async ({ page, loginPage }) => {
        await loginPage.clickLoginButton();
        await loginPage.inputUsername(users.nonExistingUser.username);
        await loginPage.inputPassword(users.nonExistingUser.password);
        await loginPage.clickLoginToProcess();
        await loginPage.expectPopupWrongPasswordDisplay();
    });

    test('@TC005 - Login with valid username and password then Logout successful', async ({ loginPage, homePage }) => {
        await loginPage.clickLoginButton();
        await loginPage.inputUsername(users.validUser.username);
        await loginPage.inputPassword(users.validUser.password);
        await loginPage.clickLoginToProcess();
        await homePage.expectUserLoggedIn(users.validUser.username);
        await homePage.clickLogoutButton();
        await homePage.expectUserLoggedOut();
    });

});

test.describe('Place order functionality', {
    tag: ['@ui', '@addtocard', '@placeorder']
}, () => {
    test('@TC001 - Login then purchase product successful - Full end to end flow', async ({ loginPage, homePage, cartPage }) => {
        const product = "Phones"; // It must be Phones/Laptops/Monitos ( type of categories )
        await loginPage.clickLoginButton();
        await loginPage.inputUsername(users.validUser.username);
        await loginPage.inputPassword(users.validUser.password);
        await loginPage.clickLoginToProcess();
        await homePage.expectUserLoggedIn(users.validUser.username);
        await homePage.selectProductByCategory(product);
        await homePage.addProductToCart();
        await homePage.expectPopupProductAddedDisplay();
        await homePage.clickCardHomePage();
        // await cartPage.verifyTotalPrice(product);
        await cartPage.clickPlaceOrder();
        await cartPage.inputName(customers.information.name);
        await cartPage.inputCountry(customers.information.country);
        await cartPage.inputCity(customers.information.city);
        await cartPage.inputCard(customers.information.creditCard);
        await cartPage.inputMonth(customers.information.month);
        await cartPage.inputYear(customers.information.year);
        await cartPage.clickPurchase();
        await cartPage.expectPurchaseSuccessful(customers.information.successfulPurchase);
        await cartPage.clickOKButton(); // Click OK button to close purchase popup
    });

    test('@TC002 - No Login - Purchase product successful', async ({ homePage, cartPage }) => {
        const product = "Laptops"; // It must be Phones/Laptops/Monitos ( type of categories )
        await homePage.selectProductByCategory(product);
        await homePage.addProductToCart();
        await homePage.expectPopupProductAddedDisplay();
        await homePage.clickCardHomePage();
        // await cartPage.verifyTotalPrice(product);
        await cartPage.clickPlaceOrder();
        await cartPage.inputName(customers.information.name);
        await cartPage.inputCountry(customers.information.country);
        await cartPage.inputCity(customers.information.city);
        await cartPage.inputCard(customers.information.creditCard);
        await cartPage.inputMonth(customers.information.month);
        await cartPage.inputYear(customers.information.year);
        await cartPage.clickPurchase();
        await cartPage.expectPurchaseSuccessful(customers.information.successfulPurchase);
        await cartPage.clickOKButton(); // Click OK button to close purchase popup
    });

    test('@TC003 - Login - Purchase product - No add to cart product', async ({ loginPage, homePage, cartPage }) => {
        await loginPage.clickLoginButton();
        await loginPage.inputUsername(users.validUser.username);
        await loginPage.inputPassword(users.validUser.password);
        await loginPage.clickLoginToProcess();
        await homePage.expectUserLoggedIn(users.validUser.username);
        await homePage.clickCardHomePage();
        await cartPage.clickPlaceOrder();
        await cartPage.inputName(customers.information.name);
        await cartPage.inputCountry(customers.information.country);
        await cartPage.inputCity(customers.information.city);
        await cartPage.inputCard(customers.information.creditCard);
        await cartPage.inputMonth(customers.information.month);
        await cartPage.inputYear(customers.information.year);
        await cartPage.clickPurchase();
        await cartPage.expectPurchaseSuccessful(customers.information.successfulPurchase);
        await cartPage.clickOKButton(); // Click OK button to close purchase popup
    });

    test('@TC004 - No Login - Purchase product - No add to cart product', async ({ homePage, cartPage }) => {
        await homePage.clickCardHomePage();
        await cartPage.clickPlaceOrder();
        await cartPage.inputName(customers.information.name);
        await cartPage.inputCountry(customers.information.country);
        await cartPage.inputCity(customers.information.city);
        await cartPage.inputCard(customers.information.creditCard);
        await cartPage.inputMonth(customers.information.month);
        await cartPage.inputYear(customers.information.year);
        await cartPage.clickPurchase();
        await cartPage.expectPurchaseSuccessful(customers.information.successfulPurchase);
        await cartPage.clickOKButton(); // Click OK button to close purchase popup
    });

    test('@TC005 - Login - Purchase product - Add to cart - Empty Customer Information', async ({ loginPage, homePage, cartPage }) => {
        const product = "Monitors"; // It must be Phones/Laptops/Monitos ( type of categories )
        await loginPage.clickLoginButton();
        await loginPage.inputUsername(users.validUser.username);
        await loginPage.inputPassword(users.validUser.password);
        await loginPage.clickLoginToProcess();
        await homePage.expectUserLoggedIn(users.validUser.username);
        await homePage.selectProductByCategory(product);
        await homePage.addProductToCart();
        await homePage.clickCardHomePage();
        // await cartPage.verifyTotalPrice(product);
        await cartPage.clickPlaceOrder();
        await cartPage.inputName("");
        await cartPage.inputCountry("");
        await cartPage.inputCity("");
        await cartPage.inputCard("");
        await cartPage.inputMonth("");
        await cartPage.inputYear("");
        await cartPage.clickPurchase();
        await cartPage.expectPopupNameAndCardDisplay();
    });

    test('@TC006 - No Login - Purchase product - Add to cart - Empty Customer Information', async ({ homePage, cartPage }) => {
        const product = "Phones"; // It must be Phones/Laptops/Monitos ( type of categories )
        await homePage.selectProductByCategory(product);
        await homePage.addProductToCart();
        // await homePage.expectPopupProductAddedDisplay();
        await homePage.clickCardHomePage();
        // await cartPage.verifyTotalPrice(product);
        await cartPage.clickPlaceOrder();
        await cartPage.inputName("");
        await cartPage.inputCountry("");
        await cartPage.inputCity("");
        await cartPage.inputCard("");
        await cartPage.inputMonth("");
        await cartPage.inputYear("");
        await cartPage.clickPurchase();
        await cartPage.expectPopupNameAndCardDisplay();
    });

    test('@TC007 - Login - Purchase product - No add to cart product - Empty customer information', async ({ loginPage, homePage, cartPage }) => {
        await loginPage.clickLoginButton();
        await loginPage.inputUsername(users.validUser.username);
        await loginPage.inputPassword(users.validUser.password);
        await loginPage.clickLoginToProcess();
        await homePage.expectUserLoggedIn(users.validUser.username);
        await homePage.clickCardHomePage();
        await cartPage.clickPlaceOrder();
        await cartPage.inputName("");
        await cartPage.inputCountry("");
        await cartPage.inputCity("");
        await cartPage.inputCard("");
        await cartPage.inputMonth("");
        await cartPage.inputYear("");
        await cartPage.clickPurchase();
        await cartPage.expectPopupNameAndCardDisplay();
    });

    test('@TC008 - No Login - Purchase product - No add to cart product - Empty customer information', async ({ homePage, cartPage }) => {
        await homePage.clickCardHomePage();
        await cartPage.clickPlaceOrder();
        await cartPage.inputName("");
        await cartPage.inputCountry("");
        await cartPage.inputCity("");
        await cartPage.inputCard("");
        await cartPage.inputMonth("");
        await cartPage.inputYear("");
        await cartPage.clickPurchase();
        await cartPage.expectPopupNameAndCardDisplay();
    });
});
