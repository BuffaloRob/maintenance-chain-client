import { test, expect, sent, users } from './fixtures';
import { resetToken } from './mockApi';

async function chooseNewPassword(page, password = 'new password', confirmation = password) {
  await page.getByLabel('New Password', { exact: true }).fill(password);
  await page.getByLabel('Confirm New Password').fill(confirmation);
  await page.getByRole('button', { name: 'Submit' }).click();
}

test('the login page links to resetting the password', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('link', { name: 'Forgot your password?' }).click();
  await expect(page).toHaveURL('/forgot-password');
  await expect(page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
});

test('asking for a reset sends the address and says what happens next', async ({ page, api }) => {
  await page.goto('/forgot-password');
  await page.getByLabel('Enter Your Email').fill(users.alice.email);
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText(`If there's an account for ${users.alice.email}, we've emailed it a link`)).toBeVisible();
  expect(sent(api, 'POST', '/forgot_password')).toEqual([
    { method: 'POST', path: '/forgot_password', body: { email: users.alice.email }, auth: null },
  ]);

  await page.getByRole('link', { name: 'Back to Log In' }).click();
  await expect(page).toHaveURL('/login');
});

test('asking for a reset without an address shows it is required and sends nothing', async ({ page, api }) => {
  await page.goto('/forgot-password');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('You must enter an email address')).toBeVisible();
  expect(api.requests).toEqual([]);
});

test('a failed request for a reset shows why', async ({ page, api }) => {
  api.override({ method: 'POST', path: '/forgot_password', status: 429, body: {} });
  await page.goto('/forgot-password');
  await page.getByLabel('Enter Your Email').fill(users.alice.email);
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('alert')).toHaveText('Something went wrong (error 429)');
});

test('the link in the email sets a new password and logs the user in', async ({ page, api }) => {
  await page.goto(`/reset-password?token=${resetToken(users.alice.id)}`);
  await chooseNewPassword(page, 'new password');
  await expect(page.getByText('Welcome alice')).toBeVisible();
  await expect(page).toHaveURL('/');
  expect(sent(api, 'POST', '/reset_password')[0]).toEqual({
    method: 'POST',
    path: '/reset_password',
    body: { token: 'reset-1', password: 'new password', password_confirmation: 'new password' },
    auth: null,
  });

  await page.goto('/items');
  await expect(page.getByText('Civic')).toBeVisible();
  expect(sent(api, 'GET', '/items')[0].auth).toBe('Bearer token-1');
});

test('passwords that differ are caught before sending', async ({ page, api }) => {
  await page.goto(`/reset-password?token=${resetToken(users.alice.id)}`);
  await chooseNewPassword(page, 'new password', 'another');
  await expect(page.getByText("The passwords don't match")).toBeVisible();
  expect(sent(api, 'POST', '/reset_password')).toEqual([]);
});

test('an invalid or expired link says so and offers a new one', async ({ page }) => {
  await page.goto('/reset-password?token=expired');
  await chooseNewPassword(page);
  await expect(page.getByRole('alert')).toHaveText('This link is invalid or has expired');
  await expect(page).toHaveURL(/\/reset-password/);

  await page.getByRole('link', { name: 'Need a new link?' }).click();
  await expect(page).toHaveURL('/forgot-password');
});

test('a link without a token says it is invalid and shows no form', async ({ page }) => {
  await page.goto('/reset-password');
  await expect(page.getByRole('alert')).toHaveText('This link is invalid or has expired');
  await expect(page.getByLabel('Confirm New Password')).toHaveCount(0);
  await page.getByRole('link', { name: 'Request a new link' }).click();
  await expect(page).toHaveURL('/forgot-password');
});

test('clicking Submit twice sends one reset', async ({ page, api }) => {
  api.override({ method: 'POST', path: '/reset_password', delay: 1000 });
  await page.goto(`/reset-password?token=${resetToken(users.alice.id)}`);
  await chooseNewPassword(page);
  const submit = page.getByRole('button', { name: 'Submit' });
  await expect(submit).toBeDisabled();
  await submit.click({ force: true });
  await expect(page).toHaveURL('/');
  expect(sent(api, 'POST', '/reset_password')).toHaveLength(1);
});
