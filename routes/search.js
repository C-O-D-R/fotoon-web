// ----------------------------------------------------------------
// Imports
// ----------------------------------------------------------------
// Express
import express from 'express';


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
Router.get('/', async (req, res) => {
    // Current User
    var responseUser = await fetch(`https://api.fotoon.app/user/${req.user.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json());

    var user = responseUser.data;

    res.render('./user/search', {
        user: user
    });
});