function callApi(url, method, paramBody, callback, callbackError) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onload = function() {
      if (this.status == 200) {
          var data = JSON.parse(this.responseText);
          callback(data);
      } else {
        if (callbackError) callbackError();
      }
  };
  xmlhttp.onerror = callbackError;
  xmlhttp.open(method, url, true);
  xmlhttp.setRequestHeader('Content-Type', 'application/json');
  var data = '';
  if (paramBody) { data = JSON.stringify(paramBody); }
  xmlhttp.send();
}

function userTestServer(url, callback, callbackError) {
  var cleanUrl = url.replace(/\/+$/, '');
  var userPingUrl = cleanUrl+'/api/ping';
  callApi(userPingUrl, 'GET', null, callback.bind(null, cleanUrl), callbackError)
}

function appTestServer(callback) {
  callApi(pingUrl, 'GET', null, callback.bind(null, 'ok'), callback.bind(null, 'nok'))
}

function getCurrentSong(callbackStart, callbackEnd) {
  callbackStart();
  callApi(songUrl, 'GET', null, callbackEnd);
}

function changeVolume(callbackEnd, volumeValue) {
  callApi(volumeUrl, 'PUT', { volume: parseInt(volumeValue, 10) }, callbackEnd);
}

function playSong(callbackStart, callbackEnd) {
  callbackStart();
  callApi(songUrl, 'PUT', null, callbackEnd);
}

function backSong(callbackStart, callbackEnd) {
  callbackStart();
  callApi(songUrl, 'POST', { action: 'back' }, callbackEnd);
}

function nextSong(callbackStart, callbackEnd) {
  callbackStart();
  callApi(songUrl, 'POST', { action: 'next' }, callbackEnd);
}
