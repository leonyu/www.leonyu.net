document.addEventListener("DOMContentLoaded", function() {
  var qrText = document.getElementById('qr-text');
  var qrCode = new QRious({
    element: document.getElementById('qr-code'),
    size: 560,
    foreground: '#222',
    value: ""
  });

  qrText.addEventListener('keyup', function() {
    qrCode.value = qrText.value;
  });

  fetch('https://boxing.leonyu.net/ip.json?=' + Date.now()).then(function(r) {
    if (r.ok) {
      return r.json();
    } else {
      throw ("" + r.status + " " + r.statusText);
    }
  })
    .then(function(json) {
      qrText.value = 'CLIENT_IP:' + json.ip;
      qrCode.value = qrText.value;
      })
    .catch(function(err) {
      console.error(err);
      qrText.value = err.message;
      qrCode.value = qrText.value;
    })
});
