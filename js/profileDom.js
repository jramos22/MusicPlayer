import {favorite, getPlaylists, getPlaylist ,getRecent, getUser ,updateName, deletePlaylist, updatePlaylist, deleteOneSong} from './profile.js'
import {filename} from './locationFile.js' 

const id = localStorage.getItem('idUser');
console.log(id);
if(filename() === 'profile.html') {
    getUser(id);
    getRecent(id);
    favorite(id);
    getPlaylists(id);
}

class userinfo {
    constructor(data){
        this.data = data.data;
    }
    nameUser(){
        const form = document.getElementById('nameUser');

        const labelName = document.createElement('label');
        labelName.setAttribute('for','user__name');
        labelName.innerHTML = `${this.data.name}`;
        form.appendChild(labelName);

        const inputName = document.createElement('input');
        inputName.setAttribute('type', 'text');
        inputName.setAttribute('id','user__name');
        inputName.setAttribute('name','user__name');
        form.appendChild(inputName);

        const buttonName = document.createElement('button');
        buttonName.setAttribute('type', 'submit');
        buttonName.setAttribute('class', 'btn__edit-name');
        const imgButton = document.createElement('img');
        imgButton.setAttribute('src', 'img/edit-icon-x30.png');
        buttonName.appendChild(imgButton);
        form.appendChild(buttonName);

        buttonName.addEventListener('click',(e)=> {
            e.preventDefault();
            labelName.setAttribute('contentEditable', 'true');
            labelName.focus();
            if (labelName.innerHTML != this.data.name) {

                const updateinfo ={
                    "name": `${labelName.innerHTML}`,
                    "email": `${this.data.email}`
                }

                updateName(JSON.stringify(updateinfo), id);
            }
        });
    }

    recentplay(data, lugar, favorite, i){
        const recent = document.getElementById(`${lugar}`);
        const div = document.createElement('div');
        div.setAttribute('class', 'recent__display');
        const recentImg = document.createElement('img');
        recentImg.setAttribute('src',`${data.image}`);
        div.appendChild(recentImg);

        const recentName = document.createElement('p');
        recentName.innerHTML = `${data.name}`;
        div.appendChild(recentName);

        const recentButtton = document.createElement('button');
        const imgPlay = document.createElement('img');
        imgPlay.setAttribute('src', 'img/play-icon-x35.png');
        recentButtton.appendChild(imgPlay);

        div.appendChild(recentButtton);
        recent.appendChild(div);
        recentButtton.addEventListener('click', (e)=>{
            e.preventDefault();

            
            localStorage.removeItem('idSong');
            localStorage.removeItem('type');
            localStorage.removeItem('idArtistName');
            localStorage.setItem('type', 'recent');
            localStorage.setItem('positionArray', lugar);
            localStorage.setItem('idSong', data.id);
            localStorage.setItem('idArtistName', data.id);
            
            if (favorite != 'recent') {
                localStorage.removeItem('type');
                localStorage.removeItem('favorite');
                localStorage.removeItem('postionArray');
                localStorage.setItem('type', 'favorite');
                localStorage.setItem('favorite', favorite.data[0].idUser);
                localStorage.setItem('positionArray', i);
                console.log(favorite.data[0].idUser);
                console.log(i);
            }else{
                console.log('hola');
            }
            window.location.href = 'music-player.html';
        });
    }

    playlists(data){
        const playlists = document.getElementById('playlists');
        const li = document.createElement('li');
        const buttonvalue = document.createElement('button');
        buttonvalue.setAttribute('id', `${data.playlistName}`);
        buttonvalue.innerHTML = `${data.playlistName}`;
        li.appendChild(buttonvalue);
        playlists.appendChild(li);

        buttonvalue.addEventListener('click', (e) => {
            e.preventDefault();
            const remove = document.getElementById('lists__songs');
            remove.innerHTML = '';
            const namePlaylist = document.getElementById('playlist');
            namePlaylist.innerHTML = '';
            console.log(data);
            getPlaylist(data);
        });
    }

    playlist(data){

        const playlist = document.getElementById('playlist');
        const labelName = document.createElement('label');
        labelName.setAttribute('for','user__name');
        labelName.innerHTML = `${data.playlistName}`;
        playlist.appendChild(labelName);

        const inputName = document.createElement('input');
        inputName.setAttribute('type', 'text');
        inputName.setAttribute('id','user__name');
        inputName.setAttribute('name','user__name');
        playlist.appendChild(inputName);
        
        const saveButton = document.createElement('button');
        saveButton.setAttribute('type', 'submit');
        saveButton.innerHTML = 'Save';
        saveButton.setAttribute('class', 'button__save--playlist');
        saveButton.setAttribute('id', 'btn__save--js');
        playlist.appendChild(saveButton);

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('type', 'submit');
        deleteButton.innerHTML = 'Delete playlist';
        deleteButton.setAttribute('class', 'button__delete--plst');
        deleteButton.setAttribute('id', 'delete--all-playlist')
        playlist.appendChild(deleteButton);

        const buttonName = document.createElement('button');
        buttonName.setAttribute('type', 'submit');
        buttonName.setAttribute('class', 'btn__edit-name');
        buttonName.setAttribute('id', 'btn__edit--song');
        const imgButton = document.createElement('img');
        imgButton.setAttribute('src', 'img/edit-icon-x30.png');
        buttonName.appendChild(imgButton);
        playlist.appendChild(buttonName);
        

        buttonName.addEventListener('click',(e)=> {
            e.preventDefault();
            labelName.setAttribute('contentEditable', 'true');
            labelName.focus();
            saveButton.classList.add('show__buttons');
            deleteButton.classList.add('show__buttons');
        });

        saveButton.addEventListener('click', (e) => {
            saveButton.classList.remove('show__buttons');
            deleteButton.classList.remove('show__buttons');

            if (labelName.innerHTML != data.playlistName) {

                for (let t = 0; t <= data.idSongsAdded.length; t++) {
                    const infoPlaylist = {
                        "idUser":`${data.idUser}`,
                        "playlistName": `${data.playlistName}`,
                        "idSongsAdded":[`${data.idSongsAdded[t]}`]
                    }
                    deleteOneSong(data._id, JSON.stringify(infoPlaylist));
                }

                for (let i = 0; i < data.idSongsAdded.length; i++) {
                    
                    const updateinfo = {
                        "idUser" : `${data.idUser}`,
                        "playlistName": `${labelName.innerHTML}`,
                        "idSongsAdded": `${data.idSongsAdded[i]}`
                    }
                    updatePlaylist(data._id, JSON.stringify(updateinfo));
                }
                
            }
            
        })
        
        deleteButton.addEventListener('click', (e) => {
            e.preventDefault();
            if(e.target.classList.contains('button__delete--plst')) {
            
                const namePlaylist = document.getElementById(`${data.playlistName}`);
                const idPlaylist = namePlaylist.getAttribute('id');

                if(idPlaylist === data.playlistName) {
                    const remove = document.getElementById('lists__songs');
                    remove.innerHTML = '';
                    const playlistRemove = document.getElementById('playlist');
                    playlistRemove.innerHTML = '';
                    namePlaylist.remove();
                    deletePlaylist(data._id);
                }
            }
        })
    }

}

export{
    userinfo,
}
