import * as QRCode from 'qrcode';
import { debounce } from './AsyncUtils';

function init() {
  const qrText = document.querySelector<HTMLInputElement>('#qr-text')!;
  qrText.addEventListener('keyup', debounce(() => updateQRCode(qrText.value), 50));

  fetchIPAddress().then((ipAddress) => {
    const text = `CLIENT_IP:${ipAddress}`;
    updateTextBox(text);
    updateQRCode(text);
  }).catch((err) => {
    const text = `${err}`;
    updateTextBox(text);
    updateQRCode(text);
  });
}

function fetchIPAddress(): Promise<void> {
  return fetch(`https://boxing.leonyu.net/ip.json`, { cache: 'no-cache' })
  .then((res) => res.json())
  .then((json) => json.ip);
}

function updateQRCode(text: string): Promise<void> {
  const options: QRCode.QRCodeToStringOptions = { type: 'svg', color: { dark: '#222' } };

  return QRCode.toString(text, options)
  .then((svgMarkup) => {
    const qrSvgContainer = document.querySelector('#qr-code');
    if (qrSvgContainer) {
      qrSvgContainer.innerHTML = svgMarkup;
    }
  }).catch((error) => console.error(`Unable to generate QRCode for "${text}": ${error}`));
}

function updateTextBox(text: string): void {
  const qrText = document.querySelector<HTMLInputElement>('#qr-text');
  if (qrText) {
    qrText.value = text;
  }
}

document.addEventListener('DOMContentLoaded', init);
