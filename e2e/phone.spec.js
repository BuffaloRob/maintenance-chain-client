import { test, expect, login, sent } from './fixtures';

// alice's Civic: Oil change was due 2024-07-05 (overdue), Tires is due 2099 (on track)

test.use({ viewport: { width: 375, height: 740 } });

test.beforeEach(async ({ page }) => {
  await login(page);
});

const row = (page, text) => page.getByRole('main').locator('li').filter({ hasText: text });

test('rows say what needs attention', async ({ page }) => {
  await page.goto('/items');
  await expect(row(page, 'Civic')).toContainText('1 overdue');

  await page.goto('/item/1');
  await expect(row(page, 'Oil change')).toContainText(/Due .* ago/);
  await expect(row(page, 'Tires')).toContainText('Due in');

  await page.goto('/pastdue');
  const pastDue = page.getByRole('main').getByRole('button', { name: /Oil change was due on Jul 5th 2024/ });
  await expect(pastDue).toContainText(/Civic · .* ago/);
});

test('the menu shows how many categories are past due', async ({ page }) => {
  const menu = page.getByRole('button', { name: 'Menu Button' });
  await expect(menu).toContainText('1');
  await menu.click();
  const drawer = page.locator('.MuiDrawer-paper');
  await expect(drawer.getByRole('link', { name: /^Past Due/ })).toContainText('1');
  await expect(drawer.getByRole('link', { name: /^Upcoming/ })).toHaveText('Upcoming');
});

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
