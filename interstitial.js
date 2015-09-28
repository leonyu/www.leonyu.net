var urls = [{
    name: 'iTunes',
    url: 'itms-appss://itunes.apple.com/us/app/bitly/id525106063'
}, {
    name: 'PWC',
    url: 'pwc365://11.\tcontent-detail-page?id=138201&type=modular_article',
}, {
    name: 'Bad Link',
    url: 'badlink://badlink',
}];

var techniques = [{
    name: 'iframe',
    impl: function(url) {
        var iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }
}, {
    name: 'iframe (async)',
    impl: function(url) {
        setTimeout(function() {
            var iframe = document.createElement('iframe');
            iframe.src = url;
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
        }, 20);
    }
}, {
    name: 'location',
    impl: function(url) {
        window.location = url;
    }
}, {
    name: 'location / reload',
    impl: function(url) {
        window.location = url;
        setTimeout(function() {
            window.location.reload();
        }, 500);
    }
}, {
    name: 'location (async)',
    impl: function(url) {
        setTimeout(function() {
            window.location = url;
        }, 20);
    }
}, {
    name: 'A[href] click',
    impl: function(url) {
        var aTag = document.createElement('a');
        aTag.href = url;
        aTag.style.display = 'none';
        document.body.appendChild(aTag);
        aTag.click();
    }
}, {
    name: 'A[href] click / reload',
    impl: function(url) {
        var aTag = document.createElement('a');
        aTag.href = url;
        aTag.style.display = 'none';
        document.body.appendChild(aTag);
        aTag.click();
        setTimeout(function() {
            window.location.reload();
        }, 500);
    }
}, {
    name: 'A[href] click (async)',
    impl: function(url) {
        setTimeout(function() {
            var aTag = document.createElement('a');
            aTag.href = url;
            aTag.style.display = 'none';
            document.body.appendChild(aTag);
            aTag.click();
        }, 20);
    }
}];

document.addEventListener('DOMContentLoaded', function() {
    urls.forEach(function(urlObj) {
        var urlname = urlObj.name;
        var url = urlObj.url;
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
            aTag.appendChild(document.createTextNode(urlname + ' >>> ' + techname));

            var pTag = document.createElement('p');
            pTag.appendChild(aTag);
            document.body.appendChild(pTag);
        })
    });
});
