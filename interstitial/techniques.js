var TECHNIQUES = (function(){
  function logRAF(win) {
    var raf = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var iraf = 0;
    function rafLoop(start) {
      win.requestAnimationFrame(function(){
        var end = Date.now();
        raf[iraf] = end - start;
        iraf++;
        if (iraf < 10) {
          rafLoop(Date.now());
        } else {
          Logger.log(raf);
        }
      });
    }
    rafLoop(Date.now());
  }

  var techniques = [{
      name: 'location',
      impl: function(win, url) {
        logRAF(win);
        win.location = url;
      }
  }, {
  //     name: 'eval location',
  //     impl: function(win, url) {
  //         win.eval('win.location = "' + url + '";');
  //     }
  // }, {
      name: 'iframe.src',
      impl: function(win, url) {
          var doc = win.document;
          var iframe = doc.createElement('iframe');
          iframe.src = url;
          iframe.style.display = 'none';
          logRAF(win);
          doc.body.appendChild(iframe);
      }
  }, {
/*      name: 'img.src',
      impl: function(win, url) {
          var doc = win.document;
          var img = doc.createElement('img');
          img.src = url;
          img.style.display = 'none';
          doc.body.appendChild(img);
      }
  }, {
      name: 'body.backgroundImage',
      impl: function(win, url) {
          var doc = win.document;
          doc.body.style.backgroundImage = "url('"+ url +"')";
      }
  }, {*/
      name: '<a> click',
      impl: function(win, url) {
          var doc = win.document;
          var aTag = doc.createElement('a');
          aTag.href = url;
          aTag.style.display = 'none';
          doc.body.appendChild(aTag);
          logRAF(win);
          aTag.click();
      }
  }, {
    name: '<a target=_top> click',
    impl: function(win, url) {
        var doc = win.document;
        var aTag = doc.createElement('a');
        aTag.href = url;
        aTag.target = '_top';
        aTag.style.display = 'none';
        doc.body.appendChild(aTag);
        logRAF(win);
        aTag.click();
    }
}, {
      name: 'win.open',
      impl: function(win, url) {
        win.open(url);
      }
  }, {
      name: 'win.open _self',
      impl: function(win, url) {
        win.open(url, '_self');
      }
  }, {
      name: 'win.open + itms',
      impl: function(win, url) {
        var popup = win.open(url);
        if (popup) {
          setTimeout(function(){
            if (popup) {
              Logger.log('popup.location: ' + popup.window.location);
              Logger.logTo(popup.window.document.body);
              popup.window.location = 'itms-appss://itunes.apple.com/us/app/bitly/id525106063';
            }
          }, 50);
        }
      }
  }, {
    name: 'win.open + about',
    impl: function(win, url) {
      var popup = win.open(url);
      if (popup) {
        setTimeout(function(){
          if (popup) {
            Logger.log('popup.location: ' + popup.window.location);
            Logger.logTo(popup.window.document.body);
            popup.window.location = 'about:blank';
          }
        }, 50);
        var start = Date.now();
        setTimeout(function(){
          Logger.log('popup: ' + (Date.now() - start)+ ' ' + (popup && popup.window));
        }, 100);
        setTimeout(function(){
          Logger.log('popup: ' + (Date.now() - start)+ ' ' + (popup && popup.window));
        }, 200);
        setTimeout(function(){
          Logger.log('popup: ' + (Date.now() - start)+ ' ' + (popup && popup.window));
        }, 300);
        setTimeout(function(){
          Logger.log('popup: ' + (Date.now() - start)+ ' ' + (popup && popup.window));
        }, 400);
        setTimeout(function(){
          Logger.log('popup: ' + (Date.now() - start)+ ' ' + (popup && popup.window));
        }, 500);
      }
    }
  }, {
    name: 'win.open(js) + data-uri(pm)',
    impl: function(win, url) {
      var popup;
      var isInstalled = true;
      win.onmessage = function (m) {
        if (m.data == 'not_installed') {
          isInstalled = false;
        }
      };
      win.document.addEventListener('visibilitychange', function(){
        var launchTimer;
        if (win.document.visibilityState === 'visible') { // multiple fires
          clearTimeout(launchTimer);
          launchTimer = setTimeout(function(){
            Logger.log('isInstalled: ' + isInstalled);
            if (isInstalled) {
              window.location = url;
            }
          }, 50);
        }
      });
      origin = win.top.location.href;
      var dataUri = "data:text/html,<script>if(opener){opener.postMessage('msg','{{origin}}');setTimeout(function(){opener.postMessage('not_installed','{{origin}}');close()},1000)}</script>".replace(/\{\{origin\}\}/g, origin);
      popup = win.open('javascript:location="{{url}}";last=Date.now();setInterval(function(){now=Date.now();if(now-last>75){last=now;return};location="{{dataUri}}"},50)'.replace(/\{\{url\}\}/g, url).replace(/\{\{dataUri\}\}/g, dataUri));
    },
  }, {
    name: 'win.open + open + open',
    impl: function(win, url) {
      var popup = win.open(url, 'named');
      if (popup) {
        setTimeout(function(){
          win.open('about:blank', 'named');
        }, 50);
        setTimeout(function(){
          win.open('itms-appss://itunes.apple.com/us/app/bitly/id525106063', 'named');
        }, 200);
      }
    },
  }, {
      name: 'XHR',
      impl: function(win, url) {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
          try {
            logRAF(win);
            xhr.send(null);
          } catch (e) {
            Logger.log('XHR Error: ' + e.name + ', ' + e.message);
          }
      }
  }, {
      name: 'nav.sendBeacon',
      impl: function(win, url) {
          logRAF(win);
          win.navigator.sendBeacon(url, null);
      },
      condition: function() {
          return !!window.navigator.sendBeacon;
      }
  }];

  techniques = techniques.reduce(function(accum, techObj){
      accum.push(techObj);
      accum.push({
          name: techObj.name + ' (async)',
          impl: function(win, urlObj) {
              win.setTimeout(function(){
                  techObj.impl(win, urlObj);
              }, 500);
          },
          condition: techObj.condition,
      });
      return accum;
  }, []);

  if (/iPad|iPhone|iPod/.test(navigator.platform) && navigator.userAgent.indexOf('OS 9') !== -1) {
    techniques = techniques.reduce(function(accum, techObj){
        accum.push(techObj);
        accum.push({
            name: techObj.name + ' ↻',
            impl: function(win, urlObj) {
                techObj.impl(win, urlObj);
                win.setTimeout(function(){
                    win.location.reload();
                }, 2000);
            },
            condition: techObj.condition,
        });

        return accum;
    }, []);
  }

  // techniques = techniques.reduce(function(accum, techObj){
  //     accum.push(techObj);
  //     accum.push({
  //         name: techObj.name + ' (popup)',
  //         impl: function(win, urlObj) {
  //             var popup = win.open('', '_blank');
  //             win.setTimeout(function(){
  //               techObj.impl(popup, urlObj);
  //             }, 50);
  //         },
  //         condition: techObj.condition,
  //     });
  //     return accum;
  // }, []);

  techniques = techniques.reduce(function(accum, techObj){
      accum.push(techObj);
      accum.push({
          name: techObj.name + ' (iframe)',
          impl: function(win, urlObj) {
            var iframe = document.createElement('iframe');
            iframe.src = 'about:blank';
            document.body.appendChild(iframe);

            techObj.impl(iframe.contentWindow, urlObj);
          },
          condition: techObj.condition,
      });
      return accum;
  }, []);

  return techniques;
})();
