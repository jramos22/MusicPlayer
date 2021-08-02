class infoSongs {
    constructor(data) {
        this.data = data;
    }
    artistSongsList() {
        for (let i = 0; i < this.data.length; i++) {
            const ul = document.getElementById('lists__songs');
            const li = document.createElement('li');
            ul.appendChild(li);

            const imgSongs = document.createElement('img');
            imgSongs.setAttribute('src', `${this.data[i].image}`);
            li.appendChild(imgSongs);

            const songsName = document.createElement('p');
            songsName.innerHTML = `${this.data[i].name}`;
            li.appendChild(songsName);

            const albumName = document.createElement('p');
            albumName.innerHTML = `${this.data[i].album}`;
            li.appendChild(albumName);

            const Button = document.createElement('button');
            Button.setAttribute('id', '#');
            li.appendChild(Button);

            const imgButton = document.createElement('img');
            imgButton.setAttribute('src', 'img/play-icon-x35.png');
            Button.appendChild(imgButton);
        }
    }
}

export {
    infoSongs,
}