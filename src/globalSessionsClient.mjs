function consoleTrace() {
    try {
        const stack = new Error().stack;
        const firstLine = stack.split('\n')[2].trim();
        return `Trace line: ${firstLine}`;
    } catch (error) {
        return 'Trace line: not available';
    }
};

console.log(consoleTrace(),"\nLOADED:- globalSessionsClient.mjs is loaded",new Date().toLocaleString());
function globalSessionsClientJSisLoaded(){
    return true;
}

            let sessionDuration = 0;

            // START SESSION
                let sessionWarningTimeout;
                let sessionExpiredTimeout;
                async function storeSession() {
                    try {
                        const response = await fetch("http://localhost:3000/sessionsRoutes/store-session", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ 
                                // userName: "User's name. Set at client side at login, if any.", 
                                userRole: `guest`
                            })
                        });
                        const data = await response.json();
                        console.log("storeSession():- ", data.message);
                    } catch (error) {
                        console.error("storeSession():- Error storing session!\n", error);
                    }
                }
            // REFRESH SESSION
                async function refreshSession() {
                    console.log('refreshSession() executed.');
                    const now = Date.now(); // current time in milliseconds
                    try {
                        const response = await fetch("/refresh-session", { 
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                // userName: "User's name. Set at client side at login, if any.", 
                                userRole: `guest`
                            })
                        });
                        const data = await response.json();
                        console.log("Session refresh attempted:- :", data);
                        clearTimeout(sessionWarningTimeout);
                        clearTimeout(sessionExpiredTimeout);
                        console.log("Session setTimeout(s) cleared.");
                        startSessionTimers();
                        console.log("Session setTimeout(s) started.");
                    } catch (error) {
                        console.error("Error refreshing session:", error);
                    }
                    document.querySelectorAll('.overlay').forEach(el => {
                        el.style.transition = "opacity 0.5s";
                        el.style.opacity = "0";
                        setTimeout(() => el.remove(), 500);
                    });
                    window.removeEventListener("click", refreshSession);
                    window.removeEventListener("mousemove", refreshSession);
                    window.removeEventListener("keydown", refreshSession);
                }
            // START SESSION TIMER
                async function startSessionTimers() {
                    // document.getElementById("session-timer")
                    sessionDuration = 0;
                    const timeoutWarning = 1 * projectConfigMJS.configSettings.SESSION_WARNING_DELAY // 10 * 1000; // time till warning message is displayed
                    const sessionExpiration = 1 * projectConfigMJS.configSettings.SESSION_EXPIRED_DELAY // 20 * 1000; // time to session expiration
                    console.log('projectConfigMJS.configSettings.SESSION_WARNING_DELAY:-\n',projectConfigMJS.configSettings.SESSION_WARNING_DELAY,timeoutWarning /1000 / 60 /60,'\nprojectConfigMJS.configSettings.SESSION_EXPIRED_DELAY:-\n',projectConfigMJS.configSettings.SESSION_EXPIRED_DELAY,sessionExpiration / 1000 / 60 /60);
                    sessionWarningTimeout = setTimeout(() => {
                        document.querySelectorAll('.overlay').forEach(el => {
                            el.style.transition = "opacity 0.5s";
                            el.style.opacity = "0";
                            setTimeout(() => el.remove(), 500);
                        });
                        const message = "Your session is about to expire! Click anywhere to stay active.";
                        browserMessagesJS.showTransientMessage(message,"warning",5);
                        // Detect user activity and refresh session asynchronously
                            window.addEventListener("click", refreshSession);
                            window.addEventListener("mousemove", refreshSession);
                            window.addEventListener("keydown", refreshSession);
                    }, timeoutWarning);
                    sessionExpiredTimeout = setTimeout(async () => {
                        // remove event listeners
                            window.removeEventListener("click", refreshSession);
                            window.removeEventListener("mousemove", refreshSession);
                            window.removeEventListener("keydown", refreshSession);
                        document.querySelectorAll('.overlay').forEach(el => {
                            el.style.transition = "opacity 0.5s";
                            el.style.opacity = "0";
                            setTimeout(() => el.remove(), 500);
                        });
                        const message = "Session expired...";
                        browserMessagesJS.showCustomMessage(message,"plain");
                        await fetch("/logout", { 
                                method: "POST", 
                                credentials: "include" 
                        }).then(() => {
                            const myDate = new Date();
                            console.log(`${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);
                            console.log("Session ended.");
                            sessionStorage.clear();
                            document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                            setTimeout(() => {
                                const message = document.createElement("p");
                                message.innerHTML = `<h1>Session timed out.</h1><br><p>Your session timed out at ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}.</p>`
                                document.body.innerHTML = "";
                                document.body.appendChild(message);
                            },2000);
                        });
                    }, sessionExpiration);
                }
            // START SESSION and START SESSION TIMER
                storeSession();
                startSessionTimers();
            
            // if(document.getElementById("session-timer")){
            //     const sessionElapsed = document.getElementById("session-timer")
            //     let sessionElapsedId = setInterval(() => {
            //         // console.log(consoleTrace());
            //         // console.log('x:- ',sessionDuration)
            //         sessionDuration += 1;
            //         sessionElapsed.innerHTML = `${sessionDuration}`
            //     },1 * 1000);
            //     console.log(consoleTrace());
            //     console.log("Session timer active.");
            // }

            // // SET-UP Store user data in the session
            //     sessionsRouter.post("/store-session", (req, res) => {
            //         console.log(consoleTrace());
            //         console.log("/store-session:-",req.body);
            //         req.session.userData = req.body; 
            //         console.log("req.session.userData:-",req.session.userData);
            //         // console.log(consoleTrace());
            //         // console.log("req.session:-",req.session);
            //         res.json({ message: "User data stored in session OK!" });
            //     });
            // // RETRIEVE session data
            //     sessionsRouter.get("/get-session", (req, res) => {
            //         if (!req.session.username && !req.session.userData) {
            //             return res.status(401).json({ error: "Session data not found!" });
            //         }
            //         res.json({
            //             username: req.session.username || "No username data",
            //             role: req.session.role || "No role data",
            //             sessionData: req.session.userData || "No session data found."
            //         });
            //     });
            // // ADD to session data
            //     sessionsRouter.post("/set-session", (req, res) => {
            //         req.session.favoriteColor = "Blue";  
            //         req.session.isLoggedIn = true;    
            //         res.json({ message: "Additional session data added!" });
            //     });
            // // REFRESH session timeout cookie
            //     sessionsRouter.post("/refresh-session", (req, res) => {
            //         // console.log(("99").repeat(55));
            //         // console.log(consoleTrace());
            //         // console.log(req.session);
            //         if (!req.session.userData.userRole) {
            //             return res.status(401).json({ error: "Session has already expired..." });
            //         }
            //         req.session.cookie.maxAge = 15 * 60 * 1000; // ✅ Reset session expiration
            //         res.json({ message: "Session refreshed!" });
            //         // console.log(("99").repeat(55));
            //     });
            // // LOGOUT
            //     sessionsRouter.post("/logout", (req, res) => {
            //         req.session.destroy((err) => {
            //             if (err){
            //                 console.log(("99").repeat(55));
            //                 console.log(consoleTrace());
            //                 console.log(err);
            //                 return res.status(500).send("Error ending session");
            //             }
            //             res.clearCookie("connect.sid"); // Remove session cookie
            //             res.send("Session ended successfully");
            //         });
            //     });

        // export default sessionsRouter;