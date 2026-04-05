import QRView from './QRView';

function initQRView(text: string): void {
  const qrDiv = document.querySelector<HTMLDivElement>('#qr');
  if (qrDiv == null) {
    throw new Error('Content DIV does not exist.');
  }
  const view = new QRView(qrDiv);
  try {
    if (text) {
      view.updateInput(text);
    }
  } catch (err) {
    view.updateInput(String(err));
  }
}

function init() {
  if (
    location.host.endsWith('leonyu.net') &&
    location.pathname.startsWith('/qr.html')
  ) {
    void fetch('https://cloud.leonyu.net/boxing/', { method: 'HEAD' })
      .then((res) => res.headers.get('X-Request-IP') ?? '')
      .then((ipAddress) => {
        const text = `CLIENT_IP:${ipAddress}`;
        const url = new URL(location.href);
        url.searchParams.set('text', text);
        history.pushState({}, '', url);
        initQRView(text);
      });
  } else {
    initQRView('lorem ipsum');
  }
}

init();
