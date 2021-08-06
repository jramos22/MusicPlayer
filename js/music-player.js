import { draw } from "./canvas.js";
import{updaterecent} from './profile.js'

const type = localStorage.getItem('type');
const positionArray = localStorage.getItem('positionArray');
const idSong = localStorage.getItem('idSong');
const idArtistName = localStorage.getItem('idArtistName');
const favorite = localStorage.getItem('favorite');
const idUser = localStorage.getItem('idUser');

console.log(type, positionArray, idSong, idArtistName, idUser);

//const track = document.getElementById('track');
const progress = document.getElementById('progress');
const play = document.getElementById('play');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const name = document.getElementById('name');
const album = document.getElementById('album');
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

function getSongs(position, idArtistName) {

  fetch(`https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/songs/${idArtistName}`)
    .then((response) => response.json())
    .then((data => {
      let current_track = position;
      const actualSong = data[current_track];

      window.addEventListener('load', init(actualSong), false);

      function nextSong() {
        current_track++;
        current_track = current_track % (actualSong.audio.length);
        song = data[current_track];
        audio.src = song.audio;
        audio.play();
        audio.onloadeddata = function () {
          updateInfo(song);
        }
        console.log(data.id);
          const update ={
            "idSong":`${data[current_track].id}`
          }
          updaterecent(idUser,JSON.stringify(update));
      }

      function prevSong() {
        current_track--;
        current_track = (current_track == -1 ? (actualSong.audio.length - 1) : current_track);
        song = data[current_track];
        audio.src = song.audio;
        audio.play();
        audio.onloadeddata = function () {
          updateInfo(song);
        }
        console.log(data[current_track].id);
          const update ={
            "idSong":`${data[current_track].id}`
          }
          updaterecent(idUser,JSON.stringify(update));
      }

      const playMusic = new Musicplayer();
      playMusic.playMusic(play)
      playMusic.playIcon(play);
      playMusic.pauseIcon(play);
      playMusic.timeUpdate(audio);
      playMusic.loadMetaData(audio);

      next.addEventListener("click", nextSong, false);
      prev.addEventListener("click", prevSong, false);
      console.log(data.i);
          const update ={
            "idSong":`${data[current_track].id}`
          }
          updaterecent(idUser,JSON.stringify(update));

    }))
}

function getRecent(idSong) {

  fetch(`https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/song/${idSong}`)
    .then((response) => response.json())
    .then((data => {

      const actualSong = data;
      console.log(data.audio);

      window.addEventListener('load', init(actualSong), false);

      function nextSong() {
        current_track++;
        current_track = current_track % (actualSong.audio.length);
        song = data[current_track];
        audio.src = song.audio;
        audio.play();
        audio.onloadeddata = function () {
          updateInfo(song);
        }
      }

      function prevSong() {
        current_track--;
        current_track = (current_track == -1 ? (actualSong.audio.length - 1) : current_track);
        song = data[current_track];
        audio.src = song.audio;
        audio.play();
        audio.onloadeddata = function () {
          updateInfo(song);
        }
      }

      const playMusic = new Musicplayer();
      playMusic.playMusic(play)
      playMusic.playIcon(play);
      playMusic.pauseIcon(play);
      playMusic.timeUpdate(audio);
      playMusic.loadMetaData(audio);


      next.addEventListener("click", nextSong, false);
      prev.addEventListener("click", prevSong, false);

    }))
}

function getFavorite(favorite, position) {

  fetch(`https://daken-app.herokuapp.com/favorite/${favorite}`)
    .then((response) => response.json())
    .then((datas => {
      let current_track = position;

      function getAudio(datas, current_track) {
        fetch(`https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/song/${datas.data[0].songs[current_track]}`, {
        method: 'GET',
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.audio);
          console.log(data.id);
          const update ={
            "idSong":`${data.id}`
          }
          updaterecent(idUser,JSON.stringify(update));
          const actualSong = data;

          window.addEventListener('load', init(actualSong), false);

          
          const playMusic = new Musicplayer();
          playMusic.playMusic(play)
          playMusic.playIcon(play);
          playMusic.pauseIcon(play);
          playMusic.timeUpdate(audio);
          playMusic.loadMetaData(audio);

          next.addEventListener("click", nextSong, false);
          prev.addEventListener("click", prevSong, false);

        })
        draw();
      }
      function nextSong() {
        current_track++;
        audio.pause();
        getAudio(datas,current_track);
      }

      function prevSong() {
        current_track--;
        audio.pause();
        getAudio(datas, current_track);
      }
      
      getAudio(datas,current_track);
      
      
    }))
}

function getPlaylist(positionArray, idSong, idUser) {

  fetch(`https://daken-app.herokuapp.com/playlist/${idUser}/${positionArray}`)
    .then((response) => response.json())
    .then((datas => {
      console.log(datas);
      let current_track = 0;

      function getAudio(datas, current_track) {
        fetch(`https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/song/${datas.data[0].idSongsAdded[current_track]}`, {
        method: 'GET',
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.id);
          const update ={
            "idSong":`${data.id}`
          }
          updaterecent(idUser,JSON.stringify(update));
          const actualSong = data;

          window.addEventListener('load', init(actualSong), false);

          
          const playMusic = new Musicplayer();
          playMusic.playMusic(play)
          playMusic.playIcon(play);
          playMusic.pauseIcon(play);
          playMusic.timeUpdate(audio);
          playMusic.loadMetaData(audio);

          next.addEventListener("click", nextSong, false);
          prev.addEventListener("click", prevSong, false);

        })
        draw();
      }
      function nextSong() {
        current_track++;
        audio.pause();
        getAudio(datas,current_track);
      }

      function prevSong() {
        current_track--;
        audio.pause();
        getAudio(datas, current_track);
      }


      getAudio(datas,current_track);
      
      
    }))
}

function updateTrack() {
  let curtime = audio.currentTime;
  let percent = Math.round((curtime * 100) / duration);
  progress.style.width = percent + '%';
  if (percent == 100) nextSong();
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

if (type == 'artist') {
  getSongs(positionArray, idArtistName);
} else if (type == 'recent') {
  getRecent(idSong);
} else if (type == 'favorite') {
  getFavorite(favorite, positionArray);
} else if (type == 'playlist') {
  getPlaylist(positionArray, idSong, idUser);
}

draw();

export {
  getSongs,
  getFavorite,
  getRecent,
  audio,
  song,
}

