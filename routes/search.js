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
// Search Page
Router.get('/', authUser, async (req, res) => {
    // Current User
    var responseUser = await fetch(`https://api.fotoon.app/user/${req.user.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json());

    // Current User
    var responseUsers = await fetch(`https://api.fotoon.app/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json());

    var user = responseUser.data;
    var users = responseUsers.data;

    res.render('./user/search', {
        user: user,
        users: users
    });
});