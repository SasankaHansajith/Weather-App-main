function showPart(part) {
    const loginCard = document.querySelector('.login');
    const signupCard = document.querySelector('.signup');

    if (part === 'login') {
        loginCard.style.display = 'block';
        signupCard.style.display = 'none';
    } else if (part === 'signup') {
        loginCard.style.display = 'none';
        signupCard.style.display = 'block';
    }
}

showPart('login');

function attemptLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const storedUserData = JSON.parse(localStorage.getItem('user_data')) || {};

    if (username === storedUserData.username && password === storedUserData.password) {
        document.getElementById('error-message').textContent = '';
        alert('Login successful!');

    } else {
        document.getElementById('error-message').textContent = 'Invalid username or password.';
    }
}

function attemptSignup() {
    const signupUsername = document.getElementById('signup-username').value;
    const signupEmail = document.getElementById('signup-email').value;
    const signupPassword = document.getElementById('signup-password').value;

    if (!signupUsername || !signupEmail || !signupPassword) {
        document.getElementById('signup-error-message').textContent = 'All fields are required.';
        return;
    }

    localStorage.setItem('user_data', JSON.stringify({
        username: signupUsername,
        email: signupEmail,
        password: signupPassword
    }));

    document.getElementById('signup-error-message').textContent = '';
    alert('Signup successful! Logging in...');

    document.getElementById('username').value = signupUsername;
    document.getElementById('password').value = signupPassword;

    attemptLogin();
}

