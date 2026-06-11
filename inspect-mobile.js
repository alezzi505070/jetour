const targetDir = 'C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\7cc870f3-47e9-40ed-bfa3-a14a9b756753';

async function run() {
  const [{ default: puppeteer }, path] = await Promise.all([
    import('puppeteer'),
    import('node:path'),
  ]);

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set iPhone X viewport and user agent
  await page.setViewport({
    width: 375,
    height: 812,
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    isLandscape: false
  });
  
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1');
  
  // 1. Home page
  console.log('Navigating to homepage...');
  await page.goto('https://jetour-ten.vercel.app/en', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 4000)); // wait for animations to settle
  console.log('Capturing homepage...');
  await page.screenshot({ path: path.join(targetDir, 'mobile_home.png') });
  
  // 2. Models page
  console.log('Navigating to models list...');
  await page.goto('https://jetour-ten.vercel.app/en/models', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2000));
  console.log('Capturing models list...');
  await page.screenshot({ path: path.join(targetDir, 'mobile_models.png') });
  
  // 3. T2 detail page
  console.log('Navigating to T2 detail page...');
  await page.goto('https://jetour-ten.vercel.app/en/models/t2', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2000));
  console.log('Capturing T2 detail page...');
  await page.screenshot({ path: path.join(targetDir, 'mobile_t2.png') });

  await browser.close();
  console.log('Browser closed. Inspection finished successfully!');
}

run().catch(err => {
  console.error('Inspection failed:', err);
  process.exit(1);
});
