import { test, expect, login } from './fixtures';

test('app pages need a login', async ({ page }) => {
  await page.goto('/items');
  await expect(page.getByText('You must be logged in to do that')).toBeVisible();
});

test('unknown URLs go to the home page when logged in', async ({ page }) => {
  await login(page);
  await page.goto('/no/such/page');
  await expect(page).toHaveURL('/');
  await expect(page.getByRole('heading', { name: 'Maintenance Chain' })).toBeVisible();
});

test('a deep link survives a reload', async ({ page }) => {
  await login(page);
  await page.goto('/item/1/category/10');
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Oil change for Civic' })).toBeVisible();
});

test('Back returns to the form after creating an item', async ({ page }) => {
  await login(page);
  await page.goto('/item/new');
  await page.getByLabel('Enter Item Name').fill('Truck');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page).toHaveURL('/items');
  await page.goBack();
  await expect(page).toHaveURL('/item/new');
});

test.describe('header on a desktop screen', () => {
  test('shows the navigation buttons', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Log In', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign Up' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Menu Button' })).toBeHidden();

    await login(page);
    for (const name of ['Home', 'Upcoming', 'Past Due']) {
      await expect(page.getByRole('link', { name })).toBeVisible();
    }
    await expect(page.getByRole('button', { name: 'Log Out' })).toBeVisible();
  });
});

test.describe('header on a phone', () => {
  test.use({ viewport: { width: 375, height: 740 } });

  test('uses a menu drawer', async ({ page }) => {
    await login(page);
    await expect(page.getByRole('link', { name: 'Past Due' })).toBeHidden();
    await page.getByRole('button', { name: 'Menu Button' }).click();
    const drawer = page.locator('.MuiDrawer-paper');
    for (const name of ['Items', 'Upcoming', 'Past Due', 'Welcome', 'Log Out']) {
      await expect(drawer.getByText(name, { exact: true })).toBeVisible();
    }
    await drawer.getByText('Past Due').click();
    await expect(page).toHaveURL('/pastdue');
  });
});
