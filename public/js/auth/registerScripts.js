async function register() {
    // Variables
    var usernameInput = document.getElementById('usernameInput').value;
    var passwordInput = document.getElementById('passwordInput').value;
    var button = document.getElementById('registerButton');

    // Options
    var options = {
        username: usernameInput,
        password: passwordInput
    };

    // Create Waiting Icon
    button.classList.add('is-loading');

    // Wait for authentication to complete
    if (await authorize(options)) {
        alert('Success!');
    }
}

async function authorize (options) {
    // Variables
    var username = options.username;
    var password = options.password;

    // Authorize
    try {
        var response = await fetch('https://api.fotoon.app/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then((res) => res.json());
        console.log(response);
        if (response.code === 'register_success') {
            //localStorage.setItem('token', response.data.token);
            return true;
        }

    } catch (error) {
        return false;
    }
}