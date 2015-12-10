(function(){
  function getIframeKeys(callback) {
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.onload = function() {
      callback(Object.keys(iframe.contentWindow));
    };
  }

  var urls = [{
      name: 'Twitter',
      url: 'twitter://user?screen_name=bitly'
  }, {
      name: 'FB',
      url: 'fb://feed'
  }, {
      name: 'PWC',
      url: 'pwc365://11.content-detail-page?id=138201&type=modular_article',
  }, {
      name: 'Intent',
      url: 'intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;S.browser_fallback_url=http%3A%2F%2Fzxing.org;end',
  }, {
      name: 'App Index',
      url: 'android-app://com.facebook.katana/fb/page/111454522278222/',
  }, {
      name: 'App Index Chrome',
      url: 'android-app://com.android.chrome/http/www.yahoo.com/',
  }, {
      name: 'App Index Bad',
      url: 'ios-app://25106063/http/www.bitly.com/',
  }, {
      name: 'Bad Link',
      url: 'badlink://badlink',
  }, {
      name: 'iTunes\n(whitelisted)',
      url: 'itms-appss://itunes.apple.com/us/app/bitly/id525106063'
  }, {
      name: 'mailto\n(whitelisted)',
      url: 'mailto:?subject=test',
  }];

  var techniques = [{
      name: 'location',
      impl: function(win, url) {
          win.location = url;
      }
  }, {
  //     name: 'eval location',
  //     impl: function(win, url) {
  //         win.eval('window.location = "' + url + '";');
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
      name: 'img.src',
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
  }, {
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
      name: 'XHR',
      impl: function(win, url) {
          var xhr = new XMLHttpRequest();
          xhr.open('POST', url, true);
          //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
          xhr.send(null);
      }
  }, {
      name: 'navigator.sendBeacon',
      impl: function(win, url) {
          win.navigator.sendBeacon(url, null);
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

  document.addEventListener('DOMContentLoaded', function() {

      document.body.innerHTML = '';
      if (window.chrome) {
      	document.body.innerHTML += Object.keys(window.chrome);
      }
      document.body.innerHTML += '<div id="pollution"><div>';
      getIframeKeys(function(iframeKeys){
        var diff = _.difference(Object.keys(window), iframeKeys);
        if(diff.length > 0)  {
          document.getElementById('pollution').innerHTML += diff;
        }  
      })
      var colWidth = '200px';
      urls.forEach(function(urlObj) {
          var urlname = urlObj.name;
          var url = urlObj.url;
          var divTag = document.createElement('div');
          divTag.style.cssFloat = 'left';
          divTag.style.width = colWidth;
          
          var h3Tag = document.createElement('h3');
          var h3Atag = document.createElement('a');
          h3Atag.innerText = urlname;
          h3Atag.href = url;
          h3Tag.appendChild(h3Atag);
          divTag.appendChild(h3Tag);

          techniques.forEach(function(techObj) {
              var techname = techObj.name;
              var impl = techObj.impl;
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
                    iframe.style.display = 'none';
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
  	try {
  		if (window.webkit && window.webkit.messageHandlers) {
  			document.body.append(document.createTextNode(JSON.stringify(Object.keys(window.webkit.messageHandlers))));
  		}
  	} catch (e) {}
  });
})();
