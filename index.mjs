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

const consoleLog = true;

let myDate;
myDate = new Date();
console.log(("🎾").repeat(64));
console.log("🎾",("SERVER STARTED 🎾 ").repeat(7));
console.log(`🎾 ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}${(" ").repeat(128-(`🎾 ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}  `).length)}🎾`);
console.log(("🎾").repeat(64));

if(consoleLog===true){console.log(consoleTrace(),'\nLOADED:- index.mjs');}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // CONSOLETRACE()
        function consoleTrace() {
            try {
                const stack = new Error().stack;
                const firstLine = stack.split('\n')[2].trim();
                return `Trace line: ${firstLine}`;
            } catch (error) {
                return '🔴 Trace line: not available';
            }
        };
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // fs - fileSystem
        import fs from 'fs';
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // .ENV;  .MJS
    
        import dotenv from "dotenv";
            // globalServer.env
                try{
                    const envPath = "./config/globalServer.env";
                    if (fs.existsSync(envPath)) {
                        dotenv.config({ path: envPath });
                        if(consoleLog===true){console.log(consoleTrace(),`\nIMPORTED:- ${envPath}`);}
                        const result = dotenv.config({ path: envPath });
                        if(consoleLog===true){console.log(consoleTrace(),`\n${envPath}:`, result);}                
                    } else {
                        console.log(consoleTrace(),`\n🔴 ERROR:- ${envPath} not found!`);
                    }
                } catch (error) {
                    console.log(consoleTrace(),`\n🔴 ERROR:- ${envPath} not found!`);
                }
            // project.env
                try{
                    const envPath = "./config/project.env";
                    if (fs.existsSync(envPath)) {
                        dotenv.config({ path: envPath });
                        if(consoleLog===true){console.log(consoleTrace(),`\nIMPORTED:- ${envPath}`);}
                        const result = dotenv.config({ path: envPath });
                        if(consoleLog===true){console.log(consoleTrace(),`\n${envPath}:`, result);}                
                    } else {
                        if(consoleLog===true){console.log(consoleTrace(),`\n🔴 ERROR:- ${envPath} not found!`);}
                    }
                } catch (error) {
                    if(consoleLog===true){console.log(consoleTrace(),`\n🔴 ERROR:- ${envPath} not found!`);}
                }
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // EPXRESS
        // const express = require("express");
        if(consoleLog===true){console.log(consoleTrace());}
        import express from "express";
        const app = express();
        app.set('trust proxy', 1) // trust first proxy
        app.use(express.json()); // Middleware to parse JSON data
        app.disable('x-powered-by'); // Reduce fingerprinting by hiding that this is an ExpressJS app
        const staticFolders = ['config', 'db', 'media', 'public', 'src', 'styles'];
        staticFolders.forEach(folder => {
            try{
                app.use(express.static(folder));
                app.use(`/${folder}`,express.static(folder));
                if(consoleLog===true){console.log(`mapped folder:- ${folder}`);}
            }
            catch{
                if(consoleLog===true){console.log(`🔴 map to folder failed:- ${folder}`);}
            }
        });
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // retrieve the session key OR create one if can't be retrieved
        // const crypto = require("crypto");
            import crypto from 'crypto'
            // const sessionKey = crypto.randomBytes(32).toString("hex");
            const sessionKey = process.env.SESSION_KEY || crypto.randomBytes(32).toString("hex");
            // if(consoleLog===true){console.log(consoleTrace());} // DON'T LOG THIS!!!  KEEP IT SECURE!!!
            // if(consoleLog===true){console.log('sessionKey:- ',sessionKey);} // DON'T LOG THIS!!!  KEEP IT SECURE!!!
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // EPXRESS
        // EXPRESS-SESSION
            import session from "express-session";
            app.use(session({
                genid: function(req) {
                    // return genuuid() // use UUIDs for session IDs
                    return crypto.randomUUID(); // Generates a unique session ID
                }, 
                // name: "NO!", use data added to the session cookie later
                secret: process.env.SESSION_KEY || sessionKey,
                resave: false,   // Don't save unchanged sessions. Prevents unnecessary session saves if nothing has changed, improving efficiency.
                saveUninitialized: true,  
                    // Allows sessions without login.  Ensures sessions are stored even if uninitialized 
                    // (useful for logging new visitors).  
                    // Forces a session that is “uninitialized” to be saved to the store. 
                    // A session is uninitialized when it is new but not modified. 
                    // Choosing false is useful for implementing login sessions, 
                    // reducing server storage usage, or complying with laws that require
                    // permission before setting a cookie. Choosing false will also help with 
                    // race conditions where a client makes multiple parallel requests without a session.
                cookie: { 
                    secure: false, // Means the session cookie is not restricted to HTTPS; set it to true in production for security.
                    httpOnly: true, // Prevent client-side JavaScript access (mitigates XSS attacks)
                    sameSite: "strict", // Helps prevent CSRF attacks
                    maxAge: 15 * 60 * 1000 // ✅ Expires after 15 minutes (in milliseconds)
                } // ❗❗❗Set "secure: false" to true for HTTPS
            }));
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// catch-all START 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 
app.use((req, res, next) => {

    console.log(("~~").repeat(54));
    console.log(("🛜<>").repeat(18));

    const myDate = new Date();
    if(consoleLog===true){console.log(`\n${consoleTrace()}\n${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}\n${req.method}\n${req.url}`);}

    // session exists ?
        if(typeof req.session === "undefined"){
        }else{
            if (!req.session.visitCount) {
                req.session.visitCount = 1;
            } else {
                req.session.visitCount++;
            }
            // res.send(`You have visited ${req.session.visitCount} times.`);
            // if(consoleLog===true){console.log(consoleTrace(),`\nVisit # ${req.session.visitCount} times.`);}
            if(consoleLog===true){console.log(consoleTrace(),`\n`,req.session);}
            console.log(consoleTrace(),'\nSession details:', JSON.stringify(req.session, null, 2));
            console.log(consoleTrace(),'\nSession details:', req.session.id);
            console.log(consoleTrace(),'\nSession details:', req.session.name);
        }

    console.log(("🛜<>").repeat(18));
    console.log(("~~").repeat(54));

    next();

});
// catch-all END 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 🖥️ 🛜 
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
if(consoleLog===true){console.log(`${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);}
if(consoleLog===true){console.log(("<>").repeat(55));}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // ROUTERS
        import dbRouter, * as dbFunctions from './src/SQLite_ServerSide.mjs';
            app.use("/dbRouter", dbRouter);
            if(dbFunctions.SQLite_ServerSideMJSisLoaded() === true){
                if(consoleLog===true){console.log(consoleTrace(),'\nIMPORTED:- router & all functions from ./src/SQLite_ServerSide.mjs');}
            }else{
                console.log(`🔴 ${consoleTrace()}\nError.`);
            }
            dbRouter.stack.forEach((route) => {
                if (route.route) {
                    console.log(`${(" ").repeat(5)} Path: ${route.route.path}, Method: ${Object.keys(route.route.methods).join(", ")}`);
                }
            });

        import loginRouter, * as loginFunctions from './src/globalLoginServer.mjs';
            app.use("/loginRouter", loginRouter);
            if(loginFunctions.globalLoginServerMJSisLoaded() === true){
                if(consoleLog===true){console.log(consoleTrace(),'\nIMPORTED:- router & all functions from ./src/globalLoginServer.mjs');}
            }else{
                console.log(`🔴 ${consoleTrace()}\nError.`);
            }
            loginRouter.stack.forEach((route) => {
                if (route.route) {
                    console.log(`${(" ").repeat(5)} Path: ${route.route.path}, Method: ${Object.keys(route.route.methods).join(", ")}`);
                }
            });            

        import globalRouter, * as globalFunctions from './src/globalRouter.mjs'; 
            app.use("/globalRouter", globalRouter);
            if(globalFunctions.globalRoutesMJSisLoaded() === true){
                if(consoleLog===true){console.log(consoleTrace(),'\nIMPORTED:- router & all functions from ./src/globalRoutes.mjs');}
            }else{
                console.log(`🔴 ${consoleTrace()}\nError.`);
            }
            globalRouter.stack.forEach((route) => {
                if (route.route) {
                    console.log(`${(" ").repeat(5)} Path: ${route.route.path}, Method: ${Object.keys(route.route.methods).join(", ")}`);
                }
            });            

        import projectRouter, * as projectFunctions from './src/projectRouter.mjs';
            app.use("/projectRouter", projectRouter);
            if(projectFunctions.projectRoutesMJSisLoaded() === true){
                if(consoleLog===true){console.log(consoleTrace(),'\nIMPORTED:- router & all functions from projectRoutes.mjs');}
            }else{
                console.log(`🔴 ${consoleTrace()}\nError.`);
            }
            projectRouter.stack.forEach((route) => {
                if (route.route) {
                    console.log(`${(" ").repeat(5)} Path: ${route.route.path}, Method: ${Object.keys(route.route.methods).join(", ")}`);
                }
            });            

        import sessionsRouter, * as sessionsFunctions from './src/globalSessionsServer.mjs';
            app.use("/sessionsRouter", sessionsRouter);
            if(sessionsFunctions.globalSessionsServerMJSisLoaded() === true){
                if(consoleLog===true){console.log(consoleTrace(),'IMPORTED:- router & all functions from globalSessionsServer.mjs');}
            }else{
                console.log(`🔴 ${consoleTrace()}\nError.`);
            }
            sessionsRouter.stack.forEach((route) => {
                if (route.route) {
                    console.log(`${(" ").repeat(5)} Path: ${route.route.path}, Method: ${Object.keys(route.route.methods).join(", ")}`);
                }
            });            

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
myDate = new Date();
if(consoleLog===true){console.log(`${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);}
if(consoleLog===true){console.log(("<>").repeat(55));}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // SQLITE
        // // const sqlite3 = require("sqlite3").verbose();
        //     import sqlite3 from "sqlite3";
        // // Connect to SQLite database || Create if it doesn't exist
        // export function accessDb(fileName){
        //     const db = new sqlite3.Database(`${process.env.PATH_TO_DATABASE}${fileName}.db`, (err) => {
        //         if (err) {
        //             console.error(`${consoleTrace()}\n🔴 Error connecting to database:\n`,fileName, err);
        //         } else {
        //             console.log(`${consoleTrace()}\n🟢 Connected to ${fileName}.db`);
        //         }
        //         myDate = new Date();
        //         if(consoleLog===true){console.log(`${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);}
        //         if(consoleLog===true){console.log(("<>").repeat(55));}
        //     });
        // }
        import {accessDb} from './src/SQLite_ServerSide.mjs';
        accessDb("project");
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
            if(consoleLog===true){console.log(consoleTrace());}
            if(consoleLog===true){console.log("app.get('/getExpenses', async (req, res)");}
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
            if(consoleLog===true){console.log(consoleTrace());}
            if(consoleLog===true){console.log("app.get('/getAllExpenses', async (req, res)");}
            try {
                if(consoleLog===true){console.log(consoleTrace());}
                if(consoleLog===true){console.log(req.body);}
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
                if(consoleLog===true){console.log(consoleTrace());}
                console.error('🔴 Error:', error.message);
                res.status(500).json({ error: 'Failed to process expenses' });
            }
        });

// monitor memory usage
    // const formatMemoryUsage = (data) => `${(data / 1024 / 1024).toFixed(2)} MB`;
    // setInterval(() => {
    //     const memoryUsage = process.memoryUsage();
    //     console.clear(); // Clears previous logs for readability
    //     if(consoleLog===true){console.log(("__").repeat(55));}
    //     if(consoleLog===true){console.log(`🖥️ Memory Usage Monitor`);}
    //     if(consoleLog===true){console.log(`1️⃣ RSS: Resident Size Set\n- The total memory allocated to your Node.mjs process, including:\n- Heap memory\n- Stack memory\n- Code segment\n- Why it matters:\n- This gives an overview of how much RAM your application is consuming. If RSS keeps increasing, it could indicate a memory leak.`);}
    //     if(consoleLog===true){console.log(`${(" ").repeat(5)}RSS: ${formatMemoryUsage(memoryUsage.rss)}`);}
    //     if(consoleLog===true){console.log(`${(" ").repeat(5)}${("~~").repeat(15)}`);}
    //     if(consoleLog===true){console.log(`2️⃣ Heap Used\n- What it is: The amount of actively used memory in the JavaScript heap.\n- Why it matters: This is the actual memory being used to store variables, objects, and function executions.\n- Key observation: If heapUsed keeps growing without dropping, it could signal inefficient memory management.`);}
    //     if(consoleLog===true){console.log(`${(" ").repeat(5)}Heap Used: ${formatMemoryUsage(memoryUsage.heapUsed)}`);}
    //     if(consoleLog===true){console.log(`${(" ").repeat(5)}${("~~").repeat(15)}`);}
    //     if(consoleLog===true){console.log(`3️⃣ Heap Total\n- What it is: The total allocated memory for the heap.\n- Why it matters: Node.mjs expands this dynamically, so a growing heap might indicate high memory demand.`);}
    //     if(consoleLog===true){console.log(`${(" ").repeat(5)}Heap Total: ${formatMemoryUsage(memoryUsage.heapTotal)}`);}
    //     if(consoleLog===true){console.log(`${(" ").repeat(5)}${("~~").repeat(15)}`);}
    //     if(consoleLog===true){console.log(`4️⃣ External\n- What it is: Memory used by objects managed outside of the JavaScript heap, such as:\n- Buffer allocations (Buffer.from())\n- WebAssembly objects\n- Native C++ extensions\n- Why it matters: If your app uses a lot of Buffers (e.g., file handling or network requests), external might be a significant factor.`);}
    //     if(consoleLog===true){console.log(`${(" ").repeat(5)}External: ${formatMemoryUsage(memoryUsage.external)}`);}
    //     if(consoleLog===true){console.log(`${(" ").repeat(5)}${("~~").repeat(15)}`);}
    //     if(consoleLog===true){console.log(`How to Use These Stats\n✅ If RSS is too high, your app might need optimization or might be consuming too much memory.\n✅ If heapUsed > heapTotal, it suggests memory saturation, potentially slowing performance.\n✅ If external memory spikes, you may have large Buffer allocations affecting memory usage.\n🚀`);}
    //     if(consoleLog===true){console.log(("__").repeat(55));}
    // }, 2000); // Logs every 2 seconds

const formatMemoryBar = (value, max) => {
    const barLength = Math.floor((value / max) * 40);
    return '█'.repeat(barLength).padEnd(40, ' ');
};
setInterval(() => {
    const memory = process.memoryUsage();
    let myDate;
    myDate = new Date();
    // console.clear();
    console.log(`🖥️ Memory Usage Monitor ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);
    let memoryUsagePercent = (memory.rss / os.totalmem()) * 100;
    console.log(`RSS:        ${formatMemoryBar(memory.rss, 100000000)} [1Gb bar length] % of total memory used:- ${memoryUsagePercent.toFixed(2)}% ${(memory.rss / 1024 / 1024).toFixed(1)} MB`);
    memoryUsagePercent = (memory.heapUsed / os.totalmem()) * 100;
    console.log(`Heap Used:  ${formatMemoryBar(memory.heapUsed, 100000000)} [1Gb bar length] % of total memory used:- ${memoryUsagePercent.toFixed(2)}% ${(memory.heapUsed / 1024 / 1024).toFixed(1)} MB`);
    // if(consoleLog===true){console.log(`Heap Used:  ${formatMemoryBar(memory.heapUsed, 100000000)} ${memory.heapUsed / 1024 / 1024} MB`);}
    console.log(("~~").repeat(55));
}, 1000 * 60 * 60);

// Start the server
    const PORT = process.env.PORT;
    const DEV_IP_ADDRESS = process.env.DEV_IP_ADDRESS;
    app.listen(PORT,'0.0.0.0', () => {
        console.log(("🏁").repeat(64));
        // console.log(`${consoleTrace()}\nServer is running on port:${PORT}\nAccessible on the server at either http://localhost:${PORT} or http://${DEV_IP_ADDRESS}:${PORT}.\nAccessible on the LAN at http://${DEV_IP_ADDRESS}:${PORT}.`);
        console.log(`${consoleTrace()}\nServer is running on port:${PORT}.`);
        myDate = new Date();
        console.log(`${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);
        console.log(("🏁").repeat(64));
    });
