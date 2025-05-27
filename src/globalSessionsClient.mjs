const consoleLog = false;

if(consoleLog===true){console.log(trace(),"\nLOADED:- globalSessionsClient.mjs is loaded",new Date().toLocaleString());}
export function globalSessionsClientJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  ONLY IMPORT CLIENT SIDE MODULES TO HERE
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

// let sessionDuration = 0;

// // START SESSION
//     alert("start session");
//     let sessionWarningTimeout;
//     let sessionExpiredTimeout;
//     export async function storeSession() {
//         try {
//             const response = await fetch("http://localhost:3000/sessionsRoutes/store-session", {
//                 method: "POST",
            // credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ 
//                     // userName: "User's name. Set at client side at login, if any.", 
//                     userRole: `guest`
//                 })
//             });
//             const data = await response.json();
//             if(consoleLog===true){console.log("storeSession():- ", data.message);}
//         } catch (error) {
//             console.error("storeSession():- Error storing session!\n", error);
//         }
//     }
// // REFRESH SESSION
//     export async function refreshSession() {
//         if(consoleLog===true){console.log('refreshSession() executed.');}
//         const now = Date.now(); // current time in milliseconds
//         try {
//             const response = await fetch("/refresh-session", { 
//                 method: "POST",
            // credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     // userName: "User's name. Set at client side at login, if any.", 
//                     userRole: `guest`
//                 })
//             });
//             const data = await response.json();
//             if(consoleLog===true){console.log("Session refresh attempted:- :", data);}
//             clearTimeout(sessionWarningTimeout);
//             clearTimeout(sessionExpiredTimeout);
//             if(consoleLog===true){console.log("Session setTimeout(s) cleared.");}
//             startSessionTimers();
//             if(consoleLog===true){console.log("Session setTimeout(s) started.");}
//         } catch (error) {
//             console.error("Error refreshing session:", error);
//         }
//         document.querySelectorAll('.overlay').forEach(el => {
//             el.style.transition = "opacity 0.5s";
//             el.style.opacity = "0";
//             setTimeout(() => el.remove(), 500);
//         });
//         window.removeEventListener("click", refreshSession);
//         window.removeEventListener("mousemove", refreshSession);
//         window.removeEventListener("keydown", refreshSession);
//     }
// // START SESSION TIMER
//     export async function startSessionTimers() {
//         // document.getElementById("session-timer")
//         sessionDuration = 0;
//         const timeoutWarning = 1 * projectClientConfigMJS.configSettings.SESSION_WARNING_DELAY // 10 * 1000; // time till warning message is displayed
//         const sessionExpiration = 1 * projectClientConfigMJS.configSettings.SESSION_EXPIRED_DELAY // 20 * 1000; // time to session expiration
//         if(consoleLog===true){console.log('projectClientConfigMJS.configSettings.SESSION_WARNING_DELAY:-\n',projectClientConfigMJS.configSettings.SESSION_WARNING_DELAY,timeoutWarning /1000 / 60 /60,'\nprojectClientConfigMJS.configSettings.SESSION_EXPIRED_DELAY:-\n',projectClientConfigMJS.configSettings.SESSION_EXPIRED_DELAY,sessionExpiration / 1000 / 60 /60);}
//         sessionWarningTimeout = setTimeout(() => {
//             document.querySelectorAll('.overlay').forEach(el => {
//                 el.style.transition = "opacity 0.5s";
//                 el.style.opacity = "0";
//                 setTimeout(() => el.remove(), 500);
//             });
//             const message = "Your session is about to expire! Click anywhere to stay active.";
//             browserMessagesJS.showTransientMessage(message,"warning",5);
//             // Detect user activity and refresh session asynchronously
//                 window.addEventListener("click", refreshSession);
//                 window.addEventListener("mousemove", refreshSession);
//                 window.addEventListener("keydown", refreshSession);
//         }, timeoutWarning);
//         sessionExpiredTimeout = setTimeout(async () => {
//             // remove event listeners
//                 window.removeEventListener("click", refreshSession);
//                 window.removeEventListener("mousemove", refreshSession);
//                 window.removeEventListener("keydown", refreshSession);
//             document.querySelectorAll('.overlay').forEach(el => {
//                 el.style.transition = "opacity 0.5s";
//                 el.style.opacity = "0";
//                 setTimeout(() => el.remove(), 500);
//             });
//             const message = "Session expired...";
//             browserMessagesJS.showCustomMessage(message,"plain");
//             await fetch("/logout", { 
//                     method: "POST", 
            // credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
//             }).then(() => {
//                 const myDate = new Date();
//                 if(consoleLog===true){console.log(`${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);}
//                 if(consoleLog===true){console.log("Session ended.");}
//                 sessionStorage.clear();
//                 document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
//                 setTimeout(() => {
//                     const message = document.createElement("p");
//                     message.innerHTML = `<h1>Session timed out.</h1><br><p>Your session timed out at ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}.</p>`
//                     document.body.innerHTML = "";
//                     document.body.appendChild(message);
//                 },2000);
//             });
//         }, sessionExpiration);
//     }
// // START SESSION and START SESSION TIMER
//     storeSession();
//     startSessionTimers();

// if(document.getElementById("session-timer")){
//     const sessionElapsed = document.getElementById("session-timer")
//     let sessionElapsedId = setInterval(() => {
//         // if(consoleLog===true){console.log(trace());}
//         // if(consoleLog===true){console.log('x:- ',sessionDuration);}
//         sessionDuration += 1;
//         sessionElapsed.innerHTML = `${sessionDuration}`
//     },1 * 1000);
//     if(consoleLog===true){console.log(trace());}
//     if(consoleLog===true){console.log("Session timer active.");}
// }

// logout
    export async function sessionLogout(){
        try {
            const fetchUrl = `/sessionsRouter/sessionLogout`;
            const fetchOptions = {
                    method: 'POST',                // Specifies a POST request
                    mode: 'cors',                  // Ensures cross-origin requests are handled
                    cache: 'no-cache',             // Prevents caching issues
                    credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
                    headers: {
                        'Content-Type': 'application/json',  // Sets content type
                        // 'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
                        'Accept': 'application/json',        // Expect JSON response
                    },
                    body: JSON.stringify({          // Converts object to JSON for request
                        logUserOut:true
                    })
                }
            if(consoleLog===true){console.log(JSON.stringify(fetchOptions));}
            const response = await fetch(fetchUrl,fetchOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jso = await response.json(); // converts fetch response from JSON to a JSO
            console.log('🟢 Request Success:', jso);
            if(jso.logoutConfirmed===true){
                document.querySelectorAll('.overlay').forEach(el => {
                    el.style.transition = "opacity 0.5s";
                    el.style.opacity = "0";
                    setTimeout(() => el.remove(), 500);
                });
                alert("🟢 logout successful.");
                console.log("🟢 logout successful.");
                document.getElementById("sign-in-out-button").innerHTML = "Sign In";
                document.getElementById("sign-in-out-button").classList.remove("sign-out-button");
                document.getElementById("sign-in-out-button").classList.add("sign-in-button");
            }else{
                document.querySelectorAll('.overlay').forEach(el => {
                    el.style.transition = "opacity 0.5s";
                    el.style.opacity = "0";
                    setTimeout(() => el.remove(), 500);
                });
                alert("🔴 logout failed, please try again");
                console.log("🔴 logout failed, please try again");
                document.getElementById("sign-in-out-button").innerHTML = "Sign Out";
                document.getElementById("sign-in-out-button").classList.remove("sign-in-button");
                document.getElementById("sign-in-out-button").classList.add("sign-out-button");
            }
        }catch{
            alert("🔴 Fatal error logging out!");
            console.log("🔴 Fatal error logging out!");
        }
    }