// ----------------------------------------------------------------
// Imports
// ----------------------------------------------------------------
// Express
import express from 'express';

// Fetch
import fetch from 'node-fetch';

// ----------------------------------------------------------------
// Router
// ----------------------------------------------------------------
// Export Router
const Router = express.Router();
export default Router;


// ----------------------------------------------------------------
// Routes
// ----------------------------------------------------------------
// Post Redirect
Router.get('/', authUser, async (req, res) => {
    // Variables
    var responseUser;
    var responsePost;

    // Update Database
    try {
        responseUser = await fetch(`https://api.fotoon.app/user/${req.user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json());

        responsePost = await fetch(`https://api.fotoon.app/post/follows`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: req.cookies.token
            })
        }).then((res) => res.json());
    } catch (error) {
        console.log(error);
    }
    
    if (responsePost.data.at(-1) == undefined) return res.redirect('/profile');
    else return res.redirect(`/post/${responsePost.data.at(-1)._id}`);
});

// Post Redirect
Router.get('/next/:id', authUser, async (req, res) => {
    // Variables
    var responseUser;
    var responsePost;

    // Update Database
    try {
        responseUser = await fetch(`https://api.fotoon.app/user/${req.user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json());

        responsePost = await fetch(`https://api.fotoon.app/post/follows`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: req.cookies.token
            })
        }).then((res) => res.json());
    } catch (error) {
        console.log(error);
    }

    var pos = responsePost.data.findIndex(obj => obj._id == req.params.id) - 1;
    if (responsePost.data[pos] == undefined) return res.redirect(`/post/${req.params.id}`)
    else return res.redirect(`/post/${responsePost.data[pos]._id}`)
});

// Post Redirect
Router.get('/previous/:id', authUser, async (req, res) => {
    // Variables
    var responseUser;
    var responsePost;

    // Update Database
    try {
        responseUser = await fetch(`https://api.fotoon.app/user/${req.user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json());

        responsePost = await fetch(`https://api.fotoon.app/post/follows`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: req.cookies.token
            })
        }).then((res) => res.json());
    } catch (error) {
        console.log(error);
    }

    var pos = responsePost.data.findIndex(obj => obj._id == req.params.id) + 1;
    if (responsePost.data[pos] == undefined) return res.redirect(`/post/${req.params.id}`)
    else return res.redirect(`/post/${responsePost.data[pos]._id}`)
});

// Post by ID
Router.get('/:id', authUser, async (req, res) => {
    // Variables 
    var dbPost = await fetch(`https://api.fotoon.app/post/${req.params.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json());

    var dbPostOwner = await fetch(`https://api.fotoon.app/user/${dbPost.data.ownerId}`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json());

    var dbUser = await fetch(`https://api.fotoon.app/user/${req.user.id}`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json());

    if (dbPost.data.length < 1) res.redirect('/');

    return res.render('./post/post', {
        user: dbUser.data,
        post: dbPost.data,
        postOwner: dbPostOwner.data
    });
});