import { Page, Locator } from '@playwright/test';
import { CommonLocator } from './common-locator';

export class HomePageLocator extends CommonLocator {

    welcomeUser: Locator;
    addToCardButton: Locator;
    cardHomePage: Locator;
    totalPrice: Locator;

    constructor(page: Page) {
        super(page);
        this.initializeLocators();
    }

    protected initializeLocators(): void {
        this.welcomeUser = this.page.locator("//a[@id='nameofuser']");
        this.addToCardButton = this.page.locator("//a[normalize-space()='Add to cart']");
        this.cardHomePage = this.page.locator("//a[@id='cartur']");
        this.totalPrice = this.page.locator("//h3[@id='totalp']");
    }

}
