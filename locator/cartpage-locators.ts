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
        this.totalPrice = this.page.locator('h3#totalp');
        this.placeOrderBnt = this.page.getByRole('button', { name: 'Place Order' });
        this.name = this.page.locator('#name');
        this.country = this.page.locator('#country');
        this.city = this.page.locator('#city');
        this.creditCard = this.page.locator('#card');
        this.month = this.page.locator('input#month');
        this.year = this.page.locator('input#year');
        this.purchaseBtn = this.page.getByText('Purchase');
        this.successfullPurchase = this.page.getByText('Thank you for your purchase!'); 
        this.okBtn = this.page.getByText('OK'); 
    }
}
