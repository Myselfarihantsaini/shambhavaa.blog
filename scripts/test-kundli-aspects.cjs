const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '../public');
const types = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json'};
const server = http.createServer((req, res) => {
  try {
    let file = path.join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    if (fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    res.end(fs.readFileSync(file));
  } catch { res.writeHead(404); res.end(); }
});

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    const base = `http://127.0.0.1:${server.address().port}`;
    browser = await chromium.launch(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {});
    const page = await browser.newPage();
    await page.route('**/*', route => route.request().url().startsWith(base) ? route.continue() : route.abort());
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base + '/tools/kundli-chart/');
    for (const [id, value] of Object.entries({lat:'28.6139', lon:'77.2090', tz:'5.5'})) await page.locator('#'+id).fill(value);
    await page.locator('#calc').click();
    await page.locator('#aspect-planet').selectOption('Mars');
    for (const width of [360, 390, 1440]) {
      await page.setViewportSize({width, height:1000});
      await page.locator('#chart').scrollIntoViewIfNeeded();
      const bounds = await page.locator('.aspect-controls').boundingBox();
      assert(bounds.x >= 0 && bounds.x + bounds.width <= width, 'Controls fit viewport');
      await page.screenshot({path:`/tmp/kundli-aspects-${width}.png`});
    }
    const cases = await page.evaluate(() => {
      const rules = {Sun:[7],Moon:[7],Mars:[4,7,8],Mercury:[7],Jupiter:[5,7,9],Venus:[7],Saturn:[3,7,10],Rahu:[],Ketu:[]};
      let count = 0;
      for (let house=1; house<=12; house++) {
        for (let lagna=0; lagna<12; lagna++) {
          const signs = Object.fromEntries(ORDER.map(p => [p,(lagna+house-1)%12]));
          drawNorthChart(document.getElementById('chart'),lagna,signs);
          for (const [planet, offsets] of Object.entries(rules)) {
            const control = document.getElementById('aspect-planet');
            control.value = planet; control.dispatchEvent(new Event('change'));
            const expected = offsets.map(n=>(house+n-2)%12+1);
            const actual = [...document.querySelectorAll('.aspect-ray')].map(p=>+p.dataset.targetHouse);
            if (JSON.stringify(actual)!==JSON.stringify(expected)) throw Error(`${planet}, house ${house}, lagna ${lagna}`);
            if (+document.querySelector('.aspect-source').dataset.house!==house) throw Error('Wrong source house');
            count++;
          }
        }
      }
      return count;
    });
    await page.locator('#calc').click();
    await page.locator('#chart [data-aspect-planet="Jupiter"]').click();
    assert.equal(await page.locator('#aspect-planet').inputValue(), 'Jupiter');
    await page.locator('#chart [data-aspect-planet="Saturn"]').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#aspect-planet').inputValue(), 'Saturn');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.aspect-layer').count(), 0);
    await page.locator('#aspect-planet').selectOption('Mars');
    await page.getByLabel('Animate', {exact:true}).uncheck();
    assert.equal(await page.locator('.is-animated').count(), 0);
    await page.getByLabel('Animate', {exact:true}).check();
    await page.emulateMedia({reducedMotion:'reduce'});
    assert.equal(await page.locator('.aspect-ray').first().evaluate(el=>getComputedStyle(el).animationName), 'none');
    await page.emulateMedia({media:'print'});
    assert.equal(await page.locator('.aspect-layer').evaluate(el=>getComputedStyle(el).display), 'none');
    await page.emulateMedia({media:'screen'});
    await page.locator('#tob').fill('18:00');
    await page.locator('#calc').click();
    assert.equal(await page.locator('.aspect-controls').count(), 1);
    assert.equal(await page.locator('.aspect-layer').count(), 1);
    assert.equal(await page.locator('#chartD9 .aspect-layer').count(), 0);
    assert.deepEqual(errors, []);
    console.log(`PASS: ${cases} aspect cases; mobile/desktop; pointer/keyboard; clear; motion/print; regeneration; D9 isolation.`);
  } finally {
    if (browser) await browser.close();
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode=1; });
