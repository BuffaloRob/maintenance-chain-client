import { test as base, expect } from '@playwright/test';
import { API_URL, createMockApi, users } from './mockApi';

export const test = base.extend({
  // Every test gets a fresh mock API; `api.requests` records what the app sent
  api: [
    async ({ page }, use) => {
      const api = createMockApi();
      await page.route(`${API_URL}/**`, api.handle);
      await use(api);
    },
    { auto: true },
  ],
  // Fail any test that throws an uncaught exception in the page
  pageErrors: [
    async ({ page }, use) => {
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await use(errors);
      expect(errors, 'uncaught errors in the page').toEqual([]);
    },
    { auto: true },
  ],
});

export { expect, users };

export async function login(page, user = users.alice) {
  await page.goto('/login');
  await page.getByLabel('Enter Your Email').fill(user.email);
  await page.getByLabel('Enter Your Password').fill('password');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText(`Welcome ${user.email.split('@')[0]}`)).toBeVisible();
}

// Requests matching a method and path, e.g. sent(api, 'POST', '/items')
export const sent = (api, method, path) =>
  api.requests.filter(r => r.method === method && r.path === path);
