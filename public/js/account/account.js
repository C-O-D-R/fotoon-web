async function submit() {
    // Variables
    var files = document.getElementById('fileInput').files;
    var submitButton = document.getElementById('submitButton');
    var shortBio = document.getElementById('shortBioInput');
    var longBio = document.getElementById('longBioInput');
    var encodedImage;

    // Loading Animation
    submitButton.classList.add('is-loading');

    // Checks
    shortBio = shortBio.value == '' ? shortBio.getAttribute('placeholder') : shortBio.value;
    longBio = longBio.value == '' ? longBio.getAttribute('placeholder') : longBio.value;

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
            shortBio: shortBio,
            longBio: longBio,
            token: document.cookie.split('=')[1]
        })
    }).then((res) => res.json());

    if (response) { 
        submitButton.classList.remove('is-loading');
        if (response.status == 'error') return submitButtonHelper.innerHTML = response.description;
        if (response.status == 'success') return alert('Changes uploaded successfully!');
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