import { HomePageLocator } from '../../locator/homepage-locators';
import { CartPageLocator } from '../../locator/cartpage-locators';
import { CommonLocator } from '../../locator/common-locator';
import { BasePage } from '../common/BasePage';
import { Page, Expect, expect } from '@playwright/test';
import { Assertions } from '../../utilities/assertions';
import { productsByCategory, CategoryType } from '../../data/testData';


export class CartPage extends BasePage {

    readonly expect: Expect;
    protected commonPageLocator: CommonLocator;
    private readonly cartPageLocator: CartPageLocator;
    constructor(page: Page) {
        super(page);
        this.commonPageLocator = new CommonLocator(page);
        this.cartPageLocator = new CartPageLocator(page);
    }

    async verifyTotalPrice(category: CategoryType): Promise<void> {
        const productPrice = productsByCategory[category].price;
        await expect(this.cartPageLocator.totalPrice).toBeVisible();
        const actualPrice = await this.textContent(this.cartPageLocator.totalPrice);
        Assertions.assertEqual(actualPrice, productPrice);
    }

    async clickPlaceOrder(): Promise<void> {
        this.clickElement(this.cartPageLocator.placeOrderBnt);
    }

    async inputName(name: string): Promise<void> {
        await this.fillElement(this.cartPageLocator.name, name);
    }

    async inputCountry(country: string): Promise<void> {
        await this.fillElement(this.cartPageLocator.country, country);
    }

    async inputCity(city: string): Promise<void> {
        await this.fillElement(this.cartPageLocator.city, city);
    }

    async inputCard(card: string): Promise<void> {
        await this.fillElement(this.cartPageLocator.creditCard, card);
    }

    async inputMonth(month: string|number): Promise<void> {
        await this.fillElement(this.cartPageLocator.month, String(month));
    }

    async inputYear(year: string|number): Promise<void> {
        await this.fillElement(this.cartPageLocator.year, String(year));
    }

    async clickPurchase(): Promise<void> {
        await expect(this.cartPageLocator.purchaseBtn).toBeVisible();
        // await this.page.waitForTimeout(300);
        this.forceClickModal(this.cartPageLocator.purchaseBtn);
    }

    async expectPurchaseSuccessful(text: string) {
        await expect(this.cartPageLocator.successfullPurchase).toHaveText(text);
    }

    async clickOKButton(): Promise<void> {
        await expect(this.cartPageLocator.okBtn).toBeVisible();
        this.forceClickModal(this.cartPageLocator.okBtn);
    }

    async expectPopupNameAndCardDisplay() {
        await this.page.waitForTimeout(500);
        this.page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('Please fill out Name and Creditcard.');
            await dialog.accept();
        });
    }






}