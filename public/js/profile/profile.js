async function deleteImage(imageId) {
    var response = await fetch(`https://api.fotoon.app/post/${imageId}`, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: document.cookie.split('=')[1]
        })
    }).then((res) => res.json());

    if (response.status == 'success') window.location.reload();
}