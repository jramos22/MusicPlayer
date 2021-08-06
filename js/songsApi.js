import {infoSongs} from './songsDom.js';

class songsApi{

    songs(id, artists, idArtist){
        fetch(`https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/songs/${id}`)
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                const songsResponse = new infoSongs(data[i], i, artists, idArtist);
                songsResponse.artistSongsList();
            }
        });
    }
    song(id, playlist){
        fetch(`https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/song/${id}`)
        .then((response) => response.json())
        .then((data) => { 
                const songsResponse = new infoSongs(data, playlist);
                songsResponse.artistSongsList();
        });
    }
}

export {   
    songsApi,
}