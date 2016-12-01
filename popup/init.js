var serverUrl, pingUrl, songUrl, volumeUrl;
// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';
// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
// Chrome 1+
var isChrome = !!window.chrome;

function init(result) {
    initGlobalVars(result);
    initExtension(result);
}

function initGlobalVars(result) {
    serverUrl =  result.serverUrl ? result.serverUrl.replace(/\/+$/, '') : '';
    pingUrl = serverUrl + '/api/ping';
    songUrl = serverUrl + '/api/playing';
    volumeUrl = serverUrl + '/api/volume';
}

function initExtension(result) {
    setServerUrlInput(result.serverUrl);
    appTestServer(displaySettingsError);
    getCurrentSong(displayProcessing, displayCurrentSong);
}

function setServerUrlInput(serverUrl) {
    document.getElementById('server-url').value = serverUrl || '';
}

function onError(error) {
    console.log('Error: '+ error);
}

document.addEventListener('DOMContentLoaded', function() {
    if (isChrome) {
        chrome.storage.local.get('serverUrl', init);
    } else if (isFirefox) {
        var getting = browser.storage.local.get('serverUrl');
        getting.then(init, onError);
    }
});
