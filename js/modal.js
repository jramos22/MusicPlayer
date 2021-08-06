import { filename } from './locationFile.js';
import {getModalPlaylist, /* updatePlaylist */} from './profile.js'

const id = localStorage.getItem('idUser');


function openModal(id, idUser) {
    const savePlaylist = document.getElementById('save-playlist');
    const newPlaylist = document.getElementById('add-list');

    const open = document.getElementById('add__song');
    const modal_container = document.getElementById('modal_container');
    const close = document.getElementById('close');

    newPlaylist.innerText = '';
    console.log(id);

    open.addEventListener('click', () => {
        modal_container.classList.add('show');  
    });
    close.addEventListener('click', () => {
        modal_container.classList.remove('show');
    });

    savePlaylist.addEventListener('click', (e) => {
        e.preventDefault();
        const selectOption = document.getElementById('exist-list');
        
        upsertPlaylist(selectOption.value, newPlaylist.value, id, idUser, selectOption.selectedOptions[0].innerText);

        /* console.log(selectOption.value);
        console.log(newPlaylist.value);
        console.log(selectOption.selectedOptions[0].innerText); */
    })
}

function upsertPlaylist(selectPlaylist, newPlaylist, id, idUser, name) {
    console.log(id);
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
            .then((data) => {
                console.log(data);
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
            .then((data) => {
                console.log(data);
            })
    }
}

class ModalFunction {

    getUserPlaylist (data) {

        const playlistUser = document.getElementById('exist-list');
        const option1 = document.createElement('option');
        option1.setAttribute('name', `${data.playlistName}`);

        option1.value = `${data._id}`;
        option1.text = `${data.playlistName}`;

        playlistUser.add(option1, playlistUser.options[1]);

        console.log(option1);
    }
}

function checkFile() {
    if(filename() == 'music-player.html'){
        getModalPlaylist(id);
    }
}

checkFile();

/* updatePlaylist(id); */
/* openModal(); */

export {
    openModal,
    ModalFunction,
}