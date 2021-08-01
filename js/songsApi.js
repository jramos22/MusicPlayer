import {infoSongs} from './songs.js';
class songsApi{

    songs(id){
        fetch(`https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/songs/${id}`)
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