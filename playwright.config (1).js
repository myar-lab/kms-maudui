// Playwright configuration for the KMS Mawdu’i prototype tests.
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  testMatch: 'test.js',
  timeout: 30000,                 // per-test timeout (ms)
  expect: { timeout: 5000 },
  fullyParallel: false,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  use: {
    baseURL: 'http://localhost:4173',
    headless: true,
    trace: 'off'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
  ],
  // Starts a tiny static server for ../04_HTML_Prototype (index.html, style.css, script.js)
  webServer: {
    command: 'node serve.js',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
    timeout: 15000
  }
});
