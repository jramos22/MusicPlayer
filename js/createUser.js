const url = 'http://localhost:3000/user'
function createUser(info) {
    console.log(JSON.stringify(info));
    fetch(url, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(info),
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
    alert(`La persona fue agregada satisfactoriamente`);
}
function getUsers() {
    fetch('http://localhost:3000/users', {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
    //alert(`La persona fue agregada satisfactoriamente`);
}

export {
    createUser,
    getUsers
}