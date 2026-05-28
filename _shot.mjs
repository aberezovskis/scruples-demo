import puppeteer from 'file:///C:/Users/artom/Projects/ApexRunAI/30-marketing/content-library/_render/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'file:///C:/Users/artom/Downloads/AIA%20Clients/Scruples/scruples-demo/index.html';
const OUT = 'C:/Users/artom/Downloads/AIA Clients/Scruples/scruples-demo/';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args:['--no-sandbox','--force-color-profile=srgb'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
page.setDefaultTimeout(15000);
let errs = [];
page.on('pageerror', e => errs.push('PAGEERROR: '+e.message));
page.on('console', m => { if (m.type()==='error') errs.push('CONSOLE: '+m.text()); });

await page.goto(URL, { waitUntil: 'domcontentloaded' });
await sleep(2500); // let fonts/css settle
await page.screenshot({ path: OUT+'shot-1-login.png' });
console.log('login shot done');

// enter demo
await page.click('#demoBtn');
await sleep(2000);
await page.screenshot({ path: OUT+'shot-2-overview.png' });
console.log('overview shot done');

// navigate to Voice Receptionist
await page.evaluate(() => { const n=[...document.querySelectorAll('.nav__item')].find(x=>x.dataset.id==='voice'); n&&n.click(); });
await sleep(1500);
await page.screenshot({ path: OUT+'shot-3-voice.png' });
console.log('voice shot done');

// trigger live call
await page.evaluate(() => { const b=document.querySelector('#simCall2'); b&&b.click(); });
await sleep(3500);
await page.screenshot({ path: OUT+'shot-4-livecall.png' });
console.log('livecall shot done');

// social view
await page.evaluate(() => { const m=document.querySelector('.modal-bg'); m&&m.remove(); const n=[...document.querySelectorAll('.nav__item')].find(x=>x.dataset.id==='social'); n&&n.click(); });
await sleep(1500);
await page.screenshot({ path: OUT+'shot-5-social.png' });
console.log('social shot done');

console.log('ERRORS:', errs.length ? JSON.stringify(errs, null, 2) : 'none');
await browser.close();
