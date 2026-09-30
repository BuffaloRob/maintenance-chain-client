import { test, expect, login, sent } from './fixtures';

test.beforeEach(async ({ page }) => {
  await login(page);
});

const row = (page, text) => page.locator('li').filter({ hasText: text });

test("opens a category and shows its logs", async ({ page }) => {
  await page.goto('/item/1');
  await page.getByText('Oil change').click();
  await expect(page).toHaveURL('/item/1/category/10');
  await expect(page.getByRole('heading', { name: 'Oil change for Civic' })).toBeVisible();
  await expect(page.getByText('Jan 5th 2024')).toBeVisible();
  await expect(page.getByText('Due on: Jul 5th 2024')).toBeVisible();
});

test('creates a category', async ({ page, api }) => {
  await page.goto('/item/1');
  await page.getByRole('link', { name: 'Create New' }).click();
  await expect(page).toHaveURL('/item/1/category/new');
  await page.getByLabel('Enter Category Name').fill('Brakes');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page).toHaveURL('/item/1');
  await expect(page.getByText('Brakes')).toBeVisible();
  expect(sent(api, 'POST', '/items/1/categories')[0].body).toEqual({ name: 'Brakes' });
});

test('edits a category', async ({ page, api }) => {
  await page.goto('/item/1');
  await row(page, 'Oil change').getByRole('link', { name: 'Edit' }).click();
  await expect(page).toHaveURL('/item/1/category/10/edit');
  const name = page.getByLabel('Edit Category Name');
  await expect(name).toHaveValue('Oil change');
  await name.fill('Oil and filter');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page).toHaveURL('/item/1');
  await expect(page.getByText('Oil and filter')).toBeVisible();
  expect(sent(api, 'PUT', '/items/1/categories/10')[0].body).toEqual({ name: 'Oil and filter' });
});

test('deletes a category after confirmation', async ({ page, api }) => {
  await page.goto('/item/1');
  await row(page, 'Oil change').getByRole('button', { name: 'Delete' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('Are you sure you want to delete Oil change?');
  await dialog.getByRole('button', { name: 'Delete' }).click();
  await expect(dialog).toBeHidden();
  await expect(page.getByText('Oil change')).toHaveCount(0);
  await expect(page.getByText('Tires')).toBeVisible();
  expect(sent(api, 'DELETE', '/items/1/categories/10')).toHaveLength(1);
});
