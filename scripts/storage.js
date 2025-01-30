// Save user data to localStorage
function saveUser(user) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Retrieve user data from localStorage
function getUser(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(u => u.email === email);
}