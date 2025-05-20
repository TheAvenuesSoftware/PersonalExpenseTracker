const consoleLog = false;

if(consoleLog===true){console.log("\nLOADED:- projectClient.mjs is loaded",new Date().toLocaleString());}
export function projectMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  ONLY IMPORT CLIENT SIDE MODULES TO HERE
    // import * as globalClientJS from "./globalClient.mjs";
    import {getGlobalFooter} from "./globalClient.mjs";
    import {doAfterDOMandWindowLoad_globalLoginClient} from "./globalLoginClient.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

    document.addEventListener("DOMContentLoaded", () => {
        if(consoleLog===true){console.log('projectClient DOMContentLoaded successsful.',Date.now());}
        window.addEventListener("load", async () => {
            if(consoleLog===true){console.log('projectClient window load successsful.',Date.now());}
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulated async process
            await doAfterDOMandWindowLoad_projectClient();
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulated async process
            await doAfterDOMandWindowLoad_globalLoginClient();

            // setInterval(() => {
            //     fetch('/heartbeat-session-extension', { method: 'POST', credentials: 'include' })
            //         .then(response => response.json())
            //         .then(data => console.log('🟢 Heartbeat:', data))
            //         .catch(error => console.error('🔴 Heartbeat error:', error));
            // }, 5 * 60 * 1000); // Every 5 minutes
            // idle tracking START
                let lastActivity = Date.now();
                const updateActivity = () => {
                    lastActivity = Date.now();
                    console.log('🟢 User activety detected.',Date.now());
                };
                document.addEventListener("mousemove", updateActivity);
                document.addEventListener("keydown", updateActivity);
                document.addEventListener("click", updateActivity);
                const intervalId = setInterval(() => {
                    if (Date.now() - lastActivity < 5 * 60 * 1000) { // Active in last 15 min?
                        fetch('/heartbeat-session-extension', { method: 'POST', credentials: 'include' })
                            .then(response => response.json())
                            .then(data => console.log('🟢 Heartbeat:', data))
                            .catch(error => console.error('🔴 Heartbeat error:', error));
                    } else {
                        console.log('🔴 User inactive, consider logging out.');
                        // Trigger logout function here
                        const signInOutButton = document.getElementById("sign-in-out-button");
                        logout_step1();
                        document.removeEventListener("mousemove", updateActivity);
                        document.removeEventListener("keydown", updateActivity);
                        document.removeEventListener("click", updateActivity);
                        clearInterval("intervalId");
                    }
                }, 5 * 60 * 1000); // Runs every 5 min
            // idle tracking END
        });
    });

    // doAfterDOMandWindowLoad()
        function doAfterDOMandWindowLoad_projectClient(){

            if(consoleLog===true){console.log('doAfterDOMandWindowLoad_projectClient() launched.',Date.now());}

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
                    if(consoleLog===true){console.log(getAllExpenses());}
                    const v_data = JSON.stringify(
                        {
                            x: "y"
                        }
                    );
                    const v_options = {method: 'POST', headers: {'Content-Type': 'application/json'},body:v_data};
                    // await fetch('http://localhost:3000/getAllExpenses',v_options)
                    await fetch('http://process.env.LOCALHOST:3000/getAllExpenses',v_options)
                    .then(res => {
                        if(consoleLog===true){console.log(res);}
                        // Note that despite the method being named json(), 
                        // the result is not JSON but is instead the result of 
                        // taking JSON as input and parsing it to produce a JavaScript object.
                        return res.json();
                    })
                    .then(res =>{
                        // if(consoleLog===true){console.log(res);}
                        const myDate = new Date(res).toLocaleString();
                        // if(consoleLog===true){console.log(myDate);}
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
                            if(consoleLog===true){console.log("Response:", data.response);}
                        } catch (error) {
                            if(consoleLog===true){console.error("Error sending POST request:", error.message);}
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

            // ###################################################################################################
                // globalClientJS.getGlobalFooter();
                getGlobalFooter();
            }

