import { LoginPageLocator } from '../../locator/loginpage-locators';
import { CommonLocator } from '../../locator/common-locator';
import { BasePage } from '../common/BasePage';
import { Page, Expect, expect } from '@playwright/test';

let loginPageLocator: LoginPageLocator;
let commonPageLocator: CommonLocator;

export class LoginPage extends BasePage {

    readonly expect: Expect;
    constructor(page: Page) {
        super(page);
        loginPageLocator = new LoginPageLocator(page);
        commonPageLocator = new CommonLocator(page);
    }

    async verifyURL(): Promise<void> {
        await this.page.waitForURL('**/');
        await expect(commonPageLocator.headerLink).toBeVisible();
    }

    async clickLoginButton(): Promise<void> {
        this.clickElement(loginPageLocator.loginButtonHomePage);
        this.waitUntilLoginModalDisplay();
    }

    async inputUsername(username: string): Promise<void> {
        await this.fillElement(loginPageLocator.userName, username);
    }

    async inputPassword(password: string): Promise<void> {
        await this.fillElement(loginPageLocator.passWord, password);
    }

    async clickLoginToProcess(): Promise<void> {
        await this.clickElement(loginPageLocator.loginButton);
    }

    async waitUntilLoginModalDisplay(): Promise<void> {
        await expect(loginPageLocator.loginModal).toBeVisible();
    }

    async expectPopupWrongPasswordDisplay() {
        this.page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('Wrong password.');
            await dialog.accept();
        });
    }

}