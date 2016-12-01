var statusImg = document.getElementById('status-img');
var serverUrlInput = document.getElementById('server-url');

function displayStatusOK() {
  statusImg.hidden = false;
  statusImg.setAttribute('src', '../img/icons/fa-check-circle.svg');
  serverUrlInput.className = serverUrlInput.className.replace(' input--error', '');
}

function saveServer(url) {
  if (isChrome) {
      chrome.storage.local.set({
        serverUrl: url
      });
  } else if (isFirefox) {
      browser.storage.local.set({
        serverUrl: url
      });
  }

  setServerUrlInput(url);
  initGlobalVars({ serverUrl: url });

  displayTestServerMsg('ok');
  displayStatusOK();
  getCurrentSong(displayProcessing, displayCurrentSong);
}

function displayStatusNOK() {
  statusImg.hidden = false;
  statusImg.setAttribute('src', '../img/icons/fa-times-circle.svg');
  serverUrlInput.className = serverUrlInput.className.replace(' input--error', '') + ' input--error';
}

// function displaySettingsProcessing() {
//   statusImg.hidden = false;
//   statusImg.setAttribute('src', '../img/processing.gif');
//   serverUrlInput.className = serverUrlInput.className.replace(' input--error', '');
// }

function saveOptions(e) {
  e.preventDefault();
  var serverUrl = document.getElementById('server-url').value;
  userTestServer(serverUrl, saveServer, displayStatusNOK);
}

document.getElementById('settings-toggle').addEventListener('click', function () {
  var settingsDiv = document.getElementById('settings');
  var show = settingsDiv.hidden !== true;
  var okNok = show ? 'ok' : 'nok';
  displaySettings(okNok);
});


document.querySelector('form').addEventListener('submit', saveOptions);
