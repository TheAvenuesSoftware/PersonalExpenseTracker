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

import * as browserLoginJS from './globalClientLogin.js';
// import { clientConfig } from "../config/globalClientConfig.js";
// console.log("DEV_IP_ADDRESS:- ", clientConfig.DEV_IP_ADDRESS);

// universal fetch
    export async function universalFetch(url, method = 'GET', data = null) {
        console.log(consoleTrace());
        console.log(url,'\n',method,'\n',data);
        try {
            // Ensure data is correctly formatted before using it in the request
                const body = isValidJSONString(data)
                    ? data // Data is already stringified
                    : typeof data === 'object' 
                        ? JSON.stringify(data) // Convert object to JSON string
                        : null; // No valid data, avoid sending an incorrect body
            // 
                const options = {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body
                };
            // 
                const response = await fetch(url, options);
                    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
                    return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

// check if JSONstring is valid
    export function isValidJSONString(data) {
        if (typeof data !== 'string') return false;
        try {
            JSON.parse(data);
            return true;
        } catch {
            return false;
        }
    }


// remove leading zeros from a number string START
    export function removeLeadingZerosFromString(myString){
        // This revised function checks if the input is a non-empty string
        // before attempting to remove leading zeros. If the input is not 
        // a string or is an empty string, it returns the input as a string
        // without any modification.
        if (typeof myString === 'string' && myString.trim().length > 0) {
            return String(Number(myString));
        }
        return myString.toString();
    // remove leading zeros from a number string END
    };

// return attributes for:- new Date() START
    export function newDateAttributes(){
        // export function newDateAttributes(addYears=0, addMonths=0, addDays=0, addHours=0, addMinutes=0, addSeconds=0){
        const weekDaysShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        const weekDaysLong = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        const monthsShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const monthsLong = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        const newDate = new Date();

        // console.log('newDate',newDate);
        // console.log('newDate.toDateString()',newDate.toDateString());
        // console.log('newDate.toISOString()',newDate.toISOString());
        // console.log('newDate.toJSON()',newDate.toJSON());
        // console.log('newDate.toLocaleDateString()',newDate.toLocaleDateString());
        // console.log('newDate.toLocaleString()',newDate.toLocaleString());
        // console.log('newDate.toLocaleTimeString()',newDate.toLocaleTimeString());
        // console.log('newDate.toString()',newDate.toString());
        // console.log('newDate.toTimeString()',newDate.toTimeString());
        // console.log('newDate.toUTCString()',newDate.toUTCString());
        // console.log('newDate.getTimezoneOffset()',newDate.getTimezoneOffset());
        // console.log('newDate.getTime()',newDate.getTime());
        // console.log('newDate.getDate()',newDate.getDate());
        // console.log('newDate.getDay()',newDate.getDay());
        // console.log('newDate.getMonth()',newDate.getMonth());
        // console.log('newDate.getFullYear()',newDate.getFullYear());
        // console.log('newDate.getHours()',newDate.getHours());
        // console.log('newDate.getMinutes()',newDate.getMinutes());
        // console.log('newDate.getSeconds()',newDate.getSeconds());
        // console.log('newDate.getMilliseconds()',newDate.getMilliseconds());
        // console.log('newDate.getUTCDate()',newDate.getUTCDate());
        // console.log('newDate.getUTCDay()',newDate.getUTCDay());
        // console.log('newDate.getUTCMonth()',newDate.getUTCMonth());
        // console.log('newDate.getUTCFullYear()',newDate.getUTCFullYear());
        // console.log('newDate.getUTCHours()',newDate.getUTCHours());
        // console.log('newDate.getUTCMinutes()',newDate.getUTCMinutes());
        // console.log('newDate.getUTCSeconds()',newDate.getUTCSeconds());
        // console.log('newDate.getUTCMilliseconds()',newDate.getUTCMilliseconds());

        const date = newDate.getDate().toString().padStart(2, '0');
        const day = newDate.getDay().toString();
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
        const year = newDate.getFullYear().toString();
        const hour = newDate.getHours();
        const minute = newDate.getMinutes().toString().padStart(2, '0');
        const second = newDate.getSeconds().toString().padStart(2, '0');
        const millisecond = newDate.getMilliseconds().toString();
        const weekDayShort = weekDaysShort[newDate.getDay()];
        const weekDayLong = weekDaysLong[newDate.getDay()];
        const monthShort = monthsShort[newDate.getMonth()];
        const monthLong = monthsLong[newDate.getMonth()];

        let hour24 = hour.toString().padStart(2,"0");
        let hour12 = hour.toString().padStart(2,"0");
        let ampm = "am"
        if(hour >= 12 & second > 0){
            hour12 = (hour - 12).toString().padStart(2,"0");
            ampm = "pm"
            // console.log("ampm");
        }

        const jsonObject = {
            newDate: newDate,
            date:date,
            day:day,
            month:month,
            year:year,
            hour24:hour24,
            hour12:hour12,
            minute:minute,
            second:second,
            millisecond:millisecond,
            weekDayShort:weekDayShort,
            weekDayLong:weekDayLong,
            monthShort:monthShort,
            monthLong:monthLong,
            yyyymmdd:`${year}-${month}-${date}`,
            hhmmss24:`${hour24}:${minute}:${second}`,
            hhmmss12:`${hour12}:${minute}:${second}`,
            ampm:ampm
        };
        // if(consoleOn){(console.log(`newDate:- ${newDate}\ndate:- ${date}\nday:- ${day}\nmonth:- ${month}\nyear:- ${year}\nhour12:- ${hour12}${ampm}\nhour24:- ${hour24}${ampm}\nminute:- ${minute}\nsecond:- ${second}\n`));}
        return jsonObject;
    // return attributes for:- new Date() END
    }
    // newDateAttributes();

// addToDate(baseDate, years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0) START
    export function addToDate(baseDate, years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0) {
        const resultDate = new Date(baseDate);

        // Adjust years and months first to handle month overflow
        resultDate.setFullYear(resultDate.getFullYear() + years);
        resultDate.setMonth(resultDate.getMonth() + months);

        // Adjust remaining fields
        resultDate.setDate(resultDate.getDate() + days);
        resultDate.setHours(resultDate.getHours() + hours);
        resultDate.setMinutes(resultDate.getMinutes() + minutes);
        resultDate.setSeconds(resultDate.getSeconds() + seconds);

        return resultDate;
    // addToDate(baseDate, years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0) END
    }
    const newDate = new Date(); // Base date
    // console.log('Base Date:', newDate);
    const modifiedDate = addToDate(newDate, 1, -2, 10, -5, 30, 45); // Add/subtract values
    // console.log('Modified Date:', modifiedDate);

// test API end point active/not-active START
    async function sendDataToApi(testData,localhostEndpoint,wwwEndpoint) {
        // const primaryEndpoint = 'http://localhost:2070/testEndpoint';
        // const secondaryEndpoint = 'https://secondary-api.com/endpoint';
        const primaryEndpoint = localhostEndpoint;
        const secondaryEndpoint = wwwEndpoint;
        try {
        // Try sending data to the primary endpoint
        const response = await fetch(primaryEndpoint, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Primary API failed');
        }
        // Return response if successful
        const result = await response.json();
        console.log('Success from Primary API:', result);
        return result;
        } catch (error) {
        console.warn('Primary API failed, switching to Secondary API:', error.message);
        try {
            // Try sending data to the secondary endpoint
            const fallbackResponse = await fetch(secondaryEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            });
            if (!fallbackResponse.ok) {
            throw new Error('Secondary API failed');
            }
            // Return response if successful
            const fallbackResult = await fallbackResponse.json();
            console.log('Success from Secondary API:', fallbackResult);
            return fallbackResult;
        } catch (fallbackError) {
            console.error('Both APIs failed:', fallbackError.message);
            throw fallbackError;
        }
        }
    }

// detectDeviceType() START
export function detectDeviceType() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Check for iPads and iPhones
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS Device (iPhone or iPad)";
        }
    // Check for Android devices
        if (/android/i.test(userAgent)) {
            return "Android Device";
        }
    // Check for other tablets (basic heuristic)
        if (screen.width > 768 && screen.width <= 1024) {
            return "Tablet";
        }
    // Assume desktop for larger screens
        if (screen.width > 1024) {
            return "Desktop or Laptop";
        }
    // Default fallback
        return "Unknown Device";
// detectDeviceType() END
}
// console.log(detectDeviceType());

// detectOS() START
export function detectOS() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/Windows NT/.test(userAgent)) {
        const version = userAgent.match(/Windows NT (\d+\.\d+)/);
        return version ? `Windows (Version ${version[1]})` : "Windows (Unknown Version)";
    } 
    if (/Mac OS X/.test(userAgent)) {
        const version = userAgent.match(/Mac OS X (\d+[_\.]\d+)/);
        return version ? `Mac OS X (Version ${version[1].replace('_', '.')})` : "Mac OS X (Unknown Version)";
    } 
    if (/Android/.test(userAgent)) {
        const version = userAgent.match(/Android (\d+\.\d+)/);
        return version ? `Android (Version ${version[1]})` : "Android (Unknown Version)";
    } 
    if (/Linux/.test(userAgent)) {
        return "Linux (Version detection not specific)";
    } 
    if (/iPhone|iPad|iPod/.test(userAgent)) {
        const version = userAgent.match(/OS (\d+[_\.]\d+)/);
        return version ? `iOS (Version ${version[1].replace('_', '.')})` : "iOS (Unknown Version)";
    }
    return "Unknown Operating System";
// detectOS() END
}
// console.log(detectOS());

// getGlobalFooter()
export async function getGlobalFooter() {
    console.log(consoleTrace());
    console.log('getGlobalFooter()...');
    const fetchUrl = `/routesGlobal/getGlobalFooter`;
    console.log(fetchUrl);
    try {
        // fetch
            const response = await fetch(fetchUrl);
            if (!response.ok) throw new Error(`Server Error: ${response.statusText}`);
            const html = await response.text(); // Fetch HTML as text
            // console.log(html); // Logs correctly? Great!
        // Inject into the page
            document.getElementById("global-footer").innerHTML = html;
    } catch (error) {
        console.error("Error fetching HTML from:",fetchUrl, error.message);
    }
}
