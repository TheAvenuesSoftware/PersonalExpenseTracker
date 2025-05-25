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
console.log(("🔰").repeat(64));
console.log(`🔰 ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}${(" ").repeat(128-2-(`🔰 ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`).length)}🔰`);
myDate = new Date();
console.log(`🔰 ${myDate}${(" ").repeat(128-2-(`🎾 ${myDate}`).length)}🔰`);
process.env.TZ = "Australia/Sydney"; // 🌏 Sets the server timezone
console.log(`🔰 Server running in timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}${(" ").repeat(128-2-(`🔰 Server running in timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`).length)}🔰`);
console.log(("🔰").repeat(64));

// process.env.TZ = "Australia/Sydney"; // 🌏 Sets the server timezone
// console.log("Server running in timezone:", Intl.DateTimeFormat().resolvedOptions().timeZone);

const consoleLog = true

if(consoleLog===true){console.log(trace(),'\nLOADED:- index.mjs');}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // os - operatingSystem
        import os from 'os';
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // PATH
        import path from 'path';
        import { fileURLToPath } from 'url';
        // Get the current file path
            const __filename = fileURLToPath(import.meta.url);
        // Get the directory name
            const __dirname = path.dirname(__filename);
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // trace()
        function trace(whoCalled="") {
            try {
                const stack = new Error().stack;
                const firstLine = stack.split('\n')[2].trim();
                const x = firstLine.lastIndexOf("/");
                const y = firstLine.lastIndexOf("/",x - 1);
                const fileName_rowNumber_position = firstLine.slice(y + 1,firstLine.length);
                return `📌Trace: [${whoCalled? whoCalled : ""}] ${fileName_rowNumber_position}📌`;
            } catch (error) {
                return '📌Trace: NOT AVAILABLE📌';
            }
        };
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // fs - fileSystem
        import fs from 'fs';
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // .ENV;  .MJS
    
        import dotenv from "dotenv";
            // globalServer.env
                try{
                    const envPath = "./config/globalServer.env";
                    if (fs.existsSync(envPath)) {
                        dotenv.config({ path: envPath });
                        if(consoleLog===true){console.log(trace(),`\nIMPORTED:- ${envPath}`);}
                        const result = dotenv.config({ path: envPath });
                        // if(consoleLog===true){console.log(trace(),`\n${envPath}:-\n`, result.parsed);}  
                        const envVar = result.parsed;
                        Object.keys(envVar).forEach(key => {
                            // console.log(`key:- ${key} :- ${envVar[key]}`);
                            console.log(`key:- ${key}`);
                        }); 
                    } else {
                        console.log(trace(),`\n🔴 ERROR:- ${envPath} not found!`);
                    }
                } catch (error) {
                    console.log(trace(),`\n🔴 ERROR:- ${envPath} not found!`);
                }
            // project.env
                try{
                    const envPath = "./config/projectServer.env";
                    if (fs.existsSync(envPath)) {
                        dotenv.config({ path: envPath });
                        if(consoleLog===true){console.log(trace(),`\nIMPORTED:- ${envPath}`);}
                        const result = dotenv.config({ path: envPath });
                        // if(consoleLog===true){console.log(trace(),`\n${envPath}:`, result);}                
                        const envVar = result.parsed;
                        Object.keys(envVar).forEach(key => {
                            // console.log(`key:- ${key} :- ${envVar[key]}`);
                            console.log(`key:- ${key}`);
                        }); 
                    } else {
                        if(consoleLog===true){console.log(trace(),`\n🔴 ERROR:- ${envPath} not found!`);}
                    }
                } catch (error) {
                    if(consoleLog===true){console.log(trace(),`\n🔴 ERROR:- ${envPath} not found!`);}
                }
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // EPXRESS
        // const express = require("express");
        if(consoleLog===true){console.log(trace());}
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
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // COOKIE PARSER
        import cookieParser from 'cookie-parser';
        app.use(cookieParser()); // Enables reading of cookies
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // // JSONWEBTOKE for user authentication
        import jwt from 'jsonwebtoken';
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // retrieve the session key OR create one if can't be retrieved
        // const crypto = require("crypto");
            import crypto from 'crypto'
            // const sessionKey = crypto.randomBytes(32).toString("hex");
            const sessionKey = process.env.SESSION_KEY || crypto.randomBytes(32).toString("hex");
            if(consoleLog===true){console.log(trace(),'\n🟢 sessionKey created.');} // DON'T LOG THIS!!!  KEEP IT SECURE!!!
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { createClient } from 'redis';
import { RedisStore } from 'connect-redis';
import { randomUUID } from 'crypto';

// Async function to create and return a RedisStore instance
async function createRedisStore() {
    // Create a Redis client
    const redisClient = createClient();
    redisClient.on('error', (err) => {
        console.error('🔴 Redis Client Error', err);
    });
    
    // Connect to the Redis server (make sure your Node version supports top-level await or use this inside an async function)
    await redisClient.connect();
    // Create an instance of RedisStore using the connected client
    const redisStore = new RedisStore({
        client: redisClient,
        prefix: 'sess:', // Optional prefix for session keys in Redis
    });
    console.log(`${trace()}🟢 Redis is set up.`);
    return redisStore;
}

// Function to set up the Express session middleware with the provided RedisStore
import session from 'express-session';
function setupExpressSession(redisStore) {
  app.use(session({
      store: redisStore,
      // Generate a unique session ID
          genid: (req) => randomUUID(),
      secret: process.env.SESSION_KEY || 'your-secret-key', // Replace with your secret or fallback value
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false,    // Set to true for HTTPS in production
        httpOnly: true,   // Helps mitigate XSS
        sameSite: 'strict', // Helps mitigate CSRF
        maxAge: 15 * 60 * 1000, // Session expires after 15 minutes
      },
    })
  );
  console.log(`${trace()}🟢 Express session management is set up.`);
}

// Main async function to set up session management
    async function setupSessionManagement() {
        try {
            // Wait for the Redis store to be created
                const redisStore = await createRedisStore();
            // Set up Express session using the RedisStore instance
                setupExpressSession(redisStore);
            console.log(`${trace()}✅ Session management and session storage are both setup now.`);
        } catch (error) {
            console.error(`${trace()}🔴 Session management and session storage setup failed!\n`, error);
        }
    }

// Initialize session management
    setupSessionManagement()
    .then(()=>{
    });

// // Example Express route to test session functionality
// app.get('/', (req, res) => {
//   req.session.views = req.session.views ? req.session.views + 1 : 1;
//   res.send(`Number of views: ${req.session.views}`);
// });

    // AUTHENTICATE USER. AUTHENTICATION MIDDLEWARE

        if(consoleLog===true){console.log(`${trace()}\n🟢 JWT authentication is set up.`);}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // // AUTHENTICATE USER BEFORE 
    //     // 1   mounting routers
    //     // 2   app.all
    // // AUTHENTICATE USER AFTER
    //     // 1   express-sessions
    //     // 2   jwt
        // app.use(authenticateUser);
// // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
myDate = new Date();
if(consoleLog===true){console.log(`${trace()}\n${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);}
if(consoleLog===true){console.log(("<>").repeat(64));}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // CORS handling START
        import cors from 'cors';
        app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            optionsSuccessStatus: 204 // Avoids extra response headers in preflight requests
        }));
        if(consoleLog===true){console.log(`${trace()}\n🟢 CORS headers are set.`);}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// catch-all START ⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡ 
app.use((req, res, next) => {

    // // ensure invalid end-points are rejected
    //     app.use((req, res) => {
    //         res.status(404).json({ error: "Endpoint not found" });
    //     });

    console.log("\n");
    console.log(("⚡").repeat(64));

    // app.use(authenticateUser);

    const myDate = new Date();
    console.log(`🟨 ${trace("catch-all")}\n🟨      ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}\n🟨      ${req.method}\n🟨      🚀 ${req.url} 🚀`);

    console.log(`🟨 ${trace()} Cookie: ${req.headers.cookie}`);
    // check if user exists
        if (!req.sessionID) {
            console.log(`🟨 ❌ 💛 No session exists.`);
        }else{
            // req.session.visitorId = req.session.visitorId || crypto.randomUUID();
            // console.log(`🟨 💛 New visitor session: ${req.session.visitorId}`);
            req.sessionID = req.sessionID || crypto.randomUUID();
            console.log(`🟨 💛 New visitor session: ${req.sessionID}`);
        }

// ❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓
    // Extract key request data
    const reqData = {
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body,
        params: req.params,
        query: req.query
    };
    // Convert to a nicely formatted string
    const reqString = JSON.stringify(reqData, null, 2);
    // Create a timestamped log file
    const logFileName1 = `logs/request_${myDate.toISOString().replace(/:/g, '-')}.txt`;
    // Write the request data to a log file
        fs.writeFile(logFileName1, reqString, (err) => {
            if (err) {
                console.error(`🟨 ${trace("catch-all")}🔴 Error writing request log:`, err);
            } else {
                console.log(`🟨 ${trace("catch-all")}🟢 Request logged: ${logFileName1}`);
            }
        });
// ❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓

    if(req.headers.cookie){
        console.log(`🟨 ${trace("catch-all")}\n🟨 Cookies: ${req.headers.cookie}`);
    //     console.log(trace("catch-all"),"\n🟨      req.header ", JSON.stringify(req.headers, null, 2));
    //     console.log(trace("catch-all"),"\n🟨      req.headers ", req.headers);
    //     console.log(trace("catch-all"),"\n🟨      req.headers.cookie ", req.headers.cookie);
    //     console.log(trace("catch-all"),"\n🟨      req.session ", req.session);
    //     console.log(trace("catch-all"),"\n🟨      req.session.cookie ", req.session.cookie);
    //     console.log(trace("catch-all"),"\n🟨 ");
    //     console.log(trace("catch-all"),"\n🟨      req.session.cookie.expires", req.session.cookie.expires);   
    //     console.log(trace("catch-all"),"\n🟨      new Date()", new Date());
    //     console.log(trace("catch-all"),"\n🟨      ((req.session.cookie.expires - new Date()) / 1000 /60).toFixed(0))", ((req.session.cookie.expires - new Date()) / 1000 /60).toFixed(0));
    //     console.log("\n🟨");
    //     let expiresMS = req.session.cookie.expires;
    //     expiresMS = expiresMS.getTime();
    //     console.log(trace("catch-all"),"\n🟨      req.session.cookie.expires >>> getTime()", expiresMS);
    //     console.log(trace("catch-all"),"\n🟨      Date.now()", Date.now());
    //     console.log(trace("catch-all"),"\n🟨      req.session.cookie.expires >>> getTime() - Date.now() / 1000 /1 60 >>> toFixed(0)", ((expiresMS - Date.now()) / 1000 /60).toFixed(0));
    //     console.log("\n🟨");
    //     console.log(trace("catch-all"),"\n🟨      req.session.cookie.maxAge", req.session.cookie.maxAge);
    //     console.log(trace("catch-all"),"\n🟨      (req.session.cookie.maxAge / 1000 / 60).toFixed(0)", (req.session.cookie.maxAge / 1000 / 60).toFixed(0));
    //     console.log("\n🟨");
    //     console.log(trace("catch-all"),"\n🟨      req.cookies", req.cookies);
    //     console.log(trace("catch-all"),"\n🟨      req.session", req.session);
    //     console.log(trace("catch-all"),"\n🟨      req.session.Session", req.session.Session);
    //     // console.log("All Cookies: req.cookies", req.session.createdAt);
    //     // console.log("All Cookies: req.cookies", req.session.createdAt.toLocaleString());
    //     if(req.session.createdAt!=null){
    //         console.log(trace("catch-all"),"\n🟨      🟩 req.session.createdAt", req.session.createdAt);
    //     }
    }

    // // silent session regen START
    //     const MAX_SESSION_AGE = 15 * 60 * 1000; // 15 minutes
    //     const now = Date.now();
    //     if (!req.session.createdAt) {
    //         req.session.createdAt = now; // Store creation timestamp
    //     }
    //     if ((now - req.session.createdAt > MAX_SESSION_AGE)) {
    //         const oldSecurityCode = req.session.securityCode; // Retrieve existing code
    //         const newSecurityCode = crypto.randomBytes(4).toString("hex"); // Initial securityCode
    //         req.session.regenerate((err) => {
    //             if (err) {
    //                 console.error("🔴 Session regeneration error:", err);
    //                 return next(err); // Passes error forward if regeneration fails
    //             }
    //             req.session.createdAt = Date.now(); // Reset session timestamp to now
    //             req.session.securityCode = newSecurityCode; // Assign new securityCode
    //             console.log(`🟢 Session refreshed. Old Code: ${oldSecurityCode}, New Code: ${req.session.securityCode}`)
    //             console.log(trace("catch-all"),`\nSession details:- `,req.session);
    //             console.log(trace("catch-all"),'\nSession details JSON:- ', JSON.stringify(req.session, null, 2));
    //             next(); // Move to next middleware after successful regeneration
    //         });
    //     } else {
    //         next();
    //     }
    // slient session regen END

    // console.log(("🟨").repeat(64));
    // console.log(("⌨ ").repeat(64));
    // console.log(("↑ ").repeat(64));

    next();

});
// catch-all END ⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // Client heartbeat detected, extend session.💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙
        app.post("/heartbeat-session-extension", (req, res) => {
            try{
                if (req.session) {
                    req.session.createdAt = Date.now(); // Reset session timestamp to now
                    if(consoleLog!=true){console.log(`${trace("heartbeat-session-extension")}\n🟢 Client heartbeat detected, session extended at ${new Date().toLocaleString()}`);}
                    res.send({ message: `Client heartbeat detected, session extended at ${new Date().toLocaleString()}.`,status: true });
                } else {
                    if(consoleLog!=true){console.log(`${trace("heartbeat-session-extension")}\n🔴 Client heartbeat detected, session extension error:- (req.session!=true)".`);}
                    res.status(403).json({ message: `Client heartbeat detected, session extension error:- (req.session!=true)".`,status:false });
                }
            }catch (error){
                    if(consoleLog===true){console.log(`${trace("heartbeat-session-extension")}\n🔴 Client heartbeat detected, session extension error:- (req.session!=true)".\n`,error.message);}
            }
        });
    // Client heartbeat detected, extend session.💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // MOUNT EXTERNAL ROUTERS

        async function mountRouters() {
            const task1 = mount_dbRouter();
            const task2 = mount_loginRouter();
            const task3 = mount_globalRouter();
            const task4 = mount_projectRouter();
            const task5 = mount_sessionRouter();
            const results = await Promise.allSettled([task1, task2, task3, task4, task5]);
            results.forEach((result, index) => {
                if (result.status === "fulfilled") {
                    console.log(`${trace()}✅ Task ${index + 1} succeeded:`, result.value);
                } else {
                    console.warn(`${trace()}⚠️ Task ${index + 1} failed:`, result.reason);
                }
            });
            console.log(`${trace()}🔄 All tasks finished, regardless of success or failure.`);
        }
        mountRouters();

        import dbRouter, * as dbFunctions from "./src/SQLite_ServerSide.mjs";
        import loginRouter, * as loginFunctions from './src/globalLoginServer.mjs';
        import globalRouter, * as globalFunctions from './src/globalRouter.mjs'; 
        import projectRouter, * as projectFunctions from './src/projectRouter.mjs';
        import sessionsRouter, * as sessionsFunctions from './src/globalSessionsServer.mjs';

        function mount_dbRouter(){
            let routerMounted = false;
            app.use("/dbRouter", dbRouter);
            dbRouter.stack.forEach((route) => {
                if (route.route) {
                    routerMounted = true;
                    // if(consoleLog===true){console.log(`${(" ").repeat(5)} Path: ${route.route.path}, Method: ${Object.keys(route.route.methods).join(", ")}`);}
                }
            });
            if(routerMounted===false){console.log(`${trace("mount external routers")}\n🔴 Errorin router!\n`,dbRouter.stack);}
        }    
        function mount_loginRouter(){
            let routerMounted = false;
            app.use("/loginRouter", loginRouter);
            loginRouter.stack.forEach((route) => {
                if (route.route) {
                    routerMounted = true;
                    // if(consoleLog===true){console.log(`${(" ").repeat(5)} Path: ${route.route.path}, Method: ${Object.keys(route.route.methods).join(", ")}`);}
                }
            });            
            if(routerMounted===false){console.log(`${trace("mount external routers")}\n🔴 Errorin router!\n`,dbRouter.stack);}
        }            
        function mount_globalRouter(){
            let routerMounted = false;
            app.use("/globalRouter", globalRouter);
            globalRouter.stack.forEach((route) => {
                if (route.route) {
                    routerMounted = true;
                    // if(consoleLog===true){console.log(`${(" ").repeat(5)} Path: ${route.route.path}, Method: ${Object.keys(route.route.methods).join(", ")}`);}
                }
            });            
            if(routerMounted===false){console.log(`${trace("mount external routers")}\n🔴 Errorin router!\n`,dbRouter.stack);}
        }            
        function mount_projectRouter(){
            let routerMounted = false;
            app.use("/projectRouter", projectRouter);
            projectRouter.stack.forEach((route) => {
                if (route.route) {
                    routerMounted = true;
                    // if(consoleLog===true){console.log(`${(" ").repeat(5)} Path: ${route.route.path}, Method: ${Object.keys(route.route.methods).join(", ")}`);}
                }
            });            
            if(routerMounted===false){console.log(`${trace("mount external routers")}\n🔴 Errorin router!\n`,dbRouter.stack);}
        }            
        function mount_sessionRouter(){
            let routerMounted = false;
            app.use("/sessionsRouter", sessionsRouter);
            sessionsRouter.stack.forEach((route) => {
                if (route.route) {
                    routerMounted = true;
                    // if(consoleLog===true){console.log(`${(" ").repeat(5)} Path: ${route.route.path}, Method: ${Object.keys(route.route.methods).join(", ")}`);}
                }
            });            
            if(routerMounted===false){console.log(`${trace("mount external routers")}\n🔴 Errorin router!\n`,dbRouter.stack);}
        }            
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
myDate = new Date();
if(consoleLog===true){console.log(`${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);}
if(consoleLog===true){console.log(("<>").repeat(64));}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        // // SQLITE
        //     // const sqlite3 = require("sqlite3").verbose();
        //         import sqlite3 from "sqlite3";
        //     // Connect to SQLite database || Create if it doesn't exist
        //     export function accessDb(fileName){
        //         const db = new sqlite3.Database(`${process.env.PATH_TO_DATABASE}${fileName}.db`, (err) => {
        //             if (err) {
        //                 console.error(`${trace()}\n🔴 Error connecting to database:\n`,fileName, err);
        //             } else {
        //                 console.log(`${trace()}\n🟢 Connected to ${fileName}.db`);
        //             }
        //             myDate = new Date();
        //             if(consoleLog===true){console.log(`${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);}
        //             if(consoleLog===true){console.log(("<>").repeat(55));}
        //         });
        //     }
        //     import {accessDb} from './src/SQLite_ServerSide.mjs';
        //     accessDb("project");
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// monitor memory usage
    const formatMemoryUsage = (data) => `${(data / 1024 / 1024).toFixed(2)} MB`;
    setInterval(() => {
        const memoryUsage = process.memoryUsage();
        // console.clear(); // Clears previous logs for readability
        let myText = "";
        myText += ("__").repeat(55);
        myText += `\n🖥️ Memory Usage Monitor`;
        myText += `\n1️⃣ RSS: Resident Size Set\n- The total memory allocated to your Node.mjs process, including:\n- Heap memory\n- Stack memory\n- Code segment\n- Why it matters:\n- This gives an overview of how much RAM your application is consuming. If RSS keeps increasing, it could indicate a memory leak.`;
        myText += `\n${(" ").repeat(5)}RSS: ${formatMemoryUsage(memoryUsage.rss)}`;
        myText += `\n${(" ").repeat(5)}${("~~").repeat(15)}`;
        myText += `\n2️⃣ Heap Used\n- What it is: The amount of actively used memory in the JavaScript heap.\n- Why it matters: This is the actual memory being used to store variables, objects, and function executions.\n- Key observation: If heapUsed keeps growing without dropping, it could signal inefficient memory management.`;
        myText += `\n${(" ").repeat(5)}Heap Used: ${formatMemoryUsage(memoryUsage.heapUsed)}`;
        myText += `\n${(" ").repeat(5)}${("~~").repeat(15)}`;
        myText += `\n3️⃣ Heap Total\n- What it is: The total allocated memory for the heap.\n- Why it matters: Node.mjs expands this dynamically, so a growing heap might indicate high memory demand.`;
        myText += `\n${(" ").repeat(5)}Heap Total: ${formatMemoryUsage(memoryUsage.heapTotal)}`;
        myText += `\n${(" ").repeat(5)}${("~~").repeat(15)}`;
        myText += `\n4️⃣ External\n- What it is: Memory used by objects managed outside of the JavaScript heap, such as:\n- Buffer allocations (Buffer.from())\n- WebAssembly objects\n- Native C++ extensions\n- Why it matters: If your app uses a lot of Buffers (e.g., file handling or network requests), external might be a significant factor.`;
        myText += `\n${(" ").repeat(5)}External: ${formatMemoryUsage(memoryUsage.external)}`;
        myText += `\n${(" ").repeat(5)}${("~~").repeat(15)}`;
        myText += `\nHow to Use These Stats\n✅ If RSS is too high, your app might need optimization or might be consuming too much memory.\n✅ If heapUsed > heapTotal, it suggests memory saturation, potentially slowing performance.\n✅ If external memory spikes, you may have large Buffer allocations affecting memory usage.\n🚀`;
        myText += `\n${("__").repeat(55)}`;
        // Write the memory usage data to a log fie
            const logFileName2 = `logs/memory_${myDate.toISOString().replace(/:/g, '-')}.txt`;
            fs.writeFile(logFileName2, myText, (err) => {
                if (err) {
                    console.error(`🟨 ${trace()}🔴 Error writing Memory statistics log:`, err);
                } else {
                    console.log(`🟨 ${trace()}🟢 Memory statistics logged: ${logFileName2}`);
                }
            });
    },  60 * 60 * 1000);

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
        console.log(("🎾").repeat(64));
        // console.log(`${trace()}\nServer is running on port:${PORT}\nAccessible on the server at either http://localhost:${PORT} or http://${DEV_IP_ADDRESS}:${PORT}.\nAccessible on the LAN at http://${DEV_IP_ADDRESS}:${PORT}.`);
        console.log(`🎾 ${trace()}\n🎾 Server is running on port:${PORT}.`);
        myDate = new Date();
        console.log(`🎾 ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);
        console.log(("🎾").repeat(64));
    });