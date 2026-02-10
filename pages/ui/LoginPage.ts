import { LoginPageLocator } from '../../locator/loginpage-locators';
import { CommonLocator } from '../../locator/common-locator';
import { BasePage } from '../common/BasePage';
import { Page, Expect, expect } from '@playwright/test';

export class LoginPage extends BasePage {

    readonly expect: Expect;
    protected loginPageLocator: LoginPageLocator;
    protected commonPageLocator: CommonLocator;
    constructor(page: Page) {
        super(page);
        this.loginPageLocator = new LoginPageLocator(page);
        this.commonPageLocator = new CommonLocator(page);
    }

    async verifyURL(): Promise<void> {
        await this.page.waitForURL('**/');
        await expect(this.commonPageLocator.headerLink).toBeVisible();
    }

    async clickLoginButton(): Promise<void> {
        this.clickElement(this.loginPageLocator.loginButtonHomePage);
        this.waitUntilLoginModalDisplay();
    }

    
    async clickLogoutButton(): Promise<void> {
        this.clickElement(this.loginPageLocator.logoutButton);
    }

    async inputUsername(username: string): Promise<void> {
        await this.fillElement(this.loginPageLocator.userName, username);
    }

    async inputPassword(password: string): Promise<void> {
        await this.fillElement(this.loginPageLocator.passWord, password);
    }

    async clickLoginToProcess(): Promise<void> {
        await this.clickElement(this.loginPageLocator.loginButton);
    }

    async waitUntilLoginModalDisplay(): Promise<void> {
        await expect(this.loginPageLocator.loginModal).toBeVisible();
    }

    async expectPopupWrongPasswordDisplay() {
        this.page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('Wrong password.');
            await dialog.accept();
        });
    }

    async expectPopupUserNotExistDisplay() {
        this.page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('User does not exist.');
            await dialog.accept();
        });
    }

}