import { test, expect, login, sent } from './fixtures';

// alice's Civic: Oil change was due 2024-07-05 (overdue), Tires is due 2099 (on track)

test.beforeEach(async ({ page }) => {
  await login(page);
});

const main = page => page.getByRole('main');
const row = (page, text) => main(page).locator('li').filter({ hasText: text });
const pastDueLink = page => page.getByRole('banner').getByRole('link', { name: /^Past Due/ });

async function archiveCivic(page) {
  await page.goto('/items');
  await row(page, 'Civic').getByRole('button', { name: 'Archive' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('Archive Civic?');
  await dialog.getByRole('button', { name: 'Archive' }).click();
  await expect(dialog).toBeHidden();
}

test('archiving an item moves it, with its records, to the Archive', async ({ page, api }) => {
  await archiveCivic(page);
  expect(sent(api, 'POST', '/items/1/archive')).toHaveLength(1);
  await expect(main(page).getByText('All of your items are archived')).toBeVisible();

  await page.getByRole('banner').getByRole('link', { name: 'Archive' }).click();
  await expect(page).toHaveURL('/archive');
  await expect(row(page, 'Civic')).toContainText(/Archived \w{3} \d+\w{2} \d{4}/);

  await row(page, 'Civic').getByText('Civic').click();
  await expect(page).toHaveURL('/item/1');
  await expect(page.getByRole('status')).toContainText('Archived');
  await expect(main(page).getByText('Oil change')).toBeVisible();
  await expect(main(page).getByText('Tires')).toBeVisible();
});

test("an archived item's maintenance is no longer upcoming or past due", async ({ page }) => {
  await page.goto('/upcoming');
  await expect(pastDueLink(page)).toContainText('1');
  await expect(page.getByRole('complementary')).toContainText('Oil change');

  await archiveCivic(page);
  await expect(pastDueLink(page)).toHaveText('Past Due');
  await expect(page.getByRole('complementary')).toContainText('Nothing is due in the next 30 days.');

  await page.goto('/pastdue');
  await expect(main(page).getByText('No past due items found.')).toBeVisible();
  await page.goto('/upcoming');
  await expect(main(page).getByText('No upcoming items found.')).toBeVisible();
  await expect(page.getByRole('complementary')).toContainText('Nothing is overdue.');
});

test('restores an item from the Archive', async ({ page, api }) => {
  await archiveCivic(page);
  await page.goto('/archive');
  await row(page, 'Civic').getByRole('button', { name: 'Restore' }).click();
  await expect(main(page).getByText('Nothing is archived.')).toBeVisible();
  expect(sent(api, 'DELETE', '/items/1/archive')).toHaveLength(1);
  await expect(pastDueLink(page)).toContainText('1');

  await page.goto('/items');
  await expect(row(page, 'Civic')).toContainText('Oil change');
});

test("restores an item from its page", async ({ page }) => {
  await archiveCivic(page);
  await page.goto('/item/1');
  const notice = page.getByRole('status').filter({ hasText: 'Archived' });
  await notice.getByRole('button', { name: 'Restore' }).click();
  await expect(notice).toBeHidden();
  await expect(pastDueLink(page)).toContainText('1');
});

test('deletes an archived item after confirmation', async ({ page, api }) => {
  await archiveCivic(page);
  await page.goto('/archive');
  await row(page, 'Civic').getByRole('button', { name: 'Delete' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('Are you sure you want to delete Civic?');
  await dialog.getByRole('button', { name: 'Delete' }).click();
  await expect(main(page).getByText('Nothing is archived.')).toBeVisible();
  expect(sent(api, 'DELETE', '/items/1')).toHaveLength(1);
});

test('a failed archive keeps the dialog open with the error', async ({ page, api }) => {
  api.override({ method: 'POST', path: '/items/1/archive', status: 500, body: { message: 'Database is down' } });
  await page.goto('/items');
  await row(page, 'Civic').getByRole('button', { name: 'Archive' }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('button', { name: 'Archive' }).click();
  await expect(dialog.getByRole('alert')).toHaveText('Database is down');
  await dialog.getByRole('button', { name: 'Cancel' }).click();
  await expect(dialog).toBeHidden();
  await expect(row(page, 'Civic')).toBeVisible();
});

test('a failed restore says so in the row', async ({ page, api }) => {
  await archiveCivic(page);
  api.override({ method: 'DELETE', path: '/items/1/archive', status: 500, body: { message: 'Database is down' } });
  await page.goto('/archive');
  await row(page, 'Civic').getByRole('button', { name: 'Restore' }).click();
  await expect(row(page, 'Civic').getByRole('alert')).toContainText('Database is down');
});

test.describe('on a phone', () => {
  test.use({ viewport: { width: 375, height: 740 } });

  test("a row's menu archives and restores", async ({ page }) => {
    await page.goto('/items');
    await row(page, 'Civic').getByRole('button', { name: 'More actions' }).click();
    await page.getByRole('menuitem', { name: 'Archive' }).click();
    await page.getByRole('dialog').getByRole('button', { name: 'Archive' }).click();
    await expect(main(page).getByText('All of your items are archived')).toBeVisible();
    // The menu's overdue count is gone (MUI keeps its number while it's hidden)
    await expect(page.getByRole('button', { name: 'Menu Button' }).locator('.MuiBadge-badge')).toHaveClass(/MuiBadge-invisible/);

    await page.getByRole('button', { name: 'Menu Button' }).click();
    await page.locator('.MuiDrawer-paper').getByRole('link', { name: 'Archive' }).click();
    await expect(page).toHaveURL('/archive');
    await row(page, 'Civic').getByRole('button', { name: 'More actions' }).click();
    await expect(page.getByRole('menuitem', { name: 'Edit' })).toHaveCount(0);
    await page.getByRole('menuitem', { name: 'Restore' }).click();
    await expect(main(page).getByText('Nothing is archived.')).toBeVisible();
  });
});
