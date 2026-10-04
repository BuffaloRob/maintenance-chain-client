import { test, expect, login } from './fixtures';

// alice's Civic: Oil change was due 2024-07-05 (overdue), Tires is due 2099 (on track)

test.describe('on a desktop screen', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('the header counts what is past due', async ({ page }) => {
    const header = page.getByRole('banner');
    await expect(header.getByRole('link', { name: 'Past Due 1' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Upcoming', exact: true })).toBeVisible();
  });

  test('items show their categories by urgency, and the sidebar what needs attention', async ({ page }) => {
    await page.goto('/items');
    const card = page.getByRole('main').locator('li').filter({ hasText: 'Civic' }).first();
    await expect(card).toContainText('2 categories · 2 logs · $425 spent');
    await expect(card.getByRole('link', { name: /^Oil change\s*Due .* ago$/ })).toBeVisible();

    const sidebar = page.getByRole('complementary');
    await expect(sidebar).toContainText('Needs attention');
    await sidebar.getByRole('link', { name: /Oil change/ }).first().click();
    await expect(page).toHaveURL('/item/1/category/10');
  });

  test("an item's categories show when they were done and are due", async ({ page }) => {
    await page.goto('/item/1');
    const oilChange = page.getByRole('main').locator('li').filter({ hasText: 'Oil change' });
    await expect(oilChange).toContainText('Overdue');
    await expect(oilChange).toContainText('Last done Jan 5th 2024');
    await expect(page.getByRole('complementary')).toContainText('Spent in total$425');
  });

  test('a past due row logs the work for its category', async ({ page }) => {
    await page.goto('/pastdue');
    const row = page.getByRole('main').locator('li').filter({ hasText: 'Oil change was due on Jul 5th 2024' });
    await expect(row).toContainText('Civic');
    await row.getByRole('link', { name: 'Log it' }).click();
    await expect(page).toHaveURL('/item/1/category/10/log/new');
  });

  test('the new log form offers what was entered last time', async ({ page }) => {
    await page.goto('/item/1/category/10/log/new');
    const sidebar = page.getByRole('complementary');
    await expect(sidebar).toContainText('Jan 5th 2024');

    await sidebar.getByRole('button', { name: 'Copy tools & notes' }).click();
    await expect(page.getByLabel('Tools Used')).toHaveValue('Filter wrench');
    await expect(page.getByLabel('Notes')).toHaveValue('Synthetic 5W-30');

    // Last time it was due 182 days after it was done
    await page.getByLabel('Date Performed').fill('2025-03-01');
    await sidebar.getByRole('button', { name: 'Use Aug 30th 2025' }).click();
    await expect(page.getByLabel('Date Due')).toHaveValue('2025-08-30');
  });
});

test.describe('on a phone', () => {
  test.use({ viewport: { width: 375, height: 740 } });

  test('items stay a simple list with no sidebar', async ({ page }) => {
    await login(page);
    await page.goto('/items');
    await expect(page.getByRole('main').getByText('Civic')).toBeVisible();
    await expect(page.getByRole('complementary')).toHaveCount(0);
    await expect(page.getByText('Items tracked')).toHaveCount(0);
    await expect(page.getByText('Oil change')).toHaveCount(0);
  });
});
