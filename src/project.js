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

function consoleTrace() {
    try {
        const stack = new Error().stack;
        const firstLine = stack.split('\n')[2].trim();
        return `Trace line: ${firstLine}`;
    } catch (error) {
        return 'Trace line: not available';
    }
};

console.log(consoleTrace());
console.log("LOADED:- project.js is loaded")
function projectJSisLoaded(){
    return true;
}

import * as browserJS from "./globalClient.js";
import * as browserLoginJS from "./globalClientLogin.js";
import * as browserMessagesJS from "./globalClientOverlayMessages.js";
import * as projectConfigJS from "./projectConfig.js";

    // window.addEventListener("load", () =>
        window.addEventListener("load", () => {

            browserLoginJS.isLoginRequired();

            let sessionDuration = 0;

            if(document.getElementById("session-timer")){
                const sessionElapsed = document.getElementById("session-timer")
                let sessionElapsedId = setInterval(() => {
                    // console.log(consoleTrace());
                    // console.log('x:- ',sessionDuration)
                    sessionDuration += 1;
                    sessionElapsed.innerHTML = `${sessionDuration}`
                },1 * 1000);
                console.log(consoleTrace());
                console.log("Session timer active.");
            }

            // START SESSION
                let sessionWarningTimeout;
                let sessionExpiredTimeout;
                async function storeSession() {
                    try {
                        const response = await fetch("/store-session", {
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
                function startSessionTimers() {
                    const sessionElapsed = document.getElementById("session-timer")
                    sessionDuration = 0;
                    const timeoutWarning = 1 * projectConfigJS.configSettings.SESSION_WARNING_DELAY // 10 * 1000; // time till warning message is displayed
                    const sessionExpiration = 1 * projectConfigJS.configSettings.SESSION_EXPIRED_DELAY // 20 * 1000; // time to session expiration
                    console.log('projectConfigJS.configSettings.SESSION_WARNING_DELAY:-\n',projectConfigJS.configSettings.SESSION_WARNING_DELAY,timeoutWarning /1000 / 60 /60,'\nprojectConfigJS.configSettings.SESSION_EXPIRED_DELAY:-\n',projectConfigJS.configSettings.SESSION_EXPIRED_DELAY,sessionExpiration / 1000 / 60 /60);
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
            
            // getAllExpenses0()
                async function getAllExpenses0(){
                    // document.getElementById('fetchExpenses').addEventListener('click', async () => {
                    try {
                        // Step 1: Fetch data from the server
                        // const response = await fetch('http://localhost:3000/getAllExpenses');
                        const response = await fetch('http://process.env.LOCALHOST:3000/getAllExpenses');
                        if (!response.ok) {
                            throw new Error(`Server Error: ${response.statusText}`);
                        }
                        const data = await response.json();

                        // Step 2: Process the response data (e.g., filtering or formatting)
                        const processedData = data.map(expense => ({
                            ...expense,
                            formattedAmount: `$${expense.amount.toFixed(2)}` // Format amounts as currency
                        }));

                        // Step 3: Update the UI
                        const outputDiv = document.getElementById('output');
                        outputDiv.innerHTML = processedData.map(expense =>
                            `<p>${expense.item}: ${expense.formattedAmount}</p>`
                        ).join('');
                    } 
                    catch (error) {
                        console.error('Error fetching expenses:', error.message);
                    }
                    // });
                }

        // getAllExpenses()
            async function getAllExpenses(){
                console.log(getAllExpenses());
                const v_data = JSON.stringify(
                    {
                        x: "y"
                    }
                );
                const v_options = {method: 'POST', headers: {'Content-Type': 'application/json'},body:v_data};
                // await fetch('http://localhost:3000/getAllExpenses',v_options)
                await fetch('http://process.env.LOCALHOST:3000/getAllExpenses',v_options)
                .then(res => {
                    console.log(res);
                    // Note that despite the method being named json(), 
                    // the result is not JSON but is instead the result of 
                    // taking JSON as input and parsing it to produce a JavaScript object.
                    return res.json();
                })
                .then(res =>{
                    // console.log(res);
                    const myDate = new Date(res).toLocaleString();
                    // console.log(myDate);
                    // document.getElementById("versionNumber").innerHTML = myDate.slice(0,10) + " " + res.slice(11,19);
                    document.getElementById("versionNumber").innerHTML = myDate.slice(0,10) + "<br>" + myDate.slice(11,myDate.length);
                })
            }

        // add event listeners START
            document.getElementById("date").addEventListener('blur', () => {
                const date = document.getElementById("date");
                async function validate_date() {
                    const fetchUrl = "/routesDatval/validate_date"; // Adjust based on server setup
                    const requestBody = {
                        date: date.value,
                    };                
                    try {
                        const response = await fetch(fetchUrl, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(requestBody)
                        });                
                        if (!response.ok) throw new Error(`Server Error: ${response.statusText}`);
                        const data = await response.json();
                        console.log("Response:", data.response);
                    } catch (error) {
                        console.error("Error sending POST request:", error.message);
                    }
                }
                validate_date();
            });
            document.getElementById("amount").addEventListener('click', () => {

            });
            document.getElementById("category").addEventListener('click', () => {

            });
            document.getElementById("description").addEventListener('click', () => {

            });
            document.getElementById("submitData").addEventListener('click', () => {

            });

    });

// ###################################################################################################
console.log('browserJS.globalCientJSisLoaded():- ',browserJS.globalCientJSisLoaded());
browserJS.getGlobalFooter();

console.log('browserMessagesJS.globalCientOverlayMessagesJSisLoaded():- ',browserMessagesJS.globalCientOverlayMessagesJSisLoaded());

console.log('projectConfigJS.projectConfigJSisLoaded():- ',projectConfigJS.projectConfigJSisLoaded());