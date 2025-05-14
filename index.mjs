// <!-- collapse all     Ctrl + k + 0 -->
// <!-- expand all       Ctrl + k + j -->
// <!-- format           Alt + Shift + F (USE WITH CAUTION)-->
// <!-- word wrap toggle Alt + z -->
// - Variables & Functions: Use camelCase (e.g., getUserName(), totalAmount)
// - Classes & Constructors: Use PascalCase (e.g., UserModel, DataProcessor)
// - Constants: Use UPPER_CASE_SNAKE_CASE (e.g., API_KEY, MAX_LIMIT)
// - Modules: Often kebab-case for filenames (e.g., user-profile.mjs)
// - Event & Callback Handlers: Prefix with on (e.g., onClick, onDataReceived)
// - Private Variables: Some use leading _ to indicate private properties (_hiddenProperty)

let myDate;
myDate = new Date();
console.log(("<>").repeat(55));
console.log(("SERVER RE-START <> ").repeat(6));
console.log(`${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);
console.log(("<>").repeat(55));

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

        // import * as globalNodeMJS from './src/globalNode.mjs';
        //     // import * as globalNodeMJS from '../../__global/utils/globalNode.mjs';
        //     console.log(consoleTrace());
        //     if(globalNodeMJS.globalNodeMJSisLoaded() === true){
        //         console.log('IMPORTED:- globalNode.mjs');
        //     }
        //         // import * as validate from './src/projectServerSideValidations.mjs';
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // retrieve the session key OR create one if can't be retrieved
        // const crypto = require("crypto");
            import crypto from 'crypto'
            // const sessionKey = crypto.randomBytes(32).toString("hex");
            const sessionKey = process.env.SESSION_KEY || crypto.randomBytes(32).toString("hex");
            // console.log(consoleTrace()); // DON'T LOG THIS!!!  KEEP IT SECURE!!!
            // console.log('sessionKey:- ',sessionKey); // DON'T LOG THIS!!!  KEEP IT SECURE!!!
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
            app.use(`/${folder}`,express.static(folder));
            console.log(`mapped folder:- ${folder}`);
        });
        // EXPRESS-SESSION
            import session from "express-session";
            app.use(session({
                secret: process.env.SESSION_KEY || sessionKey,
                resave: false,   // Don't save unchanged sessions. Prevents unnecessary session saves if nothing has changed, improving efficiency.
                saveUninitialized: true,  // Allows sessions without login.  Ensures sessions are stored even if uninitialized (useful for logging new visitors).
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

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// catch-all
app.use((req, res, next) => {

    console.log((",,").repeat(55));
    const myDate = new Date();
    console.log(("<>").repeat(5),`Received request: ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()} ${req.method} ${req.url}`);
    console.log(`${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);

    if (!req.session.visitCount) {
        req.session.visitCount = 1;
    } else {
        req.session.visitCount++;
    }
    // res.send(`You have visited ${req.session.visitCount} times.`);
    console.log(consoleTrace());
    console.log(`Visit # ${req.session.visitCount} times.`);

    next();
});
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // fs - fileSystem
        import fs from 'fs';
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // os - operatingSystem
        import os from 'os';
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
        import loginRouter, * as loginFunctions from './src/globalLoginServer.mjs';
            app.use("/loginRouter", loginRouter);
            console.log(consoleTrace());
            if(loginFunctions.globalLoginServerMJSisLoaded() === true){
                console.log('IMPORTED:- router from ./src/globalLoginServer.mjs');
            }

        import globalRouter, * as globalFunctions from './src/globalRouter.mjs'; 
            app.use("/globalRouter", globalRouter);
            console.log(consoleTrace());
            if(globalFunctions.globalRoutesMJSisLoaded() === true){
                console.log('IMPORTED:- router from ./src/globalRoutes.mjs');
            }

        import projectRouter, * as projectFunctions from './src/projectRouter.mjs';
            app.use("/projectRouter", projectRouter);
            console.log(consoleTrace());
            if(projectFunctions.projectRoutesMJSisLoaded() === true){
                console.log('IMPORTED:- router from projectRoutes.mjs');
            }

        import sessionsRouter, * as sessionsFunctions from './src/globalSessionsServer.mjs';
            app.use("/sessionsRouter", sessionsRouter);
            console.log(consoleTrace());
            if(sessionsFunctions.globalSessionsServerMJSisLoaded() === true){
                console.log('IMPORTED:- router from globalSessionsServer.mjs');
            }
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
myDate = new Date();
console.log(`${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);
console.log(("<>").repeat(55));
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // SQLITE
        // const sqlite3 = require("sqlite3").verbose();
            import sqlite3 from "sqlite3";
        // Connect to SQLite database || Create if it doesn't exist
        // export function accessDb(fileName){
        //     const db = new sqlite3.Database(`${process.env.PATH_TO_DATABASE}${fileName}.db`, (err) => {
        //         if (err) {
        //             console.log(consoleTrace());
        //             console.error("Error connecting to SQLite database:",fileName, err);
        //         } else {
        //             console.log(consoleTrace());
        //             console.log(`Connected to SQLite database. ${fileName}.db`);
        //         }
        //         myDate = new Date();
        //         console.log(`${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);
        //         console.log(("<>").repeat(55));
        //     });
        // }
        import * as projectNodeSQLite from './src/projectSQLite.mjs';
        projectNodeSQLite.accessDb("project");
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

// monitor memory usage
    // const formatMemoryUsage = (data) => `${(data / 1024 / 1024).toFixed(2)} MB`;
    // setInterval(() => {
    //     const memoryUsage = process.memoryUsage();
    //     console.clear(); // Clears previous logs for readability
    //     console.log(("__").repeat(55));
    //     console.log(`🖥️ Memory Usage Monitor`);
    //     console.log(`1️⃣ RSS: Resident Size Set\n- The total memory allocated to your Node.mjs process, including:\n- Heap memory\n- Stack memory\n- Code segment\n- Why it matters:\n- This gives an overview of how much RAM your application is consuming. If RSS keeps increasing, it could indicate a memory leak.`);
    //     console.log(`${(" ").repeat(5)}RSS: ${formatMemoryUsage(memoryUsage.rss)}`);
    //     console.log(`${(" ").repeat(5)}${("~~").repeat(15)}`);
    //     console.log(`2️⃣ Heap Used\n- What it is: The amount of actively used memory in the JavaScript heap.\n- Why it matters: This is the actual memory being used to store variables, objects, and function executions.\n- Key observation: If heapUsed keeps growing without dropping, it could signal inefficient memory management.`);
    //     console.log(`${(" ").repeat(5)}Heap Used: ${formatMemoryUsage(memoryUsage.heapUsed)}`);
    //     console.log(`${(" ").repeat(5)}${("~~").repeat(15)}`);
    //     console.log(`3️⃣ Heap Total\n- What it is: The total allocated memory for the heap.\n- Why it matters: Node.mjs expands this dynamically, so a growing heap might indicate high memory demand.`);
    //     console.log(`${(" ").repeat(5)}Heap Total: ${formatMemoryUsage(memoryUsage.heapTotal)}`);
    //     console.log(`${(" ").repeat(5)}${("~~").repeat(15)}`);
    //     console.log(`4️⃣ External\n- What it is: Memory used by objects managed outside of the JavaScript heap, such as:\n- Buffer allocations (Buffer.from())\n- WebAssembly objects\n- Native C++ extensions\n- Why it matters: If your app uses a lot of Buffers (e.g., file handling or network requests), external might be a significant factor.`);
    //     console.log(`${(" ").repeat(5)}External: ${formatMemoryUsage(memoryUsage.external)}`);
    //     console.log(`${(" ").repeat(5)}${("~~").repeat(15)}`);
    //     console.log(`How to Use These Stats\n✅ If RSS is too high, your app might need optimization or might be consuming too much memory.\n✅ If heapUsed > heapTotal, it suggests memory saturation, potentially slowing performance.\n✅ If external memory spikes, you may have large Buffer allocations affecting memory usage.\n🚀`);
    //     console.log(("__").repeat(55));
    // }, 2000); // Logs every 2 seconds

const formatMemoryBar = (value, max) => {
    const barLength = Math.floor((value / max) * 40);
    return '█'.repeat(barLength).padEnd(40, ' ');
};
setInterval(() => {
    const memory = process.memoryUsage();
    // console.clear();
    console.log(`🖥️ Memory Usage Monitor`);
    let memoryUsagePercent = (memory.rss / os.totalmem()) * 100;
    console.log(`RSS:        ${formatMemoryBar(memory.rss, 100000000)} [1Gb bar length] % of total memory used:- ${memoryUsagePercent.toFixed(2)}% ${(memory.rss / 1024 / 1024).toFixed(1)} MB`);
    memoryUsagePercent = (memory.heapUsed / os.totalmem()) * 100;
    console.log(`Heap Used:  ${formatMemoryBar(memory.heapUsed, 100000000)} [1Gb bar length] % of total memory used:- ${memoryUsagePercent.toFixed(2)}% ${(memory.heapUsed / 1024 / 1024).toFixed(1)} MB`);
    // console.log(`Heap Used:  ${formatMemoryBar(memory.heapUsed, 100000000)} ${memory.heapUsed / 1024 / 1024} MB`);
}, 60000);

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
