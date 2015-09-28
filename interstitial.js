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
        var doc = window.document;
        var iframe = doc.createElement('iframe');
        iframe.src = url;
        iframe.style.display = 'none';
        doc.body.appendChild(iframe);
    }
}, {
    name: '<a> click',
    impl: function(window, url) {
        var doc = window.document;
        var aTag = doc.createElement('a');
        aTag.href = url;
        aTag.style.display = 'none';
        doc.body.appendChild(aTag);
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
        name: techObj.name + ' ↻',
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
    var colWidth = '200px';
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
                    impl(top, url);
                }, 100)
            });
            aTag.appendChild(document.createTextNode(techname));

            var pTag = document.createElement('p');
            pTag.appendChild(aTag);
            divTag.appendChild(pTag);


            var techname = techObj.name;
            var impl = techObj.impl;
            var aTag = document.createElement('a');
            aTag.href = '#';
            aTag.addEventListener('click', function(evt) {
                evt.preventDefault();
                setTimeout(function() {
                    impl(window, url);
                }, 100)
            });
            aTag.appendChild(document.createTextNode(techname + ' iframe'));

            var pTag = document.createElement('p');
            pTag.appendChild(aTag);
            divTag.appendChild(pTag);


        });
        document.body.appendChild(divTag);
    });
});
