import {getPlaylists, updatePlaylist} from './profile.js'

const id = localStorage.getItem('idUser');


function openModal() {

    const open = document.getElementById('add__song');
    const modal_container = document.getElementById('modal_container');
    const close = document.getElementById('close');

    open.addEventListener('click', () => {
        modal_container.classList.add('show');  
    });
    close.addEventListener('click', () => {
        modal_container.classList.remove('show');
    });
}

class ModalFunction {

    constructor (data) {
        this.data = data;
    }

    getPlaylistsUser (data) {

        const playlistUser = document.getElementById('exist-list');
        const option1 = document.createElement('option');

        option1.value = `${data._id}`
        option1.text = `${data.playlistName}`

        playlistUser.add(option1, playlistUser.options[1]);

        //console.log(option1);
    }
}

getPlaylists(id);
updatePlaylist(id);
openModal();


export {
    openModal,
    ModalFunction,
}