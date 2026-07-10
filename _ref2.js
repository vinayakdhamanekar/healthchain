const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.deepjudge.ai/', { waitUntil: 'networkidle', timeout: 60000 });

  const info = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('*'));
    const matches = all.filter((e) => {
      const t = e.textContent || '';
      return t.includes('scattered') || t.includes('inaccessible') || t.includes('Search the way you think');
    });
    return matches.slice(0, 20).map((e) => {
      const r = e.getBoundingClientRect();
      return {
        tag: e.tagName,
        cls: (e.className || '').toString().slice(0, 80),
        text: (e.textContent || '').slice(0, 60),
        top: r.top + window.scrollY,
        height: r.height,
      };
    });
  });
  console.log(JSON.stringify(info, null, 2));

  await browser.close();
})();
