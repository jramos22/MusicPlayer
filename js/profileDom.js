import {favorite, getPlaylists, getPlaylist ,getRecent, getUser ,updateName} from './profile.js'

const id = localStorage.getItem('idUser');
console.log(id);
getUser(id);
getRecent(id);
favorite(id);
getPlaylists(id);

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

    recentplay(data, lugar){
        const recent = document.getElementById(`${lugar}`);
        const div = document.createElement('div');
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
    }

    playlists(data){
        const playlists = document.getElementById('playlists');
        const li = document.createElement('li');
        const buttonvalue = document.createElement('button');
        buttonvalue.innerHTML = `${data.playlistName}`;
        li.appendChild(buttonvalue);
        playlists.appendChild(li);

        buttonvalue.addEventListener('click', (e) => {
            e.preventDefault();
            const remove = document.getElementById('lists__songs');
            remove.innerHTML = '';
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

        const buttonName = document.createElement('button');
        buttonName.setAttribute('type', 'submit');
        buttonName.setAttribute('class', 'btn__edit-name');
        const imgButton = document.createElement('img');
        imgButton.setAttribute('src', 'img/edit-icon-x30.png');
        buttonName.appendChild(imgButton);
        playlist.appendChild(buttonName);

        buttonName.addEventListener('click',(e)=> {
            e.preventDefault();
            labelName.setAttribute('contentEditable', 'true');
            labelName.focus();
            if (labelName.innerHTML != data.name) {

                /*const updateinfo ={
                    "name": `${labelName.innerHTML}`,
                    "email": `${data.email}`
                }*/

                //updateName(JSON.stringify(updateinfo), id);
            }
        });
    }
}

export{
    userinfo
}
