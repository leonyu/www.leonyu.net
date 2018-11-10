import "core-js/es6/promise";
import "whatwg-fetch";

import * as QRCode from "qrcode";

async function fetchIPAddress(): Promise<void> {
  const res = await fetch(`https://boxing.leonyu.net/ip.json`, { cache: "no-cache" });
  if (!res.ok) {
    throw Error(`${res.status} ${res.statusText}`);
  }
  return (await res.json()).ip;
}

const queue: string[] = [];

async function queueRender(): Promise<void> {
  if (queue.length === 0) {
    return;
  }
  const text = `${queue.shift()}`;

  const qrSvgContainer = document.querySelector<HTMLDivElement>("#qr-code")!;
  const options: QRCode.QRCodeToStringOptions = { type: "svg", color: { dark: "#222" } };

  const svgMarkup = text ?
    await QRCode.toString(text, options) :
    await QRCode.toString([{ data: text, mode: "alphanumeric" }], options);
  if (svgMarkup) {
    qrSvgContainer.innerHTML = svgMarkup;
  } else {
    console.error(`Unable to generate QRCode for "${text}"`);
  }
  setTimeout(queueRender, 50);
}

function UpdateQRText(text: string): void {
  const qrText = document.querySelector<HTMLInputElement>("#qr-text")!;
  if (qrText.value !== text) {
    qrText.value = text;
  }
  queue.push(text);
  queueRender();
}

document.addEventListener("DOMContentLoaded", () => {
  const qrText = document.querySelector<HTMLInputElement>("#qr-text")!;
  qrText.addEventListener("keyup", () => UpdateQRText(qrText.value));

  fetchIPAddress().then((ipAddress) => {
    UpdateQRText(`CLIENT_IP:${ipAddress}`);
  }).catch((err) => {
    UpdateQRText(err.message);
  });
});
