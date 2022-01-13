// -------------------------------------------------------------
// Imports
// -------------------------------------------------------------
// DOTENV
import { config } from 'dotenv';
config();

// JSON Web Token
import jwt from 'jsonwebtoken';


// -------------------------------------------------------------
// Globals
// -------------------------------------------------------------
// User Logged In?
global.loggedIn = async function (req) {
    // Request Token
    const token = req.cookies.token;

    // Token Validation
    try {
        jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return false;
    }

    return true;
}

// User Password Authentication
global.authUser = async function (req, res, next) {
    // Variables
    var userId;

    // Request Token
    const token = req.cookies.token;

    // Token Validation
    try {
        var user = jwt.verify(token, process.env.JWT_SECRET);
        userId = user.id;

        req['user'] = { id: userId };

        next();
    } catch (error) {
        return res.redirect('/');
    }
}