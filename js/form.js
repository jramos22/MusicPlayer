import{createUser, getUsers} from './createUser.js'

const loggin = document.getElementById('loggin');

const createForm = document.getElementById('create');
const nameCreate = document.querySelectorAll('input')[2];
const email = document.querySelectorAll('input')[3];
const password = document.querySelectorAll('input')[4];
const passwordCheck = document.querySelectorAll('input')[5];

createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkForm();
});

function checkForm(){
    if (email.value === 'hola') {
        error(email, 'Email is already registered');
    } else if(password.value != passwordCheck.value){
        alert('the password does not match');
    }else{
        const info = {
            "name": `${nameCreate.value}`,
            "email": `${email.value}`,
            "password": `${password.value}`,
        }
        createUser(info);
        //getUsers();
    }
}

function error(input, message) {
    const inputSelect = input;
    inputSelect.value = message;
};