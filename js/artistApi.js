import { infoArtist } from './artist.js';
import { filename } from './locationFile.js';

function apiArtist() {
    fetch('https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/artists')
        .then((response) => response.json())
        .then((data) => {
            console.log(data[2].name);
            if (filename() === 'loggin.html') {
                const artistResponse = new infoArtist(data);
                artistResponse.showArtist();

            } else if (filename() === 'artistGorillas.html') {
                const show = new infoArtist(data);
                show.showArtistComplete(2);
                console.log(filename());
            } else if (filename() === 'artistRadiohead.html') {
                const show = new infoArtist(data);
                show.showArtistComplete(0);
                console.log(filename());
            } else if (filename() === 'artistAurora.html') {
                const show = new infoArtist(data);
                show.showArtistComplete(1);
                console.log(filename());
                
            }
        });
}

export {
    apiArtist,
}