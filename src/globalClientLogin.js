// <!-- collapse all     Ctrl + k + 0 -->
// <!-- expand all       Ctrl + k + j -->
// <!-- format           Alt + Shift + F (USE WITH CAUTION)-->
// <!-- word wrap toggle Alt + z -->

// import { create } from "domain"; DON'T RECALL ENTERING THIS PIECE OF CODE!!!

// - Variables & Functions: Use camelCase (e.g., getUserName(), totalAmount)
// - Classes & Constructors: Use PascalCase (e.g., UserModel, DataProcessor)
// - Constants: Use UPPER_CASE_SNAKE_CASE (e.g., API_KEY, MAX_LIMIT)
// - Modules: Often kebab-case for filenames (e.g., user-profile.js)
// - Event & Callback Handlers: Prefix with on (e.g., onClick, onDataReceived)
// - Private Variables: Some use leading _ to indicate private properties (_hiddenProperty)

// ############################
// CLIENT SIDE FUNCTIONS ONLY #
// ############################

console.log(consoleTrace());
console.log("LOADED:- globalCient.js is loaded")
export function globalCientJSisLoaded(){
    return true;
}

const consoleOn = true;
// Override console.trace to only output the first line of the stack trace START
    export function consoleTrace() {
        try {
            const stack = new Error().stack;
            const firstLine = stack.split('\n')[2].trim();
            return `Trace line: ${firstLine}`;
        } catch (error) {
            return 'Trace line: not available';
        }
    };

import * as browserJS from './globalClient.js';

// import { clientConfig } from "../config/globalClientConfig.js";
// console.log("DEV_IP_ADDRESS:- ", clientConfig.DEV_IP_ADDRESS);

// // universal fetch
//     export async function universalFetch(url, method = 'GET', data = null) {
//         console.log(consoleTrace());
//         console.log(url,'\n',method,'\n',data);
//         try {
//             // Ensure data is correctly formatted before using it in the request
//                 const body = isValidJSONString(data)
//                     ? data // Data is already stringified
//                     : typeof data === 'object' 
//                         ? JSON.stringify(data) // Convert object to JSON string
//                         : null; // No valid data, avoid sending an incorrect body
//             // 
//                 const options = {
//                     method,
//                     headers: { 'Content-Type': 'application/json' },
//                     body
//                 };
//             // 
//                 const response = await fetch(url, options);
//                     if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
//                     return await response.json();
//         } catch (error) {
//             console.error('Fetch error:', error);
//         }
//     }

// // check if JSONstring is valid
//     export function isValidJSONString(data) {
//         if (typeof data !== 'string') return false;
//         try {
//             JSON.parse(data);
//             return true;
//         } catch {
//             return false;
//         }
//     }

// check email address
    export function isValidEmailFormat(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
// check if email domain is valid
    export async function isDomainValid(email) {
        console.log(consoleTrace());
        // if (!isValidEmailFormat(email)) {
        //     console.error('Invalid email format.');
        //     return false;
        // }
        const domain = email.split('@')[1];
        try {
            return true
            const response = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
            const data = await response.json();
            console.log(data);
            // return data.Answer && data.Answer.length > 0; // Checks if MX records exist
            console.log('data.Status:- ',data.Status); // 0 (Success) or 3 (Name Error)
            console.log('data.Question:- ',data.Question); // Checks if MX records exist, 15
            console.log('data.Question.type:- ',data.Question[0].type); // Checks if MX records exist, 15
            console.log('data.Answer:- ',data.Answer); //
            if(data.Status!=0){return false;}
            if(data.Question[0].type!=15){return false;}
            if(typeof data.Answer === undefined){return false;}
            return true;
            // Common Response Keys
                // | Key        | Example Value                 | Explanation | 
                // | Status     | 0 (Success) or 3 (Name Error) | Indicates the result of the query. 0 means success, 3 means the domain doesn't exist. | 
                // | TC         | false                         | Stands for "Truncated". If true, the response was too large and got cut off. | 
                // | RD         | true                          | "Recursion Desired". If true, the server tried to resolve the query recursively. | 
                // | RA         | true                          | "Recursion Available". If true, the server supports recursive queries. | 
                // | AD         | false                         | "Authenticated Data". If true, the response is verified as secure. | 
                // | CD         | false                         | "Checking Disabled". If true, DNSSEC validation was skipped. | 
                // | Question   | [{"name": "example.com", "type": 1}]                                      | Contains the domain name and query type (e.g., 1 for A records, 15 for MX records). | 
                // | Answer     | [{"name": "example.com", "type": 1, "TTL": 300, "data": "93.184.216.34"}] | The actual DNS response, including the resolved IP address or MX records. | 
                // | Authority  | [...] | Lists authoritative name servers for the domain. | 
                // | Additional | [...] | Provides extra information, such as related DNS records. | 
        } catch {
            return false;
        }
    }

// // remove leading zeros from a number string START
//     export function removeLeadingZerosFromString(myString){
//         // This revised function checks if the input is a non-empty string
//         // before attempting to remove leading zeros. If the input is not 
//         // a string or is an empty string, it returns the input as a string
//         // without any modification.
//         if (typeof myString === 'string' && myString.trim().length > 0) {
//             return String(Number(myString));
//         }
//         return myString.toString();
//     // remove leading zeros from a number string END
//     };

// // return attributes for:- new Date() START
//     export function newDateAttributes(){
//         // export function newDateAttributes(addYears=0, addMonths=0, addDays=0, addHours=0, addMinutes=0, addSeconds=0){
//         const weekDaysShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
//         const weekDaysLong = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
//         const monthsShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//         const monthsLong = ['January','February','March','April','May','June','July','August','September','October','November','December'];

//         const newDate = new Date();

//         // console.log('newDate',newDate);
//         // console.log('newDate.toDateString()',newDate.toDateString());
//         // console.log('newDate.toISOString()',newDate.toISOString());
//         // console.log('newDate.toJSON()',newDate.toJSON());
//         // console.log('newDate.toLocaleDateString()',newDate.toLocaleDateString());
//         // console.log('newDate.toLocaleString()',newDate.toLocaleString());
//         // console.log('newDate.toLocaleTimeString()',newDate.toLocaleTimeString());
//         // console.log('newDate.toString()',newDate.toString());
//         // console.log('newDate.toTimeString()',newDate.toTimeString());
//         // console.log('newDate.toUTCString()',newDate.toUTCString());
//         // console.log('newDate.getTimezoneOffset()',newDate.getTimezoneOffset());
//         // console.log('newDate.getTime()',newDate.getTime());
//         // console.log('newDate.getDate()',newDate.getDate());
//         // console.log('newDate.getDay()',newDate.getDay());
//         // console.log('newDate.getMonth()',newDate.getMonth());
//         // console.log('newDate.getFullYear()',newDate.getFullYear());
//         // console.log('newDate.getHours()',newDate.getHours());
//         // console.log('newDate.getMinutes()',newDate.getMinutes());
//         // console.log('newDate.getSeconds()',newDate.getSeconds());
//         // console.log('newDate.getMilliseconds()',newDate.getMilliseconds());
//         // console.log('newDate.getUTCDate()',newDate.getUTCDate());
//         // console.log('newDate.getUTCDay()',newDate.getUTCDay());
//         // console.log('newDate.getUTCMonth()',newDate.getUTCMonth());
//         // console.log('newDate.getUTCFullYear()',newDate.getUTCFullYear());
//         // console.log('newDate.getUTCHours()',newDate.getUTCHours());
//         // console.log('newDate.getUTCMinutes()',newDate.getUTCMinutes());
//         // console.log('newDate.getUTCSeconds()',newDate.getUTCSeconds());
//         // console.log('newDate.getUTCMilliseconds()',newDate.getUTCMilliseconds());

//         const date = newDate.getDate().toString().padStart(2, '0');
//         const day = newDate.getDay().toString();
//         const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
//         const year = newDate.getFullYear().toString();
//         const hour = newDate.getHours();
//         const minute = newDate.getMinutes().toString().padStart(2, '0');
//         const second = newDate.getSeconds().toString().padStart(2, '0');
//         const millisecond = newDate.getMilliseconds().toString();
//         const weekDayShort = weekDaysShort[newDate.getDay()];
//         const weekDayLong = weekDaysLong[newDate.getDay()];
//         const monthShort = monthsShort[newDate.getMonth()];
//         const monthLong = monthsLong[newDate.getMonth()];

//         let hour24 = hour.toString().padStart(2,"0");
//         let hour12 = hour.toString().padStart(2,"0");
//         let ampm = "am"
//         if(hour >= 12 & second > 0){
//             hour12 = (hour - 12).toString().padStart(2,"0");
//             ampm = "pm"
//             // console.log("ampm");
//         }

//         const jsonObject = {
//             newDate: newDate,
//             date:date,
//             day:day,
//             month:month,
//             year:year,
//             hour24:hour24,
//             hour12:hour12,
//             minute:minute,
//             second:second,
//             millisecond:millisecond,
//             weekDayShort:weekDayShort,
//             weekDayLong:weekDayLong,
//             monthShort:monthShort,
//             monthLong:monthLong,
//             yyyymmdd:`${year}-${month}-${date}`,
//             hhmmss24:`${hour24}:${minute}:${second}`,
//             hhmmss12:`${hour12}:${minute}:${second}`,
//             ampm:ampm
//         };
//         // if(consoleOn){(console.log(`newDate:- ${newDate}\ndate:- ${date}\nday:- ${day}\nmonth:- ${month}\nyear:- ${year}\nhour12:- ${hour12}${ampm}\nhour24:- ${hour24}${ampm}\nminute:- ${minute}\nsecond:- ${second}\n`));}
//         return jsonObject;
//     // return attributes for:- new Date() END
//     }
//     // newDateAttributes();

// // addToDate(baseDate, years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0) START
//     export function addToDate(baseDate, years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0) {
//         const resultDate = new Date(baseDate);

//         // Adjust years and months first to handle month overflow
//         resultDate.setFullYear(resultDate.getFullYear() + years);
//         resultDate.setMonth(resultDate.getMonth() + months);

//         // Adjust remaining fields
//         resultDate.setDate(resultDate.getDate() + days);
//         resultDate.setHours(resultDate.getHours() + hours);
//         resultDate.setMinutes(resultDate.getMinutes() + minutes);
//         resultDate.setSeconds(resultDate.getSeconds() + seconds);

//         return resultDate;
//     // addToDate(baseDate, years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0) END
//     }
//     const newDate = new Date(); // Base date
//     // console.log('Base Date:', newDate);
//     const modifiedDate = addToDate(newDate, 1, -2, 10, -5, 30, 45); // Add/subtract values
//     // console.log('Modified Date:', modifiedDate);

// // test API end point active/not-active START
//     async function sendDataToApi(testData,localhostEndpoint,wwwEndpoint) {
//         // const primaryEndpoint = 'http://localhost:2070/testEndpoint';
//         // const secondaryEndpoint = 'https://secondary-api.com/endpoint';
//         const primaryEndpoint = localhostEndpoint;
//         const secondaryEndpoint = wwwEndpoint;
//         try {
//         // Try sending data to the primary endpoint
//         const response = await fetch(primaryEndpoint, {
//             method: 'POST',
//             headers: {
//             'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//         });
//         if (!response.ok) {
//             throw new Error('Primary API failed');
//         }
//         // Return response if successful
//         const result = await response.json();
//         console.log('Success from Primary API:', result);
//         return result;
//         } catch (error) {
//         console.warn('Primary API failed, switching to Secondary API:', error.message);
//         try {
//             // Try sending data to the secondary endpoint
//             const fallbackResponse = await fetch(secondaryEndpoint, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//             });
//             if (!fallbackResponse.ok) {
//             throw new Error('Secondary API failed');
//             }
//             // Return response if successful
//             const fallbackResult = await fallbackResponse.json();
//             console.log('Success from Secondary API:', fallbackResult);
//             return fallbackResult;
//         } catch (fallbackError) {
//             console.error('Both APIs failed:', fallbackError.message);
//             throw fallbackError;
//         }
//         }
//     }

// // detectDeviceType() START
// export function detectDeviceType() {
//     const userAgent = navigator.userAgent || navigator.vendor || window.opera;
//     // Check for iPads and iPhones
//         if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
//             return "iOS Device (iPhone or iPad)";
//         }
//     // Check for Android devices
//         if (/android/i.test(userAgent)) {
//             return "Android Device";
//         }
//     // Check for other tablets (basic heuristic)
//         if (screen.width > 768 && screen.width <= 1024) {
//             return "Tablet";
//         }
//     // Assume desktop for larger screens
//         if (screen.width > 1024) {
//             return "Desktop or Laptop";
//         }
//     // Default fallback
//         return "Unknown Device";
// // detectDeviceType() END
// }
// // console.log(detectDeviceType());

// // detectOS() START
// export function detectOS() {
//     const userAgent = navigator.userAgent || navigator.vendor || window.opera;
//     if (/Windows NT/.test(userAgent)) {
//         const version = userAgent.match(/Windows NT (\d+\.\d+)/);
//         return version ? `Windows (Version ${version[1]})` : "Windows (Unknown Version)";
//     } 
//     if (/Mac OS X/.test(userAgent)) {
//         const version = userAgent.match(/Mac OS X (\d+[_\.]\d+)/);
//         return version ? `Mac OS X (Version ${version[1].replace('_', '.')})` : "Mac OS X (Unknown Version)";
//     } 
//     if (/Android/.test(userAgent)) {
//         const version = userAgent.match(/Android (\d+\.\d+)/);
//         return version ? `Android (Version ${version[1]})` : "Android (Unknown Version)";
//     } 
//     if (/Linux/.test(userAgent)) {
//         return "Linux (Version detection not specific)";
//     } 
//     if (/iPhone|iPad|iPod/.test(userAgent)) {
//         const version = userAgent.match(/OS (\d+[_\.]\d+)/);
//         return version ? `iOS (Version ${version[1].replace('_', '.')})` : "iOS (Unknown Version)";
//     }
//     return "Unknown Operating System";
// // detectOS() END
// }
// // console.log(detectOS());

// // getGlobalFooter()
// export async function getGlobalFooter() {
//     console.log(consoleTrace());
//     console.log('getGlobalFooter()...');
//     const fetchUrl = `/routesGlobal/getGlobalFooter`;
//     console.log(fetchUrl);
//     try {
//         // fetch
//             const response = await fetch(fetchUrl);
//             if (!response.ok) throw new Error(`Server Error: ${response.statusText}`);
//             const html = await response.text(); // Fetch HTML as text
//             // console.log(html); // Logs correctly? Great!
//         // Inject into the page
//             document.getElementById("global-footer").innerHTML = html;
//     } catch (error) {
//         console.error("Error fetching HTML from:",fetchUrl, error.message);
//     }
// }

// isLoginRequired
export async function isLoginRequired() {
    console.log(consoleTrace());
    console.log('isLoginRequired()...');
    const fetchUrl = `/routesGlobal/isLoginRequired`;
    console.log(fetchUrl);
    try {
        // fetch
            const response = await fetch(fetchUrl);
            if (!response.ok) throw new Error(`Server Error: ${response.statusText}`);
            const data = await response.json(); // Fetch JSON object
            console.log(data); // Logs correctly? Great!
            console.log(data.message); // Logs correctly? Great!
            if(data.message===true){
                login_step1(); // get userEmailAddress, validate userEmailAddress
            }
    } catch (error) {
        console.error("Error fetching HTML from:",fetchUrl, error.message);
    }
}
async function login_step3(userEmailAddress,createNewAccount=false){
    console.log(consoleTrace());
    console.log('login_step3()...');
    const fetchUrl = `/routesGlobal/login_step3`;
    const fetchType = `POST`;
    const fetchPayload = {userEmailAddress:userEmailAddress,createNewAccount:createNewAccount};
    console.log(fetchPayload);
    console.log(JSON.stringify(fetchPayload));
    const data = await browserJS.universalFetch(fetchUrl,fetchType,JSON.stringify(fetchPayload));
    console.log(data);
    console.log(data.message);
}
async function login_step2(userEmailAddress){ // send userEmailAddress to server; receive login code || create new user
    console.log(consoleTrace());
    console.log('login_step2()...');
    const fetchUrl = `/routesGlobal/login_step2`;
    const fetchType = `POST`;
    const fetchPayload = {userEmailAddress:userEmailAddress};
    console.log(fetchPayload);
    console.log(JSON.stringify(fetchPayload));
    const data = await browserJS.universalFetch(fetchUrl,fetchType,JSON.stringify(fetchPayload));
    console.log(data);
    console.log(data.message);
    console.log(data.createNewAccount);
    login_step1(userEmailAddress,data.createNewAccount);
}
function login_step1(emailAddress="",createNewAccount){ // get UserEmailAddress; validate userEmailAddress
    console.log(consoleTrace());
    console.log('login_step1()...');

    document.querySelectorAll('.overlay').forEach(el => {
        el.style.transition = "opacity 0.5s";
        el.style.opacity = "0";
        setTimeout(() => el.remove(), 500);
    });

    const overlay = document.createElement("div");
    const dialog = document.createElement("div");
    const p1 = document.createElement("p");
    const br1 = document.createElement("br");
    const userEmailAddress = document.createElement("input");
    const submitEmailAddressButton = document.createElement("button");
    const cancelButton = document.createElement("button");
    const br2 = document.createElement("br");
    const p2 = document.createElement("p");

    const focusOnMe = document.createElement("input")
    // focusOnMe.style.position = "fixed";
    // focusOnMe.style.right = "1000px";
    // focusOnMe.style.visibility = "hidden"
    focusOnMe.style.display = "none";

    // 
        overlay.id = "overlay";
        overlay.classList.add("overlay");
        overlay.style.position = "fixed";
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0, 0, 0, 0.25)";
        overlay.style.zIndex = "9999";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
    
    // 
        dialog.id = "transientMessageDialog";
        dialog.style.background = "rgba(255,255,255,1)";
        dialog.style.padding = "20px";
        dialog.style.borderRadius = "8px";
        dialog.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        dialog.style.textAlign = "center";

    //
        if(createNewAccount){
            p1.innerHTML = `No account exists for ${emailAddress}<br>Create an account?`;
        }else{
            p1.innerHTML = "Please enter your login email address.";
        }

    // 
        userEmailAddress.id = "user-email-address";
        userEmailAddress.style.width = "100%";
        if(createNewAccount){
            userEmailAddress.value = emailAddress;
            userEmailAddress.disabled = true;
            userEmailAddress.readOnly = true;
            userEmailAddress.style.background = "rgba(255,255,255,1)";
            userEmailAddress.style.display = "none";
            setTimeout(() => {
                userEmailAddress.blur();
                focusOnMe.focus();
                focusOnMe.select();
            }, 50); // 50ms delay
        }

    // Create login button
        if(createNewAccount){
            submitEmailAddressButton.textContent = "Create account";
        }else{
            submitEmailAddressButton.textContent = "Log-in";
        }
        submitEmailAddressButton.style.marginTop = "10px";
        submitEmailAddressButton.style.padding = "8px 16px";
        submitEmailAddressButton.style.border = "none";
        submitEmailAddressButton.style.borderRadius = "4px";
        submitEmailAddressButton.style.backgroundColor = "rgba(0, 123, 255, 1)";
        submitEmailAddressButton.style.color = "white";
        submitEmailAddressButton.style.cursor = "pointer";    
        submitEmailAddressButton.style.marginRight = "15px";

    // Create cancel button
        cancelButton.textContent = "Cancel";
        cancelButton.style.marginTop = "10px";
        cancelButton.style.padding = "8px 16px";
        cancelButton.style.border = "none";
        cancelButton.style.borderRadius = "4px";
        cancelButton.style.backgroundColor = "rgba(0, 123, 255, 1)";
        cancelButton.style.color = "white";
        cancelButton.style.cursor = "pointer";    
        cancelButton.style.marginLeft = "15px";

    // 
        p2.innerHTML = `&nbsp`;
        p2.style.maxWidth = "100%";
        p2.style.color = "red";

    // Append elements together
        dialog.appendChild(p1);
        dialog.appendChild(userEmailAddress );
        dialog.appendChild(br1);
        dialog.appendChild(submitEmailAddressButton);
        dialog.appendChild(cancelButton);
        dialog.appendChild(br2);
        dialog.appendChild(p2);
        dialog.appendChild(focusOnMe);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
        userEmailAddress.focus();
        userEmailAddress.select();

    // add event listeners
        // userEmailAddress
            userEmailAddress.addEventListener("focus", () => {
                setTimeout(() => {
                    // p2.innerHTML = "&nbsp";
                    p2.classList.add("fade-out");
                }, 500); // 500ms delay
                userEmailAddress.select();
                if(createNewAccount){
                    userEmailAddress.blur();
                    focusOnMe.focus();
                    focusOnMe.select();
                }
            });
        // loginButton
            submitEmailAddressButton.addEventListener("mouseover", () => {
                submitEmailAddressButton.style.backgroundColor = "#0056b3";
            });    
            submitEmailAddressButton.addEventListener("mouseout", () => {
                submitEmailAddressButton.style.backgroundColor = "#007bff";
            });
            submitEmailAddressButton.addEventListener("click", async () => {
                if(createNewAccount){
                    setTimeout(() =>{
                        login_step3(userEmailAddress.value,createNewAccount); // send userEmailAddress to server; receive login code || create new user
                    },1000); // used in development, maybe not necessary in production
                    popupBusyAnimation();
                    document.body.removeChild(overlay);
                }else{
                    if(userEmailAddress.value){
                        const validEmailFormat = await isValidEmailFormat(userEmailAddress.value);
                        if(validEmailFormat===true){
                            console.log(consoleTrace());
                            console.log('validEmailFormat:- ',validEmailFormat);
                            const validDomain = await isDomainValid(userEmailAddress.value);
                            if(validDomain===true){
                                console.log(consoleTrace());
                                console.log(userEmailAddress.value);
                                setTimeout(() =>{
                                    login_step2(userEmailAddress.value); // send userEmailAddress to server; receive login code || create new user
                                },1000); // used in development, maybe not necessary in production
                                popupBusyAnimation();
                                document.body.removeChild(overlay);
                                // document.querySelectorAll('.overlay').forEach(el => {
                                //     el.style.transition = "opacity 0.5s";
                                //     el.style.opacity = "0";
                                //     setTimeout(() => el.remove(), 500);
                                // });
                            }else{
                                p2.textContent = "Email domain is not valid.  Please try again.";
                                p2.classList.remove("fade-out");
                                p2.classList.add("fade-in");
                            }
                        }else{
                                p2.textContent = "Email address is not valid.  Please try again.";
                                p2.classList.remove("fade-out");
                                p2.classList.add("fade-in");
                        }
                    }else{
                        console.log(consoleTrace());
                        document.body.removeChild(overlay);
                    }
                }
            });
        // cancelButton
            cancelButton.addEventListener("mouseover", () => {
                cancelButton.style.backgroundColor = "rgba(0, 86, 179, 1)";
            });    
            cancelButton.addEventListener("mouseout", () => {
                cancelButton.style.backgroundColor = "rgba(0, 123, 255, 1)";
            });    
            cancelButton.addEventListener("click", () => {
                document.body.removeChild(overlay);
            });
    
}

// popup busy animation
    export function popupBusyAnimation(){

        const overlay= document.createElement("div");
        const animation = document.createElement("div");
        const span1 = document.createElement("span");
        const span2 = document.createElement("span");
        const span3 = document.createElement("span");

        overlay.id = "overlay";
        overlay.classList.add("overlay");
        overlay.classList.add("busy-animation");
        overlay.style.position = "fixed";
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0, 0, 0, 0.25)";
        overlay.style.zIndex = "9999";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";

        // animation.id = "busy-animation-container";
        animation.classList.add("container");
        animation.style.background = "rgba(255, 255, 255, 1)";
        animation.style.padding = "20px";
        animation.style.borderRadius = "8px";
        animation.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        animation.style.textAlign = "center";

        span1.classList.add("dot");
        span2.classList.add("dot");
        span3.classList.add("dot");

        overlay.appendChild(animation);
        animation.appendChild(span1);
        animation.appendChild(span2);
        animation.appendChild(span3);
        // animation.appendChild(overlay);
        document.body.appendChild(overlay);

    }
