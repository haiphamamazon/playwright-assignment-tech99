import { HomePageLocator } from '../../locator/homepage-locators';
import { CommonLocator } from '../../locator/common-locator';
import { BasePage } from '../common/BasePage';
import { Page, Expect, expect } from '@playwright/test';
import { productsByCategory, CategoryType } from '../../data/testData';


export class HomePage extends BasePage {

    readonly expect: Expect;
    protected commonPageLocator: CommonLocator;
    protected homePageLocator: HomePageLocator;
    constructor(page: Page) {
        super(page);
        this.homePageLocator = new HomePageLocator(page);
        this.commonPageLocator = new CommonLocator(page);

    }

    async expectUserLoggedIn(username: string) {
        await expect(this.homePageLocator.welcomeUser).toHaveText(`Welcome ${username}`);
    }

    async selectProductByCategory(category: CategoryType) {
        const productName = productsByCategory[category].productName;
        await this.commonPageLocator.categoryByName(category).click();
        await this.commonPageLocator.productByName(productName).click();
    }

    async clickAddToCard(): Promise<void> {
        this.clickElement(this.homePageLocator.addToCardButton);
    }

    async addProductToCart(): Promise<void> {
        this.page.once('dialog', d => d.accept());

        await Promise.all([
            this.page.waitForNavigation(),
            this.clickElement(this.homePageLocator.addToCardButton)
        ]);
    }

    async expectPopupProductAddedDisplay() {
        await this.page.waitForTimeout(500);
        this.page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('Product added.');
            await dialog.accept();
        });
    }

    async clickCardHomePage(): Promise<void> {
        this.clickElement(this.homePageLocator.cardHomePage);
    }





}