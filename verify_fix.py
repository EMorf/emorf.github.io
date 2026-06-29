import asyncio
import os
from playwright.async_api import async_playwright

async def verify():
    abs_path = os.path.abspath('cute_penguin/index.html')
    url = f"file://{abs_path}"

    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # Desktop
        page = await browser.new_page()
        await page.set_viewport_size({"width": 1280, "height": 800})
        await page.goto(url)
        await asyncio.sleep(0.5)
        await page.screenshot(path='fixed_initial_desktop.png')
        await page.click('#bratModeToggle')
        await asyncio.sleep(0.5)
        await page.screenshot(path='fixed_brat_mode_desktop.png')
        await page.close()

        # Mobile
        page = await browser.new_page()
        await page.set_viewport_size({"width": 375, "height": 667})
        await page.goto(url)
        await asyncio.sleep(0.5)
        await page.screenshot(path='fixed_initial_mobile.png')
        await page.click('#bratModeToggle')
        await asyncio.sleep(0.5)
        await page.screenshot(path='fixed_brat_mode_mobile.png')
        await page.close()

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
