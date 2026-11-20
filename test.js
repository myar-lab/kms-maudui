// Playwright tests for the KMS Mawdu’i reference prototype.
// They test only features that exist in the prototype: six pages, six verse records,
// theme filter buttons, keyword filter and the Resource Library links.
const { test, expect } = require('@playwright/test');

const PAGES = [
  { hash: 'home', label: 'Home Page', heading: 'Welcome' },
  { hash: 'themes', label: 'Explore Themes', heading: 'Explore Themes' },
  { hash: 'repo', label: 'Quranic Verse Repository', heading: 'Quranic Verse Repository' },
  { hash: 'notes', label: 'Tafsir and Knowledge Notes', heading: 'Tafsir and Knowledge Notes' },
  { hash: 'lib', label: 'Resource Library', heading: 'Resource Library' },
  { hash: 'about', label: 'About the System', heading: 'About the System' }
];

const RECORDS = [
  { id: 'R01', theme: 'Sabr', ref: 'Surah al-Baqarah (2:153)' },
  { id: 'R02', theme: 'Sabr', ref: "Surah Ali 'Imran (3:200)" },
  { id: 'R03', theme: 'Shukr', ref: 'Surah Ibrahim (14:7)' },
  { id: 'R04', theme: 'Shukr', ref: 'Surah Luqman (31:12)' },
  { id: 'R05', theme: "'Ilm", ref: 'Surah Taha (20:114)' },
  { id: 'R06', theme: "'Ilm", ref: 'Surah al-Mujadilah (58:11)' }
];

const RESOURCE_URLS = [
  'https://quran.com',
  'https://corpus.quran.com',
  'https://quran.com/2/153/tafsirs/en-tafisr-ibn-kathir',
  'https://journals.iium.edu.my/intdiscourse/index.php/id/article/view/118/98',
  'https://doi.org/10.2307/3250961',
  'https://doi.org/10.1287/orsc.5.1.14'
];
const EL_MESAWI_URL = 'https://journals.iium.edu.my/intdiscourse/index.php/id/article/view/118/98';

/** Collect JavaScript errors and console errors for the current page. */
function trackErrors(page) {
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  return errors;
}

async function go(page, hash) {
  await page.goto('/#' + hash);
  await expect(page.locator('#nav a.on')).toHaveAttribute('data-page', hash);
}

test.describe('Loading and the three prototype files', () => {
  test('T1 prototype loads with the project title and six navigation links', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/');
    await expect(page).toHaveTitle(/KMS Mawdu’i/);
    await expect(page.locator('header h1')).toHaveText('KMS Mawdu’i: A Thematic Quran Knowledge Management System');
    await expect(page.locator('#nav a')).toHaveCount(6);
    await expect(page.locator('#nav a')).toHaveText(PAGES.map(p => p.label));
    await expect(page.locator('#app h2')).toHaveText('Welcome');
    expect(errors).toEqual([]);
  });

  test('T2 index.html, style.css and script.js are all requested and loaded', async ({ page }) => {
    const seen = {};
    page.on('response', r => {
      const name = new URL(r.url()).pathname;
      if (['/', '/index.html', '/style.css', '/script.js'].includes(name)) seen[name === '/' ? '/index.html' : name] = r.status();
    });
    await page.goto('/');
    await expect(page.locator('#app h2')).toBeVisible();
    expect(seen['/index.html']).toBe(200);
    expect(seen['/style.css']).toBe(200);
    expect(seen['/script.js']).toBe(200);
    // style.css is applied: header uses the CSS variable colour, not the browser default
    const headerBg = await page.locator('header').evaluate(e => getComputedStyle(e).backgroundColor);
    expect(headerBg).not.toBe('rgba(0, 0, 0, 0)');
    // script.js is running: it builds the page content and the navigation
    await expect(page.locator('#nav a.on')).toHaveText('Home Page');
    // index.html references the other two files
    const html = await (await page.request.get('/index.html')).text();
    expect(html).toContain('href="style.css"');
    expect(html).toContain('src="script.js"');
  });
});

test.describe('Navigation', () => {
  test('T3 each of the six pages opens from the menu and is highlighted', async ({ page }) => {
    await page.goto('/');
    for (const p of PAGES) {
      await page.locator(`#nav a[data-page="${p.hash}"]`).click();
      await expect(page.locator('#nav a.on')).toHaveAttribute('data-page', p.hash);
      await expect(page.locator('#app h2').first()).toHaveText(p.heading);
      await expect(page).toHaveURL(new RegExp('#' + p.hash + '$'));
    }
  });

  test('T4 an unknown address falls back to the Home Page', async ({ page }) => {
    await page.goto('/#doesnotexist');
    await expect(page.locator('#nav a.on')).toHaveAttribute('data-page', 'home');
  });

  test('T5 Home Page shows the three themes with two records each', async ({ page }) => {
    await go(page, 'home');
    const cards = page.locator('.grid .card');
    await expect(cards).toHaveCount(3);
    await expect(cards.nth(0)).toContainText('Sabr');
    await expect(cards.nth(1)).toContainText('Shukr');
    await expect(cards.nth(2)).toContainText('Ilm');
    for (let i = 0; i < 3; i++) await expect(cards.nth(i)).toContainText('2 verse records');
  });
});

test.describe('Quranic verse records', () => {
  test('T6 six records display with reference, Arabic text (right-to-left) and translation', async ({ page }) => {
    await go(page, 'repo');
    const arts = page.locator('article.card');
    await expect(arts).toHaveCount(6);
    for (const r of RECORDS) {
      const a = page.locator(`#rec-${r.id}`);
      await expect(a).toContainText(r.ref);
      await expect(a.locator('.tag')).toHaveText(r.theme);
      await expect(a.locator('.ar')).toHaveAttribute('dir', 'rtl');
      await expect(a.locator('.ar')).toHaveAttribute('lang', 'ar');
      expect((await a.locator('.ar').innerText()).trim().length).toBeGreaterThan(10);
      await expect(a).toContainText('Translation: Sahih International');
    }
  });

  test('T7 Tafsir and Knowledge Notes page shows six notes, each with a source and theme check', async ({ page }) => {
    await go(page, 'notes');
    const arts = page.locator('article.card');
    await expect(arts).toHaveCount(6);
    for (let i = 0; i < 6; i++) {
      await expect(arts.nth(i)).toContainText('Tafsir and knowledge note');
      await expect(arts.nth(i)).toContainText('Source: Tafsir Ibn Kathir (Abridged)');
      await expect(arts.nth(i)).toContainText('Theme check: Fits');
    }
  });

  test('T8 "Open tafsir note" link on a record opens the notes page', async ({ page }) => {
    await go(page, 'repo');
    await page.locator('#rec-R03 a[data-open="R03"]').click();
    await expect(page.locator('#nav a.on')).toHaveAttribute('data-page', 'notes');
    await expect(page.locator('#rec-R03')).toContainText('Tafsir and knowledge note');
  });
});

test.describe('Theme buttons and keyword filter', () => {
  test('T9 theme buttons filter the repository (All 6, Sabr 2, Shukr 2, Ilm 2)', async ({ page }) => {
    await go(page, 'repo');
    await expect(page.locator('#count')).toHaveText('6 of 6 records shown');
    for (const [theme, ids] of [['Sabr', ['R01', 'R02']], ['Shukr', ['R03', 'R04']], ["'Ilm", ['R05', 'R06']]]) {
      await page.locator(`button[data-filter="${theme}"]`).click();
      await expect(page.locator('#count')).toHaveText('2 of 6 records shown');
      await expect(page.locator('button.t.on')).toHaveText(theme);
      for (const id of ids) await expect(page.locator(`#rec-${id}`)).toBeVisible();
      await expect(page.locator('article.card')).toHaveCount(2);
    }
    await page.locator('button[data-filter="All"]').click();
    await expect(page.locator('article.card')).toHaveCount(6);
  });

  test('T10 "View verses" on Explore Themes opens the repository filtered to that theme', async ({ page }) => {
    for (const theme of ['Sabr', 'Shukr', "'Ilm"]) {
      await go(page, 'themes');
      await expect(page.locator('[data-theme-card]')).toHaveCount(3);
      await page.locator(`a[data-theme="${theme}"]`).click();
      await expect(page.locator('#nav a.on')).toHaveAttribute('data-page', 'repo');
      await expect(page.locator('article.card')).toHaveCount(2);
      await expect(page.locator('article.card .tag')).toHaveText([theme, theme]);
    }
  });

  test('T11 keyword filter returns matching records and a message when nothing matches', async ({ page }) => {
    await go(page, 'repo');
    const q = page.locator('#q');
    await q.fill('patience');
    await expect(page.locator('#count')).toHaveText('1 of 6 records shown');
    await expect(page.locator('#rec-R01')).toBeVisible();
    await q.fill('knowledge');
    await expect(page.locator('#count')).toHaveText('3 of 6 records shown');
    await q.fill('LUQMAN');                      // not case sensitive; matches the surah name
    await expect(page.locator('#count')).toHaveText('1 of 6 records shown');
    await expect(page.locator('#rec-R04')).toBeVisible();
    await q.fill('zzzz');
    await expect(page.locator('#count')).toHaveText('0 of 6 records shown');
    await expect(page.locator('#app')).toContainText('No records match.');
    await q.fill('');
    await expect(page.locator('#count')).toHaveText('6 of 6 records shown');
  });

  test('T12 theme button and keyword filter work together; quotation marks do not break the box', async ({ page }) => {
    await go(page, 'repo');
    await page.locator('button[data-filter="Sabr"]').click();
    await page.locator('#q').fill('patient');
    await expect(page.locator('#count')).toHaveText('2 of 6 records shown');   // both Sabr records mention patient/patience
    await page.locator('#q').fill('a"b<c');
    await expect(page.locator('#q')).toHaveValue('a"b<c');                       // regression check for the escaping fix
    await expect(page.locator('#count')).toHaveText('0 of 6 records shown');
  });
});

test.describe('Resource Library', () => {
  test('T13 six resources are listed with the expected link addresses', async ({ page }) => {
    await go(page, 'lib');
    const links = page.locator('.card a[href^="http"]');
    await expect(links).toHaveCount(6);
    const hrefs = await links.evaluateAll(a => a.map(x => x.getAttribute('href')));
    expect(hrefs).toEqual(RESOURCE_URLS);
    for (const h of hrefs) expect(h.startsWith('https://')).toBeTruthy();
    // opens in a new tab safely
    await expect(links.first()).toHaveAttribute('target', '_blank');
    await expect(links.first()).toHaveAttribute('rel', /noopener/);
  });

  test('T14 the El-Mesawi resource uses only the verified IIUM address', async ({ page }) => {
    await go(page, 'lib');
    const card = page.locator('.card', { hasText: 'El-Mesawi' });
    await expect(card).toHaveCount(1);
    await expect(card.locator('a')).toHaveAttribute('href', EL_MESAWI_URL);
    const allHrefs = await page.locator('#app a').evaluateAll(a => a.map(x => x.href));
    expect(allHrefs.filter(h => /doi\.org\/10\.31436/.test(h))).toHaveLength(0);
  });

  test('T15 each resource link opens a new tab to its own address (external sites are stubbed)', async ({ page, context }) => {
    // The test environment does not depend on internet access: external pages are answered locally.
    // Whether the live websites open was checked manually by the group (see the report).
    await context.route(/^https:\/\/(?!localhost).*/, route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>stub</title>' }));
    await go(page, 'lib');
    const links = page.locator('.card a[href^="http"]');
    for (let i = 0; i < 6; i++) {
      const [popup] = await Promise.all([context.waitForEvent('page'), links.nth(i).click()]);
      await popup.waitForLoadState();
      expect(popup.url().replace(/\/$/, '')).toBe(RESOURCE_URLS[i].replace(/\/$/, ''));
      await popup.close();
    }
    await expect(page.locator('#app h2')).toHaveText('Resource Library');   // prototype page stays open
  });
});

test.describe('About page, responsiveness and errors', () => {
  test('T16 About page describes the four KM processes and the stated limitations', async ({ page }) => {
    await go(page, 'about');
    const text = await page.locator('#app').innerText();
    for (const k of ['Knowledge Capture', 'Knowledge Storage', 'Knowledge Retrieval', 'Knowledge Sharing']) expect(text).toContain(k);
    expect(text).toContain('six verse records');
    expect(text).toContain('Limitations');
  });

  test('T17 narrow (phone-width) viewport has no horizontal scrolling on any page', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    for (const p of PAGES) {
      await go(page, p.hash);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `page ${p.hash}`).toBeLessThanOrEqual(0);
    }
  });

  test('T18 a full tour of every page and filter produces no JavaScript errors', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/');
    for (const p of PAGES) await go(page, p.hash);
    await go(page, 'repo');
    for (const t of ['Sabr', 'Shukr', "'Ilm", 'All']) await page.locator(`button[data-filter="${t}"]`).click();
    await page.locator('#q').fill('allah');
    await page.locator('#q').fill('');
    expect(errors).toEqual([]);
  });
});
