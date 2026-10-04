import { defineConfig, devices } from '@playwright/test';
import { API_URL } from './e2e/mockApi';

// Separate port from `npm start`, so a dev server pointed at a real API is never reused
const PORT = 3105;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // In CI, 'github' adds failure annotations to the PR and 'list' keeps a readable log
  reporter: process.env.CI ? [['list'], ['github']] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [
    // channel 'chromium' runs the full Chromium build headless (no separate headless-shell download)
    { name: 'chromium', use: { ...devices['Desktop Chrome'], channel: 'chromium' } },
  ],
  webServer: {
    command: `npx vite --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    // Overrides .env so the app talks to the mock API, and shows the (fake) Google button
    env: { REACT_APP_API_URL: API_URL, VITE_GOOGLE_CLIENT_ID: 'test.apps.googleusercontent.com' },
  },
});
