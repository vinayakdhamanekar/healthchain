const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const box = await page.evaluate(() => {
    const heading = Array.from(document.querySelectorAll('*')).find(e => e.textContent === 'Your data is ready.');
    if (!heading) return null;
    let el = heading;
    for (let i = 0; i < 4; i++) el = el.parentElement;
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: r.height };
  });
  console.log('box', box);
  await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, box.top - 40));
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'C:\\Users\\vinay\\AppData\\Local\\Temp\\claude\\D--HC-healthchain-website\\17c823d4-fbe3-4520-ab97-670674a8c607\\scratchpad\\readycta_desktop.png' });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, box.top - 40));
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'C:\\Users\\vinay\\AppData\\Local\\Temp\\claude\\D--HC-healthchain-website\\17c823d4-fbe3-4520-ab97-670674a8c607\\scratchpad\\readycta_mobile.png' });

  await browser.close();
})();
