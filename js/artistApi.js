import { infoArtist } from './artistDom.js';
import { filename } from './locationFile.js';
import { songsApi } from './songsApi.js';

const idArtist = localStorage.getItem("idArtist");

function apiArtists() {
    fetch('https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/artists')
        .then((response) => response.json())
        .then((data) => {
            const artistResponse = new infoArtist(data);
            if (filename() != 'artist.html') {
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
            sogns.songs(id, data, data[idArtist]);
            }
        });
}

export {
    apiArtists,
    apiArtist
}