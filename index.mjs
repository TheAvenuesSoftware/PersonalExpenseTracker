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
    // SESSIONS
        import session from 'express-session';
    // CORS handling START
        import cors from 'cors';
    // SQLite
        import sqlite3 from "sqlite3";
        import { open } from "sqlite";
    // ROUTERS
        // import dbRouter, * as dbFunctions from "./src/SQLite_ServerSide.mjs";
        // import loginRouter, * as loginFunctions from './src/globalLoginServer.mjs';
        // import globalRouter, * as globalFunctions from './src/globalRouter.mjs'; 
        // import projectRouter, * as projectFunctions from './src/projectRouter.mjs';
        // import sessionsRouter, * as sessionsFunctions from './src/globalSessionsServer.mjs';
        import dbRouter from "./src/SQLite_ServerSide.mjs";
        import loginRouter from './src/globalLoginServer.mjs';
        import globalRouter from './src/globalRouter.mjs'; 
        import projectRouter from './src/projectRouter.mjs';
        import sessionsRouter from './src/globalSessionsServer.mjs';
    // SQLite CRUD
        import { insertRecord, getRecord, updateRecord, deleteRecord } from "./src/SQLite_ServerSide.mjs";
        import { trace } from "./src/globalServer.mjs";

    // function checkImports(){
        try{
            if(consoleLog===true){console.log("Imported os:", os ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported fs:", fs ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported path:", path ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported url { fileURLToPath }:", fileURLToPath ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported dotenv:", dotenv ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported express:", express ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported cookieParser / cookie-parser:", cookieParser ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported jwt / jsonwebtoken:", jwt ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported crypto:", crypto ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported crypto { randomUUID }:", randomUUID ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported session / express-session:", session ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported cors:", cors ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported sqlite3:", sqlite3 ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported sqlite { open }:", open ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported dbRouter:", dbRouter ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported loginRouter:", loginRouter ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported globalRouter:", globalRouter ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported projectRouter:", globalRouter ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported sessionsRouter:", sessionsRouter ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported {insertRecord} from SQLite_ServerSide.mjs:", insertRecord ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported {getRecord} from SQLite_ServerSide.mjs:", getRecord ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported {updateRecord} from SQLite_ServerSide.mjs:", updateRecord ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported {deleteRecord} from SQLite_ServerSide.mjs:", deleteRecord ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported {trace} from globalServer.mjs:", trace ? "✅ " : "❌ Failed");}
        }
        catch (error) {
            console.log("imports error:",error);
        }     
    // }
    // checkImports();
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
                    if(consoleLog===true){console.log(trace(),`\n   Global environment variables:- ${envPath}`);}
                    const result = dotenv.config({ path: envPath });
                    // if(consoleLog===true){console.log(trace(),`\n${envPath}:-\n`, result.parsed);}  
                    const envVar = result.parsed;
                    Object.keys(envVar).forEach(key => {
                        // console.log(`key:- ${key} :- ${envVar[key]}`);
                        if(consoleLog===true){console.log(`      key:- ${key}`);}
                    }); 
                    console.log(`${trace()}🟢 Global environment variables loaded.`);
                } else {
                    console.log(`${trace()}🔴 ERROR:- ${envPath} not found!`);
                }
            } catch (error) {
                console.log(`${trace()}🔴 ERROR:- ${envPath} not found!`);
            }
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
        // project.env
            try{
                const envPath = "./config/projectServer.env";
                if (fs.existsSync(envPath)) {
                    dotenv.config({ path: envPath });
                    if(consoleLog===true){console.log(trace(),`\n   Project environment variables:- ${envPath}`);}
                    const result = dotenv.config({ path: envPath });
                    // if(consoleLog===true){console.log(trace(),`\n${envPath}:`, result);}                
                    const envVar = result.parsed;
                    Object.keys(envVar).forEach(key => {
                        // console.log(`key:- ${key} :- ${envVar[key]}`);
                        if(consoleLog===true){console.log(`      key:- ${key}`);}
                    }); 
                    console.log(`${trace()}🟢 Project environment variables loaded.`);
                } else {
                    console.log(`${trace()}🔴 ERROR:- ${envPath} not found!`);
                }
            } catch (error) {
                console.log(`${trace()}🔴 ERROR:- ${envPath} not found!`);
            }
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
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
    try{
        staticFolders.forEach(folder => {
            app.use(express.static(folder));
            app.use(`/${folder}`,express.static(folder));
            if(consoleLog===true){console.log(`mapped folder:- ${folder}`);}
        });
        console.log(`${trace()}🟢 Project folders mapped.`);
    }
    catch{
        console.log(`🔴 map to folder failed:- ${folder}`);
    }
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
    // CORS handling
        app.use(cors(
            {
                origin: '*',                         // ❌ ONLY for development only !!!!
                // origin: 'https://yourdomain.com', // ✔️ USE THIS when in production !!!
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                allowedHeaders: ['Content-Type', 'Authorization'],
                optionsSuccessStatus: 204, // Avoids extra response headers in preflight requests
                credentials: true // true if your app requires authentication with cookies or Authorization headers
            }
        ));
        console.log(`${trace()}🟢 CORS headers are set.`);
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
    // 4️⃣ session management
        // retrieve the session key OR create one if can't be retrieved
            // const crypto = require("crypto");
                // const sessionKey = crypto.randomBytes(32).toString("hex");
                const sessionKey = process.env.SESSION_KEY || crypto.randomBytes(32).toString("hex");
                if(consoleLog===true){console.log(trace(),'🟢 sessionKey created.');} // DON'T LOG THE KEY!!!  KEEP IT SECURE!!!
        // express-session - set up the Express session middleware
                console.log(`${trace()}🔒✅ Session management set up commenced.`);
                app.use(
                    session({
                        // store: redisStore, // redisStore seems to be unreliable, so let's not use it
                        // Generate a unique session ID
                            genid: (req) => randomUUID(),
                        // START ensures a session is created even if no data is set, - anew session ID is issued when a user does not yet have a session cookie.
                            secret: process.env.SESSION_KEY || 'your-secret-key', // Replace with your secret or fallback value
                            resave: false, // false:- ensures a session is created even if no data is set, - anew session ID is issued when a user does not yet have a session cookie.
                            saveUninitialized: true, // true:- ensures a session is created even if no data is set, - anew session ID is issued when a user does not yet have a session cookie.
                        // END ensures a session is created even if no data is set, - anew session ID is issued when a user does not yet have a session cookie.
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
                console.log(`${trace()}🔒✅ Session management is set up.`);
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
// AUTHENTICATE USER
    console.log(`${trace()}🔒✅ Authentication setup START.`);
    const safePaths = JSON.parse(fs.readFileSync("safe_paths.json", "utf8")).allowedPaths;

    app.use((req, res, next) => {
        console.log(("🔒").repeat(60));
        console.log(`🪣 ${trace()}🔒 ⁉️req.url:-`,req.url);

        // Skip authentication for public routes
            const publicRoutes = ["/loginRouter/login_step2", "/loginRouter/login_step3", "/loginRouter/login_step4","/globalRouter/getGlobalFooter"];
            if (publicRoutes.includes(req.path)) {
                console.log(`🪣 ${trace()}🔒✅ loggoing in...`);
                return next(); 
            }

        // connect.sid
            const rawCookieSessionId = req.cookies["connect.sid"];
                if(consoleLog===true){console.log(`🪣 ${trace()}🔒 ⁉️cookie connect.sid:-              `,rawCookieSessionId);}
                if(consoleLog===true){console.log(`🪣 ${trace()}🔒 ⁉️req.headers.cookie:-`,req.headers.cookie);}
                if(consoleLog===true){console.log(`🪣 ${trace()}🔒 ⁉️cookie connect.sid:-`,rawCookieSessionId.slice(2,rawCookieSessionId.length));}
                if(consoleLog===true){console.log(`🪣 ${trace()}🔒 ⁉️req.headers.cookie:-`,req.headers.cookie.slice(16,req.headers.cookie.length));}
            const cookieSid = (req.cookies["connect.sid"] || "").replace(/^s:/, "");
            const headerSid = (req.headers.cookie || "").match(/connect\.sid=s%3A([^;]+)/)?.[1];
                if(consoleLog===true){console.log(`🪣 ${trace()}🔒 ⁉️cookieSid:-`,cookieSid);}
                if(consoleLog===true){console.log(`🪣 ${trace()}🔒 ⁉️headerSid:-`,headerSid);}
            if (cookieSid !== headerSid) {
                console.warn(`🪣 ${trace()}🔒 ⁉️Session ID mismatch detected for \n🪣 ${cookieSid} v \n🪣 ${headerSid}`);
                console.warn(`🪣 ${trace()}🔒 ⁉️Session ID mismatch detected for ${req.url}`);
                if (!safePaths.includes(req.url)) {
                    const allowedRouters = ["/dbRouter/", "/projectRouter/", "/globalRouter/", "/loginRouter/", "/sessionsRouter/"];
                    if (allowedRouters.some(prefix => req.url.startsWith(prefix))) {
                        // console.log("Request is allowed");
                        console.warn(`🪣 ${trace()}🔒🟢 Access allowed to router:- ${req.url}`);
                    } else {
                        // console.log("Access denied");
                        console.warn(`🪣 ${trace()}🔒🔴 Access denied due to session inconsistency:- ${req.url}`);
                        return res.status(403).send("Access denied due to session inconsistency.");
                    }
                }else{
                    console.warn(`🪣 ${trace()}🔒🟢 Access allowed to safe path:- ${req.url}`);
                }
            }

        // check expiry
            // console.log(`🪣 ${trace()}🔒✅ Authenticating....req.session\n`,req.session);
            console.log(`🪣 ${trace()}🔒✅ Authenticating....req.session.cookie.expires:- `,new Date(req.session.cookie.expires).toLocaleString());
        
        // authentication
            console.log(`🪣 ${trace()}🔒✅ Authenticating....req.session.securityCode.code:- `,req.session.securityCode? req.session.securityCode.code : "...not yet issued.");
            console.log(`🪣 ${trace()}🔒✅ Authenticating....req.cookies.securityCode:- `,req.cookies.securityCode? req.cookies.securityCode : "...not yet received.");
            console.log(`🪣 ${trace()}🔒✅ Authenticating user...`);
            if (req.session.securityCode && req.cookies.securityCode) {
                console.log(`🪣 ${trace()}🔒✅ authenticating user...`);
                if (req.session.securityCode.code === req.cookies.securityCode) {
                    console.log(`🪣 ${trace()}🔒✅ User authentication successful!`);
                    return next();
                } else {
                    console.log(`🪣 ${trace()}🔒🔴 Security code mismatch — authentication failed!`,req.session.securityCode.code,req.cookies.securityCode);
                    // res.status(401).send("Unauthorized");
                    res.send({message:`Access denied.`,status:false});
                    res.end();
                }
            } else {
                console.log(`🪣 ${trace()}🔒🔴 Missing security code — authentication denied!`);
                // console.log(`🪣 ${trace()}🔒🔴 req.headers.cookie:-`,req.headers.cookie);
                // res.status(401).send("Unauthorized");
                res.send({message:`You are not logged in, please log in.`,status:false});
                res.end();
            }
        console.log(("🔒").repeat(60));
    });
    console.log(`${trace()}🔒✅ Authentication setup END.`);
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
// 5️⃣ MOUNT EXTERNAL ROUTERS
        // function mountRouters() {
            try{
                app.use("/dbRouter", dbRouter);
                app.use("/loginRouter", loginRouter);
                app.use("/globalRouter", globalRouter);
                app.use("/projectRouter", projectRouter);
                app.use("/sessionsRouter", sessionsRouter);
                console.log(`${trace()}🔒✅ Routers mounted - must be done after Authentication is setup.`);
            }
            catch (error) {
                console.log(error);
            }
        // }
        // mountRouters();
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
// 6️⃣ routes AND business logic
    // log REQuest START
        async function logREQuest(req){
            console.log(`🪣 ${trace()}🟢 log REQuest summary commenced.`);
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
                                console.log(`🪣 ${trace()}🟢 Log REQuest summary to file "${REQuestLogFileName}" completed after ${attempt} attempt(s).`);
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
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// 🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣
    app.use((req, res, next) => {

        console.log("\n");
        console.log(("🪣").repeat(60));

        // REQuest summary
            const myDate = new Date();
            console.log(`🪣 ${trace("")}\n🪣     DATE:   ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}\n🪣     METHOD: ${req.method}\n🪣     URL:   ${req.url}`);

        // REQuest credentials received
            // req.headers.cookie? console.log(`🪣 ${trace()}🟢 REQuest credentials received [req.headers.cookie]: ${true}`) : console.log(`🪣 ${trace()}🔴 REQuest credentials received [req.headers.cookie]: ${false}`);
            console.log(`🪣 ${trace()}📫 REQuest headers received:`, req.headers? true : false);
            console.log(`🪣 ${trace()}📫 Cookie in REQuest headers:`, req.headers.cookie? true : false);
            console.log(`🪣 ${trace()}📫 Session in REQuest:`, req.session? true : false);
            console.log(`🪣 ${trace()}📫 Cookie in REQuest session:`, req.session.cookie? true : false);
            if(req.session.cookieID){
                console.log(`🪣 ${trace()}📫 🟢 credentials authenticated.`,req.session.cookieID,req.headers.cookieID);
            }else{
                console.log(`🪣 ${trace()}📫 🔴 credentials NOT authenticated. ${req.session.cookieID} != ${req.headers.cookieID}`);
            }

        // set session creation timestamp
        // console.log(`🪣 Session object before try/catch:`, req.session);
        // console.log("🪣 Before try/catch—this should appear!");
            try{
                if (!req.session.createdAt) {
                    req.session.createdAt = Date.now(); // Store creation timestamp
                    console.log(`🪣 ${trace()}📫 Session create time set to:`, req.session.createdAt);
                }
            } catch (error) {
                console.log(`🪣 ${trace()}📫🔴 Session create time could not be set:`, error);
            }
            // Extract session ID from cookie
                const rawSessionId = req.cookies["connect.sid"]; 
            console.log(`${trace()} cookie connect.sid:- `,rawSessionId);
            console.log(`${trace()} req.session:-\n`,req.session);

        next();

    });
// 🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // Client heartbeat detected, extend session.💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙
        app.post("/heartbeat-session-extension", (req, res) => {    
            if (req.session) {
                try{
                    req.session.createdAt = Date.now();
                    console.log(trace(),{ message: "Session extended!", status: true });
                    res.json({ message: "Session extended!", status: true });
                } catch (error) {
                    console.log(trace(),{ message: "Session cookie not found.", status: false });
                    res.json({ message: "Session cookie not found.", status: false });
                }
            } else {
                console.log(trace(),{ message: "Session not found.", status: false });
                res.json({ message: "Session not found.", status: false });
            }
        });
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