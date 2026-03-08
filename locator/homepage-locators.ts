import { Page, Locator } from '@playwright/test';
import { CommonLocator } from './common-locator';

export class HomePageLocator extends CommonLocator {

    welcomeUser: Locator;
    addToCardButton: Locator;
    cardHomePage: Locator;
    totalPrice: Locator;
    logoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.initializeLocators();
    }

    protected initializeLocators(): void {
        this.welcomeUser = this.page.locator('#nameofuser');
        this.addToCardButton = this.page.getByText('Add to cart');
        this.cardHomePage = this.page.locator('#cartur');
        this.totalPrice = this.page.locator('#totalp');
        this.logoutButton = this.page.getByText('Log out');
    }

}
