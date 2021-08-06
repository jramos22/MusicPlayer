class ModalFunction {

    getUserPlaylist (data) {

        const playlistUser = document.getElementById('exist-list');
        const option1 = document.createElement('option');
        option1.setAttribute('name', `${data.playlistName}`);

        option1.value = `${data._id}`;
        option1.text = `${data.playlistName}`;

        playlistUser.add(option1, playlistUser.options[1]);
    }
}
export{
    ModalFunction,
}