document.addEventListener('DOMContentLoaded', () => {
    loadPasswords();
});

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'Thibo Meyers' && password === 'Appel2020') {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('app').style.display = 'block';
    } else {
        alert('Ongeldige gebruikersnaam of wachtwoord');
    }
}

function logout() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('app').style.display = 'none';
}

function addPassword() {
    const website = document.getElementById('website').value;
    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;

    if (website && user && pass) {
        const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwords.push({ website, user, pass });
        localStorage.setItem('passwords', JSON.stringify(passwords));
        loadPasswords();
        document.getElementById('website').value = '';
        document.getElementById('user').value = '';
        document.getElementById('pass').value = '';
    } else {
        alert('Vul alle velden in');
    }
}

function loadPasswords() {
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    displayPasswords(passwords);
}

function displayPasswords(passwords) {
    const passwordList = document.getElementById('password-list');
    passwordList.innerHTML = '';
    passwords.forEach((item, index) => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        div.textContent = `${item.website} - ${item.user} - ${item.pass}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Verwijderen';
        deleteButton.onclick = () => {
            passwords.splice(index, 1);
            localStorage.setItem('passwords', JSON.stringify(passwords));
            loadPasswords();
        };
        li.appendChild(div);
        li.appendChild(deleteButton);
        passwordList.appendChild(li);
    });
}

function searchPasswords() {
    const query = document.getElementById('search').value.toLowerCase();
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    const filteredPasswords = passwords.filter(item => 
        item.website.toLowerCase().includes(query) ||
        item.user.toLowerCase().includes(query) ||
        item.pass.toLowerCase().includes(query)
    );
    displayPasswords(filteredPasswords);
}
