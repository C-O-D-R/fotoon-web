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
        responsePosts = await fetch('https://api.fotoon.app/post/owned', {
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

    var user = responseUser.data;
    var posts = responsePosts.data == undefined ? [] : responsePosts.data;

    res.render('./profile/profile', {
        user: user,
        profile: user,
        posts: posts
    });
});