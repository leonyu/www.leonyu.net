
import * as QRCode from 'qrcode';
import { debounce } from './AsyncUtils';

export default class QRView {
  qrSvgContainer: HTMLElement;
  qrText: HTMLInputElement;

  constructor(container: HTMLElement = document.body) {
    this.qrText = document.createElement('input');
    container.appendChild(this.qrText);
    this.qrSvgContainer = document.createElement('div');
    container.appendChild(this.qrSvgContainer);
    this.updateInput('');
    this.qrText.addEventListener('input', debounce(() => this.updateInput(this.qrText.value), 50));
  }

  updateInput(text: string): void {
    this.updateTextBox(text);
    this.updateQRCode(text);
  }

  private updateQRCode(text: string): Promise<void> {
    if (!text) {
      return Promise.resolve();
    }
    const options: QRCode.QRCodeToStringOptions = { type: 'svg', color: { dark: '#222' } };

    return QRCode.toString(text, options)
    .then((svgMarkup) => {
      if (this.qrSvgContainer) {
        this.qrSvgContainer.innerHTML = svgMarkup;
      }
    }).catch((error) => console.error(`Unable to generate QRCode for "${text}": ${error}`));
  }

  private updateTextBox(text: string): void {
    const qrText = document.querySelector<HTMLInputElement>('#qr-text');
    if (qrText && qrText.value !== text) {
      qrText.value = text;
    }
  }
}
