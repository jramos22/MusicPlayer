import {infoSongs} from './songs.js';

class songsApi{

    gorillaz(){
        fetch('https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/songs/gorillaz')
        .then((response) => response.json())
        .then((data) => {
            const songsResponse = new infoSongs(data);
            songsResponse.artistSongsList();
        });
    }
    radiohead(){
        fetch('https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/songs/radiohead')
        .then((response) => response.json())
        .then((data) => {
            const songsResponse = new infoSongs(data);
            songsResponse.artistSongsList();
        });
    }
    aurora(){
        fetch('https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/songs/aurora')
        .then((response) => response.json())
        .then((data) => {
            const songsResponse = new infoSongs(data);
            songsResponse.artistSongsList();
        });
    }
}

export {   
    songsApi,
}