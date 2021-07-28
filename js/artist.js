import {apiArtist} from './artistApi.js';

apiArtist();
class infoArtist {
    constructor(data) {
        this.data = data;
    }
    showArtist() {
        const array =['artistRadiohead.html','artistAurora.html','artistGorillas.html']
        for (let i = 0; i < this.data.length; i++) {
            const artistview = document.getElementById('showArtist');
            const anchor =document.createElement('a');
            anchor.setAttribute('href', `${array[i]}`);
            artistview.appendChild(anchor);

            const li = document.createElement('li');
            li.setAttribute('class', 'artistLi');
            anchor.appendChild(li);

            const imgArtist = document.createElement('img');
            imgArtist.setAttribute('src', `${this.data[i].image}`);
            imgArtist.setAttribute('class', 'picture-artist');
            li.appendChild(imgArtist);

            const artistName = document.createElement('p');
            artistName.setAttribute('class', 'name-artist');
            artistName.innerHTML = `${this.data[i].name}`;
            li.appendChild(artistName);
        }
    }
    showArtistComplete(num){
        const bio = document.getElementById('bio');
        const imgbio = document.createElement('img');
        imgbio.setAttribute('src', `${this.data[num].image}`);
        bio.appendChild(imgbio);

        const title = document.createElement('h3');
        title.innerHTML = `${this.data[num].name}`;
        bio.appendChild(title);

        const description = document.createElement('p');
        description.innerHTML = `${this.data[num].description}`;
        bio.appendChild(description);
    }
}



export {
    infoArtist,
}