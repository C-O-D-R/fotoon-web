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

// Post by ID
Router.get('/:id', authUser, async (req, res) => {
    res.send(200);
});