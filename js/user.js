import{ infoLogged } from './userDom.js'


function getUser(idUser) {
    fetch(`https://daken-app.herokuapp.com/user/${idUser}`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .then((resUser) => {
            console.log(resUser);
            fetch(`https://daken-app.herokuapp.com/recent/${idUser}`, {
                method: 'GET',
            })
                .then((response) => {
                    return response.json();
                })
                .then((resRecent) => {
                    console.log(resRecent.data);
                    if (resRecent.data.length === 0) {
                        const userShow = new infoLogged(resUser.data, null);
                        userShow.showUser();
                    } else {
                        fetch(`https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/song/${resRecent.data[0].idSong}`)
                            .then((response) => response.json())
                            .then((res) => {
                                console.log(res);
                                const userShow = new infoLogged(resUser.data, res);
                                userShow.showUser();
                            });
                    }
                })
        })
}

export{
    getUser
}