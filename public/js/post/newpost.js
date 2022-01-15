document.addEventListener('DOMContentLoaded', () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }
});

async function submit() {
    // Variables
    var files = document.getElementById('fileInput').files;
    var submitButton = document.getElementById('submitButton');
    var caption = document.getElementById('captionInput').value;
    var encodedImage;

    // Helper Text Variables
    var submitButtonHelper = document.getElementById('submitButtonHelper');
    submitButtonHelper.innerHTML = '';

    // Loading Animation
    submitButton.classList.add('is-loading');

    if (files.length > 2) {
        submitButton.classList.remove('is-loading');
        return alert('Only one file can be uploaded!');
    }

    if (files.length > 0) encodedImage = await encode(files[0]);

    // API
    var response = await fetch('https://api.fotoon.app/post', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            image: encodedImage,
            caption: caption,
            token: document.cookie.split('=')[1]
        })
    }).then((res) => res.json());

    if (response) { 
        submitButton.classList.remove('is-loading');
        if (response.status == 'error') return submitButtonHelper.innerHTML = response.description;
        if (response.status == 'success') return alert('Image uploaded successfully!');
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