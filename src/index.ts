import QRView from './QRView';

declare const fetchCheckIP: Promise<string>;

async function init(ipPromise: Promise<string>) {
  const view = new QRView();
  try {
    const ipAddress = await ipPromise;
    if (ipAddress) {
      view.updateInput(`CLIENT_IP:${ipAddress}`);
    }
  } catch (err) {
    view.updateInput(`${err}`);
  }
}

document.addEventListener('DOMContentLoaded', () => init(fetchCheckIP));
