var volumeDiv = document.getElementById('volume-changer');
var volumeInput = document.getElementById('volume-changer-input');

function updateVolume(data) {
  volumeInput.setAttribute('value', Math.round(data.value * 100));
}

function clearContent(elmtId) {
  // Clearing existing content
  var elmt = document.getElementById(elmtId);
  while(elmt.firstChild){
      elmt.removeChild(elmt.firstChild);
  }

  return elmt;
}

function displayPlaySong(data) {
  var playDiv = clearContent('play');

  var imgNode = document.createElement('img');
  imgNode.className = 'icon';

  if(data.playing)
    imgNode.src = '../icons/fa-pause.svg';
  else
    imgNode.src = '../icons/fa-play.svg';

  playDiv.appendChild(imgNode);
}

function displayProcessing() {
  var trackInfoDiv = clearContent('track-info');

  var imgNode = document.createElement('img');
  imgNode.className = 'processing';
  imgNode.src = '../icons/processing.gif';

  trackInfoDiv.appendChild(imgNode);
}

function displayCurrentSong(data) {
  var trackInfoDiv = clearContent('track-info');

  // Creating new content
  var titleNode = document.createElement('h2');
  titleNode.className = 'song-title';
  titleNode.appendChild(document.createTextNode(data.track.track_resource.name));
  var artistNode = document.createElement('h3');
  artistNode.className = 'song-artist';
  artistNode.appendChild(document.createTextNode(data.track.artist_resource.name));
  var albumNode = document.createElement('h3');
  albumNode.className = 'song-album';
  albumNode.appendChild(document.createTextNode(data.track.artist_resource.name));

  // Adding new content
  trackInfoDiv.appendChild(titleNode);
  trackInfoDiv.appendChild(artistNode);
  trackInfoDiv.appendChild(albumNode);

  updateVolume({value: data.volume});

  displayPlaySong(data);
}

document.getElementById('refresh').addEventListener('click', function () {
  getCurrentSong(displayProcessing, displayCurrentSong);
});

document.getElementById('play').addEventListener('click', function () {
  playSong(displayProcessing, displayCurrentSong);
});

document.getElementById('back').addEventListener('click', function () {
  backSong(displayProcessing, displayCurrentSong);
});

document.getElementById('next').addEventListener('click', function () {
  nextSong(displayProcessing, displayCurrentSong);
});

document.getElementById('volume').addEventListener('click', function () {
  var show = volumeDiv.getAttribute('hidden') !== true;
  volumeDiv.setAttribute('hidden', show);
});

document.getElementById('volume-changer-input').addEventListener('change', function () {
  changeVolume(updateVolume, this.value);
});

getCurrentSong(displayProcessing, displayCurrentSong);
