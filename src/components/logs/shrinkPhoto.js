// Phone cameras take photos of several MB. Receipts are still legible at this
// size, as a JPEG of a few hundred KB, which the API stores (up to 5 MB).
// Redrawing the photo also leaves out its metadata, such as where it was taken.
const MAX_SIDE = 2000;
const QUALITY = 0.8;

// Rejects for files the browser can't read as an image
export const shrinkPhoto = async file => {
  // Decoded upright, whichever way the phone was held
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const context = canvas.getContext('2d');
  // White behind any transparency, which a JPEG would otherwise make black
  context.fillStyle = '#fff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return new Promise((resolve, reject) =>
    canvas.toBlob(blob => (blob ? resolve(blob) : reject(new Error('Could not encode the photo'))), 'image/jpeg', QUALITY)
  );
};
