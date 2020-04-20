import QRView from './QRView';

declare const fetchCheckIP: Promise<string>;

async function init(ipPromise: Promise<string>): Promise<void> {
  const contentDiv = document.querySelector('.content');
  if (contentDiv == null) {
    throw new Error('Content DIV does not exist.')
  }
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
