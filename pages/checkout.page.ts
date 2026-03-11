import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
readonly page: Page;
readonly firstNameInput: Locator;
readonly lastNameInput: Locator;
readonly zipCodeInput: Locator;
readonly continueButton: Locator;
readonly finishButton: Locator;
readonly successHeader: Locator;

constructor(page: Page) {
this.page = page;
this.firstNameInput = page.locator('[data-test="firstName"]');
this.lastNameInput = page.locator('[data-test="lastName"]');
this.zipCodeInput = page.locator('[data-test="postalCode"]');
this.continueButton = page.locator('[data-test="continue"]');
this.finishButton = page.locator('[data-test="finish"]');
this.successHeader = page.locator('.complete-header');
}

async fillInformation(first: string, last: string, zip: string) {
await this.firstNameInput.fill(first);
await this.lastNameInput.fill(last);
await this.zipCodeInput.fill(zip);
await this.continueButton.click();
}

async finishOrder() { await this.finishButton.click(); } }