// Common locators shared across multiple pages
import { Page, Locator } from '@playwright/test';

export class CommonLocator {

    readonly page: Page;
    readonly headerLink!: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerLink = this.page.locator("//a[@id='nava']");
    }

    linkByText(text: string): Locator {
        return this.page.locator(`//a[normalize-space(text())='${text}']`);
    }
    buttonByText(text: string): Locator {
        return this.page.locator(`//button[normalize-space(text())='${text}']`);
    }
    elementByText(tag: string, text: string): Locator {
        return this.page.locator(`//${tag}[normalize-space(text())='${text}']`);
    }

    categoryByName(category: string): Locator {
        return this.page.locator(`//a[normalize-space()='${category}']`);
    }

    productByName(productName: string): Locator {
        return this.page.locator(`//a[normalize-space()='${productName}']`);
    }


}