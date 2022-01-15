async function unfollow(userId) {
    var response = await fetch(`https://api.fotoon.app/user/unfollow/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: document.cookie.split('=')[1]
        })
    }).then((res) => res.json());

    if (response.status == 'success') window.location.reload();
}

async function follow(userId) {
    var response = await fetch(`https://api.fotoon.app/user/follow/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: document.cookie.split('=')[1]
        })
    }).then((res) => res.json());
    console.log(response);

    if (response.status == 'success') window.location.reload();
}