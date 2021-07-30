let holding = false;
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

fetch(`https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/songs/radiohead`)
    .then((response) => response.json())
    .then((data => {
        data[current_track];
        window.addEventListener('load', init(data[current_track]), false);
        audio.addEventListener('timeupdate', updateTrack, false);

        audio.addEventListener('loadedmetadata', function () {
            duration = this.duration;
        }, false);

        audio.addEventListener("pause", function () {
            play.innerHTML = '<img class="pad" src="img/play-icon-x45.png" />';
            playing = false;
        }, false);
        
        audio.addEventListener("playing", function () {
            play.innerHTML = '<img src="img/pause-icon-x45.png" />';
            playing = true;
        }, false);

        play.onclick = function () {
            playing ? audio.pause() : audio.play();
        }
    
        function updateTrack() {
            curtime = audio.currentTime;
            percent = Math.round((curtime * 100) / duration);
            progress.style.width = percent + '%';
            if(percent==100) nextSong(); 
        }

        function nextSong() {
            current_track++;
            current_track = current_track % (data[current_track].audio.length);
            song = data[current_track];
            audio.src = song.audio;
            audio.play();
            audio.onloadeddata = function() {
              updateInfo(song);
            }
        }

        function prevSong() {
            current_track--;
            current_track = (current_track == -1 ? (data[current_track].audio.length - 1) : current_track);
            song = data[current_track];
            audio.src = song.audio;
            audio.play();
            audio.onloadeddata = function() {
              updateInfo(song);
            }
        }

        next.addEventListener("click", nextSong, false);
        prev.addEventListener("click", prevSong, false);

    })) 


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



