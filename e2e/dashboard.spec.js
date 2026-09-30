import { test, expect, login } from './fixtures';

test.beforeEach(async ({ page }) => {
  await login(page);
});

test('Past Due lists overdue maintenance and opens the log', async ({ page }) => {
  await page.getByRole('link', { name: 'Past Due' }).click();
  await expect(page).toHaveURL('/pastdue');
  await expect(page.getByText('Oil change was due on Jul 5th 2024')).toBeVisible();
  await expect(page.getByText('Tires')).toHaveCount(0);
  await page.getByText('Oil change was due on Jul 5th 2024').click();
  await expect(page).toHaveURL('/log/100');
});

test('Upcoming lists maintenance coming due', async ({ page }) => {
  await page.getByRole('link', { name: 'Upcoming' }).click();
  await expect(page).toHaveURL('/upcoming');
  await expect(page.getByText('Tires will be due on Mar 1st 2099')).toBeVisible();
  await expect(page.getByText('Oil change')).toHaveCount(0);
});

test('lists refresh after a log is added', async ({ page }) => {
  await page.goto('/pastdue');
  await expect(page.getByText('Oil change was due on Jul 5th 2024')).toBeVisible();

  await page.goto('/item/1/category/11/log/new');
  await page.getByLabel('Date Performed').fill('2024-02-01');
  await page.getByLabel('Date Due').fill('2024-08-01');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page).toHaveURL('/item/1/category/11');

  await page.getByRole('link', { name: 'Past Due' }).click();
  await expect(page.getByText('Tires was due on Aug 1st 2024')).toBeVisible();
});
