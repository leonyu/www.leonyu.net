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
        var p = win.open(url);
        var intervalId = win.setInterval(function(){
          if (p) {
            p.close();
            if (!p) {
              alert('closed');
            }
          }
          else {
            win.clearInterval(intervalId);
          }
        }, 2000);
      }
  }, {
      name: 'win.open + append',
      impl: function(win, url) {
        var popup = win.open(url);
        if (popup) {
          setInterval(function(){
            popup.document.body.innerHTML += 'hihi';
          }, 500);
        }
      }
  }, {
      name: 'XHR',
      impl: function(win, url) {
          var xhr = new XMLHttpRequest();
          xhr.open('POST', url, true);
          //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
          xhr.send(null);
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
          }
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
            }
        });

        return accum;
    }, []);
  }

  return techniques;
})();
