import { test, expect, login, sent } from './fixtures';

test.beforeEach(async ({ page }) => {
  await login(page);
});

const row = (page, text) => page.locator('li').filter({ hasText: text });

test("shows a log's details", async ({ page }) => {
  await page.goto('/item/1/category/10');
  await page.getByText('Jan 5th 2024').click();
  await expect(page).toHaveURL('/log/100');
  await expect(page.getByRole('heading', { name: 'Oil change on Jan 5th 2024' })).toBeVisible();
  await expect(page.getByText('Jul 5th 2024')).toBeVisible();
  await expect(page.getByText('$25')).toBeVisible();
  await expect(page.getByText('Filter wrench')).toBeVisible();
  await expect(page.getByText('Synthetic 5W-30')).toBeVisible();

  await page.getByRole('link', { name: 'Back to Logs' }).click();
  await expect(page).toHaveURL('/item/1/category/10');
});

test('creates a log, sending only the fields that were filled in', async ({ page, api }) => {
  await page.goto('/item/1/category/10');
  await page.getByRole('link', { name: 'Create New' }).click();
  await expect(page).toHaveURL('/item/1/category/10/log/new');
  await page.getByLabel('Date Performed').fill('2025-03-01');
  await page.getByLabel('Date Due').fill('2025-09-01');
  await page.getByLabel('Cost $').fill('40');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page).toHaveURL('/item/1/category/10');
  await expect(page.getByText('Mar 1st 2025')).toBeVisible();
  expect(sent(api, 'POST', '/items/1/categories/10/logs')[0].body).toEqual({
    date_performed: '2025-03-01',
    date_due: '2025-09-01',
    cost: '40',
  });
});

test('a new log needs both dates', async ({ page, api }) => {
  await page.goto('/item/1/category/10/log/new');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Required')).toHaveCount(2);
  expect(sent(api, 'POST', '/items/1/categories/10/logs')).toEqual([]);
});

test('edits a log', async ({ page, api }) => {
  await page.goto('/item/1/category/10');
  await row(page, 'Jan 5th 2024').getByRole('button', { name: 'Edit' }).click();
  await expect(page).toHaveURL('/item/1/log/100/edit');
  await expect(page.getByLabel('Date Performed')).toHaveValue('2024-01-05');
  await expect(page.getByLabel('Notes')).toHaveValue('Synthetic 5W-30');
  await page.getByLabel('Cost $').fill('30');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page).toHaveURL('/item/1/category/10');

  const { body } = sent(api, 'PUT', '/items/1/categories/10/logs/100')[0];
  expect(body).toMatchObject({ date_performed: '2024-01-05', date_due: '2024-07-05', cost: '30', category_id: 10 });
  expect(body).not.toHaveProperty('id');
});

test('deletes a log after confirmation', async ({ page, api }) => {
  await page.goto('/item/1/category/10');
  await row(page, 'Jan 5th 2024').getByRole('button', { name: 'Delete' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('Are you sure you want to delete the log for Jan 5th 2024?');
  await dialog.getByRole('button', { name: 'Delete' }).click();
  await expect(dialog).toBeHidden();
  await expect(page.getByText('Jan 5th 2024')).toHaveCount(0);
  expect(sent(api, 'DELETE', '/items/1/categories/10/logs/100')).toHaveLength(1);
});
