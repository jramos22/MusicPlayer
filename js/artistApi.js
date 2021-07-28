import { infoArtist } from './artist.js';
import { filename } from './locationFile.js';

function apiArtist() {
    fetch('https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/artists')
        .then((response) => response.json())
        .then((data) => {
            const artistResponse = new infoArtist(data);
            if (filename() === 'loggin.html' || filename() === 'index.html') {
                artistResponse.showArtist();
            } else if (filename() === 'artistGorillas.html') {
                artistResponse.showArtistComplete(2);
            } else if (filename() === 'artistRadiohead.html') {
                artistResponse.showArtistComplete(0);
                console.log('hola');
            } else if (filename() === 'artistAurora.html') {
                artistResponse.showArtistComplete(1);
            }
        });
}

export {
    apiArtist,
}