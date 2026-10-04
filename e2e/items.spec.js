import { test, expect, login, sent } from './fixtures';

test.beforeEach(async ({ page }) => {
  await login(page);
});

// The page's main column; on wide screens a sidebar repeats some names
const main = page => page.getByRole('main');
const row = (page, text) => main(page).locator('li').filter({ hasText: text });

test('lists items and opens one', async ({ page }) => {
  await page.goto('/items');
  await main(page).getByText('Civic').click();
  await expect(page).toHaveURL('/item/1');
  await expect(page.getByRole('heading', { name: 'Civic' })).toBeVisible();
  await expect(page.getByText('Oil change')).toBeVisible();
  await expect(page.getByText('Tires')).toBeVisible();
});

test('creates an item', async ({ page, api }) => {
  await page.goto('/items');
  await page.getByRole('link', { name: 'Create New Item' }).click();
  await page.getByLabel('Enter Item Name').fill('Truck');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page).toHaveURL('/items');
  await expect(main(page).getByText('Truck')).toBeVisible();
  expect(sent(api, 'POST', '/items')[0].body).toEqual({ name: 'Truck' });
});

test('a new item needs a name', async ({ page, api }) => {
  await page.goto('/item/new');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Required')).toBeVisible();
  expect(sent(api, 'POST', '/items')).toEqual([]);
});

test('edits an item', async ({ page, api }) => {
  await page.goto('/items');
  await row(page, 'Civic').getByRole('link', { name: 'Edit' }).click();
  await expect(page).toHaveURL('/item/1/edit');
  const name = page.getByLabel('Enter Item Name');
  await expect(name).toHaveValue('Civic');
  await name.fill('Civic Si');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page).toHaveURL('/items');
  await expect(main(page).getByText('Civic Si')).toBeVisible();
  expect(sent(api, 'PUT', '/items/1')[0].body).toMatchObject({ name: 'Civic Si' });
});

test('deletes an item after confirmation', async ({ page, api }) => {
  await page.goto('/items');
  await row(page, 'Civic').getByRole('button', { name: 'Delete' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('Are you sure you want to delete Civic?');
  await dialog.getByRole('button', { name: 'Delete' }).click();
  await expect(dialog).toBeHidden();
  await expect(page.getByText('No items found')).toBeVisible();
  expect(sent(api, 'DELETE', '/items/1')).toHaveLength(1);
});

test('cancelling the delete dialog keeps the item', async ({ page, api }) => {
  await page.goto('/items');
  await row(page, 'Civic').getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Cancel' }).click();
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(main(page).getByText('Civic')).toBeVisible();
  expect(sent(api, 'DELETE', '/items/1')).toEqual([]);
});
