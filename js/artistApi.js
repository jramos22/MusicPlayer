import { infoArtist } from './artist.js';
import { filename } from './locationFile.js';
import { songsApi } from './songsApi.js';
const idUser = localStorage.getItem("idUser");
console.log(idUser);

function apiArtists() {
    fetch('https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/artists')
        .then((response) => response.json())
        .then((data) => {
            const artistResponse = new infoArtist(data);
            if (filename() === 'loggin.html' || filename() === 'index.html') {
                artistResponse.showArtist();
            }
        });
}
function apiArtist(position, id) {
    fetch('https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/artists')
        .then((response) => response.json())
        .then((data) => {
            const artistResponse = new infoArtist(data);
            const sogns = new songsApi();
            if (filename() === 'artist.html'){
            artistResponse.showArtistComplete(position);
            sogns.songs(id);
            }
        });
}

export {
    apiArtists,
    apiArtist
}