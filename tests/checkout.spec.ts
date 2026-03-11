import { test, expect } from '../fixtures/custom-fixtures';

test.describe('End-to-End Checkout Flow', () => {

test('should complete a purchase from login to thank you page', async ({
loginPage,
inventoryPage,
cartPage,
checkoutPage
}) => {

// 1. Navigare și Autentificare
await loginPage.navigate();
await loginPage.login('standard_user', 'secret_sauce');

// 2. Adăugare produs în coș (Backpack)
await inventoryPage.addBackpackToCart();

// 3. Navigare către coșul de cumpărături
await inventoryPage.goToCart();

// 4. Verificare că suntem în coș și continuarea către Checkout
await cartPage.proceedToCheckout();

// 5. Completare informații livrare
await checkoutPage.fillInformation('Gicanu', 'QA', '12345');

// 6. Finalizare comandă (apasă butonul Finish)
await checkoutPage.finishOrder();

// 7. Verificare succes (Confirmarea finală)
await expect(checkoutPage.successHeader).toHaveText('Thank you for your order!');
});
}); 