import{getUser}from './user.js'

const idUser = localStorage.getItem("idUser");
console.log(idUser);

class infoLogged {
    constructor(user, recent) {
        this.user = user;
        this.recent = recent;
    }
    showUser() {
        const title = document.getElementById('logged__text');
        const welcome = document.createElement('h2');
        welcome.innerHTML = 'Welcome';
        title.appendChild(welcome);

        const User = document.createElement('span');
        User.innerHTML = ` ${this.user.name}`;
        welcome.appendChild(User);

        if (this.recent === null) {
            const pinfo = document.createElement('p');
            pinfo.innerHTML = 'there are no recent songs';
            title.appendChild(pinfo);
        }else{
            const pinfo = document.createElement('p');
            pinfo.innerHTML = 'Go to the last song you listened';
            title.appendChild(pinfo);
    
            const img = document.getElementById('logged__img');
            const imgArtist = document.createElement('img');
            imgArtist.setAttribute('src', `${this.recent.image}`);
            img.appendChild(imgArtist);
    
            const name = document.getElementById('logged__song');
            const nameSong = document.createElement('h3');
            nameSong.innerHTML = `${this.recent.name}`;
            name.appendChild(nameSong);
    
            const nameAlbum = document.createElement('p');
            nameAlbum.innerHTML = `${this.recent.album}`;
            name.appendChild(nameAlbum);
    
            const recentButtton = document.createElement('button');
            const imgPlay = document.createElement('img');
            imgPlay.setAttribute('src', 'img/play-icon-x35.png');
    
            recentButtton.appendChild(imgPlay);
            name.appendChild(recentButtton);
        }
    }

}

getUser(idUser);

export{
    infoLogged
}