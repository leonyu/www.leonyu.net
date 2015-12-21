(function(){
  function getIframeKeys(callback) {
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.onload = function() {
      // console.log('iframe loaded');
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
      if ('visibilityState' in document) {
        document.body.className = document.visibilityState;
        document.title = document.visibilityState;
        document.addEventListener("visibilitychange", function() {
          document.body.className = document.visibilityState;
        });
      }

      document.body.innerHTML = '';
      if (window.chrome) {
      	document.body.innerHTML += '<div>Chrome: ' + _.keys(window.chrome) + '</div>';
      }
      try {
    		if (window.webkit && window.webkit.messageHandlers) {
    			document.body.innerHTML += '<div>WKWebView: ' + _.keys(window.webkit.messageHandlers) + '</div>';
    		}
    	} catch (e) {}
      if (window.Worker) {
        try {
          var worker = new Worker('interstitial_webworker.js');
          worker.onmessage = function(msg){
            if (msg.data !== window.navigator.userAgent) {
              document.getElementById('worker').innerHTML += '<div>WebWorker UA differ: ' + msg.data + '</div>';
            }
          };
          document.body.innerHTML += '<div id="worker"><div>';
        } catch (error) {}
      }
      document.body.innerHTML += '<div id="pollution"><div>';
      getIframeKeys(function(iframeUserAgent, iframeKeys){
        var KNOWN_GLOBALS = ['_', 'URL_DATA', 'TECHNIQUES'];
        if (iframeUserAgent !== window.navigator.userAgent) {
          document.getElementById('pollution').innerHTML += '<div>Iframe UA differ: ' + iframeUserAgent + '</div>';
        }
        var diff = _.difference(_.keys(window), iframeKeys);
        diff = _.difference(diff, KNOWN_GLOBALS);
        if(diff.length !== 0)  {
          document.getElementById('pollution').innerHTML += '<div>Globals: ' + diff + '</div>';
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
