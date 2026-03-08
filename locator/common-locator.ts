// Common locators shared across multiple pages
import { Page, Locator } from '@playwright/test';

export class CommonLocator {

    readonly page: Page;
    readonly headerLink!: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerLink = this.page.locator('a#nava');
    }

    elementByText(text: string): Locator {
        return this.page.getByText(text);
    }

    categoryByName(category: string): Locator {
        return this.page.getByRole('link', { name: category });
    }

    productByName(productName: string): Locator {
        return this.page.getByRole('link', { name: productName });
    }

}