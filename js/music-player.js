import { draw } from "./canvas.js";
import { updaterecent } from './profile.js'
import { openModal, upsertPlaylist } from "./modal.js";

const type = localStorage.getItem('type');
const positionArray = localStorage.getItem('positionArray');
const idSong = localStorage.getItem('idSong');
const idArtistName = localStorage.getItem('idArtistName');
const favorite = localStorage.getItem('favorite');
const idUser = localStorage.getItem('idUser');
const status = localStorage.getItem('status');
const position = localStorage.getItem('position');

console.log(type, positionArray, idSong, idArtistName, idUser, position);

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

function getSongs(type, position, idArtistName, idSong) {
  let URL = '';
  let actualSong = '';
  if (type == 'artist') {
    URL = `https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/songs/${idArtistName}`;
  } else if (type == 'recent') {
    URL = `https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/song/${idSong}`;
  }
  fetch(URL, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data => {

      let current_track = position;
      if (type == 'artist') {
        actualSong = data[current_track];
      } else {
        actualSong = data;
      }

      window.addEventListener('load', init(actualSong), false);

      function nextSong() {
        current_track++;
        current_track = current_track % (actualSong.audio.length);
        song = data[current_track];
        actualSong = data[current_track];
        audio.src = song.audio;
        audio.play();
        audio.onloadeddata = function () {
          updateInfo(song);
        }
        console.log(data.id);

        if (status == 'true') {
          let update = '';
          if (type == 'artist') {
            update = {
              "idSong": `${data[current_track].id}`
            }
          } else {
            update = {
              "idSong": `${data.id}`
            }
          }

          updaterecent(idUser, JSON.stringify(update));
        }

      }

      function prevSong() {
        current_track--;
        current_track = (current_track == -1 ? (actualSong.audio.length - 1) : current_track);
        song = data[current_track];
        actualSong = data[current_track];
        audio.src = song.audio;
        audio.play();
        audio.onloadeddata = function () {
          updateInfo(song);
        }
        console.log(data[current_track].id);
        if (status == 'true') {
          let update = '';
          if (type == 'artist') {
            update = {
              "idSong": `${data[current_track].id}`
            }
          } else {
            update = {
              "idSong": `${data.id}`
            }
          }

          updaterecent(idUser, JSON.stringify(update));
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
      console.log(data.id);

      if (status == 'true') {
        let update = '';
        if (type == 'artist') {
          update = {
            "idSong": `${data[current_track].id}`
          }
        } else {
          update = {
            "idSong": `${data.id}`
          }
        }

        updaterecent(idUser, JSON.stringify(update));
      }

      const open = document.getElementById('add__song');
      const modal_container = document.getElementById('modal_container');
      const savePlaylist = document.getElementById('save-playlist');
      const newPlaylist = document.getElementById('add-list');
      const close = document.getElementById('close');

      open.addEventListener('click', (e) => {
        e.preventDefault();
        modal_container.classList.add('show');
        newPlaylist.innerText = '';
      })
      close.addEventListener('click', () => {
        modal_container.classList.remove('show');
      });

      savePlaylist.addEventListener('click', (e) => {
        e.preventDefault();
        const selectOption = document.getElementById('exist-list');
        upsertPlaylist(selectOption.value, newPlaylist.value, actualSong.id, idUser, selectOption.selectedOptions[0].innerText);
      })
    }))
}

function getFavorite(favorite, position) {

  fetch(`https://daken-app.herokuapp.com/favorite/${favorite}`, {
    method: 'GET',
  })
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
            if (status == 'true') {
              const update = {
                "idSong": `${data.id}`
              }
              updaterecent(idUser, JSON.stringify(update));
            }

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
            openModal(actualSong.id, favorite);

          })
      }
      function nextSong() {
        current_track++;
        audio.pause();
        getAudio(datas, current_track);
      }

      function prevSong(actualSong) {
        current_track--;
        song = actualSong;
        audio.src = song;
        console.log(audio.src);
        audio.pause();
        getAudio(datas, current_track);
      }
      getAudio(datas, current_track);
    }))
}

function getPlaylist(positionArray, position, idUser) {

  fetch(`https://daken-app.herokuapp.com/playlist/${idUser}/${positionArray}`)
    .then((response) => response.json())
    .then((datas => {
      let current_track = position;
      console.log(datas.data[0].idSongsAdded[current_track]);
      function getAudio(datas, current_track) {
        fetch(`https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/song/${datas.data[0].idSongsAdded[current_track]}`, {
          method: 'GET',
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.id);
            const update = {
              "idSong": `${data.id}`
            }
            updaterecent(idUser, JSON.stringify(update));
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

            const open = document.getElementById('add__song');
            const modal_container = document.getElementById('modal_container');
            const close = document.getElementById('close');
            const newPlaylist = document.getElementById('add-list');
            open.addEventListener('click', (e) => {
              e.preventDefault();
              modal_container.classList.add('show');
              newPlaylist.innerText = '';
            })
            close.addEventListener('click', () => {
              modal_container.classList.remove('show');
            });
          })
        draw();
      }
      const savePlaylist = document.getElementById('save-playlist');

      savePlaylist.addEventListener('click', (e) => {
        e.preventDefault();
        const newPlaylist = document.getElementById('add-list');
        const selectOption = document.getElementById('exist-list');
        upsertPlaylist(selectOption.value, newPlaylist.value, datas.data[0].idSongsAdded[current_track], idUser, selectOption.selectedOptions[0].innerText);
      })

      function nextSong() {
        current_track++;
        audio.pause();
        getAudio(datas, current_track);
      }

      function prevSong() {
        current_track--;
        audio.pause();
        getAudio(datas, current_track);
      }


      getAudio(datas, current_track);


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

if (type == 'artist' || type == 'recent') {
  getSongs(type, positionArray, idArtistName, idSong);
} else if (type == 'favorite') {
  getFavorite(favorite, positionArray);
} else if (type == 'playlist') {
  getPlaylist(positionArray, position, idUser);
}

draw();


export {
  audio,
  song,
}

