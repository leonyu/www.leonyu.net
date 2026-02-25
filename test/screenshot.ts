import type http from 'node:http';
import path from 'node:path';

import express from 'express';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import puppeteer, { Browser } from 'puppeteer-core';

const VIEWPORT_SIZES = {
  'desktop': { width: 1280, height: 720 },
  'mobile': { width: 360, height: 800 },
};

describe('Screenshot test', () => {
  let httpServer: http.Server;
  let browser: Browser;

  beforeAll(async () => {
    expect.extend({ toMatchImageSnapshot });

    const expressApp = express();
    expressApp.use(express.static(path.join(__dirname, '../dist')));
    httpServer = expressApp.listen(8080);

    const args = process.getuid?.() == 0 ? ['--no-sandbox'] : [];
    browser = await puppeteer.launch(process.env['CHROME_BIN'] ?
      { executablePath: process.env['CHROME_BIN'], args } :
      { channel: 'chrome', args });
  }, 30_000);

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
