import { test, expect, sent, users, GOOGLE_CREDENTIAL, GOOGLE_SCRIPT_URL } from './fixtures';

for (const [path, label] of [['/login', 'Sign in with Google'], ['/signup', 'Sign up with Google']]) {
  test(`${path}: signing in with Google sends Google's ID token and logs the user in`, async ({ page, api }) => {
    await page.goto(path);
    await page.getByRole('button', { name: label }).click();
    await expect(page.getByText('Welcome alice')).toBeVisible();
    await expect(page).toHaveURL('/');
    expect(sent(api, 'POST', '/auth/google')).toEqual([
      { method: 'POST', path: '/auth/google', body: { credential: GOOGLE_CREDENTIAL }, auth: null },
    ]);

    await page.goto('/items');
    await expect(page.getByRole('main').getByText('Civic')).toBeVisible();
    expect(sent(api, 'GET', '/items')[0].auth).toBe('Bearer token-1');
  });
}

test('a rejected Google sign-in shows the message and stays logged out', async ({ page, api }) => {
  api.override({ method: 'POST', path: '/auth/google', status: 401, body: { message: "Couldn't sign in with Google" } });
  await page.goto('/login');
  await page.getByRole('button', { name: 'Sign in with Google' }).click();
  await expect(page.getByRole('alert')).toHaveText("Couldn't sign in with Google");
  await expect(page).toHaveURL('/login');
  await expect(page.getByRole('link', { name: 'Please Log In' })).toBeVisible();
});

test("logging in with a password still works when Google's script can't load", async ({ page }) => {
  await page.route(GOOGLE_SCRIPT_URL, route => route.abort('connectionrefused'));
  await page.goto('/login');
  await expect(page.getByRole('alert')).toHaveText(/Couldn't load Google sign-in/);

  await page.getByLabel('Enter Your Email').fill(users.alice.email);
  await page.getByLabel('Enter Your Password').fill('password');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Welcome alice')).toBeVisible();
});
