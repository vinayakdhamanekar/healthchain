const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.deepjudge.ai/', { waitUntil: 'networkidle', timeout: 60000 });

  // find the section with the target heading text
  const found = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('h1,h2,h3,p,div,span'));
    const el = all.find((e) => e.textContent && e.textContent.includes('scattered and inaccessible'));
    if (!el) return null;
    let sectionEl = el;
    for (let i = 0; i < 6 && sectionEl.parentElement; i++) sectionEl = sectionEl.parentElement;
    const r = sectionEl.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: r.height, tag: sectionEl.tagName, cls: sectionEl.className };
  });
  console.log('found section info:', JSON.stringify(found));

  if (found) {
    const dest = found.top - 200;
    let cur = 0;
    await page.evaluate(() => window.scrollTo(0, 0));
    while (cur < dest) {
      cur += 80;
      await page.evaluate((y) => window.scrollTo(0, y), cur);
      await page.waitForTimeout(10);
    }
    await page.waitForTimeout(300);

    for (let dy = 0; dy <= (found.height + 400); dy += 100) {
      await page.evaluate((y) => window.scrollTo(0, y), dest + dy);
      await page.waitForTimeout(200);
      await page.screenshot({ path: `C:\\Users\\vinay\\AppData\\Local\\Temp\\claude\\D--HC-healthchain-website\\17c823d4-fbe3-4520-ab97-670674a8c607\\scratchpad\\ref_${dy}.png` });
    }
  }

  await browser.close();
})();
