import fs from 'node:fs/promises';
import path from 'node:path';

import { toMatchImageSnapshot } from 'jest-image-snapshot';
import express from 'express';
import puppeteer, { Browser } from 'puppeteer-core';

const VIEWPORT_SIZES = {
  'desktop': { width: 1280, height: 720 },
  'mobile': { width: 360, height: 800 },
};

describe('Screenshot test', () => {
  let httpServer: ReturnType<express.Application['listen']>;
  let browser: Browser;

  beforeAll(async () => {
    const app = express();
    app.use(express.static(path.join(__dirname, '../dist')));
    httpServer = app.listen(8080);

    const chromeBin = await locateBinary(CHROME_BIN_PATHS);
    browser = await puppeteer.launch({
      executablePath: chromeBin,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    expect.extend({ toMatchImageSnapshot });
  });

  afterAll(async () => {
    httpServer.close();
    await browser.close();
  });

  it.each<{ file: string, jsEnabled: boolean, viewport: keyof typeof VIEWPORT_SIZES }>([
    { file: 'index.html', jsEnabled: false, viewport: 'desktop' },
    { file: 'qr.html', jsEnabled: true, viewport: 'desktop' },
    { file: 'error.html', jsEnabled: true, viewport: 'desktop' },
  ])('$file matches $viewport image snapshot', async ({ file, jsEnabled, viewport }) => {
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(jsEnabled);
    await page.goto(`http://localhost:8080/${file}`);
    await page.setViewport(VIEWPORT_SIZES[viewport]);
    await page.waitForNetworkIdle();
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      comparisonMethod: 'ssim',
      failureThreshold: 0.01,
      failureThresholdType: 'percent',
    });
  });
});

const CHROME_BIN_PATHS = [
  '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome',
];

async function locateBinary(binPaths: string[]): Promise<string> {
  for (const binPath of binPaths) {
    if (await fs.access(binPath, fs.constants.X_OK).then(() => true).catch(() => false)) {
      return binPath;
    }
  }
  throw new Error(`Binary not found: ${binPaths.join(', ')}`);
}
