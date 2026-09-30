// Failure paths: slow or failing saves and deletes, missing records, load errors
import { test, expect, login, sent } from './fixtures';

// Declares a test that currently fails because of a known bug (see the test title)
const knownBug = test.fail;

test.beforeEach(async ({ page }) => {
  await login(page);
});

const forms = [
  {
    name: 'new item',
    url: '/item/new',
    fill: page => page.getByLabel('Enter Item Name').fill('Truck'),
    method: 'POST', path: '/items', done: '/items',
  },
  { name: 'item edit', url: '/item/1/edit', method: 'PUT', path: '/items/1', done: '/items' },
  {
    name: 'new category',
    url: '/item/1/category/new',
    fill: page => page.getByLabel('Enter Category Name').fill('Brakes'),
    method: 'POST', path: '/items/1/categories', done: '/item/1',
  },
  { name: 'category edit', url: '/item/1/category/10/edit', method: 'PUT', path: '/items/1/categories/10', done: '/item/1' },
  {
    name: 'new log',
    url: '/item/1/category/10/log/new',
    fill: async page => {
      await page.getByLabel('Date Performed').fill('2025-03-01');
      await page.getByLabel('Date Due').fill('2025-09-01');
    },
    method: 'POST', path: '/items/1/categories/10/logs', done: '/item/1/category/10',
  },
  { name: 'log edit', url: '/item/1/log/100/edit', method: 'PUT', path: '/items/1/categories/10/logs/100', done: '/item/1/category/10' },
];

for (const form of forms) {
  knownBug(`${form.name}: clicking Submit twice sends one request`, async ({ page, api }) => {
    api.override({ method: form.method, path: form.path, delay: 1000 });
    await page.goto(form.url);
    await form.fill?.(page);
    const submit = page.getByRole('button', { name: 'Submit' });
    await submit.click();
    await expect(submit).toBeDisabled();
    await submit.click({ force: true }); // a disabled button ignores the click
    await expect(page).toHaveURL(form.done);
    expect(sent(api, form.method, form.path)).toHaveLength(1);
  });

  knownBug(`${form.name}: a failed save shows the server's message`, async ({ page, api }) => {
    api.override({ method: form.method, path: form.path, status: 500, body: { message: 'Could not save' } });
    await page.goto(form.url);
    await form.fill?.(page);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByRole('alert')).toHaveText('Could not save');
    await expect(page).toHaveURL(form.url);
  });
}

knownBug('validation errors from the server are shown on the form', async ({ page, api }) => {
  api.override({ method: 'POST', path: '/items', status: 422, body: { errors: { name: ['has already been taken'] } } });
  await page.goto('/item/new');
  await page.getByLabel('Enter Item Name').fill('Civic');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('alert')).toHaveText('Name has already been taken');
});

const deletes = [
  { name: 'item', url: '/items', row: 'Civic', path: '/items/1' },
  { name: 'category', url: '/item/1', row: 'Oil change', path: '/items/1/categories/10' },
  { name: 'log', url: '/item/1/category/10', row: 'Jan 5th 2024', path: '/items/1/categories/10/logs/100' },
];

for (const { name, url, row, path } of deletes) {
  const openDialog = async page => {
    await page.goto(url);
    await page.locator('li').filter({ hasText: row }).getByRole('button', { name: 'Delete' }).click();
    return page.getByRole('dialog');
  };

  knownBug(`${name}: a failed delete keeps the dialog open with the server's message`, async ({ page, api }) => {
    api.override({ method: 'DELETE', path, status: 500, body: { message: 'Could not delete' } });
    const dialog = await openDialog(page);
    await dialog.getByRole('button', { name: 'Delete' }).click();
    await expect(dialog.getByRole('alert')).toHaveText('Could not delete');
    await expect(dialog).toBeVisible();
  });

  knownBug(`${name}: clicking Delete twice sends one request`, async ({ page, api }) => {
    api.override({ method: 'DELETE', path, delay: 1000 });
    const dialog = await openDialog(page);
    const confirm = dialog.getByRole('button', { name: 'Delete' });
    await confirm.click();
    await expect(confirm).toBeDisabled();
    await confirm.click({ force: true });
    await expect(dialog).toBeHidden();
    expect(sent(api, 'DELETE', path)).toHaveLength(1);
  });
}

const missing = [
  ['/item/999', 'item'],
  ['/item/999/edit', 'item'],
  ['/item/1/category/999', 'category'],
  ['/item/1/category/999/edit', 'category'],
  ['/item/1/log/999/edit', 'log'],
  ['/log/999', 'log'],
];

for (const [url, what] of missing) {
  knownBug(`${url} says the ${what} doesn't exist instead of loading forever`, async ({ page }) => {
    await page.goto(url);
    await expect(page.getByText(`We couldn't find that ${what}.`)).toBeVisible();
  });
}

const loadFailures = [
  { name: 'the items list', url: '/items', path: '/items' },
  { name: 'an item page', url: '/item/1', path: '/items' },
  { name: 'a log page', url: '/log/100', path: '/items' },
  { name: 'Past Due', url: '/pastdue', path: '/past_due' },
  { name: 'Upcoming', url: '/upcoming', path: '/upcoming' },
];

for (const { name, url, path } of loadFailures) {
  knownBug(`${name} shows the server's message when loading fails`, async ({ page, api }) => {
    api.override({ method: 'GET', path, status: 500, body: { message: 'Database unavailable' } });
    await page.goto(url);
    await expect(page.getByText('Database unavailable')).toBeVisible();
  });
}

knownBug('an unreachable server gets a clear message', async ({ page, api }) => {
  api.override({ method: 'GET', path: '/items', abort: true });
  await page.goto('/items');
  await expect(page.getByText("Couldn't reach the server")).toBeVisible();
});
