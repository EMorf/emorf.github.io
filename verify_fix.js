const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.new_page();
  const filePath = `file://${path.resolve('cute_penguin/index.html')}`;

  // Desktop
  await page.set_viewport_size({ width: 1280, height: 800 });
  await page.goto(filePath);
  await page.screenshot({ path: 'fixed_initial_desktop.png' });
  await page.click('#bratModeToggle');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'fixed_brat_mode_desktop.png' });

  // Mobile
  await page.set_viewport_size({ width: 375, height: 667 });
  await page.goto(filePath);
  await page.screenshot({ path: 'fixed_initial_mobile.png' });
  await page.click('#bratModeToggle');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'fixed_brat_mode_mobile.png' });

  await browser.close();
})();
