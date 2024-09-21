import QRView from './QRView';

declare const fetchCheckIP: Promise<string>;

async function init(ipPromise: Promise<string>): Promise<void> {
  const qrDiv = document.querySelector<HTMLDivElement>('#qr');
  if (qrDiv == null) {
    throw new Error('Content DIV does not exist.')
  }
  const view = new QRView(qrDiv);
  try {
    const ipAddress = await ipPromise;
    if (ipAddress) {
      view.updateInput(`CLIENT_IP:${ipAddress}`);
    }
  } catch (err) {
    view.updateInput(String(err));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  void init(fetchCheckIP);
});
