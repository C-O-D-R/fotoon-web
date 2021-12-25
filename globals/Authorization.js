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
    console.log(token);

    // Token Validation
    try {
        var user = jwt.verify(token, process.env.SERVER_JWT_SECRET);
        userId = user.id;
    } catch (error) {
        return res.status(401).json({ status: 'error', code: 'invalid_token', description: 'Invalid token!' });
    }
    
    req['user'] = { id: userId };

    next();
}