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
    } catch (error) {
        return res.redirect('/');
    }

    req['user'] = { id: userId };

    next();
}

// User Session Authentication
global.authSession = async function (req) {
    // Variables
    var userId;

    // Request Token
    const token = req.cookies.token;

    // Token Validation
    try {
        var user = jwt.verify(token, process.env.JWT_SECRET);
        userId = user.id;
    } catch (error) {
        return false;
    }

    return true;
}