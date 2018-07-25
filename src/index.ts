import 'core-js/es6/promise';
import 'whatwg-fetch';

import * as QRCode from 'qrcode';

async function fetchIPAddress(): Promise<void> {
  const res = await fetch(`https://boxing.leonyu.net/ip.json`, { cache: 'no-cache' });
  if (!res.ok) {
    throw Error(`${res.status} ${res.statusText}`);
  }
  return (await res.json()).ip;
}

const queue: string[] = [];

async function queueRender(): Promise<void> {
  const text = queue.shift();
  if (typeof text !== 'string') {
    return;
  }

  const qrImage = document.querySelector<HTMLImageElement>('#qr-code')!;
  const options = { color: { dark: '#222' }, width: 560 };

  const dataUri = text ?
    await QRCode.toDataURL(text, options) :
    await QRCode.toDataURL([{ data: text, mode: 'alphanumeric' }], options);
  if (dataUri) {
    qrImage.src = dataUri;
  } else {
    console.error(`Unable to generate QRCode for "${text}"`);
  }
  setTimeout(queueRender, 50);
}

function UpdateQRText(text: string): void {
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

  fetchIPAddress().then((ipAddress) => {
    UpdateQRText(`CLIENT_IP:${ipAddress}`);
  }).catch((err) => {
    UpdateQRText(err.message);
  });
});
