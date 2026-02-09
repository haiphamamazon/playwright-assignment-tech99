import { Page, Locator } from '@playwright/test';
import { CommonLocator } from './common-locator';

export class CartPageLocator extends CommonLocator {

    totalPrice: Locator;
    placeOrderBnt: Locator;
    name: Locator;
    country: Locator;
    city: Locator;
    creditCard: Locator;
    month: Locator;
    year: Locator;
    purchaseBtn: Locator;
    successfullPurchase: Locator;
    okBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.initializeLocators();
    }

    protected initializeLocators(): void {
        this.totalPrice = this.page.locator("//h3[@id='totalp']");
        this.placeOrderBnt = this.page.locator("//button[normalize-space()='Place Order']");
        this.name = this.page.locator("//input[@id='name']");
        this.country = this.page.locator("//input[@id='country']");
        this.city = this.page.locator("//input[@id='city']");
        this.creditCard = this.page.locator("//input[@id='card']");
        this.month = this.page.locator("//input[@id='month']");
        this.year = this.page.locator("//input[@id='year']");
        this.purchaseBtn = this.page.locator("//button[normalize-space()='Purchase']");
        this.successfullPurchase = this.page.locator("//h2[normalize-space()='Thank you for your purchase!']"); 
        this.okBtn = this.page.locator("//button[normalize-space()='OK']"); 
    }
}
