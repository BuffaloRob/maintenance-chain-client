import { test, expect, login, sent, users } from './fixtures';

test('a first visit sends no API requests', async ({ page, api }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Maintenance Chain' })).toBeVisible();
  await page.waitForLoadState('networkidle');
  expect(api.requests).toEqual([]);
});

test('logging in sends the credentials and then uses the token', async ({ page, api }) => {
  await login(page);
  await expect(page).toHaveURL('/');
  expect(api.requests[0]).toEqual({
    method: 'POST',
    path: '/login',
    body: { user: { email: users.alice.email, password: 'password' } },
    auth: null,
  });

  await page.goto('/items');
  await expect(page.getByText('Civic')).toBeVisible();
  expect(sent(api, 'GET', '/items')[0].auth).toBe('Bearer token-1');
  expect(api.requests.filter(r => /undefined|null/.test(r.auth ?? ''))).toEqual([]);
});

for (const [path, title] of [['/login', 'Log In'], ['/signup', 'Sign Up']]) {
  test(`${title}: an empty submit shows what is required and sends nothing`, async ({ page, api }) => {
    await page.goto(path);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('You must enter an email address')).toBeVisible();
    await expect(page.getByText('You must enter a password')).toBeVisible();
    expect(api.requests).toEqual([]);
  });
}

for (const [label, response] of [
  ['a 200 response with a message', { status: 200, body: { message: 'Invalid' } }],
  ['a 401 response', { status: 401, body: { message: 'Invalid' } }],
]) {
  test(`a rejected login (${label}) shows the message and stays logged out`, async ({ page, api }) => {
    api.override({ method: 'POST', path: '/login', ...response });
    await page.goto('/login');
    await page.getByLabel('Enter Your Email').fill(users.alice.email);
    await page.getByLabel('Enter Your Password').fill('wrong');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByRole('alert')).toHaveText('Invalid');
    await expect(page).toHaveURL('/login');
    await expect(page.getByRole('link', { name: 'Please Log In' })).toBeVisible();
  });
}

for (const [path, email] of [['/login', users.alice.email], ['/signup', 'carol@example.com']]) {
  test(`${path}: clicking Submit twice sends one request`, async ({ page, api }) => {
    api.override({ method: 'POST', path, delay: 1000 });
    await page.goto(path);
    await page.getByLabel('Enter Your Email').fill(email);
    await page.getByLabel('Enter Your Password').fill('password');
    const submit = page.getByRole('button', { name: 'Submit' });
    await submit.click();
    await expect(submit).toBeDisabled();
    await submit.click({ force: true }); // a disabled button ignores the click
    await expect(page).toHaveURL('/');
    expect(sent(api, 'POST', path)).toHaveLength(1);
  });
}

test('signing up logs the new user in', async ({ page, api }) => {
  await page.goto('/signup');
  await page.getByLabel('Enter Your Email').fill('carol@example.com');
  await page.getByLabel('Enter Your Password').fill('password');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Welcome carol')).toBeVisible();
  await expect(page).toHaveURL('/');
  expect(sent(api, 'POST', '/signup')[0].body).toEqual({
    user: { email: 'carol@example.com', password: 'password' },
  });
});

test('the session survives a reload', async ({ page, api }) => {
  await login(page);
  await page.reload();
  await expect(page.getByText('Welcome alice')).toBeVisible();
  expect(sent(api, 'GET', '/user').at(-1).auth).toBe('Bearer token-1');
});

test('a token saved by the previous version of the app is adopted', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('jwt', 'token-1'));
  await page.goto('/');
  await expect(page.getByText('Welcome alice')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('jwt'))).toBeNull();
});

test('logging out ends the session and the next user sees only their data', async ({ page, api }) => {
  await login(page);
  await page.goto('/items');
  await expect(page.getByText('Civic')).toBeVisible();

  await page.getByRole('button', { name: 'Log Out' }).click();
  await expect(page.getByRole('link', { name: 'Please Log In' })).toBeVisible();
  await expect(page).toHaveURL('/');
  expect(sent(api, 'POST', '/logout')[0].auth).toBe('Bearer token-1');

  await page.reload();
  await expect(page.getByRole('link', { name: 'Please Log In' })).toBeVisible();

  await login(page, users.bob);
  await page.goto('/items');
  await expect(page.getByText('Lawn mower')).toBeVisible();
  await expect(page.getByText('Civic')).toHaveCount(0);
});

test('logging out still completes when the server never answers', async ({ page, api }) => {
  api.override({ method: 'POST', path: '/logout', hang: true });
  await login(page);
  await page.getByRole('button', { name: 'Log Out' }).click();
  await expect(page.getByRole('link', { name: 'Please Log In' })).toBeVisible({ timeout: 6000 });
});
