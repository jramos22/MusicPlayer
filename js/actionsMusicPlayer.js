import { filename } from './locationFile.js';
import {getModalPlaylist} from './profile.js'

const id = localStorage.getItem('idUser');

function upsertPlaylist(selectPlaylist, newPlaylist, id, idUser, name) {
    if(newPlaylist == ''){

        const value = {
            
            "idUser":`${idUser}`,
            "playlistName" : `${name}`,
            "idSongsAdded":[`${id}`]
        }

        fetch(`https://daken-app.herokuapp.com/playlist/${selectPlaylist}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'PUT',
            body: JSON.stringify(value)
        })
            .then((response) => {
                return response.json();
            })
            .then(() => {
                alert('song added successfully')
            })
            
    } else {
        const value = {
            
            "idUser":`${idUser}`,
            "playlistName" : `${newPlaylist}`,
            "idSongsAdded":[`${id}`]
        }

        fetch('https://daken-app.herokuapp.com/playlist', {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(value)
        })
            .then((response) => {
                return response.json();
            })
            .then(() => {
                alert('Playlist created')
            })
    }
}
function addFavorite(idUser, idSong) {
    const value = {
            
        "idUser":`${idUser}`,
        "songs":[`${idSong}`]
    }
    fetch('https://daken-app.herokuapp.com/favorite', {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'PUT',
            body: JSON.stringify(value)
        })
            .then((response) => {
                return response.json();
            })
            .then(() => {
                alert('Favorite song added')
            })
    }




function checkFile() {
    if(filename() == 'music-player.html'){
        getModalPlaylist(id);
    }
}

checkFile();


export {
    upsertPlaylist,
    addFavorite,
}