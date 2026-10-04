import { test, expect, login, sent, users } from './fixtures';
import { API_URL, verificationToken } from './mockApi';

const banner = page => page.getByText(/Please verify your email address/);
const gate = page => page.getByText('You need to verify your email address before you can do that');

async function signUp(page, email = 'carol@example.com') {
  await page.goto('/signup');
  await page.getByLabel('Enter Your Email').fill(email);
  await page.getByLabel('Enter Your Password').fill('password');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText(`Welcome ${email.split('@')[0]}`)).toBeVisible();
}

test("the link in a verification email verifies the address, logged out too", async ({ page, api }) => {
  await page.goto(`/verify-email?token=${verificationToken(users.alice.id)}`);
  await expect(page.getByText('Your email address is verified.')).toBeVisible();
  // Once, though StrictMode runs the effect that sends it twice
  expect(sent(api, 'POST', '/verify_email')).toEqual([
    { method: 'POST', path: '/verify_email', body: { token: 'verify-1' }, auth: null },
  ]);

  await page.getByRole('link', { name: 'Continue to Log In' }).click();
  await expect(page).toHaveURL('/login');
});

test('an invalid or expired link says so', async ({ page }) => {
  await page.goto('/verify-email?token=expired');
  await expect(page.getByRole('alert')).toHaveText('This link is invalid or has expired');
});

test('a link without a token says it is invalid and sends nothing', async ({ page, api }) => {
  await page.goto('/verify-email');
  await expect(page.getByRole('alert')).toHaveText('This link is invalid or has expired');
  expect(sent(api, 'POST', '/verify_email')).toEqual([]);
});

test('a new user is asked to verify their address, and can have the email sent again', async ({ page, api }) => {
  await signUp(page);
  await expect(banner(page)).toContainText('carol@example.com');

  await page.getByRole('button', { name: 'Resend email' }).click();
  await expect(page.getByText('We sent a new link to carol@example.com.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Resend email' })).toHaveCount(0);
  expect(sent(api, 'POST', '/resend_verification_email')[0].auth).toBe('Bearer token-1000');
});

test('a failed resend shows why', async ({ page, api }) => {
  api.override({ method: 'POST', path: '/resend_verification_email', status: 429, body: {} });
  await signUp(page);
  await page.getByRole('button', { name: 'Resend email' }).click();
  await expect(page.getByRole('alert')).toHaveText('Something went wrong (error 429)');
});

test('verifying while logged in removes the banner', async ({ page }) => {
  await signUp(page);
  await expect(banner(page)).toBeVisible();

  await page.goto(`/verify-email?token=${verificationToken(1000)}`);
  await expect(page.getByText('Your email address is verified.')).toBeVisible();
  await expect(banner(page)).toHaveCount(0);
  await page.getByRole('link', { name: 'Continue' }).click();
  await expect(page).toHaveURL('/');
});

test('verified users see no banner', async ({ page }) => {
  await login(page);
  await page.goto('/items');
  await expect(page.getByText('Civic')).toBeVisible();
  await expect(banner(page)).toHaveCount(0);
});

test("an unverified user can't use the app until they verify their address", async ({ page, api }) => {
  await signUp(page);
  await page.goto('/items');
  await expect(gate(page)).toBeVisible();
  await expect(banner(page)).toBeVisible();
  expect(sent(api, 'GET', '/items')).toEqual([]);

  await page.goto(`/verify-email?token=${verificationToken(1000)}`);
  await expect(page.getByText('Your email address is verified.')).toBeVisible();
  await page.goto('/items');
  await expect(page.getByText('No items found. Create your first item!')).toBeVisible();
  await expect(gate(page)).toHaveCount(0);
});

test('verifying in another tab lets the user in on coming back to this one', async ({ page, context, api }) => {
  await signUp(page);
  await page.goto('/items');
  await expect(gate(page)).toBeVisible();

  // The link in the email opens in a new tab, logged in as the same user
  const other = await context.newPage();
  await other.route(`${API_URL}/**`, api.handle);
  await other.goto(`/verify-email?token=${verificationToken(1000)}`);
  await expect(other.getByText('Your email address is verified.')).toBeVisible();

  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
  await expect(banner(page)).toHaveCount(0);
  await expect(page.getByText('No items found. Create your first item!')).toBeVisible();
});
