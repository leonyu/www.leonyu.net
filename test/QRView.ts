import { TextEncoder } from 'node:util';
globalThis.TextEncoder ??= TextEncoder;

import { describe, afterEach, it, expect } from '@jest/globals'

import QRView from '../src/QRView'

describe('QRView', () => {
    let div: HTMLDivElement;

    it('should render correct HTML', () => {
        div = document.createElement('div');
        document.body.appendChild(div);
        const qrView = new QRView(div);
        expect(div.outerHTML).toMatchSnapshot();
        qrView.updateInput('hello world');
        expect(div.outerHTML).toMatchSnapshot();
    });

    afterEach(() => {
        div?.parentElement?.removeChild(div);
    })
});