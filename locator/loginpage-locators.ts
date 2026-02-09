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

    constructor(page: Page) {
        super(page);
        this.initializeLocators();
    }

    protected initializeLocators(): void {
        this.loginButtonHomePage = this.page.locator("//a[@id='login2']");
        this.userName = this.page.locator("//input[@id='loginusername']");
        this.passWord = this.page.locator("//input[@id='loginpassword']");
        this.loginButton = this.page.locator("//button[normalize-space()='Log in']");
        this.closeButton = this.page.locator("//button[normalize-space()='Close']");
        this.loginModal = this.page.locator("//div[@id='logInModal']/div[@class='modal-dialog']");
        this.welcomeUser = this.page.locator("//a[@id='nameofuser']");
    }

}
