var URL_DATA = [{
    name: 'Twitter',
    url: 'twitter://user?screen_name=bitly',
    condition: 'any',
}, {
    name: 'FB',
    url: 'fb://profile/111454522278222',
    condition: 'any',
}, {
    name: 'PWC',
    url: 'pwc365://11.content-detail-page?id=138201&type=modular_article',
    condition: 'ios',
}, {
    name: 'Amazon',
    url: 'com.amazon.mobile.shopping://amazon.com/deals?tag=tsa030-20&ascsubtag=ptw-NUL-1-5-1448846263526PE&ref_=ptw_NUL_1_5_1448846263526PE',
    condition: 'any',
}, {
    name: 'Intent',
    url: 'intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;S.browser_fallback_url=http%3A%2F%2Fzxing.org;end',
    condition: 'android_chrome',
}, {
    name: 'Intent with hash',
    url: 'intent://scan/#hifad#!/sfsafsdafa#Intent;scheme=zxing;package=com.google.zxing.client.android;S.browser_fallback_url=http%3A%2F%2Fzxing.org;end',
    condition: 'android_chrome',
}, {
    name: 'App Index',
    url: 'android-app://com.facebook.katana/fb/page/111454522278222/',
    condition: 'android',
}, {
    name: 'App Index Chrome',
    url: 'android-app://com.android.chrome/http/www.yahoo.com/',
    condition: 'android',
}, {
    name: 'App Index Bad ID',
    url: 'android-app://fasdfsdfasf/http/www.yahoo.com/',
    condition: 'android',
}, {
    name: 'Google App Index (iOS)',
    url: 'ios-app://25106063/http/www.bitly.com/',
    condition: 'ios',
}, {
    name: 'Bad Link',
    url: 'badlink://badlink',
    condition: 'any',
}, {
    name: 'iTunes\n(whitelisted)',
    url: 'itms-appss://itunes.apple.com/us/app/bitly/id525106063',
    condition: 'ios',
}, {
    name: 'Play Store',
    url: 'market://details?id=com.android.chrome',
    condition: 'android',
}, {
    name: 'mailto',
    url: 'mailto:?subject=test',
    condition: 'any',
}];
