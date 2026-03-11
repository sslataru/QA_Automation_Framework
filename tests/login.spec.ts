import { test, expect } from '../fixtures/custom-fixtures';

test.describe('Inventory & Cart Flow', () => {
  
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('should add product to cart and update badge', async ({ inventoryPage }) => {
    // Verificăm că suntem pe pagina corectă
    await expect(inventoryPage.headerTitle).toContainText('Products');
    
    // Adăugăm rucsacul în coș
    await inventoryPage.addBackpackToCart();
    
    // Verificăm că insigna coșului arată "1"
    await expect(inventoryPage.shoppingCartBadge).toBeVisible();
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
  });
});