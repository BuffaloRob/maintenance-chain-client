import { test as base, expect } from '@playwright/test';
import { API_URL, GOOGLE_CREDENTIAL, createMockApi, users } from './mockApi';

export const GOOGLE_SCRIPT_URL = 'https://accounts.google.com/gsi/client';

// Stands in for Google Identity Services: its button signs in at once, as if
// alice had picked her Google account in Google's popup
const fakeGoogleScript = `
  window.google = { accounts: { id: {
    initialize(options) { window.googleOptions = options; },
    renderButton(parent, { text }) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = text === 'signup_with' ? 'Sign up with Google' : 'Sign in with Google';
      button.onclick = () => window.googleOptions.callback({ credential: ${JSON.stringify(GOOGLE_CREDENTIAL)} });
      parent.replaceChildren(button);
    },
  } } };
`;

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
  google: [
    async ({ page }, use) => {
      await page.route(GOOGLE_SCRIPT_URL, route =>
        route.fulfill({ contentType: 'text/javascript', body: fakeGoogleScript })
      );
      await use();
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

export { expect, users, GOOGLE_CREDENTIAL };

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
