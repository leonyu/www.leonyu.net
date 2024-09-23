import QRView from './QRView';

function init(ipAddress: string): void {
  const qrDiv = document.querySelector<HTMLDivElement>('#qr');
  if (qrDiv == null) {
    throw new Error('Content DIV does not exist.');
  }
  const view = new QRView(qrDiv);
  try {
    if (ipAddress) {
      view.updateInput(`CLIENT_IP:${ipAddress}`);
    }
  } catch (err) {
    view.updateInput(String(err));
  }
}

void fetch('https://cloud.leonyu.net/boxing/', { method: 'HEAD' })
  .then((res) => res.headers.get('X-Request-IP') ?? '')
  .then((ipAddress) => {
    init(ipAddress);
  });
