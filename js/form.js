import { checkForm, logged } from './createUser.js'
const loggin = document.getElementById('loggin');
const emailLoggin = document.querySelectorAll('input')[0];
const passwordLoggin = document.querySelectorAll('input')[1];

const createForm = document.getElementById('create');
const nameCreate = document.querySelectorAll('input')[2];
const email = document.querySelectorAll('input')[3];
const password = document.querySelectorAll('input')[4];
const passwordCheck = document.querySelectorAll('input')[5];

createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkForm(email.value, password.value ,passwordCheck.value, nameCreate.value);
    email.value ='';
    password.value = '';
    passwordCheck.value = '';
    nameCreate.value = '';
});

loggin.addEventListener('submit', (e) => {
    e.preventDefault();
    const passwordConfirm = {
        password: passwordLoggin.value
    }
    logged(emailLoggin.value, passwordConfirm);
    
});