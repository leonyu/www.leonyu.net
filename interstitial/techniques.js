var TECHNIQUES = (function(){
  var techniques = [{
      name: 'location',
      impl: function(win, url) {
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
          aTag.click();
      }
  }, {
      name: 'win.open',
      impl: function(win, url) {
        win.open(url);
      }
  }, {
      name: 'win.open + close',
      impl: function(win, url) {
        var popup = win.open(url);
        var intervalId = win.setInterval(function(){
          if (popup && popup.window) {
            Log.append('popup.location: ' + popup.window.location);
            Log.logTo(popup.window.document.body);
            popup.close();
            if (!popup) {
              alert('closed');
            }
          }
          else {
            win.clearInterval(intervalId);
          }
        }, 2000);
      }
  }, {
      name: 'win.open + itms3',
      impl: function(win, url) {
        var popup = win.open(url);
        if (popup) {
          setTimeout(function(){
            if (popup) {
              Log.append('popup.location: ' + popup.window.location);
              Log.logTo(popup.window.document.body);
              popup.window.location = 'itms-appss://itunes.apple.com/us/app/bitly/id525106063';
            }
          }, 100);
        }
      }
  }, {
    name: 'win.open + about',
    impl: function(win, url) {
      var popup = win.open(url);
      if (popup) {
        setTimeout(function(){
          if (popup) {
            Log.append('popup.location: ' + popup.window.location);
            Log.logTo(popup.window.document.body);
            popup.window.location = 'about:blank';
          }
        }, 100);
      }
    }
  }, {
    name: 'win.open + html',
    impl: function(win, url) {
      var popup = win.open(url);
      if (popup) {
        setTimeout(function(){
          if (popup) {
            Log.append('popup.location: ' + popup.window.location);
            Log.logTo(popup.window.document.body);
            popup.window.location = 'https://bitly.com';
          }
        }, 100);
      }
    }
}, {
      name: 'XHR',
      impl: function(win, url) {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
          try {
            xhr.send(null);
          } catch (e) {
            Log.append('XHR Error: ' + e.name + ', ' + e.message);
          }
      }
  }, {
      name: 'nav.sendBeacon',
      impl: function(win, url) {
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

  return techniques;
})();
