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
    name: 'location',
    impl: function(url) {
        window.location = url;
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
}];

var asyncTechniques = techniques.map(function(techObj){
    return {
        name: techObj.name + ' (async)',
        impl: function(urlObj) {
            setTimeout(function(){
                techObj.impl(urlObj);
            }, 20);
        }
    };
});
techniques.push.apply(techniques, asyncTechniques);

var reloadTechniques = techniques.map(function(techObj){
    return {
        name: techObj.name + ' / reload',
        impl: function(urlObj) {
            techObj.impl(urlObj);
            setTimeout(function(){
                    window.location.reload();
                }, 1000);
        }
    };
});
techniques.push.apply(techniques, reloadTechniques);

document.addEventListener('DOMContentLoaded', function() {
    urls.forEach(function(urlObj) {
        var urlname = urlObj.name;
        var url = urlObj.url;
        var divTag = document.createElement('div');
        divTag.style.float = 'left';
        divTag.style.width = '30%';
        
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
