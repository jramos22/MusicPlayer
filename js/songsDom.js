import {filename} from './locationFile.js'
import {deleteOneSong} from './profile.js'


class infoSongs {
    constructor(data, playlist) {
        this.data = data;
        this.playlist = playlist;
    }
    artistSongsList() {
        const ul = document.getElementById('lists__songs');
        const li = document.createElement('li');
        li.setAttribute('class', 'dltOne--song');

        //console.log(li);        
        ul.appendChild(li);

        const imgSongs = document.createElement('img');
        imgSongs.setAttribute('src', `${this.data.image}`);
        li.appendChild(imgSongs);

        const songsName = document.createElement('p');
        songsName.innerHTML = `${this.data.name}`;
        li.appendChild(songsName);

        const albumName = document.createElement('p');
        albumName.innerHTML = `${this.data.album}`;
        li.appendChild(albumName);

        const Button = document.createElement('button');
        li.appendChild(Button);

        const imgButton = document.createElement('img');
        imgButton.setAttribute('src', 'img/play-icon-x35.png');
        Button.appendChild(imgButton);

        if(filename() === 'profile.html'){
            const buttonDeleteSong = document.getElementById('btn__edit--song');
            const saveBtnPlst = document.getElementById('btn__save--js');

            const buttonDelete = document.createElement('button');
            li.appendChild(buttonDelete);

            const removeSong = document.createElement('img');
            removeSong.setAttribute('src', 'img/delete-icon-x35px.png');
            removeSong.setAttribute('id', 'remove__song');
            removeSong.setAttribute('class', 'btn__delete')
            buttonDelete.appendChild(removeSong);
            
            buttonDeleteSong.addEventListener('click', (e) => {
                e.preventDefault();
                removeSong.classList.add('show__buttons');
            });

            saveBtnPlst.addEventListener('click', (e) => {
                e.preventDefault();
                removeSong.classList.remove('show__buttons');
            })

            removeSong.addEventListener('click', (e) => {
                e.preventDefault();
                if(e.target.classList.contains('btn__delete')) {
                    const infoPlaylist = {
                        "idUser":`${this.playlist.idUser}`,
                        "playlistName": `${this.playlist.playlistName}`,
                        "idSongsAdded":[`${this.data.id}`]
                    }
                    console.log(this.data);
                    const li = e.target.parentElement.parentElement;
                    li.remove();
                    deleteOneSong(this.playlist._id, JSON.stringify(infoPlaylist));
                }
            })
        }
    }
}

export {
    infoSongs,
}