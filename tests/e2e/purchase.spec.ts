import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { STANDARD_USER } from '../../test-data/users';
import { BACKPACK } from '../../test-data/products';

test('Complete purchase journey with price verification', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Step 1: Login as standard_user
  await loginPage.goto();
  await loginPage.login(STANDARD_USER.username, STANDARD_USER.password);

  // Step 2: Verify backpack price on inventory page
  const inventoryPrice = await inventoryPage.getItemPrice(BACKPACK.name);
  expect(inventoryPrice).toBe(BACKPACK.price);

  // Step 3: Add backpack to cart
  await inventoryPage.addToCartByName(BACKPACK.name);

  // Step 4: Go to cart page
  await cartPage.goto();

  // Step 5: Verify cart contains exactly 1 item named "Sauce Labs Backpack"
  await expect(cartPage.cartItems).toHaveCount(1);
  const cartItemNames = await cartPage.getItemNames();
  expect(cartItemNames).toEqual([BACKPACK.name]);

  // Step 6: Verify cart item price
  const cartPrice = await cartPage.getItemPrice(BACKPACK.name);
  expect(cartPrice).toBe(BACKPACK.price);

  // Step 7: Click checkout
  await cartPage.clickCheckout();

  // Step 8: Fill checkout info
  await checkoutPage.fillInfo('Test', 'User', '12345');

  // Step 9: Verify checkout overview totals
  await expect(checkoutPage.subtotalLabel).toContainText(BACKPACK.price);
  await expect(checkoutPage.taxLabel).toContainText('$2.40');
  await expect(checkoutPage.totalPriceLabel).toContainText('$32.39');

  // Step 10: Click Finish
  await checkoutPage.finish();

  // Step 11: Verify completion message
  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
});
