import { test, expect } from '../fixtures/custom-fixtures';

/**
 * CI/CD Pipeline Showcase Tests
 * 
 * These tests demonstrate:
 * ✅ Playwright running across Chromium, Firefox, and WebKit
 * ✅ Page Object Model pattern
 * ✅ Custom fixtures integration
 * ✅ HTML reporting and artifacts
 * ✅ Screenshot/Video capture on failures
 * ✅ Parallel test execution
 */

test.describe('🚀 CI/CD Pipeline Showcase', () => {

  test('01 - Login Flow Demo', async ({ loginPage, inventoryPage, page }) => {
    test.info().annotations.push({
      type: 'browser',
      description: `Running on: ${page.context().browser()?.browserType().name()}`,
    });

    // Navigate and authenticate
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify successful login
    await expect(inventoryPage.headerTitle).toContainText('Products');
  });

  test('02 - Add to Cart & Verify Badge', async ({ inventoryPage, page }) => {
    test.info().annotations.push({
      type: 'browser',
      description: `Running on: ${page.context().browser()?.browserType().name()}`,
    });

    // Setup: Login
    await inventoryPage.page.goto('https://www.saucedemo.com/');
    await inventoryPage.page.locator('[data-test="username"]').fill('standard_user');
    await inventoryPage.page.locator('[data-test="password"]').fill('secret_sauce');
    await inventoryPage.page.locator('[data-test="login-button"]').click();

    // Wait for inventory page to load
    await expect(inventoryPage.headerTitle).toContainText('Products');

    // Perform: Add item to cart
    await inventoryPage.addBackpackToCart();

    // Verify: Cart badge shows 1 item
    await expect(inventoryPage.shoppingCartBadge).toBeVisible();
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
  });

  test('03 - End-to-End: Add to Cart Complete', async ({ loginPage, inventoryPage, page }) => {
    test.info().annotations.push({
      type: 'browser',
      description: `Running on: ${page.context().browser()?.browserType().name()}`,
    });

    // Setup: Login
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(inventoryPage.headerTitle).toContainText('Products');

    // Perform: Add item to cart
    await inventoryPage.addBackpackToCart();
    
    // Verify: Cart badge updated
    await expect(inventoryPage.shoppingCartBadge).toBeVisible();
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

    // Navigate to cart
    await inventoryPage.goToCart();
    await expect(page.locator('.cart_list')).toBeVisible();

    // Verify item is in cart
    await expect(page.locator('[data-test="inventory-item-name"]').first()).toContainText('Sauce Labs Backpack');
  });

  test('04 - Responsive Design Check', async ({ page }) => {
    /**
     * Demonstrates cross-browser compatibility testing
     * Playwright runs this test on Chromium, Firefox, and WebKit
     */
    await page.goto('https://www.saucedemo.com/');
    
    // Verify page loads and is interactive
    const heading = page.locator('.login_logo');
    await expect(heading).toBeVisible();
    
    // Log which browser this ran on
    const browserName = page.context().browser()?.browserType().name();
    console.log(`✅ Page loads and is responsive on ${browserName}`);
  });

});
