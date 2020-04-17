import QRView from './QRView';

declare const fetchCheckIP: Promise<string>;

function init(ipPromise: Promise<string>) {
  const view = new QRView();
  ipPromise.then((ipAddress) => {
    view.updateInput(`CLIENT_IP:${ipAddress}`);
  }).catch((err) => {
    view.updateInput(`${err}`);
  });
}

document.addEventListener('DOMContentLoaded', () => init(fetchCheckIP));
