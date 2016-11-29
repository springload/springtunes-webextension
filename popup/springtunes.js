function displayPlaySong(data) {
  // Clearing existing content
  var playDiv = document.getElementById('play');
  while(playDiv.firstChild){
      playDiv.removeChild(playDiv.firstChild);
  }

  var imgNode = document.createElement("img");
  imgNode.className = 'icon';

  if(data.playing)
    imgNode.src = '../icons/fa-pause.svg';
  else
    imgNode.src = '../icons/fa-play.svg';

  playDiv.appendChild(imgNode);
}

function displayProcessing() {
  // Clearing existing content
  var trackInfoDiv = document.getElementById('track-info');
  while(trackInfoDiv.firstChild){
      trackInfoDiv.removeChild(trackInfoDiv.firstChild);
  }

  var imgNode = document.createElement("img");
  imgNode.className = 'processing';
  imgNode.src = '../icons/processing.gif';

  trackInfoDiv.appendChild(imgNode);
}

function displayCurrentSong(data) {
  // Clearing existing content
  var trackInfoDiv = document.getElementById('track-info');
  while(trackInfoDiv.firstChild){
      trackInfoDiv.removeChild(trackInfoDiv.firstChild);
  }

  // Creating new content
  var titleNode = document.createElement("h2");
  titleNode.className = 'song-title';
  titleNode.appendChild(document.createTextNode(data.track.track_resource.name));
  var artistNode = document.createElement("h3");
  artistNode.className = 'song-artist';
  artistNode.appendChild(document.createTextNode(data.track.artist_resource.name));
  var albumNode = document.createElement("h3");
  albumNode.className = 'song-album';
  albumNode.appendChild(document.createTextNode(data.track.artist_resource.name));

  // Adding new content
  trackInfoDiv.appendChild(titleNode);
  trackInfoDiv.appendChild(artistNode);
  trackInfoDiv.appendChild(albumNode);

  displayPlaySong(data);
}

document.getElementById("refresh").addEventListener("click", function () {
  getCurrentSong(displayProcessing, displayCurrentSong);
});

document.getElementById("play").addEventListener("click", function () {
  playSong(displayProcessing, displayCurrentSong);
});

document.getElementById("back").addEventListener("click", function () {
  backSong(displayProcessing, displayCurrentSong);
});

document.getElementById("next").addEventListener("click", function () {
  nextSong(displayProcessing, displayCurrentSong);
});

getCurrentSong(displayProcessing, displayCurrentSong);
