import { test, expect, login, sent } from './fixtures';

// alice's Civic: Oil change was due 2024-07-05 (overdue), Tires is due 2099 (on track)

test.use({ viewport: { width: 375, height: 740 } });

test.beforeEach(async ({ page }) => {
  await login(page);
});

const row = (page, text) => page.getByRole('main').locator('li').filter({ hasText: text });

test("a row's menu edits it", async ({ page }) => {
  await page.goto('/item/1');
  await row(page, 'Oil change').getByRole('button', { name: 'More actions' }).click();
  await page.getByRole('menuitem', { name: 'Edit' }).click();
  await expect(page).toHaveURL('/item/1/category/10/edit');
});

test("a row's menu deletes it after confirmation", async ({ page, api }) => {
  await page.goto('/items');
  await row(page, 'Civic').getByRole('button', { name: 'More actions' }).click();
  await page.getByRole('menuitem', { name: 'Delete' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('Are you sure you want to delete Civic?');
  await dialog.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('No items found')).toBeVisible();
  expect(sent(api, 'DELETE', '/items/1')).toHaveLength(1);
});
