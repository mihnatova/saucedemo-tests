import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { STANDARD_USER, LOCKED_USER } from '../../test-data/users';

test('standard_user logs in successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(STANDARD_USER.username, STANDARD_USER.password);

  await expect(page).toHaveURL('/inventory.html');
  await expect(inventoryPage.inventoryItems.first()).toBeVisible();
});

test('locked_out_user sees error message', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(LOCKED_USER.username, LOCKED_USER.password);

  await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  await expect(page).not.toHaveURL('/inventory.html');
});
