var Log = (function(){
  var log = [];

  function append(text) {
    log.push(text);
    if (log.length > 10) {
      log.shift();
    }
    var logEl = document.getElementById('log');
    if (logEl) {
      logEl.innerHTML = log.join('<br>');
    }
  }

  return { append: append };
})();
