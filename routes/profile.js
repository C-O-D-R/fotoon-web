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
// Main Page
Router.get('/', authUser, async (req, res) => {
    var responseUser;
    var responsePosts;

    try {
        responseUser = await fetch(`https://api.fotoon.app/user/${req.user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json());

        responsePosts = await fetch(`https://api.fotoon.app/posts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                ids: [req.user.id]
            }
        }).then((res) => res.json());
    } catch (error) {
        
    }

    console.log(responseUser)

    var user = responseUser.data;

    res.render('./profile/profile', {
        user: user,
        profile: user
    });
});

Router.get('/:id', authUser, async (req, res) => {
    var responseUser = await fetch(`https://api.fotoon.app/user/${req.user.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json());

    var responseProfile = await fetch(`https://api.fotoon.app/user/${req.params.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json());

    var user = responseUser.data;
    var profile = responseProfile.data;

    res.render('./profile/profile', {
        user: user,
        profile: profile
    });
});