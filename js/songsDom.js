import {filename} from './locationFile.js'
import {deleteOneSong} from './profile.js'


class infoSongs {
    constructor(data, playlist, artists, idArtist) {
        this.data = data;
        this.playlist = playlist;
        this.artists = artists;
        this.idArtist = idArtist;
    }
    artistSongsList() {
        const ul = document.getElementById('lists__songs');
        const li = document.createElement('li');
        li.setAttribute('class', 'dltOne--song');       
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

        Button.addEventListener('click', (e)=>{
            e.preventDefault();
            if (filename() === 'artist.html') {
                localStorage.removeItem('postionArray');
                localStorage.removeItem('idSong');
                localStorage.removeItem('type');
                localStorage.removeItem('idArtistName');
                localStorage.setItem('type', 'artist');
                localStorage.setItem('idArtistName', this.idArtist.id);
                localStorage.setItem('positionArray', this.playlist);
                localStorage.setItem('idSong', this.data.id);
            }else{
                localStorage.removeItem('postionArray');
                localStorage.removeItem('idSong');
                localStorage.removeItem('type');
                localStorage.removeItem('idArtistName');
                localStorage.removeItem('postion');
                localStorage.setItem('position', this.playlist.idSongsAdded.indexOf(this.data.id));
                localStorage.setItem('type', 'playlist');
                localStorage.setItem('positionArray', this.playlist._id);
                localStorage.setItem('idSong', this.data.id);
            }
            window.location.href = 'music-player.html';
        });
        
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