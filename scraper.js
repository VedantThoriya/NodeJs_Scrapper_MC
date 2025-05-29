const puppeteer = require('puppeteer');
const companies = require('./utils/companies');
const closeMoneyControlPopups = require('./utils/popupHandler');
const { insertSheetData } = require('./utils/sheets');
require('dotenv').config();

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapeSWOTNumbers() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1400,900']
  });

  try {
    for (const company of companies) {
      console.log(`\nProcessing ${company.name}...`);
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
      await page.setViewport({ width: 1400, height: 900 });

      try {
        await page.goto(company.url, { waitUntil: 'networkidle2', timeout: 65000 });

        // Close pop-ups when website loads fully
        for (let i = 0; i < 3; i++) {
          await closeMoneyControlPopups(page);
          await delay(1000);
        }

        // Get SWOT
        await page.waitForSelector('.swlil.swotliClass', { timeout: 10000 }).catch(() => { });

        const result = await page.evaluate(() => {
          const data = {};

          const items = document.querySelectorAll('li.swotliClass');

          items.forEach(item => {
            const link = item.querySelector('a[title]');
            const title = link?.getAttribute('title') || 'Unknown';
            const strongText = link?.querySelector('strong')?.textContent || '';
            const match = strongText.match(/\((\d+)\)/);
            const count = match ? parseInt(match[1]) : 0;
            data[title] = count;
          });

          // Get MC Essentials Score
          const mcScoreEl = document.querySelector(".esbx");
          if (mcScoreEl) {
            const match = mcScoreEl.textContent.match(/(\d+)%/);
            data["MCEssentials"] = match ? parseInt(match[1]) : "N/A";
          } else {
            data["MCEssentials"] = "N/A";
          }

          return data;
        });

        console.log(`${company.name}:`, result);

        await insertSheetData(company.name, result);

      } catch (error) {
        console.error(`Error processing ${company.name}:`, error.message);
        // await page.screenshot({
        //   path: `error-${company.name.replace(/\s+/g, '-')}.png`,
        //   fullPage: true
        // });
      } finally {
        await page.close();
      }
    }
  } catch (error) {
    console.error('Global error:', error.message);
  } finally {
    await browser.close();
  }
}

scrapeSWOTNumbers();