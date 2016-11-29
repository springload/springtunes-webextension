function callApi(callback, method, paramBody) {
  var body = paramBody;
  if (body === undefined) { body = null; };
  var xmlhttp = new XMLHttpRequest();
  var url = "http://localhost:3000/api/playing";

  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
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
  callApi(callbackEnd, 'GET');
}

function playSong(callbackStart, callbackEnd) {
  callbackStart();
  callApi(callbackEnd, 'PUT');
}

function backSong(callbackStart, callbackEnd) {
  callbackStart();
  callApi(callbackEnd, 'POST', { action: 'back' });
}

function nextSong(callbackStart, callbackEnd) {
  callbackStart();
  callApi(callbackEnd, 'POST', { action: 'next' });
}
