const consoleLog = false

if(consoleLog===true){console.log(trace(),"\nLOADED:- globalSessionsServer.mjs is loaded",new Date().toLocaleString());}
export function globalSessionsServerMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  SERVER SIDE IMPORTS ONLY
    import { Router } from "express";
    const sessionsRouter = Router();
    import {trace} from "./globalServer.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

    // SET-UP Store user data in the session
        sessionsRouter.post("/store-session", (req, res) => {
            if(consoleLog===true){console.log(trace());}
            if(consoleLog===true){console.log("/store-session:-",req.body);}
            req.session.userData = req.body; 
            if(consoleLog===true){console.log("req.session.userData:-",req.session.userData);}
            // if(consoleLog===true){console.log(trace());}
            // if(consoleLog===true){console.log("req.session:-",req.session);}
            res.json({ message: "User data stored in session OK!" });
        });
    // RETRIEVE session data
        sessionsRouter.get("/get-session", (req, res) => {
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
        sessionsRouter.post("/set-session", (req, res) => {
            req.session.favoriteColor = "Blue";  
            req.session.isLoggedIn = true;    
            res.json({ message: "Additional session data added!" });
        });
    // REFRESH session timeout cookie
        sessionsRouter.post("/refresh-session", (req, res) => {
            // if(consoleLog===true){console.log(("99").repeat(55));}
            // if(consoleLog===true){console.log(trace());}
            // if(consoleLog===true){console.log(req.session);}
            if (!req.session.userData.userRole) {
                return res.status(401).json({ error: "Session has already expired..." });
            }
            req.session.cookie.maxAge = 15 * 60 * 1000; // ✅ Reset session expiration
            res.json({ message: "Session refreshed!" });
            if(consoleLog===true){console.log(trace(),`\n${message}`);}
        });
    // LOGOUT
        sessionsRouter.post("/sessionLogout", (req, res) => {
            req.session.destroy((err) => {
                if (err){
                    if(consoleLog===true){console.log(("99").repeat(55));}
                    if(consoleLog===true){console.log(trace());}
                    if(consoleLog===true){console.log(err);}
                    return res.status(500).send("Error ending session");
                }
                res.clearCookie("connect.sid"); // Remove session cookie
                res.send({"logoutConfirmed":true});
            });
        });
        
// // start ⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️
// // const session = require('express-session');
// import session from 'express-session';
//
// sessionsRouter.use(session({
//   secret: 'yourSecretKeyHere', // Change this to a strong, random key
//   resave: false,              // Prevents unnecessary session saves
//   saveUninitialized: false,   // Avoids storing empty sessions
//   cookie: {
//     httpOnly: true,           // Protects against XSS attacks
//     secure: true,             // Ensures cookies are sent only over HTTPS (enable in production)
//     maxAge: 1000 * 60 * 15    // Session expires after 15 minutes
//   }
// }));
//
// // Middleware to regenerate session ID periodically
// sessionsRouter.use((req, res, next) => {
//   if (!req.session.regenerated && req.session.user) {
//     req.session.regenerated = true;
//     req.session.regenerate(err => {
//       if (err) console.error('Session regeneration error:', err);
//     });
//   }
//   next();
// });
//
// // Example route to store session data
// sessionsRouter.get('/login', (req, res) => {
//   req.session.user = { id: 1, name: 'Donald' }; // Simulated user session data
//   res.send('User logged in, session created!');
// });
//
// // Example route to retrieve session data
// sessionsRouter.get('/session-info', (req, res) => {
//   res.json(req.session);
// });
//
// // Example route to destroy session
// sessionsRouter.get('/logout', (req, res) => {
//   req.session.destroy(() => {
//     res.send('Session destroyed. User logged out.');
//   });
// });
//
// // end ⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️

export default sessionsRouter;