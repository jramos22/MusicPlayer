import { filename } from './locationFile.js';
import { ModalFunction } from './modal.js';
import { userinfo } from './profileDom.js'
import{ songsApi} from './songsApi.js'

function getUser(idUser) {
    fetch(`https://daken-app.herokuapp.com/user/${idUser}`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .then((resUser) => {
            const profile = new userinfo(resUser);
            profile.nameUser();
        })
}

function updateName(value, id) {
    fetch(`https://daken-app.herokuapp.com/user/${id}`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'PUT',
        body: value,
    })
        .then((response) => {
            return response.json();
        })
}

function getRecent(id) {
    fetch(`https://daken-app.herokuapp.com/recent/${id}`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .then((resRecent) => {
            if (resRecent.data.length === 0) {
                const recentShow = new userinfo(null);
                recentShow.recentplay(null);
            } else {
                fetch(`https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/song/${resRecent.data[0].idSong}`, {
                    method: 'GET',
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((res) => {
                        const recentShow = new userinfo(res);
                        recentShow.recentplay(res,'song__recent', 'recent');
                    })
            }
        })
}


function favorite(id) {
    fetch(`https://daken-app.herokuapp.com/favorite/${id}`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .then((resRecent) => {
            if (resRecent.data.length === 0) {
                const recentShow = new userinfo(null);
                recentShow.recentplay(null, 'tab_content');
            } else {
                for (let i = 0; i < resRecent.data[0].songs.length; i++) {
                    fetch(`https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/song/${resRecent.data[0].songs[i]}`, {
                        method: 'GET',
                    })
                        .then((response) => {
                            return response.json();
                        })
                        .then((res) => {
                            const recentShow = new userinfo(res);
                            recentShow.recentplay(res,'tab__content', resRecent, i);
                        })
                }
                }
        })
}

function getPlaylists(id) {
    fetch(`https://daken-app.herokuapp.com/playlist/${id}`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .then((resPlaylist) => {
            if (resPlaylist.data.length === 0) {
                const recentShow = new userinfo(null);
                recentShow.recentplay(null, 'tab_content');
            } else {
                for (let i = 0; i < resPlaylist.data.length; i++) {
                    const showPlaylist = new userinfo(resPlaylist);
                    showPlaylist.playlists(resPlaylist.data[i]);
                }
            }
        })
}

function getModalPlaylist(id) {

    fetch(`https://daken-app.herokuapp.com/playlist/${id}`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .then((resPlaylist) => {
            const showModalPlaylist = new ModalFunction();
            for (let i = 0; i < resPlaylist.data.length; i++) {
                showModalPlaylist.getUserPlaylist(resPlaylist.data[i]);
            }
        })
}

function getPlaylist(data) {
    const profile = new userinfo(data);
        profile.playlist(data);
    for (let i = 0; i < data.idSongsAdded.length; i++) {
        const showPlaylist = new songsApi();
        showPlaylist.song(data.idSongsAdded[i], data, `${i}`);
    }
}

function deleteOneSong(id, value) {
    fetch(`https://daken-app.herokuapp.com/playlistsong/${id}`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'DELETE',
        body: value,
    })
        .then((response) => {
            return response.json();
        })
}

function deletePlaylist(id) {

    fetch(`https://daken-app.herokuapp.com/playlist/${id}`, {
        method: 'DELETE',
    })
        .then((response) => {
            return response.json();
        })
}

function updatePlaylist(id, value) {
    fetch(`https://daken-app.herokuapp.com/playlist/${id}`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'PUT',
        body: value,
    })
        .then((response) => {
            return response.json();
        })
}

function updaterecent(id, value) {
    fetch(`https://daken-app.herokuapp.com/recent/${id}`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'PUT',
        body: value,
    })
        .then((response) => {
            return response.json();
        })
        .then((resPlaylist) => {
            console.log(resPlaylist.data.idSong)
        })
}

export {
    getUser,
    updateName,
    getRecent,
    favorite,
    getPlaylists,
    getPlaylist,
    getModalPlaylist,
    deleteOneSong,
    deletePlaylist,
    updatePlaylist,
    updaterecent
}