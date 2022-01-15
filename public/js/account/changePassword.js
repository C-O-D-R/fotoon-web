async function change() {
    // Variables
    var password1Input = document.getElementById('password1Input').value;
    var password2Input = document.getElementById('password2Input').value;
    var button = document.getElementById('changeButton');

    // Helper Text Variables
    var buttonHelper = document.getElementById('changeButtonHelper');

    // Clear Helpers
    buttonHelper.innerHTML = '';

    // Create Waiting Icon
    button.classList.add('is-loading');

    // Checks
    if (password1Input != password2Input) {
        button.classList.remove('is-loading');
        return buttonHelper.innerHTML = 'Passwords do not match!'
    }

    // Response
    var response = await fetch('https://api.fotoon.app/user/change-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: password1Input,
            token: document.cookie.split('=')[1]
        })
    }).then((res) => res.json());

    if (response.status == 'error') {
        button.classList.remove('is-loading');
        return buttonHelper.innerHTML = response.description;
    }

    if (response.status == 'success') {
        button.classList.remove('is-loading');
        return alert('Password chaged successfully!');
    }
}

async function authorize(options) {
    // Variables
    var password1 = options.username;
    var password2 = options.password;

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