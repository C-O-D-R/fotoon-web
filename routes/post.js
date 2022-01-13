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

        responsePost = await fetch(`https://api.fotoon.app/posts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                ids: [responseUser.following]
            }
        });

        console.log(responsePost.data.at(-1)._id)
    } catch (error) {
        
    }
});

// Post by ID
Router.get('/:id', authUser, async (req, res) => {

});