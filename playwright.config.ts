import { defineConfig, devices } from '@playwright/test';
import use from '@playwright/test';
import 'dotenv/config';


export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [
    ['html', { open: 'on-failure' }],
    ['allure-playwright'],
    ['list'],
    ['monocart-reporter', {
      name: "My Project Report",
      outputFile: './test-results/report.html'
    }]
  ],
  use: {
    baseURL: process.env.BASE_URL || '',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});