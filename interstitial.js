var urls = [{
    name: 'iTunes',
    url: 'itms-appss://itunes.apple.com/us/app/bitly/id525106063'
}, {
    name: 'Twitter',
    url: 'twitter://user?screen_name=bitly'
}, {
    name: 'FB',
    url: 'fb://feed'
}, {
    name: 'PWC',
    url: 'pwc365://11.content-detail-page?id=138201&type=modular_article',
}, {
    name: 'Bad Link',
    url: 'badlink://badlink',
}, {
    name: 'mailto',
    url: 'mailto:?subject=test',
}];

var techniques = [{
    name: 'location',
    impl: function(url) {
        window.location = url;
    }
}, {
    name: 'eval location',
    impl: function(url) {
        eval('window.location = "' + url + '";');
    }
}, {
    name: 'iframe',
    impl: function(url) {
        var iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }
}, {
    name: 'iframe location',
    impl: function(url) {
        var iframe = document.createElement('iframe');
        iframe.src = 'about:blank';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        iframe.contentWindow.eval('window.location = "' + url + '";');
    }
}, {
    name: '<A> click',
    impl: function(url) {
        var aTag = document.createElement('a');
        aTag.href = url;
        aTag.style.display = 'none';
        document.body.appendChild(aTag);
        aTag.click();
    }
}];

var techniques = techniques.reduce(function(accum, techObj){
    accum.push(techObj);
    accum.push({
        name: techObj.name + ' (async)',
        impl: function(urlObj) {
            setTimeout(function(){
                techObj.impl(urlObj);
            }, 20);
        }
    });
    return accum;
}, []);

var techniques = techniques.reduce(function(accum, techObj){
    accum.push(techObj);
    accum.push({
        name: techObj.name + ' + ↻',
        impl: function(urlObj) {
            techObj.impl(urlObj);
            setTimeout(function(){
                    window.location.reload();
                }, 1000);
        }
    });
    return accum;
}, []);

document.addEventListener('DOMContentLoaded', function() {
    var colWidth = '' + Math.floor(100 / urls.length) + '%';
    urls.forEach(function(urlObj) {
        var urlname = urlObj.name;
        var url = urlObj.url;
        var divTag = document.createElement('div');
        divTag.style.float = 'left';
        divTag.style.width = colWidth;
        
        var h3Tag = document.createElement('h3');
        h3Tag.appendChild(document.createTextNode(urlname));
        divTag.appendChild(h3Tag);

        techniques.forEach(function(techObj) {
            var techname = techObj.name;
            var impl = techObj.impl;
            var aTag = document.createElement('a');
            aTag.href = '#';
            aTag.addEventListener('click', function(evt) {
                evt.preventDefault();
                setTimeout(function() {
                    impl(url);
                }, 100)
            });
            aTag.appendChild(document.createTextNode(techname));

            var pTag = document.createElement('p');
            pTag.appendChild(aTag);
            divTag.appendChild(pTag);
        });
        document.body.appendChild(divTag);
    });
});
