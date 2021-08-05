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
            //console.log(resUser);
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
        .then((resUser) => {
            //console.log(resUser);
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
            //console.log(resRecent.data);
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
                        //console.log(res);
                        const recentShow = new userinfo(res);
                        recentShow.recentplay(res,'song__recent');
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
            //console.log(resRecent.data);
            if (resRecent.data.length === 0) {
                const recentShow = new userinfo(null);
                recentShow.recentplay(null, 'tab_content');
            } else {
                for (let i = 0; i < resRecent.data[0].songs.length; i++) {
                   // console.log(resRecent.data[0].songs[i]);
                    fetch(`https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/song/${resRecent.data[0].songs[i]}`, {
                        method: 'GET',
                    })
                        .then((response) => {
                            return response.json();
                        })
                        .then((res) => {
                            //console.log(res);
                            const recentShow = new userinfo(res);
                            recentShow.recentplay(res,'tab__content');
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
            console.log(resPlaylist.data);
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
function getPlaylist(data) {
    const profile = new userinfo(data);
        profile.playlist(data);
    for (let i = 0; i < data.idSongsAdded.length; i++) {
        //console.log(data.idSongsAdded[i]);
        const showPlaylist = new songsApi();
        showPlaylist.song(data.idSongsAdded[i], data);
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
        .then((resPlaylist) => {
            console.log(resPlaylist)
        })
}

function deletePlaylist(id) {

    fetch(`https://daken-app.herokuapp.com/playlist/${id}`, {
        method: 'DELETE',
    })
        .then((response) => {
            return response.json();
        })
        .then((resPlaylist) => {
            console.log(resPlaylist)
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
        .then((resPlaylist) => {
            console.log(resPlaylist)
        })
}



export {
    getUser,
    updateName,
    getRecent,
    favorite,
    getPlaylists,
    getPlaylist,
    deleteOneSong,
    deletePlaylist,
    updatePlaylist
}