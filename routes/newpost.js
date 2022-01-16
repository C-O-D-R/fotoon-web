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
// New Post
Router.get('/', authUser, async (req, res) => {
    // Variables
    var responseUser;

    try {
        // Current User
        responseUser = await fetch(`https://api.fotoon.app/user/${req.user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json());
    } catch (error) {
        
    }

    var user = responseUser.data;

    res.render('./post/newpost', {
        user: user
    });
});