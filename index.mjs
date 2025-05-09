// <!-- collapse all     Ctrl + k + 0 -->
// <!-- expand all       Ctrl + k + j -->
// <!-- format           Alt + Shift + F (USE WITH CAUTION)-->
// <!-- word wrap toggle Alt + z -->

// - Variables & Functions: Use camelCase (e.g., getUserName(), totalAmount)
// - Classes & Constructors: Use PascalCase (e.g., UserModel, DataProcessor)
// - Constants: Use UPPER_CASE_SNAKE_CASE (e.g., API_KEY, MAX_LIMIT)
// - Modules: Often kebab-case for filenames (e.g., user-profile.js)
// - Event & Callback Handlers: Prefix with on (e.g., onClick, onDataReceived)
// - Private Variables: Some use leading _ to indicate private properties (_hiddenProperty)

let myDate;
myDate = new Date();

console.log(consoleTrace());
console.log('LOADED:- index.mjs');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // CONSOLETRACE()
        function consoleTrace() {
            try {
                const stack = new Error().stack;
                const firstLine = stack.split('\n')[2].trim();
                return `Trace line: ${firstLine}`;
            } catch (error) {
                return 'Trace line: not available';
            }
        };
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // .ENV;  .MJS
    
    import dotenv from "dotenv";
        dotenv.config({path:`./config/globalNode.env`});
        console.log(consoleTrace());
            if(typeof process.env.GLOBAL_PROJECT !== undefined){
                console.log('IMPORTED:- globalNode.env');
            }
        // ...not required???
            // dotenv.config({path:`./config/globalClient.env`});
            // console.log(consoleTrace());
            //     if(typeof process.env.DEV_IP_ADDRESS !== undefined){
            //         console.log('LOADED:- project.env');
            //     }
        // ...not required???
        dotenv.config({path:`./config/project.env`});
            console.log(consoleTrace());
            if(typeof process.env.DEV_IP_ADDRESS !== undefined){
                console.log('IMPORTED:- project.env');
            }

    import * as globalNodeMJS from '../../__global/utils/globalNode.mjs';
        console.log(consoleTrace());
        if(globalNodeMJS.globalNodeMJSisLoaded() === true){
            console.log('IMPORTED:- globalNode.mjs');
        }
            // import * as validate from './src/projectServerSideValidations.mjs';
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // const crypto = require("crypto");
    import crypto from 'crypto'
    // const sessionKey = crypto.randomBytes(32).toString("hex");
    const sessionKey = process.env.SESSION_KEY || crypto.randomBytes(32).toString("hex");
    console.log(consoleTrace());
    console.log('sessionKey:- ',sessionKey);
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // EPXRESS
        // const express = require("express");
        import express from "express";
        const app = express();
        app.use(express.json()); // Middleware to parse JSON data
        app.disable('x-powered-by'); // Reduce fingerprinting by hiding that this is an ExpressJS app
        const staticFolders = ['config', 'media', 'public', 'src', 'styles'];
        staticFolders.forEach(folder => {
            app.use(express.static(folder));
        });
        // EXPRESS-SESSION
            import session from "express-session";
            app.use(session({
                secret: process.env.SESSION_KEY || sessionKey,
                resave: false,   // Don't save unchanged sessions. Prevents unnecessary session saves if nothing has changed, improving efficiency.
                saveUninitialized: true,  // Ensures sessions are stored even if uninitialized (useful for logging new visitors).
                cookie: { 
                    // secure: false, // Means the session cookie is not restricted to HTTPS; set it to true in production for security.
                    secure: process.env.NODE_ENV === "production",  // Enable secure cookies in production
                    httpOnly: true, // Prevent client-side JavaScript access (mitigates XSS attacks)
                    sameSite: "strict", // Helps prevent CSRF attacks
                    maxAge: 15 * 60 * 1000 // ✅ Expires after 15 minutes (in milliseconds)
                    } // Set to true for HTTPS
            }));
            console.log(consoleTrace());
            console.log("Session 'secure' setting:", process.env.NODE_ENV === "production");
            // SET-UP Store user data in the session
                app.post("/store-session", (req, res) => {
                    console.log(consoleTrace());
                    console.log("/store-session:-",req.body);
                    req.session.userData = req.body; 
                    console.log("req.session.userData:-",req.sessionKey);
                    res.json({ message: "User data stored in session OK!" });
                });
            // RETRIEVE session data
                app.get("/get-session", (req, res) => {
                    if (!req.session.username && !req.session.userData) {
                        return res.status(401).json({ error: "Session data not found!" });
                    }
                    res.json({
                        username: req.session.username || "No username data",
                        role: req.session.role || "No role data",
                        sessionData: req.session.userData || "No session data found."
                    });
                });
            // ADD to session data
                app.post("/set-session", (req, res) => {
                    req.session.favoriteColor = "Blue";  
                    req.session.isLoggedIn = true;    
                    res.json({ message: "Additional session data added!" });
                });
            // REFRESH session timeout cookie
                app.post("/refresh-session", (req, res) => {
                    if (!req.session.user) {
                        return res.status(401).json({ error: "Session has already expired..." });
                    }
                    req.session.cookie.maxAge = 15 * 60 * 1000; // ✅ Reset session expiration
                    res.json({ message: "Session refreshed!" });
                });
                

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// catch-all
app.use((req, res, next) => {
    console.log((",,").repeat(55));
    const myDate = new Date();
    console.log(("<>").repeat(5),`Received request: ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()} ${req.method} ${req.url}`);
    console.log(`${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);
    next();
});
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // PATH
        import path from 'path';
        import { fileURLToPath } from 'url';
        // Get the current file path
            const __filename = fileURLToPath(import.meta.url);
        // Get the directory name
            const __dirname = path.dirname(__filename);
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
myDate = new Date();
console.log(`${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);
console.log(("<>").repeat(55));
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // ROUTERS
        import routesProject, * as routesProjectFunctions from './src/globalNodeRoutes.mjs'; 
            app.use("/routesProject", routesProject);
            console.log(consoleTrace());
            console.log('IMPORTED:- projectRoutes, routesProjectFunctions from ./src/globalNodeRoutes.mjs');

        import routesDatval, * as routesDatvalFunctions from './src/projectServerSideValidations.mjs';
            app.use("/routesDatval", routesDatval);
            console.log(consoleTrace());
            if(routesDatvalFunctions.test() === true){
                console.log('IMPORTED:- datvalRoutes, routesDatvalFunctions from projectServerSideValidations.mjs');
            }
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
myDate = new Date();
console.log(`${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);
console.log(("<>").repeat(55));
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // SQLITE
        // const sqlite3 = require("sqlite3").verbose();
            import sqlite3 from "sqlite3";
        // Connect to SQLite database
        const db = new sqlite3.Database(`${process.env.PATH_TO_DATABASE}${process.env.DATABASE}`, (err) => {
            if (err) {
                console.log(consoleTrace());
                console.error("Error connecting to SQLite database:",process.env.DATABASE_FILE_NAME, err);
            } else {
                console.log(consoleTrace());
                console.log("Connected to SQLite database.",process.env.DATABASE_FILE_NAME);
            }
            myDate = new Date();
            console.log(`${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);
            console.log(("<>").repeat(55));
        });
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // CORS handling START
        import cors from 'cors';
        app.use(cors());
        // fixes LOCAL CORS [start]
            app.use((req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*'); // Adjust the '*' to your specific domain
                res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                next();
            });
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // Endpoint to get data from database
        app.get("/getExpenses", (req, res) => {
            console.log(consoleTrace());
            console.log("app.get('/getExpenses', async (req, res)");
            db.all("SELECT * FROM expenses", [], (err, rows) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.json(rows);
                }
            });
        });

    // Endpoint to get data from database
        app.post('/getAllExpenses', async (req, res) => {
            console.log(consoleTrace());
            console.log("app.get('/getAllExpenses', async (req, res)");
            try {
                console.log(consoleTrace());
                console.log(req.body);
                // Step 1: Fetch data from an external source (mocked for simplicity)
                    const externalData = [
                        { id: 1, item: 'Groceries', amount: 50 },
                        { id: 2, item: 'Rent', amount: 1200 },
                        { id: 3, item: 'Utilities', amount: 150 },
                    ];

                // Step 2: Validate or enrich the data
                    const validatedData = externalData.map(expense => {
                        if (!expense.item || expense.amount <= 0) {
                            throw new Error(`Invalid expense data: ${JSON.stringify(expense)}`);
                        }
                        return {
                            ...expense,
                            timestamp: new Date().toISOString() // Add a timestamp
                        };
                    });

                // Step 3: Send the processed data to the client
                    res.status(200).json(validatedData);

            } catch (error) {
                console.log(consoleTrace());
                console.error('Error:', error.message);
                res.status(500).json({ error: 'Failed to process expenses' });
            }
        });
    
// Start the server
    const PORT = process.env.PORT;
    const DEV_IP_ADDRESS = process.env.DEV_IP_ADDRESS;
    app.listen(PORT,'0.0.0.0', () => {
        console.log(consoleTrace());
        console.log(`Server is running on port:${PORT}\nAccessible on the server at either http://localhost:${PORT} or http://${DEV_IP_ADDRESS}:${PORT}.\nAccessible on the LAN at http://${DEV_IP_ADDRESS}:${PORT}.`);
        myDate = new Date();
        console.log(`${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);
        console.log(("<>").repeat(55));
    });
