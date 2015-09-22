
var urls = [{
    name : 'Good',
    url: 'itms-apps://itunes.apple.com/us/app/bitly/id525106063'
  }, {
    name : 'PWC',
    url: 'pwc365://11.\tcontent-detail-page?id=138201&type=modular_article',
  }, {
    name : 'Bad',
    url: 'badlink://badlink',
}];

var techniques = [{
  name: 'iframe',
  impl: function (url) {
    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }
},{
  name: 'location',
  impl: function (url) {
    window.location = url;
  }
},{
  name: '<a href> click',
  impl: function (url) {
    window.location = url;
  }
}];

document.onload = function(){
  for (var i = 0; i < urls.length; i++) {
    var urlname = urls[i].name;
    var url = urls[i].url;
    for (var j = 0; j < techniques.length; j++) {
      var techname = techniques[j].name;
      var impl = techniques[j].impl;
      var aTag = document.createElement('a');
      aTag.href = '#';
      aTag.appendChild(document.createTextNode(urlname + ' ' + techname));
      document.body.appendChild(aTag);
      document.body.appendChild(document.createElemnent('br'));
    }
  }
};
