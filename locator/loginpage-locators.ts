import { Page, Locator } from '@playwright/test';
import { CommonLocator } from './common-locator';

export class LoginPageLocator extends CommonLocator {

    loginButtonHomePage: Locator;
    userName: Locator;
    passWord: Locator;
    loginButton: Locator;
    closeButton: Locator;
    loginModal: Locator;
    welcomeUser: Locator;
    logoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.initializeLocators();
    }

    protected initializeLocators(): void {
        this.loginButtonHomePage = this.page.locator('a#login2');
        this.userName = this.page.locator('#loginusername');
        this.passWord = this.page.locator('#loginpassword');
        this.loginButton = this.page.getByRole('button', { name: 'Log in' });
        this.closeButton = this.page.getByRole('button', { name: 'Close' });
        this.loginModal = this.page.getByRole('dialog').locator('.modal-dialog');;
        this.welcomeUser = this.page.locator('#nameofuser');
        this.logoutButton = this.page.locator('#logout2');
    }

}
