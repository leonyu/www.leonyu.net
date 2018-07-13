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
  }).then((json) => {
    return json.ip as string;
  });
}

function UpdateQR(text: string) {
  const qrCanvas = document.querySelector<HTMLCanvasElement>('#qr-code');
  if (text) {
    QRCode.toCanvas(qrCanvas, text, { color: { dark: '#222' }, width: 560 } as any);
  } else {
    QRCode.toCanvas(qrCanvas, [{ data: '', mode: 'alphanumeric' }], { color: { dark: '#222' }, width: 560 } as any);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const qrText = document.querySelector<HTMLInputElement>('#qr-text')!;

  qrText.addEventListener('keyup', () => {
    UpdateQR(qrText.value);
  });

  fetchIPAddress().then((ipAddress) => {
    qrText.value = `CLIENT_IP:${ipAddress}`;
    UpdateQR(qrText.value);
  }).catch((err) => {
    qrText.value = err.message;
    UpdateQR(qrText.value);
  });
});
