async function login() {
    // Variables
    var usernameInput = document.getElementById('usernameInput').value;
    var passwordInput = document.getElementById('passwordInput').value;
    var button = document.getElementById('loginButton');

    // Helper Text Variables
    var usernameHelper = document.getElementById('usernameHelper');
    var passwordHelper = document.getElementById('passwordHelper');
    var buttonHelper = document.getElementById('loginButtonHelper');

    // Options
    var options = {
        username: usernameInput,
        password: passwordInput
    };

    // Clear Helpers
    usernameHelper.innerHTML = '';
    passwordHelper.innerHTML = '';
    buttonHelper.innerHTML = '';

    // Create Waiting Icon
    button.classList.add('is-loading');

    // Response
    var response = await authorize(options);

    // General Error
    if (!response) {
        button.classList.remove('is-loading');
        buttonHelper.innerHTML = 'Something went wrong, please check browser console for more details.';
    }

    // 200
    if (response.code == 'login_success') 
    {
        document.cookie =`token=${response.data.token}; path=/`;
        window.location.replace('/posts');
    }

    // 401
    if (response.code == 'invalid_credentials') {
        button.classList.remove('is-loading');
        buttonHelper.innerHTML = response.description;
    }

    // 500
    if (response.code == 'server_error') {
        button.classList.remove('is-loading');
        buttonHelper.innerHTML = response.description;
    }
}

async function authorize(options) {
    // Variables
    var username = options.username;
    var password = options.password;

    // Authorize
    try {
        var response = await fetch('https://api.fotoon.app/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then((res) => res.json());

        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
}