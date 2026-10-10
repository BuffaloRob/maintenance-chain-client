import { test, expect, login, sent } from './fixtures';

// alice's Jan 5th 2024 oil change (log 100) has a receipt, a 30×40 PNG;
// her Mar 1st 2025 tires (log 101) has none

test.beforeEach(async ({ page }) => {
  await login(page);
});

const receiptsRow = page => page.getByRole('main').locator('li').filter({ hasText: 'Receipts:' });
const cameraButton = page => page.getByRole('button', { name: 'Take a photo of a receipt' });

// Picks `file` in the chooser the camera button opens
async function takePhoto(page, file) {
  const chooser = page.waitForEvent('filechooser');
  await cameraButton(page).click();
  await (await chooser).setFiles(file);
}

// A PNG the size of a phone photo, drawn by the browser
async function bigPhoto(page, width, height) {
  const dataUrl = await page.evaluate(([width, height]) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    context.fillStyle = '#eee';
    context.fillRect(0, 0, width, height);
    return canvas.toDataURL('image/png');
  }, [width, height]);
  return { name: 'IMG_0001.png', mimeType: 'image/png', buffer: Buffer.from(dataUrl.split(',')[1], 'base64') };
}

const imageSize = image => image.evaluate(img => [img.naturalWidth, img.naturalHeight]);

test('a log without receipts has a button that opens the camera', async ({ page }) => {
  await page.goto('/log/101');
  await expect(receiptsRow(page).getByRole('button', { name: /View receipt/ })).toHaveCount(0);
  await expect(receiptsRow(page).getByRole('button', { name: 'Take a photo of a receipt' })).toBeVisible();

  // On phones, capture opens the rear camera rather than the photo library
  const input = page.locator('input[type=file]');
  await expect(input).toHaveAttribute('accept', 'image/*');
  await expect(input).toHaveAttribute('capture', 'environment');
});

test('takes a photo of a receipt, shrunk to a JPEG', async ({ page, api }) => {
  await page.goto('/log/101');
  await takePhoto(page, await bigPhoto(page, 3000, 1500));

  await expect(receiptsRow(page).getByRole('button', { name: 'View receipt 1' })).toBeVisible();
  const [{ body }] = sent(api, 'POST', '/items/1/categories/11/logs/101/receipts');
  expect(body.type).toBe('image/jpeg');
  expect([...body.data.subarray(0, 3)]).toEqual([0xff, 0xd8, 0xff]);

  await page.getByRole('button', { name: 'View receipt 1' }).click();
  const image = page.getByRole('dialog').getByRole('img', { name: 'Receipt 1' });
  await expect(image).toBeVisible();
  expect(await imageSize(image)).toEqual([2000, 1000]);
});

test("shows a log's receipt", async ({ page }) => {
  await page.goto('/log/100');
  await receiptsRow(page).getByRole('button', { name: 'View receipt 1' }).click();

  const dialog = page.getByRole('dialog', { name: 'Receipt 1' });
  const image = dialog.getByRole('img', { name: 'Receipt 1' });
  await expect(image).toBeVisible();
  expect(await imageSize(image)).toEqual([30, 40]);

  await dialog.getByRole('button', { name: 'Close' }).click();
  await expect(dialog).toBeHidden();
});

test('deletes a receipt after confirmation', async ({ page, api }) => {
  await page.goto('/log/100');
  await page.getByRole('button', { name: 'View receipt 1' }).click();
  const dialog = page.getByRole('dialog', { name: 'Receipt 1' });
  await dialog.getByRole('button', { name: 'Delete' }).click();
  await expect(dialog).toContainText('Delete this receipt?');
  expect(sent(api, 'DELETE', '/items/1/categories/10/logs/100/receipts/500')).toEqual([]);

  await dialog.getByRole('button', { name: 'Delete' }).click();
  await expect(dialog).toBeHidden();
  await expect(page.getByRole('button', { name: /View receipt/ })).toHaveCount(0);
  expect(sent(api, 'DELETE', '/items/1/categories/10/logs/100/receipts/500')).toHaveLength(1);
});

test("a file that isn't a photo isn't uploaded", async ({ page, api }) => {
  await page.goto('/log/101');
  await takePhoto(page, { name: 'receipt.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('not a photo') });

  await expect(page.getByRole('alert')).toHaveText("Couldn't read that photo. Try taking it again.");
  expect(sent(api, 'POST', '/items/1/categories/11/logs/101/receipts')).toEqual([]);
});

test("shows why a receipt couldn't be saved", async ({ page, api }) => {
  api.override({
    method: 'POST',
    path: '/items/1/categories/11/logs/101/receipts',
    status: 422,
    body: { message: 'A log can have up to 10 receipts' },
  });
  await page.goto('/log/101');
  await takePhoto(page, await bigPhoto(page, 300, 400));

  await expect(page.getByRole('alert')).toHaveText('A log can have up to 10 receipts');
  await expect(page.getByRole('button', { name: /View receipt/ })).toHaveCount(0);
  await expect(cameraButton(page)).toBeEnabled();
});

test.describe('on a phone', () => {
  test.use({ viewport: { width: 375, height: 740 } });

  test('a receipt fills the screen', async ({ page }) => {
    await page.goto('/log/100');
    await expect(cameraButton(page)).toBeVisible();
    await page.getByRole('button', { name: 'View receipt 1' }).click();

    const dialog = page.getByRole('dialog', { name: 'Receipt 1' });
    await expect(dialog.getByRole('img', { name: 'Receipt 1' })).toBeVisible();
    expect(await dialog.boundingBox()).toMatchObject({ x: 0, y: 0, width: 375, height: 740 });
  });
});
