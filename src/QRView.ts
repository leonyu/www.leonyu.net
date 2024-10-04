import { QRCodeSegment, toString } from 'qrcode';
import { debounce } from './AsyncUtils';

const EMPTY_QRCODE_SEGMENT: QRCodeSegment[] = [
  { data: '', mode: 'alphanumeric' },
];

export default class QRView {
  qrSvg: HTMLElement;
  qrText: HTMLInputElement;

  constructor(container: HTMLElement) {
    this.qrText = document.createElement('input');
    container.appendChild(this.qrText);
    this.qrSvg = document.createElement('div');
    container.appendChild(this.qrSvg);
    this.updateInput('');
    this.qrText.addEventListener(
      'input',
      debounce(() => {
        this.updateInput(this.qrText.value);
      }, 50),
    );
  }

  updateInput(text: string): void {
    this.updateTextBox(text);
    void this.updateQRCode(text);
  }

  private async updateQRCode(text: string): Promise<void> {
    this.qrSvg.innerHTML = await toString(text || EMPTY_QRCODE_SEGMENT, {
      type: 'svg',
      color: { dark: '#222' },
    });
  }

  private updateTextBox(text: string): void {
    if (this.qrText.value !== text) {
      this.qrText.value = text;
    }
  }
}
