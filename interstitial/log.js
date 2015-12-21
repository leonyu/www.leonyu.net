var Log = (function(){
  var log = [];

  function logTo(logEl) {
    if (logEl && 'innerHTML' in logEl) {
      logEl.innerHTML = log.join('<br>');
    }
  }

  function append(text) {
    log.push('' + text);
    if (log.length > 6) {
      log.shift();
    }
    var logEl = document.getElementById('log');
    logTo(logEl);
  }

  return {
    append: append,
    logTo: logTo
  };
})();
