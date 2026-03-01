const { chromium } = require('playwright');

async function scrapeSums() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  let grandTotal = 0;
  
  const urls = [
    'https://sanand0.github.io/tdsdata/js_table/?seed=82',
    'https://sanand0.github.io/tdsdata/js_table/?seed=83',
    'https://sanand0.github.io/tdsdata/js_table/?seed=84',
    'https://sanand0.github.io/tdsdata/js_table/?seed=85',
    'https://sanand0.github.io/tdsdata/js_table/?seed=86',
    'https://sanand0.github.io/tdsdata/js_table/?seed=87',
    'https://sanand0.github.io/tdsdata/js_table/?seed=88',
    'https://sanand0.github.io/tdsdata/js_table/?seed=89',
    'https://sanand0.github.io/tdsdata/js_table/?seed=90',
    'https://sanand0.github.io/tdsdata/js_table/?seed=91'
  ];

  for (const url of urls) {
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Wait for tables to load (dynamic content)
    await page.waitForSelector('table');
    
    // Extract all text from table cells, filter numbers
    const numbers = await page.evaluate(() => {
      const cells = document.querySelectorAll('table td, table th');
      return Array.from(cells)
        .map(cell => cell.textContent.trim())
        .filter(text => !isNaN(text) && text !== '')
        .map(Number);
    });
    
    const pageSum = numbers.reduce((sum, num) => sum + num, 0);
    grandTotal += pageSum;
    console.log(`Sum for ${url}: ${pageSum}`);
  }
  
  console.log(`GRAND TOTAL SUM OF ALL TABLES: ${grandTotal}`);
  await browser.close();
}

scrapeSums();
