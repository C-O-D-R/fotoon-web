async function submit() {
    // Variables
    var files = document.getElementById('fileInput').files;
    var submitButton = document.getElementById('submitButton');
    var encodedImage;

    // Loading Animation
    submitButton.classList.add('is-loading');

    if (files.length > 2) {
        submitButton.classList.remove('is-loading');
        return alert('Only one file can be uploaded!');
    }

    if (files.length > 0) encodedImage = await encode(files[0]);

    // API
    var response = await fetch('https://api.fotoon.app/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            avatar: encodedImage,
            token: document.cookie.split('=')[1]
        })
    }).then((res) => res.json());

    if (response) { 
        submitButton.classList.remove('is-loading');
        if (response.status == 'error') return submitButtonHelper.innerHTML = response.description;
        if (response.status == 'success') return alert('Avatar uploaded successfully!');
    }
}

async function encode(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    });
}