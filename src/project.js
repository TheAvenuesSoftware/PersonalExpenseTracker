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

console.log(consoleTrace());
console.log("LOADED:- project.js is loaded")
function projectJSisLoaded(){
    return true;
}
// Override console.trace to only output the first line of the stack trace START
    // version 5 START
    function consoleTrace() {
        try {
            const stack = new Error().stack;
            const firstLine = stack.split('\n')[2].trim();
            return `Trace line: ${firstLine}`;
        } catch (error) {
            return 'Trace line: not available';
        }
    };

    // window.addEventListener("load", () =>
        window.addEventListener("load", () => { 

            // // session storage set-up
            //     fetch("/store-session", {
            //         method: "POST",
            //         headers: { "Content-Type": "application/json" },
            //         body: JSON.stringify({ 
            //             username: "User's name, set at client side", 
            //             role: "User's role, set at client side" 
            //         })
            //     })
            //     .then(response => response.json())
            //     .then(data => console.log("Stored:", data));
            //     function startSessionTimer() {
            //         const timeoutWarning = 0.5 * 60 * 1000; // 25 minutes (before session expiration)
            //         const sessionExpiration = 1 * 60 * 1000; // Full session expiration time
            //         setTimeout(() => {
            //             // WARN USER before session expires
            //             alert("Your session is about to expire! Click anywhere to stay active.");
            //             // REFRESH if user ativity detected
            //                 function refreshSession() {
            //                     fetch("/refresh-session", { method: "POST" })
            //                     .then(response => response.json())
            //                     .then(data => console.log("Session refreshed:", data))
            //                     .catch(error => console.error("Error refreshing session:", error));
            //                 }
            //                 // Detect user interaction events
            //                 window.addEventListener("click", refreshSession);
            //                 window.addEventListener("mousemove", refreshSession);
            //                 window.addEventListener("keydown", refreshSession);
            //         }, timeoutWarning);            
            //         // TAKE ACTION if user activity isn't detected
            //         setTimeout(() => {
            //             // alert("Session expired! Redirecting to login...");
            //             alert("Session expired...");
            //             window.removeEventListener("click", refreshSession);
            //             window.removeEventListener("mousemove", refreshSession);
            //             window.removeEventListener("keydown", refreshSession);
            //             if (confirm("Your session is about to expire. Close tab?")) {
            //                 window.close();
            //             }
            //             window.location.href = "/session_expired"; // Redirect to login page
            //         }, sessionExpiration);
            //     }
            //     startSessionTimer();
            // START SESSION
                let sessionWarningTimeout;
                let sessionExpiredTimeout;
                async function storeSession() {
                    try {
                        const response = await fetch("/store-session", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ 
                                userName: "User's name, set at client side", 
                                userRole: "User's role, set at client side"
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
                    try {
                        clearTimeout(sessionWarningTimeout);
                        clearTimeout(sessionExpiredTimeout);
                        console.log("Session setTimeout(s) cleared.");
                        startSessionTimers();
                        console.log("Session setTimeout(s) started.");
                        const response = await fetch("/refresh-session", { method: "POST" });
                        const data = await response.json();
                        console.log("Session refreshed:", data);
                    } catch (error) {
                        console.error("Error refreshing session:", error);
                    }
                    window.removeEventListener("click", refreshSession);
                    window.removeEventListener("mousemove", refreshSession);
                    window.removeEventListener("keydown", refreshSession);
                }
            // START SESSION TIMER
                function startSessionTimers() {
                    const timeoutWarning = 0.5 * 60 * 1000; // 25 minutes warning
                    const sessionExpiration = 1 * 60 * 1000; // Full expiration time
                    sessionWarningTimeout = setTimeout(() => {
                        // alert("Your session is about to expire! Click anywhere to stay active.");
                        // globalClientJS.showWarning();
                        const message = "Your session is about to expire! Click anywhere to stay active.";
                        globalClientJS.showCustomAlert(message);
                        // Detect user activity and refresh session asynchronously
                            window.addEventListener("click", refreshSession);
                            window.addEventListener("mousemove", refreshSession);
                            window.addEventListener("keydown", refreshSession);
                    }, timeoutWarning);
                    sessionExpiredTimeout = setTimeout(() => {
                        // alert("Session expired...");
                        // globalClientJS.showWarning();
                        const message = "Session expired...";
                        globalClientJS.showCustomAlert(message);
                        // remove event listeners
                            window.removeEventListener("click", refreshSession);
                            window.removeEventListener("mousemove", refreshSession);
                            window.removeEventListener("keydown", refreshSession);
                        // navigate to non-existent page, cancels session???
                            window.location.href = "/session_expired";
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
import * as globalClientJS from "./globalClient.js";
console.log('globalClientJS.globalCientJSisLoaded():- ',globalClientJS.globalCientJSisLoaded());
globalClientJS.getGlobalFooter();