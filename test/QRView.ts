import { TextEncoder } from 'node:util';

import { describe, afterEach, it, expect, beforeAll } from '@jest/globals';

import QRView from '../src/QRView';

describe('QRView', () => {
  beforeAll(() => {
    (globalThis as unknown as { TextEncoder?: typeof TextEncoder }).TextEncoder ??= TextEncoder;
  });

  let div: HTMLDivElement;

  it('should render correct HTML', () => {
    div = document.createElement('div');
    document.body.appendChild(div);
    const qrView = new QRView(div);
    expect(div).toMatchSnapshot();
    qrView.updateInput('hello world');
    expect(div).toMatchSnapshot();
  });

  afterEach(() => {
    div.remove();
  });
});
