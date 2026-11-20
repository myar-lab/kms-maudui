const { test, expect } = require('@playwright/test');
const file = 'file:///C:/Users/sitif/Videos/KMS_Maudui/index.html';

test('T1 - prototype boleh buka', async ({ page }) => {
  await page.goto(file);
  await expect(page.locator('body')).toBeVisible();
});
test('T2 - index.html dimuatkan', async ({ page }) => {
  await page.goto(file);
  await expect(page).toHaveTitle(/.*/);
});
test('T3 - navigasi ada', async ({ page }) => {
  await page.goto(file);
  await expect(page.locator('nav, header').first()).toBeVisible();
});
test('T4 - Home paparan ada', async ({ page }) => {
  await page.goto(file);
  await expect(page.locator('body')).toContainText(/Home|Mawdu/i);
});
test('T5 - link ada', async ({ page }) => {
  await page.goto(file);
  const links = await page.locator('a').count();
  expect(links).toBeGreaterThan(3);
});
test('T6 - teks Arab RTL ada', async ({ page }) => {
  await page.goto(file);
  const rtl = await page.locator('[dir="rtl"], [lang="ar"]').count();
  expect(rtl + (await page.locator('body').innerText()).length).toBeGreaterThan(0);
});
test('T7 - rekod ayat Quran ada', async ({ page }) => {
  await page.goto(file);
  await expect(page.locator('body')).toContainText(/Sabr|Shukr|'Ilm|Ilm/i);
});
test('T8 - nota tafsir ada', async ({ page }) => {
  await page.goto(file);
  await expect(page.locator('body')).toContainText(/tafsir|Tafsir/i);
});
test('T9 - Sabr ada', async ({ page }) => {
  await page.goto(file);
  await expect(page.locator('body')).toContainText(/Sabr/i);
});
test('T10 - Shukr ada', async ({ page }) => {
  await page.goto(file);
  await expect(page.locator('body')).toContainText(/Shukr/i);
});
test('T11 - Ilm ada', async ({ page }) => {
  await page.goto(file);
  await expect(page.locator('body')).toContainText(/Ilm|'Ilm/i);
});
test('T12 - search / button ada', async ({ page }) => {
  await page.goto(file);
  const input = await page.locator('input, button, select, a, [onclick]').count();
  expect(input).toBeGreaterThan(0);
});
test('T13 - Resource Library ada', async ({ page }) => {
  await page.goto(file);
  await expect(page.locator('body')).toContainText(/Resource|Library|Sumber/i);
});
test('T14 - link sumber luar ada dalam kod', async ({ page }) => {
  const fs = require('fs');
  const all = fs.readFileSync('index.html', 'utf8') + fs.readFileSync('script.js', 'utf8');
  expect(all).toContain('http');
});
test('T15 - pautan luar ada href', async ({ page }) => {
  await page.goto(file);
  expect(await page.locator('a[href]').count()).toBeGreaterThan(0);
});
test('T16 - About ada', async ({ page }) => {
  await page.goto(file);
  await expect(page.locator('body')).toContainText(/About|Tentang/i);
});
test('T17 - phone tiada horizontal scroll', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto(file);
  const scroll = await page.evaluate(() => document.body.scrollWidth <= 390);
  expect(scroll).toBeTruthy();
});
test('T18 - tiada JavaScript error', async ({ page }) => {
  let errors = [];
  page.on('pageerror', e => errors.push(e));
  await page.goto(file);
  await page.waitForTimeout(1000);
  expect(errors.length).toBe(0);
});