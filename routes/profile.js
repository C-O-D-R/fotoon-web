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
// User
Router.get('/', authUser, async (req, res) => {
    var responseUser;
    var responsePosts;

    try {
        // Current User
        responseUser = await fetch(`https://api.fotoon.app/user/${req.user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json());

        // Current User Posts
        responsePosts = await fetch('https://api.fotoon.app/post', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ids: [req.user.id]
            })
        }).then((res) => res.json());


    } catch (error) {
        console.log(error);
    }
    console.log(responsePosts);
    var user = responseUser.data;
    //posts = responsePosts.data == undefined ? [] : responsePosts.data;

    res.render('./profile/profile', {
        user: user,
        profile: user,
        posts: 'posts'
    });
});

/*
// Specific User
Router.get('/:id', authUser, async (req, res) => {
    var profileId = req.params.id;
    var responseUser;
    var responseProfile;
    var responsePosts;

    try {
        // Current User
        responseUser = await fetch(`https://api.fotoon.app/user/${req.user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json());

        // Profile
        responseProfile = await fetch(`https://api.fotoon.app/user/${profileId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json());

        // Profile Posts
        responsePosts = await fetch(`https://api.fotoon.app/post`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                ids: [profileId]
            }
        }).then((res) => res.json());



        // Checks

    } catch (error) {
        
    }

    var user = responseUser.data;
    var profile = responseProfile.data;
    var posts = responsePosts.data == undefined ? [] : responsePosts.data;

    res.render('./profile/profile', {
        user: user,
        profile: profile,
        posts: posts
    });
});
*/