var songUrl = "http://localhost:3000/api/playing";
var volumeUrl = "http://localhost:3000/api/volume";

function callApi(callback, url, method, paramBody) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onload = function() {
      if (this.status == 200) {
          var data = JSON.parse(this.responseText);
          callback(data);
      }
  };
  xmlhttp.open(method, url, true);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify(paramBody));
}

function getCurrentSong(callbackStart, callbackEnd) {
  callbackStart();
  callApi(callbackEnd, songUrl, 'GET');
}

function changeVolume(callbackEnd, volumeValue) {
  callApi(callbackEnd, volumeUrl, 'PUT', { volume: parseInt(volumeValue, 10) });
}

function playSong(callbackStart, callbackEnd) {
  callbackStart();
  callApi(callbackEnd, songUrl, 'PUT');
}

function backSong(callbackStart, callbackEnd) {
  callbackStart();
  callApi(callbackEnd, songUrl, 'POST', { action: 'back' });
}

function nextSong(callbackStart, callbackEnd) {
  callbackStart();
  callApi(callbackEnd, songUrl, 'POST', { action: 'next' });
}
