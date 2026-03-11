import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;
  readonly backpackAddToCartBtn: Locator;
  readonly headerTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.backpackAddToCartBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.headerTitle = page.locator('.title');
  }

async addBackpackToCart() {
await this.backpackAddToCartBtn.click();
}

async goToCart() { await this.shoppingCartLink.click(); } }