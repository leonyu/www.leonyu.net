import 'core-js/es6/promise';
import 'whatwg-fetch';

import * as QRCode from 'qrcode';

function fetchIPAddress() {
  return fetch(`https://boxing.leonyu.net/ip.json`, {
    cache: 'no-cache',
  }).then((res) => {
    if (!res.ok) {
      throw Error(`${res.status} ${res.statusText}`);
    }
    return res.json();
  }).then<string>((json) => {
    return json.ip;
  });
}

const queue: string[] = [];

function queueRender() {
  const text = queue.shift();
  if (typeof text === 'undefined') {
    return;
  }

  const qrCanvas = document.querySelector<HTMLCanvasElement>('#qr-code')!;
  const options = { color: { dark: '#222' }, width: getContentWidth() } as any;
  if (text) {
    QRCode.toCanvas(qrCanvas, text, options, queueRender);
  } else {
    QRCode.toCanvas(qrCanvas, [{ data: text, mode: 'alphanumeric' }], options, queueRender);
  }
}

function getContentWidth(): number {
  const contentDiv = document.querySelector<HTMLDivElement>('.content')!;
  const computedWidth = window.getComputedStyle(contentDiv).width;
  return computedWidth ? parseInt(computedWidth, 10) : 560;
}

function UpdateQRText(text: string) {
  const qrText = document.querySelector<HTMLInputElement>('#qr-text')!;
  if (qrText.value !== text) {
    qrText.value = text;
  }
  queue.push(text);
  queueRender();
}

document.addEventListener('DOMContentLoaded', () => {
  const qrText = document.querySelector<HTMLInputElement>('#qr-text')!;
  qrText.addEventListener('keyup', () => UpdateQRText(qrText.value));
  window.addEventListener('resize', () => UpdateQRText(qrText.value));

  fetchIPAddress().then((ipAddress) => {
    UpdateQRText(`CLIENT_IP:${ipAddress}`);
  }).catch((err) => {
    UpdateQRText(err.message);
  });
});
