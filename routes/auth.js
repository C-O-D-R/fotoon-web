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
// Login
Router.get('/login', (req, res) => {
    res.render('./auth/login');
});

// Register
Router.get('/register', (req, res) => {
    res.render('./auth/register');
});