import { draw } from "./canvas.js";
import { updaterecent } from './profile.js'
import { addFavorite, upsertPlaylist } from "./actionsMusicPlayer.js";

const type = localStorage.getItem('type');
const positionArray = localStorage.getItem('positionArray');
const idSong = localStorage.getItem('idSong');
const idArtistName = localStorage.getItem('idArtistName');
const favorite = localStorage.getItem('favorite');
const idUser = localStorage.getItem('idUser');
const status = localStorage.getItem('status');
const position = localStorage.getItem('position');

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
      const getfavoriteButton = document.getElementById('add_favorite');

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
        if (status === 'true') {
          upsertPlaylist(selectOption.value, newPlaylist.value, actualSong.id, idUser, selectOption.selectedOptions[0].innerText);
        }else{

        }
        
      })

      getfavoriteButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (status === 'true') {
          addFavorite(idUser, actualSong.id);
        }else{
        }
        
      })
    }))
}


function getPlaylist(type, positionArray, position, idUser, favorite) {
  let URL = '';
  if (type == 'playlist') {
    URL = `https://daken-app.herokuapp.com/playlist/${idUser}/${positionArray}`;
  } else if (type == 'favorite') {
    URL = `https://daken-app.herokuapp.com/favorite/${favorite}`;
  }
  fetch(URL, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((datas => {
      let current_track = position;

      function getAudio(datas, current_track, type, favorite) {
        let URLSONGS = '';
        if (type == 'playlist') {

          URLSONGS = `https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/song/${datas.data[0].idSongsAdded[current_track]}`;

        } else if (type == 'favorite') {
          URLSONGS = `https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/song/${datas.data[0].songs[current_track]}`;
        }
        fetch(URLSONGS, {
          method: 'GET',
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {

            const update = {
              "idSong": `${data.id}`
            }
            if (type == 'playlist') {
              updaterecent(idUser, JSON.stringify(update));
            }else{
              updaterecent(favorite, JSON.stringify(update));
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
        let positionSong = '';
        if (type == 'playlist') {
          positionSong = datas.data[0].idSongsAdded[current_track];
        }else{
          positionSong = datas.data[0].songs[current_track];
        }
        if (status == 'true') {
          upsertPlaylist(selectOption.value, newPlaylist.value, positionSong, idUser, selectOption.selectedOptions[0].innerText);
        }else{

        }
        
      })

      const getfavoriteButton = document.getElementById('add_favorite');

      getfavoriteButton.addEventListener('click', (e) => {
        e.preventDefault();
        let positionAdd = '';
        if (type == 'playlist') {
          positionAdd = datas.data[0].idSongsAdded[current_track];
        }else{
          positionAdd = datas.data[0].songs[current_track];
        }
        if (status == 'true') {
          addFavorite(idUser, positionAdd);
        }else{
        }
      })

      function nextSong() {
        current_track++;
        audio.pause();
        getAudio(datas, current_track, type, favorite);
      }

      function prevSong() {
        current_track--;
        audio.pause();
        getAudio(datas, current_track, type, favorite);
      }


      getAudio(datas, current_track, type, favorite);


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
} else if (type == 'playlist' || type == 'favorite') {
  getPlaylist(type, positionArray, position, idUser, favorite);
}

draw();


export {
  audio,
  song,
}

