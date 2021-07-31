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

fetch(`https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/songs/gorillaz`)
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

/* ******* CANVAS ANIMATION ******* */

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

let centerX = canvas.width / 2;
let centerY = canvas.height / 2;
let radius = document.body.clientWidth <= 425 ? 120 : 160;
let steps = document.body.clientWidth <= 425 ? 60 : 120;
let interval = 360 / steps;
let pointsUp = [];
let pointsDown = [];
let running = false;
let pCircle = 2 * Math.PI * radius;
let angleExtra = 90;

// Create points
for(let angle = 0; angle < 360; angle += interval) {
  let distUp = 1.1;
  let distDown = 0.9;

  pointsUp.push({
    angle: angle + angleExtra,
    x: centerX + radius * Math.cos((-angle + angleExtra) * Math.PI / 180) * distUp,
    y: centerY + radius * Math.sin((-angle + angleExtra) * Math.PI / 180) * distUp,
    dist: distUp
  });

  pointsDown.push({
    angle: angle + angleExtra + 5,
    x: centerX + radius * Math.cos((-angle + angleExtra + 5) * Math.PI / 180) * distDown,
    y: centerY + radius * Math.sin((-angle + angleExtra + 5) * Math.PI / 180) * distDown,
    dist: distDown
  });
}

// -------------
// Audio stuff
// -------------

// make a Web Audio Context
const context = new AudioContext();
const splitter = context.createChannelSplitter();

const analyserL = context.createAnalyser();
analyserL.fftSize = 2048;

const analyserR = context.createAnalyser();
analyserR.fftSize = 512;

splitter.connect(analyserL, 0, 0);
splitter.connect(analyserR, 1, 0);

// Make a buffer to receive the audio data
const bufferLengthL = analyserL.frequencyBinCount;
const audioDataArrayL = new Uint8Array(bufferLengthL);

const bufferLengthR = analyserR.frequencyBinCount;
const audioDataArrayR = new Uint8Array(bufferLengthR);

// Make a audio node
//const audio = new Audio();

function loadAudio() {
  audio.loop = false;
  audio.autoplay = false;
  audio.setAttribute('crossorigin', 'anonymous');

  // call `handleCanplay` when it music can be played
  audio.addEventListener('canplay', handleCanplay);
  audio.src = song.audio; //"https://cetav.s3.us-east-2.amazonaws.com/runaway.mp3"
  audio.load();
  running = true;
}

function handleCanplay() {
  // connect the audio element to the analyser node and the analyser node
  // to the main Web Audio context
  const source = context.createMediaElementSource(audio);
  source.connect(splitter);
  splitter.connect(context.destination);
}

function toggleAudio() {
  if (running === false) {
    loadAudio();
    play;
  }

  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

play.addEventListener('click', toggleAudio);

document.body.addEventListener('touchend', function(ev) {
  context.resume();
});

// -------------
// Canvas stuff
// -------------

/* function getRandomColour(){
    var red = Math.floor(Math.random()* 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);
  
    return "rgb("+red+","+green+"," +blue+" )";  
} */

function drawLine(points) {
  let origin = points[0];

  ctx.beginPath();
  //ctx.strokeStyle = getRandomColour();
  //ctx.strokeStyle = 'rgba(230,255,255,0.5)';
  ctx.strokeStyle = 'rgb(255, 111, 30)';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 2;
  ctx.moveTo(origin.x, origin.y);

  for (let i = 0; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }

  ctx.lineTo(origin.x, origin.y);
  ctx.stroke();
}

function connectPoints(pointsA, pointsB) {
  for (let i = 0; i < pointsA.length; i++) {
    ctx.beginPath();
    //ctx.strokeStyle = getRandomColour();
    ctx.strokeStyle = 'rgb(255, 111, 30)';
    //ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    //ctx.strokeStyle = "hsla(" + (degraded % 360) + ",100%,50%,1)"; // degradado(ŭ % 360),saturacion,brillo,transparencia
    ctx.moveTo(pointsA[i].x, pointsA[i].y);
    ctx.lineTo(pointsB[i].x, pointsB[i].y);
    ctx.stroke();
  }
}

function update(dt) {
  let audioIndex, audioValue;

  // get the current audio data
  analyserL.getByteFrequencyData(audioDataArrayL);
  analyserR.getByteFrequencyData(audioDataArrayR);

  for (let i = 0; i < pointsUp.length; i++) {
    audioIndex = Math.ceil(pointsUp[i].angle * (bufferLengthL / (pCircle * 2))) | 0;
    // get the audio data and make it go from 0 to 1
    audioValue = audioDataArrayL[audioIndex] / 255;

    pointsUp[i].dist = 1.1 + audioValue * 0.9;
    pointsUp[i].x = centerX + radius * Math.cos(-pointsUp[i].angle * Math.PI / 180) * pointsUp[i].dist;
    pointsUp[i].y = centerY + radius * Math.sin(-pointsUp[i].angle * Math.PI / 180) * pointsUp[i].dist;

    audioIndex = Math.ceil(pointsDown[i].angle * (bufferLengthR / (pCircle * 2))) | 0;
    // get the audio data and make it go from 0 to 1
    audioValue = audioDataArrayR[audioIndex] / 255;

    pointsDown[i].dist = 0.6 + audioValue * 0.2;
    pointsDown[i].x = centerX + radius * Math.cos(-pointsDown[i].angle * Math.PI / 180) * pointsDown[i].dist;
    pointsDown[i].y = centerY + radius * Math.sin(-pointsDown[i].angle * Math.PI / 180) * pointsDown[i].dist;
  }
}

function draw(dt) {
  requestAnimationFrame(draw);

  if (running) {
    update(dt);
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawLine(pointsUp);
  drawLine(pointsDown);
  connectPoints(pointsUp, pointsDown);
}

draw();