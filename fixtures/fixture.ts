import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/ui/LoginPage';
import { HomePage } from '../pages/ui/HomePage'
import { CartPage } from '../pages/ui/CartPage'

export const test = baseTest.extend<{
    loginPage: LoginPage;
    homePage: HomePage;
    cartPage: CartPage;

}>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    }
});
