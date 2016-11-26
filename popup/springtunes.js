function displayPlaySong(data) {
  if(data.playing)
    document.querySelector("#play").textContent = "Pause";
  else
    document.querySelector("#play").textContent = "Play";
}

function displayCurrentSong(data) {
  document.querySelector("#song-title").textContent = data.track.track_resource.name;
  document.querySelector("#song-artist").textContent = data.track.artist_resource.name;
  displayPlaySong(data);
}

document.querySelector("#play").addEventListener("click", function () {
  playSong(displayPlaySong);
});

document.querySelector("#back").addEventListener("click", function () {
  console.log('test');
  backSong(displayPlaySong);
});

document.querySelector("#next").addEventListener("click", function () {
  nextSong(displayPlaySong);
});

initializeCurrentSong(displayCurrentSong);
