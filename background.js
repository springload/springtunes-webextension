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
  xmlhttp.send(JSON.stringify(paramBody));
}

function initializeCurrentSong(callback) {
  callApi(callback, 'GET');
}

function playSong(callback) {
  callApi(callback, 'PUT');
}

function backSong(callback) {
  callApi(callback, 'POST', { action: 'back' });
}

function nextSong(callback) {
  callApi(callback, 'POST', { action: 'next' });
}
