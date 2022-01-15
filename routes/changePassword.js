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
    // Current User
    var responseUser = await fetch(`https://api.fotoon.app/user/${req.user.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json());

    var user = responseUser.data;

    res.render('./profile/change-password', {
        user: user
    });
});