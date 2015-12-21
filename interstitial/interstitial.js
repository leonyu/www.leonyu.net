(function(){
  function getIframeKeys(callback) {
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.onload = function() {
      //Logger.log('iframe loaded');
      callback(iframe.contentWindow.navigator.userAgent, _.keys(iframe.contentWindow));
    };
    document.body.appendChild(iframe);
  }

  var conditions = {
    any: true,
    ios: /iPad|iPhone|iPod/.test(navigator.platform),
    android: navigator.userAgent.toLowerCase().indexOf('android') !== -1,
    android_chrome: (navigator.userAgent.toLowerCase().indexOf('android') !== -1) && ('chrome' in window),
  };

  document.addEventListener('DOMContentLoaded', function() {
      document.body.innerHTML = '<div id="log"></div>';
      if ('visibilityState' in document) {
        document.title = document.visibilityState;
        document.addEventListener("visibilitychange", function() {
          Logger.log('visibilitychange: ' + document.visibilityState);
          document.title = document.visibilityState;
        });
      }
      // window.addEventListener("focus", function() {
      //   Logger.log('focus: ' + (document.hasFocus ? document.hasFocus() : 'focus'));
      // });
      // window.addEventListener("blur", function() {
      //   Logger.log('blur: ' + (document.hasFocus ? document.hasFocus() : 'blur'));
      // });
      window.addEventListener("beforeunload", function() {
        Logger.log('beforeunload');
      });
      window.onerror = function(e) {
        Logger.log('window.onerror: ' + e + ', '+ e.name + ', ' + e.message);
      };
      if (window.chrome) {
          Logger.log('Chrome: ' + _.keys(window.chrome));
      }
      try {
    		if (window.webkit && window.webkit.messageHandlers) {
          Logger.log('WKWebView: ' + _.keys(window.webkit.messageHandlers));
    		}
    	} catch (e) {}
      if (window.Worker) {
        try {
          var worker = new Worker('interstitial_webworker.js');
          worker.onmessage = function(msg){
            if (msg.data !== window.navigator.userAgent) {
              Logger.log('WebWorker UA differ: ' + msg.data);
            }
          };
        } catch (error) {}
      }
      getIframeKeys(function(iframeUserAgent, iframeKeys){
        var KNOWN_GLOBALS = ['_', 'URL_DATA', 'TECHNIQUES', 'Log'];
        if (iframeUserAgent !== window.navigator.userAgent) {
          Logger.log('Iframe UA differ: ' + iframeUserAgent);
        }
        var diff = _.difference(_.keys(window), iframeKeys);
        diff = _.difference(diff, KNOWN_GLOBALS);
        if(diff.length !== 0)  {
          Logger.log('Globals: ' + diff);
        }
      });
      URL_DATA.forEach(function(urlObj) {
          var urlname = urlObj.name;
          var url = urlObj.url;
          if (!conditions[urlObj.condition]) {
            return;
          }
          var divTag = document.createElement('section');

          var h3Tag = document.createElement('h3');
          var h3Atag = document.createElement('a');
          h3Atag.innerText = urlname;
          h3Atag.href = url;
          h3Tag.appendChild(h3Atag);
          divTag.appendChild(h3Tag);

          TECHNIQUES.forEach(function(techObj) {
              var techname = techObj.name;
              var impl = techObj.impl;
              if (techObj.condition && !techObj.condition()) {
                return;
              }
              var aTag = document.createElement('a');
              aTag.href = url;
              aTag.addEventListener('click', function(evt) {
                  evt.preventDefault();
                  setTimeout(function(){
                    impl(window, url);
                  }, 20);
              });
              aTag.innerText = techname;

              var pTag = document.createElement('p');
              pTag.appendChild(aTag);
              divTag.appendChild(pTag);


              var techname = techObj.name;
              var impl = techObj.impl;
              var aTag = document.createElement('a');
              aTag.href = url;
              aTag.addEventListener('click', function(evt) {
                  evt.preventDefault();

                  setTimeout(function(){
                    var iframe = document.createElement('iframe');
                    iframe.src = 'about:blank';
                    document.body.appendChild(iframe);

                    impl(iframe.contentWindow, url);
                  }, 20);
              });
              aTag.innerText = techname + ' (iframed)';

              var pTag = document.createElement('p');
              pTag.appendChild(aTag);
              divTag.appendChild(pTag);


          });
          document.body.appendChild(divTag);
      });
  });
})();
