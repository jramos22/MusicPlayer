import { draw } from "./canvas.js";

const track = document.getElementById('track');
const progress = document.getElementById('progress');
const play = document.getElementById('play');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const name = document.getElementById('name');
const album = document.getElementById('album');
let current_track = 0;
let song, audio, duration;
let playing = false;


class Musicplayer {
  constructor(play, audio) {
    this.play = play;
    this.audio = audio;
  }
  playIcon(play) {
    audio.addEventListener("pause", function () {
      play.innerHTML = '<img class="pad" src="img/play-icon-x45.png" />';
      playing = false;
    }, false);
  }
  pauseIcon(play) {
    audio.addEventListener("playing", function () {
      play.innerHTML = '<img src="img/pause-icon-x45.png" />';
      playing = true;
    }, false);
  }
  timeUpdate(audio) {
    audio.addEventListener('timeupdate', updateTrack, false);
  }
  loadMetaData(audio) {
    audio.addEventListener('loadedmetadata', function () {
      duration = this.duration;
    }, false); 
  }
  playMusic(play) {
    play.onclick = function () {
      playing ? audio.pause() : audio.play();
    }
  }
}

function getSongs() {

  fetch(`https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/songs/radiohead`)
  .then((response) => response.json())
  .then((data => {
    
    const actualSong = data[current_track];

    window.addEventListener('load', init(actualSong), false);

    function nextSong() {
      current_track++;
      current_track = current_track % (actualSong.audio.length);
      song = data[current_track];
      audio.src = song.audio;
      audio.play();
      audio.onloadeddata = function() {
        updateInfo(song);
      }
    }

    function prevSong() {
      current_track--;
      current_track = (current_track == -1 ? (actualSong.audio.length - 1) : current_track);
      song = data[current_track];
      audio.src = song.audio;
      audio.play();
      audio.onloadeddata = function() {
        updateInfo(song);
      }
    }

    const playMusic = new Musicplayer();
    playMusic.playMusic(play)

    const playSong = new Musicplayer();
    playSong.playIcon(play);

    const pause = new Musicplayer();
    pause.pauseIcon(play);

    const timeUpdateAudio = new Musicplayer();
    timeUpdateAudio.timeUpdate(audio);

    const metaData = new Musicplayer();
    metaData.loadMetaData(audio);

  
    next.addEventListener("click", nextSong, false);
    prev.addEventListener("click", prevSong, false);

  })) 
}

function updateTrack() {
  let curtime = audio.currentTime;
  let percent = Math.round((curtime * 100) / duration);
  progress.style.width = percent + '%';
  if(percent==100) nextSong(); 
}

function init(data) {
  song = data;
  audio = new Audio();
  audio.src = song.audio;
  name.textContent = song.name;
  album.textContent = song.album;
}

function updateInfo(song) {
  name.textContent = song.name;
  album.textContent = song.album;
}

getSongs();
draw();

export {
  getSongs,
  audio,
  song,
}

