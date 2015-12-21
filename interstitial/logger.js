var Logger = (function(){
  var logArray = [];

  function logTo(logEl) {
    if (logEl && 'innerHTML' in logEl) {
      logEl.innerHTML = logArray.join('<br>');
    }
  }

  function log(text) {
    logArray.push('' + text);
    if (logArray.length > 6) {
      logArray.shift();
    }
    var logEl = document.getElementById('log');
    logTo(logEl);
  }

  return {
    log: log,
    logTo: logTo
  };
})();
