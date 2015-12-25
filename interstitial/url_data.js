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
    name: 'Intent (Store & Web fallback)',
    url: 'intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;S.browser_fallback_url=http%3A%2F%2Fzxing.org;end',
    condition: 'android_chrome',
}, {
    name: 'Intent (Store fallback)',
    url: 'intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;end',
    condition: 'android_chrome',
}, {
    name: 'Intent (Web fallback)',
    url: 'intent://scan/#Intent;scheme=zxing;S.browser_fallback_url=http%3A%2F%2Fzxing.org;end',
    condition: 'android_chrome',
}, {
}, {
    name: 'Intent (No fallback)',
    url: 'intent://scan/#Intent;scheme=zxing;end',
    condition: 'android_chrome',
}, {
//     name: 'Intent (malformed)',
//     url: 'intent://scan/#hifad#!/sfsafsdafa#Intent;scheme=zxing;package=com.google.zxing.client.android;S.browser_fallback_url=http%3A%2F%2Fzxing.org;end',
//     condition: 'android_chrome',
// }, {
    name: 'App Index (FB)',
    url: 'android-app://com.facebook.katana/fb/page/111454522278222/',
    condition: 'android',
}, {
//     name: 'App Index (Chrome)',
//     url: 'android-app://com.android.chrome/http/www.yahoo.com/',
//     condition: 'android',
// }, {
    name: 'App Index (Bad ID)',
    url: 'android-app://fasdfsdfasf/http/www.yahoo.com/',
    condition: 'android',
}, {
    name: 'App Index (iOS)',
    url: 'ios-app://525106063/http/www.bitly.com/',
    condition: 'ios',
}, {
    name: 'Bad Link',
    url: 'badlink://badlink',
    condition: 'any',
}, {
    name: 'iTunes',
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
