import {filename} from './locationFile.js'

class infoSongs {
    constructor(data) {
        this.data = data;
    }
    artistSongsList() {
        const ul = document.getElementById('lists__songs');
        const li = document.createElement('li');
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
        Button.setAttribute('id', '#');
        li.appendChild(Button);

        const imgButton = document.createElement('img');
        imgButton.setAttribute('src', 'img/play-icon-x35.png');
        Button.appendChild(imgButton);

        if(filename() === 'profile.html?user__name=#'){
            
            const buttonDeleteSong = document.getElementById('btn__edit--song');
            const saveBtnPlst = document.getElementById('btn__save--js');

            const buttonDelete = document.createElement('button');
            buttonDelete.setAttribute('id', '#');
            li.appendChild(buttonDelete);

            const removeSong = document.createElement('img');
            removeSong.setAttribute('src', 'img/delete-icon-x35px.png');
            removeSong.setAttribute('id', 'remove__song');
            removeSong.setAttribute('class', 'btn__delete')
            buttonDelete.appendChild(removeSong);
            
            buttonDeleteSong.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(buttonDeleteSong);
                removeSong.classList.add('show__buttons');
            });

            saveBtnPlst.addEventListener('click', (e) => {
                e.preventDefault();
                removeSong.classList.remove('show__buttons');
            })
        }
    }
}

export {
    infoSongs,
}