// ----------------------------------------------------------------
// Imports
// ----------------------------------------------------------------
// Globals
import './globals/Authorization.js';
import './globals/Terminal.js';

// DOTENV
import { config } from 'dotenv';
config();

// HTTP & HTTPS
import http from 'http';
import https from 'https';

// Express
import express from 'express';

// Cookie Parser
import cookieParser from 'cookie-parser';

// File Stream
import fs from 'fs';


// ----------------------------------------------------------------
// Main Code
// ----------------------------------------------------------------
// Server
const Server = express();
Server.use(cookieParser());
Server.use(express.static('public'));
Server.use('/css', express.static('public/css'));
Server.use('/js', express.static('public/js'));
Server.use('/img', express.static('public/img'));

// EJS
Server.set('view engine', 'ejs');

// Web
// Route Imports
import mainpage from './routes/mainpage.js';    // fotoon.app/
import login from './routes/login.js';          // fotoon.app/login
import register from './routes/register.js';    // fotoon.app/register
import profile from './routes/profile.js';      // fotoon.app/profile
// fotoon.app/account
// fotoon.app/posts
// fotoon.app/post

// Route Uses
Server.use('/', mainpage);          // Main Page
Server.use('/login', login);        // Login Page
Server.use('/register', register);  // Register Page
Server.use('/profile', profile);    // Profile Page

// HTTPS Server
if (process.env.DEV_MODE.toLowerCase() == 'true') {
    // Port
    const port = process.env.PORT || 80;

    // Development Server
    const ServerDevelopment = http.createServer(Server);
    ServerDevelopment.listen(port, () => {
        terminal.info(`[SERVER] Connection established and listening on port: ${port}!`);
        terminal.warn(`[SERVER] Running on insecure (development) mode!`);
    });
} else {
    // SSL Keys
    var privateKey;
    var certificate;
    var chain;
    var credentials;

    // SSL Key Loading
    try {
        // Try To Load SSL Keys
        privateKey = fs.readFileSync(process.env.SSL_PRIVATE_KEY, 'utf8');
        certificate = fs.readFileSync(process.env.SSL_CERTIFICATE, 'utf8');
        chain = fs.readFileSync(process.env.SSL_CHAIN, 'utf8');

        // Save Credentials
        credentials = { key: privateKey, cert: certificate, ca: chain };
    } catch (error) {
        // Bad/No SSL Keys Path
        terminal.error('[SERVER] Failed to load SSL keys!');
    }

    // Port 
    const port = process.env.PORT || 443;

    // Secure Server
    const ServerSecure = https.createServer(credentials, Server);
    ServerSecure.listen(port, () => {
        terminal.info(`[SERVER] Connection established and listening on port: ${port}!`);
    });
}