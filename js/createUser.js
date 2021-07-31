
function createUser(info) {
    console.log(JSON.stringify(info));
    fetch('https://daken-app.herokuapp.com/user', {
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
    alert(`El usuario fue agregado satisfactoriamente`);
}


function logged(email, password) {
    fetch(`https://daken-app.herokuapp.com/users/${email}`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(password),
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.logginUser.status == true) {
                localStorage.setItem("idUser", data.logginUser.id);
                window.location.href = "index.html";
            }else{
                alert('Email or password are not valid')
            }
        })
}


function checkForm(email, password, passwordCheck, name) {
    fetch('https://daken-app.herokuapp.com/users', {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            for (let i = 0; i < data.data.length; i++) {
                if (email === data.data[i].email) {
                    alert('the Email is already in use');
                    break
                } else if (password != passwordCheck) {
                    alert('the password does not match');
                    break
                } else if (email != data.data[i].email & password === passwordCheck) {
                    const info = {
                        "name": `${name}`,
                        "email": `${email}`,
                        "password": `${password}`,
                    }
                    createUser(info);
                    break
                }
            }
        })
}

export {
    checkForm,
    logged
}