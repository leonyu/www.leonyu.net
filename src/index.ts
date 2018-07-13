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

function UpdateQRText(text: string) {
  const qrText = document.querySelector<HTMLInputElement>('#qr-text')!;
  const qrCanvas = document.querySelector<HTMLCanvasElement>('#qr-code')!;

  const computedWidth = window.getComputedStyle(qrText).width;
  const width = computedWidth ? parseInt(computedWidth, 10) : 560;
  if (qrText.value !== text) {
    qrText.value = text;
  }
  if (text) {
    QRCode.toCanvas(qrCanvas, text, { color: { dark: '#222' }, width } as any);
  } else {
    QRCode.toCanvas(qrCanvas, [{ data: '', mode: 'alphanumeric' }], { color: { dark: '#222' }, width } as any);
  }
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
