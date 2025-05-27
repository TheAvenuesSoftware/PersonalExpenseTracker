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
console.log(("🔰").repeat(60));
console.log(`🔰 ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}${(" ").repeat(118-(`🔰 ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`).length)}🔰`);
myDate = new Date();
console.log(`🔰 ${myDate}${(" ").repeat(118-(`🎾 ${myDate}`).length)}🔰`);
process.env.TZ = "Australia/Sydney"; // 🌏 Sets the server timezone
console.log(`🔰 Server running in timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}${(" ").repeat(118-(`🔰 Server running in timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`).length)}🔰`);
console.log(("🔰").repeat(60));

const consoleLog = false

// trace()
    export function trace(whoCalled="") {
        try {
            const stack = new Error().stack;
            const firstLine = stack.split('\n')[2].trim();
            const x = firstLine.lastIndexOf("/");
            const y = firstLine.lastIndexOf("/",x - 1);
            const fileName_rowNumber_position = firstLine.slice(y + 1,firstLine.length);
            return `▶️Trace: [${whoCalled? whoCalled : ""}] ${fileName_rowNumber_position} ▶️`;
        } catch (error) {
            return '▶️Trace: NOT AVAILABLE▶️';
        }
    };
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
// 1️⃣ import statements
    // OS - operatingSystem
        import os from 'os';
    // FS - fileSystem
        import fs from 'fs';
        // import fs from 'fs/promises';
            // - fs.writeFile from 'fs' expects a callback (cb), which is why you're getting the "cb argument must be of type function" error.
            // - The 'fs/promises' version works natively with async/await, so no callback is needed.
    // PATH
        import path from 'path';
        import { fileURLToPath } from 'url';
            // Get the current file path
                const __filename = fileURLToPath(import.meta.url);
            // Get the directory name
                const __dirname = path.dirname(__filename);
    // ENVironment variables
        import dotenv from "dotenv";
    // EXPRESS
        import express from "express";
    // COOKIE PARSER
        import cookieParser from 'cookie-parser';
    // JSONWEBTOKE for user authentication
        import jwt from 'jsonwebtoken';
    // CRYPTO
        import crypto from 'crypto'
        import { randomUUID } from 'crypto'; // randomUUID is a named export from crypto
    // REDIS
        import { createClient } from 'redis'; // createClient is a named export from redis
        import { RedisStore } from 'connect-redis'; // RediStore is a named export from connect-redis
    // SESSIONS
        import session from 'express-session';
    // CORS handling START
        import cors from 'cors';
    // SQLite
        import sqlite3 from "sqlite3";
        import { open } from "sqlite";
    // ROUTERS
        import dbRouter, * as dbFunctions from "./src/SQLite_ServerSide.mjs";
        import loginRouter, * as loginFunctions from './src/globalLoginServer.mjs';
        import globalRouter, * as globalFunctions from './src/globalRouter.mjs'; 
        import projectRouter, * as projectFunctions from './src/projectRouter.mjs';
        import sessionsRouter, * as sessionsFunctions from './src/globalSessionsServer.mjs';
    // SQLite CRUD
        import { insertRecord, getRecord, updateRecord, deleteRecord } from "./src/SQLite_ServerSide.mjs";

    function checkImports(){
        try{
            console.log("Imported os:", os ? "✅ " : "❌ Failed");
            console.log("Imported fs:", fs ? "✅ " : "❌ Failed");
            console.log("Imported path:", path ? "✅ " : "❌ Failed");
            console.log("Imported url { fileURLToPath }:", fileURLToPath ? "✅ " : "❌ Failed");
            console.log("Imported dotenv:", dotenv ? "✅ " : "❌ Failed");
            console.log("Imported express:", express ? "✅ " : "❌ Failed");
            console.log("Imported cookieParser / cookie-parser:", cookieParser ? "✅ " : "❌ Failed");
            console.log("Imported jwt / jsonwebtoken:", jwt ? "✅ " : "❌ Failed");
            console.log("Imported crypto:", crypto ? "✅ " : "❌ Failed");
            console.log("Imported crypto { randomUUID }:", randomUUID ? "✅ " : "❌ Failed");
            console.log("Imported redis { createClient }:", createClient ? "✅ " : "❌ Failed");
            console.log("Imported connect-redis { RedisStore }:", RedisStore ? "✅ " : "❌ Failed");
            console.log("Imported session / express-session:", session ? "✅ " : "❌ Failed");
            console.log("Imported cors:", cors ? "✅ " : "❌ Failed");
            console.log("Imported sqlite3:", sqlite3 ? "✅ " : "❌ Failed");
            console.log("Imported sqlite { open }:", open ? "✅ " : "❌ Failed");
            console.log("Imported dbRouter:", dbRouter ? "✅ " : "❌ Failed");
            console.log("Imported loginRouter:", loginRouter ? "✅ " : "❌ Failed");
            console.log("Imported globalRouter:", globalRouter ? "✅ " : "❌ Failed");
            console.log("Imported projectRouter:", globalRouter ? "✅ " : "❌ Failed");
            console.log("Imported sessionsRouter:", sessionsRouter ? "✅ " : "❌ Failed");
        }
        catch (error) {
            console.log("imports error:",error);
        }     
    }
    checkImports();
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
// 2️⃣ environment configuration
    // .ENV;  .MJS
        // globalServer.env
            try{
                const envPath = "./config/globalServer.env";
                if (fs.existsSync(envPath)) {
                    dotenv.config({ path: envPath });
                    console.log(trace(),`\n   Global environment variables:- ${envPath}`);
                    const result = dotenv.config({ path: envPath });
                    // if(consoleLog===true){console.log(trace(),`\n${envPath}:-\n`, result.parsed);}  
                    const envVar = result.parsed;
                    Object.keys(envVar).forEach(key => {
                        // console.log(`key:- ${key} :- ${envVar[key]}`);
                        console.log(`      key:- ${key}`);
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
                    console.log(trace(),`\n   Project environment variables:- ${envPath}`);
                    const result = dotenv.config({ path: envPath });
                    // if(consoleLog===true){console.log(trace(),`\n${envPath}:`, result);}                
                    const envVar = result.parsed;
                    Object.keys(envVar).forEach(key => {
                        // console.log(`key:- ${key} :- ${envVar[key]}`);
                        console.log(`      key:- ${key}`);
                    }); 
                } else {
                    if(consoleLog===true){console.log(trace(),`\n🔴 ERROR:- ${envPath} not found!`);}
                }
            } catch (error) {
                if(consoleLog===true){console.log(trace(),`\n🔴 ERROR:- ${envPath} not found!`);}
            }
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
// 3️⃣ create express app AND middleware
    const app = express();
    app.use(express.json());
    app.disable('x-powered-by'); // Reduce fingerprinting by hiding that this is an ExpressJS app
    app.set('trust proxy', 1) // trust first proxy
    app.use(express.json()); // Middleware to parse JSON data
    app.use(cookieParser()); // Enables reading of cookies
    const staticFolders = ['config', 'db', 'media', 'public', 'src', 'styles'];
    staticFolders.forEach(folder => {
        try{
            app.use(express.static(folder));
            // app.use(`/${folder}`,express.static(folder));
            if(consoleLog===true){console.log(`mapped folder:- ${folder}`);}
        }
        catch{
            if(consoleLog===true){console.log(`🔴 map to folder failed:- ${folder}`);}
        }
    });
    if(consoleLog===true){console.log(`${trace()}🟢 Folders mapped in Express.`);}
//   🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  
    // CORS handling
        app.use(cors({
            origin: '*',                         // ❌ ONLY for development only !!!!
            // origin: 'https://yourdomain.com', // ✔️ USE THIS when in production !!!
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            optionsSuccessStatus: 204, // Avoids extra response headers in preflight requests
            credentials: true // true if your app requires authentication with cookies or Authorization headers
        }));
        // app.options('*', cors()); causes error !!! START
            // app.options('*', cors()); // ensures Express automatically handles OPTIONS requests for every route, Without it, you may need to manually set headers in your route handlers.
        // app.options('*', cors()); causes error !!! END
        if(consoleLog===true){console.log(`${trace()}🟢 CORS headers are set.`);}
//   🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  🔹  
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
// 4️⃣ session management
    // retrieve the session key OR create one if can't be retrieved
        // const crypto = require("crypto");
            // const sessionKey = crypto.randomBytes(32).toString("hex");
            const sessionKey = process.env.SESSION_KEY || crypto.randomBytes(32).toString("hex");
            if(consoleLog===true){console.log(trace(),'🟢 sessionKey created.');} // DON'T LOG THE KEY!!!  KEEP IT SECURE!!!
    // // Async function to create and return a RedisStore instance
    //     async function createRedisStore() {
    //         if(consoleLog===true){console.log(`${trace()}🟢 createRedisStore().`);}
    //         // Create a Redis client
    //             const redisClient = createClient();
    //             redisClient.on('error', (err) => {
    //                 console.error('🔴 Redis Client Error', err);
    //             });            
    //         // Connect to the Redis server (make sure your Node version supports top-level await or use this inside an async function)
    //             await redisClient.connect();
    //         // Create an instance of RedisStore using the connected client
    //             const redisStore = new RedisStore({
    //                 client: redisClient,
    //                 prefix: 'sess:', // Optional prefix for session keys in Redis
    //                 ttl: 900 // Session expiration time (15 min)
    //             });
    //             console.log(`${trace()}🟢 Redis is set up.`);
    //             return redisStore;
    //     }
    // express-session - set up the Express session middleware
        function setupExpressSession() { // redisStore seems to be unreliable, so let's not use it
            // function setupExpressSession(redisStore) { // redisStore seems to be unreliable, so let's not use it
            console.log(`${trace()}🟢 setupExpressSession() commenced.`);
            app.use(
                session({
                    // store: redisStore, // redisStore seems to be unreliable, so let's not use it
                    // Generate a unique session ID
                        genid: (req) => randomUUID(),
                    secret: process.env.SESSION_KEY || 'your-secret-key', // Replace with your secret or fallback value
                    resave: false,
                    saveUninitialized: false,
                    cookie: {
                        // secure: true,    // Set to true for HTTPS in production, false for development
                        // secure: false,    // Set to true for HTTPS in production, false for development
                        secure: process.env.NODE_ENV === "production",
                        // httpOnly: true,   // Helps mitigate XSS - set to false for development, true for production
                        httpOnly: false,   // Helps mitigate XSS - set to false for development, true for production
                        // sameSite: "Strict", // Helps mitigate CSRF - "Strict" for development; "Lax" for standard; "None" for cross-origin requests with Secure true.
                        sameSite: "Lax", // Helps mitigate CSRF - "Strict" for development; "Lax" for standard; "None" for cross-origin requests with Secure true.
                        // sameSite: "None", // Helps mitigate CSRF - "Strict" for development; "Lax" for standard; "None" for cross-origin requests with Secure true.
                        // SameSite Options:
                        //     - 'Strict' → Only sends the cookie for same-site requests (highest security).
                        //     - 'Lax' → Sends the cookie for same-site requests + top-level navigation (default).
                        //     - 'None' → Allows cross-site cookies but requires Secure: true (useful for APIs).
                        maxAge: 15 * 60 * 1000, // Session expires after 15 minutes
                    },
                })
            );
            console.log(`${trace()}🟢 Express session management is set up.`);
        }
    // Initialize session management
        // createRedisStore() // redisStore seems to be unreliable, so let's not use it
        // .then((redisStore)=>{setupExpressSession(redisStore);}) // redisStore seems to be unreliable, so let's not use it
        // .then(() => {mountRouters();});
        (async () => {
            try {
                // const redisStore = await createRedisStore(); // redisStore seems to be unreliable, so let's not use it
                // await setupExpressSession(redisStore); // redisStore seems to be unreliable, so let's not use it
                await setupExpressSession();
                mountRouters();
            } catch (err) {
                console.error('🔴 Failed to set up session management!', err);
            }
        })();

if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
// 5️⃣ MOUNT EXTERNAL ROUTERS
        function mountRouters() {
            try{
                app.use("/dbRouter", dbRouter);
                app.use("/loginRouter", loginRouter);
                app.use("/globalRouter", globalRouter);
                app.use("/projectRouter", projectRouter);
                app.use("/sessionsRouter", sessionsRouter);
                console.log(`${trace()}🟢 Routers mounted.`);
            }
            catch (error) {
                console.log(error);
            }
        }
        // mountRouters();
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
// 6️⃣ routes AND business logic
    // log REQuest START
        async function logREQuest(req){
            console.log(`🪣 ${trace()}🟢 log REQuest summary.`);
            try{
                // log the REQuest to "logs/request_yy-mm-ddThh-mm-ss.999Z.txt" START
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
                        const REQuestLogFileName = `logs/REQuest/REQuest_${myDate.toISOString().replace(/:/g, '-')}.txt`;
                    // Write the request data to a log file
                        const retries = 3;
                        const delay = 500;
                        for (let attempt = 1; attempt <= retries; attempt++) {
                            try{
                                // await fs.writeFile(REQuestLogFileName, reqString);
                                await fs.promises.writeFile(REQuestLogFileName, reqString);
                                console.log(`🪣 ${trace()}🟢 REQuest logged to "${REQuestLogFileName}" after ${attempt} attempt(s).`);
                                return;
                            } catch (error) {
                                console.warn(`🪣 ${trace()} ⚠️ Writing REQuest log on attempt ${attempt} failed:`, error.message);
                                if (attempt < retries) {
                                    await new Promise(res => setTimeout(res, delay * 2 ** (attempt - 1))); // Exponential backoff
                                }else{
                                    throw new Error(`🪣🔴🚫 All ${retries} attempts to write REQuest log failed.`);
                                }
                            }
                        }
                // log the REQuest to "logs/request_yy-mm-ddThh-mm-ss.999Z.txt" END
            } catch (error) {
                console.error(`🪣 ${trace()}🔴 Catch! Error writing REQuest log:`, error);  
            }
        }
    // log REQuest END
    // log SESSION details START
        async function logSession(req){
            console.log(`🪣 ${trace()}🟢 log Session details.`);
            const retries = 3;
            const delay = 5000;
            let myText = "";
            for (let attempt = 1; attempt <= retries; attempt++) {
                try{
                    myText += `${trace("")}\n🪣 req.session ${req.session? req.session : "nope."}`;
                    myText += `${trace("")}\n🪣 req.session.cookie ${req.session.cookie}`;
                    console.log(myText);
                    // myText += trace(""),"\n🪣 ";
                    // myText += trace(""),"\n🪣      req.session.cookie.expires", req.session.cookie.expires;   
                    // myText += trace(""),"\n🪣      new Date()", new Date();
                    // myText += trace(""),"\n🪣      ((req.session.cookie.expires - new Date()) / 1000 /60).toFixed(0))", ((req.session.cookie.expires - new Date()) / 1000 /60).toFixed(0);
                    // myText += "\n🪣";
                    // let expiresMS = req.session.cookie.expires;
                    // expiresMS = expiresMS.getTime();
                    // myText += trace(""),"\n🪣      req.session.cookie.expires >>> getTime()", expiresMS;
                    // myText += trace(""),"\n🪣      Date.now()", Date.now();
                    // myText += trace(""),"\n🪣      req.session.cookie.expires >>> getTime() - Date.now() / 1000 /1 60 >>> toFixed(0)", ((expiresMS - Date.now()) / 1000 /60).toFixed(0);
                    // myText += "\n🪣";
                    // myText += trace(""),"\n🪣      req.session.cookie.maxAge", req.session.cookie.maxAge;
                    // myText += trace(""),"\n🪣      (req.session.cookie.maxAge / 1000 / 60).toFixed(0)", (req.session.cookie.maxAge / 1000 / 60).toFixed(0);
                    // myText += "\n🪣";
                    // myText += trace(
                    //     ""),"\n🪣      req.cookies", req.cookies;
                    // myText += trace(""),"\n🪣      req.session", req.session;
                    // myText += trace(""),"\n🪣      req.session.Session", req.session.Session;
                    // // myText += "All Cookies: req.cookies", req.session.createdAt;
                    // // myText += "All Cookies: req.cookies", req.session.createdAt.toLocaleString();
                    // if(req.session.createdAt!=null){
                    //     myText += trace(""),"\n🪣      🟩 req.session.createdAt", req.session.createdAt;
                    // }
                    // Create a timestamped log file
                        const sessionLogFileName = `logs/session/session_${myDate.toISOString().replace(/:/g, '-')}.txt`;
                    // Write the request data to a log file
                        const retries = 3;
                        const delay = 500;
                        for (let attempt = 1; attempt <= retries; attempt++) {
                            try{
                                // await fs.writeFile(REQuestLogFileName, reqString);
                                await fs.promises.writeFile(sessionLogFileName, myText);
                                console.log(`🪣 ${trace()}🟢 Session logged to "${sessionLogFileName}" after ${attempt} attempt(s).`);
                                return;
                            } catch (error) {
                                console.warn(`🪣 ${trace()} ⚠️ Writing Session log on attempt ${attempt} failed:`, error.message);
                                if (attempt < retries) {
                                    await new Promise(res => setTimeout(res, delay * 2 ** (attempt - 1))); // Exponential backoff
                                }else{
                                    throw new Error(`🪣🔴🚫 All ${retries} attempts to write Session log failed.`);
                                }
                            }
                        }
                    return;
                } catch (error) {
                    console.warn(`🪣 ${trace()}⚠️ Writing Session log on attempt ${attempt} failed:`, error.message);
                    if (attempt < retries) {
                        await new Promise(res => setTimeout(res, delay * 2 ** (attempt - 1))); // Exponential backoff
                    }else{
                        throw new Error(`🪣🔴🚫 All ${retries} attempts to write Session log failed.`);
                    }
                }
            }
        }
    // log SESSION details END
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// 🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣
    //  catch-all START 🪣 
        app.use(async(req, res, next) => {

            console.log("\n");
            console.log(("🪣").repeat(60));

            // REQuest summary
                const myDate = new Date();
                console.log(`🪣 ${trace("")}\n🪣     DATE:   ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}\n🪣     METHOD: ${req.method}\n🪣     URL:   ${req.url}`);

            // log REQuest
                logREQuest(req);

            // // log Session
            //     logSession(req);

            // REQuest credentials received
                req.headers.cookie? console.log(`🪣 ${trace()}🟢 REQuest credentials received [req.headers.cookie]: ${true}`) : console.log(`🪣 ${trace()}🔴 REQuest credentials received [req.headers.cookie]: ${false}`);

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
            //             console.log(trace(""),`\nSession details:- `,req.session);
            //             console.log(trace(""),'\nSession details JSON:- ', JSON.stringify(req.session, null, 2));
            //             next(); // Move to next middleware after successful regeneration
            //         });
            //     } else {
            //         next();
            //     }
            // slient session regen END

            next();

        });
        // catch-all END 🪣
// 🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        // Client heartbeat detected, extend session.💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙

app.post("/heartbeat-session-extension", (req, res) => {
    console.log(`${trace()}💙 Headers received:`, req.headers);
    console.log(`${trace()}💙 Cookies in request:`, req.headers.cookie);
    console.log(`${trace()}💙 Session object:`, req.session);
    
    if (req.session) {
        req.session.createdAt = Date.now();
        res.json({ message: "Session extended!", status: true });
    } else {
        res.json({ message: "Session not found.", status: false });
    }
});

app.post("/heartbeat-session-extension", async (req, res) => {
    try {
        console.log(`${trace()} 🔎 Cookies in request [req.headers.cookie]:`, req.headers.cookie);

        // Extract session ID from cookie
        const rawSessionId = req.cookies["connect.sid"]; 
        if (!rawSessionId) {
            console.log(`${trace()}🔎 🔴 No session ID found in request cookies [const rawSessionId = req.cookies["connect.sid"];].`);
            return res.json({ message: "No session ID found.", status: false });
        }

        // Clean session ID to match Redis format
        const cleanedSessionId = rawSessionId.split(".")[0].replace(/^s:/, "");
        console.log(`${trace()}🔎 Cleaned Session ID [const cleanedSessionId = rawSessionId.split(".")[0].replace(/^s:/, "");]:`, cleanedSessionId);

        // Check session in Redis
        const redisClient = createClient();
        await redisClient.connect();
        const sessionData = await redisClient.get(`sess:${cleanedSessionId}`);
        console.log(`${trace()}🔎 Retrieved Session from Redis:`, sessionData);

        if (sessionData) {
            res.json({ message: "Session found!", status: true });
        } else {
            res.json({ message: "Session missing.", status: false });
        }

    } catch (error) {
        console.error(`${trace()}🔎 🔴 Error checking session:`, error);
        res.json({ message: "Server error occurred.", status: false });
    }
});

app.post("/heartbeat-session-extension", async (req, res) => {
    const sessionId = req.cookies["connect.sid"];
    console.log("🔎 Session ID from cookie:", sessionId);

    if (!sessionId) {
        return res.json({ message: "No session ID in cookies!", status: false });
    }

    // Manually check session in Redis
    const redisClient = createClient();
    await redisClient.connect();
    const sessionData = await redisClient.get(`sess:${sessionId}`);
    console.log("🔎 Retrieved Session from Redis:", sessionData);

    res.json({ message: sessionData ? "Session found!" : "Session missing.", status: !!sessionData });
});



app.post("/heartbeat-session-extension", async (req, res) => {
    console.log("🔎 Cookies in request:", req.headers.cookie);
    console.log("🔎 Session object:", req.session);

    if (req.session) {
        req.session.createdAt = Date.now();
        res.json({ message: "Session extended!", status: true });
    } else {
        console.log("🔴 Session not found, checking Redis manually...");
        
        // Manually check Redis session data
        const redisClient = createClient();
        await redisClient.connect();
        const sessionKeys = await redisClient.keys("sess:*");
        console.log("🔎 Stored Redis Sessions:", sessionKeys);
        
        res.json({ message: "Session not found.", status: false });
    }
});

            // app.post("/heartbeat-session-extension", (req, res) => {
            //     try{
            //         if (req.session) {
            //             req.session.createdAt = Date.now(); // Reset session timestamp to now
            //             if(consoleLog===true){console.log(`${trace("heartbeat-session-extension")}\n🟢 Client heartbeat detected, session extended at ${new Date().toLocaleString()}`);}
            //             res.send({ message: `Client heartbeat detected, session extended at ${new Date().toLocaleString()}.`,status: true });
            //         } else {
            //             if(consoleLog===true){console.log(`${trace("heartbeat-session-extension")}\n🔴 Client heartbeat detected, but there's a session extension error:- (req.session!=true).`);}
            //             res.send({ message: `Client heartbeat detected, but there's a session extension error:- (req.session!=true).`,status:false });
            //         }
            //     }catch (error){
            //             if(consoleLog===true){console.log(`${trace("heartbeat-session-extension")}\n🔴 Client heartbeat detected, session extension error:- (req.session!=true).\n`,error.message);}
            //             res.send({ message: `Client heartbeat detected, but there's an error:- ${error}.`,status:false });
            //     }
            // });
        // Client heartbeat detected, extend session.💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
myDate = new Date();
// if(consoleLog===true){console.log(`${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);}
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
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
                    console.error(`${trace()}🔴 Error writing Memory statistics log:`, err);
                } else {
                    console.log(`${trace()}🟢 Memory statistics logged: ${logFileName2}`);
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
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
// 7️⃣ start server
    // Start the server
        const PORT = process.env.PORT;
        const DEV_IP_ADDRESS = process.env.DEV_IP_ADDRESS;
        app.listen(PORT,'0.0.0.0', () => {
            console.log(("🎾").repeat(60));
            // console.log(`${trace()}\nServer is running on port:${PORT}\nAccessible on the server at either http://localhost:${PORT} or http://${DEV_IP_ADDRESS}:${PORT}.\nAccessible on the LAN at http://${DEV_IP_ADDRESS}:${PORT}.`);
            console.log(`🎾 ${trace()}${(" ").repeat(118-(`🎾 ${trace()}`).length)}🎾\n🎾 Server is running on port:${PORT}.${(" ").repeat(118-(`🎾 Server is running on port:${PORT}.`).length)}🎾`);
            myDate = new Date();
            console.log(`🎾 ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}${(" ").repeat(118-(`🎾 ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`).length)}🎾`);
            console.log(("🎾").repeat(60));
        });