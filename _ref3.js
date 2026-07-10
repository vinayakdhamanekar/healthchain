const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.deepjudge.ai/', { waitUntil: 'networkidle', timeout: 60000 });

  const start = 1750;
  const end = 4400; // covers the is--home-scrollanimation zone (2007 to 6661) partially + into search sticky
  const step = 250;

  let cur = 0;
  await page.evaluate(() => window.scrollTo(0, 0));
  while (cur < start) {
    cur += 100;
    await page.evaluate((y) => window.scrollTo(0, y), cur);
    await page.waitForTimeout(8);
  }
  await page.waitForTimeout(300);

  for (let y = start; y <= end; y += step) {
    let c = await page.evaluate(() => window.scrollY);
    while (c < y) {
      c += 60;
      await page.evaluate((yy) => window.scrollTo(0, yy), c);
      await page.waitForTimeout(8);
    }
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(250);
    await page.screenshot({ path: `C:\\Users\\vinay\\AppData\\Local\\Temp\\claude\\D--HC-healthchain-website\\17c823d4-fbe3-4520-ab97-670674a8c607\\scratchpad\\ref3_${y}.png` });
  }

  await browser.close();
})();
