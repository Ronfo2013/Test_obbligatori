import { test, expect } from '@playwright/test';

const API_URL = process.env.API_URL ?? 'http://127.0.0.1:8000';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('/');
  await expect(page.locator('body')).toBeVisible();
});

test('backend /health returns ok', async ({ request }) => {
  const response = await request.get(`${API_URL}/health`);
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body).toMatchObject({ ok: true });
});
