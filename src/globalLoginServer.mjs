export function consoleTrace() {
    try {
        const stack = new Error().stack;
        const firstLine = stack.split('\n')[2].trim();
        return `Trace line: ${firstLine}`;
    } catch (error) {
        return 'Trace line: not available';
    }
};

console.log(consoleTrace(),"\nLOADED:- globalLoginServer.mjs is loaded",new Date().toLocaleString());
export function globalLoginServerMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
    import { Router } from "express";
    const loginRouter = Router();
    import fs from 'fs';
    // import * as projectSQLite from './projectSQLite.mjs'
    import {accessDb} from './projectSQLite.mjs'
    import {randomInt, randomBytes} from "crypto";
    import {sendMail} from './globalServer.mjs'
    import {loginEmailHtml} from './projectConfig.mjs'
    import dotenv from "dotenv";
        dotenv.config({path:`./config/globalServer.env`});
        // import {loginEmailHtml} from '../config/globalServer.env'
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

loginRouter.get("/isLoginRequired", (req, res) => {
    console.log(consoleTrace());
    console.log("router.get('/isLoginRequired...");
    // const isLoginRequired = process.env.IS_LOGIN_REQUIRED; // DOESN'T WORK! it stores a text value of true, not the boolean.
    const isLoginRequired = process.env.IS_LOGIN_REQUIRED?.toLowerCase() === "true"; // Handles case variations
    console.log(consoleTrace());
    console.log('isLoginRequired:- ',isLoginRequired);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if(isLoginRequired===true){
        res.send({"message":true});
    }else{
        res.send({"message":false});
    }
});

// create UUID


// ROUTER login_step1
    loginRouter.post("/login_step1", (req, res) => {
        // login_step1 is all done at the client
    });

// ROUTER login_step2
    loginRouter.post("/login_step2", (req, res) => {
        console.log(consoleTrace());
        console.log("router.get(/login_step2...");
        console.log(consoleTrace());
        console.log('loginUserEmailAddress:- ',req.body.userEmailAddress);
        // const filePath = `./data/${userEmailAddress}/${userEmailAddress}.db`;
        const filePath = `./data/${req.body.userEmailAddress}.db`;
        console.log(consoleTrace());
        console.log(filePath);
        if (fs.existsSync(filePath)) {
            console.log(consoleTrace());
            console.log('File exists!');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.send({"message":`${req.body.userEmailAddress}.db found.`,"createNewAccout":false});
        } else {
            console.log(consoleTrace());
            console.log('File not found.');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.send({"message":`${req.body.userEmailAddress}.db not found.`,"createNewAccount":true});
        }
        // res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        // res.send({"message":req.body.userEmailAddress});
    });

// ROUTER login_step3
    loginRouter.post("/login_step3", async (req, res) => {
        console.log(consoleTrace());
        console.log(req.body);
        // if(req.body.createNewAccount){
            // await accessDb(req.body.userEmailAddress); 
            // console.log(consoleTrace());
            // res.setHeader('Access-Control-Allow-Origin', '*');
            // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            // res.send({"message":`${req.body.userEmailAddress}.db created successfully.`});
            const securityCode = randomInt(100000, 999999); // 6-digit code
            console.log(consoleTrace(),`\nSecurityCode:- ${securityCode}}`);
            const securityCodeX = randomBytes(4).toString("hex"); // Hex-based code, more complex code if needed
            console.log(consoleTrace(),`\nSecurityCodeX:- ${securityCodeX}}`);
            req.session.regenerate(err => {
            if (err) {
                    console.error("Session refresh error:", err);
                } else {
                    console.log("Session refreshed!");
                }
            });
            // req.session.securityCode = securityCodeX;
            req.session.securityCode = {
                code: securityCode,
                codeX: securityCodeX,
                expiresAt: Date.now() + 10 * 60 * 1000 // 10-minute expiry
                    // 💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬
                    // When validating the code, check if it has expired:
                        // if (Date.now() > req.session.securityCode.expiresAt) {
                        //     return res.status(400).json({ message: "Security code expired. Please request a new one." });
                        // }
                    // When validating the code, check if it has expired:
                    // 💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬
            };
            // send code by email
                const from = process.env.GLOBAL_SMTP_USER;
                const to = req.body.userEmailAddress;
                const subject = `${process.env.APP_NAME} login code`;
                const html = await loginEmailHtml(securityCode);
                const text = `Please enter the code below to log in to ${process.env.APP_NAME}\n\n${securityCode}`;
                const loginCode = securityCode;
                const mailSent = await sendMail(from,to,subject,html,text);
            // 
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.send({"message":`Login code has been emailed to ${req.body.userEmailAddress}.`});
        // }
    });

// // check email address
//     export function isValidEmailFormat(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }
// // check if email domain is valid
//     export async function isDomainValid(email) {
//         console.log(consoleTrace());
//         // if (!isValidEmailFormat(email)) {
//         //     console.error('Invalid email format.');
//         //     return false;
//         // }
//         const domain = email.split('@')[1];
//         try {
//             return true
//             const response = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
//             const data = await response.json();
//             console.log(data);
//             // return data.Answer && data.Answer.length > 0; // Checks if MX records exist
//             console.log('data.Status:- ',data.Status); // 0 (Success) or 3 (Name Error)
//             console.log('data.Question:- ',data.Question); // Checks if MX records exist, 15
//             console.log('data.Question.type:- ',data.Question[0].type); // Checks if MX records exist, 15
//             console.log('data.Answer:- ',data.Answer); //
//             if(data.Status!=0){return false;}
//             if(data.Question[0].type!=15){return false;}
//             if(typeof data.Answer === undefined){return false;}
//             return true;
//             // Common Response Keys
//                 // | Key        | Example Value                 | Explanation | 
//                 // | Status     | 0 (Success) or 3 (Name Error) | Indicates the result of the query. 0 means success, 3 means the domain doesn't exist. | 
//                 // | TC         | false                         | Stands for "Truncated". If true, the response was too large and got cut off. | 
//                 // | RD         | true                          | "Recursion Desired". If true, the server tried to resolve the query recursively. | 
//                 // | RA         | true                          | "Recursion Available". If true, the server supports recursive queries. | 
//                 // | AD         | false                         | "Authenticated Data". If true, the response is verified as secure. | 
//                 // | CD         | false                         | "Checking Disabled". If true, DNSSEC validation was skipped. | 
//                 // | Question   | [{"name": "example.com", "type": 1}]                                      | Contains the domain name and query type (e.g., 1 for A records, 15 for MX records). | 
//                 // | Answer     | [{"name": "example.com", "type": 1, "TTL": 300, "data": "93.184.216.34"}] | The actual DNS response, including the resolved IP address or MX records. | 
//                 // | Authority  | [...] | Lists authoritative name servers for the domain. | 
//                 // | Additional | [...] | Provides extra information, such as related DNS records. | 
//         } catch {
//             return false;
//         }
//     }

// // isLoginRequired
// export async function isLoginRequired() {
//     console.log(consoleTrace());
//     console.log('isLoginRequired()...');
//     const fetchUrl = `/routesGlobal/isLoginRequired`;
//     console.log(fetchUrl);
//     try {
//         // fetch
//             const response = await fetch(fetchUrl);
//             if (!response.ok) throw new Error(`Server Error: ${response.statusText}`);
//             const data = await response.json(); // Fetch JSON object
//             console.log(data); // Logs correctly? Great!
//             console.log(data.message); // Logs correctly? Great!
//             if(data.message===true){
//                 login_step1(); // get userEmailAddress, validate userEmailAddress
//             }
//     } catch (error) {
//         console.error("Error fetching HTML from:",fetchUrl, error.message);
//     }
// }
// async function login_step3(userEmailAddress,createNewAccount=false){
//     console.log(consoleTrace());
//     console.log('login_step3()...');
//     const fetchUrl = `/routesGlobal/login_step3`;
//     const fetchType = `POST`;
//     const fetchPayload = {userEmailAddress:userEmailAddress,createNewAccount:createNewAccount};
//     console.log(fetchPayload);
//     console.log(JSON.stringify(fetchPayload));
//     const data = await globalClientMJS.universalFetch(fetchUrl,fetchType,JSON.stringify(fetchPayload));
//     console.log(data);
//     console.log(data.message);
// }
// async function login_step2(userEmailAddress){ // send userEmailAddress to server; receive login code || create new user
//     console.log(consoleTrace());
//     console.log('login_step2()...');
//     const fetchUrl = `/routesGlobal/login_step2`;
//     const fetchType = `POST`;
//     const fetchPayload = {userEmailAddress:userEmailAddress};
//     console.log(fetchPayload);
//     console.log(JSON.stringify(fetchPayload));
//     const data = await globalClientMJS.universalFetch(fetchUrl,fetchType,JSON.stringify(fetchPayload));
//     console.log(data);
//     console.log(data.message);
//     console.log(data.createNewAccount);
//     login_step1(userEmailAddress,data.createNewAccount);
// }
// function login_step1(emailAddress="",createNewAccount){ // get UserEmailAddress; validate userEmailAddress
//     console.log(consoleTrace());
//     console.log('login_step1()...');

//     document.querySelectorAll('.overlay').forEach(el => {
//         el.style.transition = "opacity 0.5s";
//         el.style.opacity = "0";
//         setTimeout(() => el.remove(), 500);
//     });

//     const overlay = document.createElement("div");
//     const dialog = document.createElement("div");
//     const p1 = document.createElement("p");
//     const br1 = document.createElement("br");
//     const userEmailAddress = document.createElement("input");
//     const submitEmailAddressButton = document.createElement("button");
//     const cancelButton = document.createElement("button");
//     const br2 = document.createElement("br");
//     const p2 = document.createElement("p");

//     const focusOnMe = document.createElement("input")
//     // focusOnMe.style.position = "fixed";
//     // focusOnMe.style.right = "1000px";
//     // focusOnMe.style.visibility = "hidden"
//     focusOnMe.style.display = "none";

//     // 
//         overlay.id = "overlay";
//         overlay.classList.add("overlay");
//         overlay.style.position = "fixed";
//         overlay.style.top = 0;
//         overlay.style.left = 0;
//         overlay.style.width = "100%";
//         overlay.style.height = "100%";
//         overlay.style.background = "rgba(0, 0, 0, 0.25)";
//         overlay.style.zIndex = "9999";
//         overlay.style.display = "flex";
//         overlay.style.justifyContent = "center";
//         overlay.style.alignItems = "center";
    
//     // 
//         dialog.id = "dialog";
//         dialog.style.background = "rgba(255,255,255,1)";
//         dialog.style.padding = "20px";
//         dialog.style.borderRadius = "8px";
//         dialog.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
//         dialog.style.textAlign = "center";

//     //
//         if(createNewAccount){
//             p1.innerHTML = `No account exists for ${emailAddress}<br>Create an account?`;
//         }else{
//             p1.innerHTML = "Please enter your login email address.";
//         }

//     // 
//         userEmailAddress.id = "user-email-address";
//         userEmailAddress.style.width = "100%";
//         if(createNewAccount){
//             userEmailAddress.value = emailAddress;
//             userEmailAddress.disabled = true;
//             userEmailAddress.readOnly = true;
//             userEmailAddress.style.background = "rgba(255,255,255,1)";
//             userEmailAddress.style.display = "none";
//             setTimeout(() => {
//                 userEmailAddress.blur();
//                 focusOnMe.focus();
//                 focusOnMe.select();
//             }, 50); // 50ms delay
//         }

//     // Create login button
//         if(createNewAccount){
//             submitEmailAddressButton.textContent = "Create account";
//         }else{
//             submitEmailAddressButton.textContent = "Log-in";
//         }
//         submitEmailAddressButton.style.marginTop = "10px";
//         submitEmailAddressButton.style.padding = "8px 16px";
//         submitEmailAddressButton.style.border = "none";
//         submitEmailAddressButton.style.borderRadius = "4px";
//         submitEmailAddressButton.style.backgroundColor = "rgba(0, 123, 255, 1)";
//         submitEmailAddressButton.style.color = "white";
//         submitEmailAddressButton.style.cursor = "pointer";    
//         submitEmailAddressButton.style.marginRight = "15px";

//     // Create cancel button
//         cancelButton.textContent = "Cancel";
//         cancelButton.style.marginTop = "10px";
//         cancelButton.style.padding = "8px 16px";
//         cancelButton.style.border = "none";
//         cancelButton.style.borderRadius = "4px";
//         cancelButton.style.backgroundColor = "rgba(0, 123, 255, 1)";
//         cancelButton.style.color = "white";
//         cancelButton.style.cursor = "pointer";    
//         cancelButton.style.marginLeft = "15px";

//     // 
//         p2.innerHTML = `&nbsp`;
//         p2.style.maxWidth = "100%";
//         p2.style.color = "red";

//     // Append elements together
//         dialog.appendChild(p1);
//         dialog.appendChild(userEmailAddress );
//         dialog.appendChild(br1);
//         dialog.appendChild(submitEmailAddressButton);
//         dialog.appendChild(cancelButton);
//         dialog.appendChild(br2);
//         dialog.appendChild(p2);
//         dialog.appendChild(focusOnMe);
//         overlay.appendChild(dialog);
//         document.body.appendChild(overlay);
//         userEmailAddress.focus();
//         userEmailAddress.select();

//     // add event listeners
//         // userEmailAddress
//             userEmailAddress.addEventListener("focus", () => {
//                 setTimeout(() => {
//                     // p2.innerHTML = "&nbsp";
//                     p2.classList.add("fade-out");
//                 }, 500); // 500ms delay
//                 userEmailAddress.select();
//                 if(createNewAccount){
//                     userEmailAddress.blur();
//                     focusOnMe.focus();
//                     focusOnMe.select();
//                 }
//             });
//         // loginButton
//             submitEmailAddressButton.addEventListener("mouseover", () => {
//                 submitEmailAddressButton.style.backgroundColor = "#0056b3";
//             });    
//             submitEmailAddressButton.addEventListener("mouseout", () => {
//                 submitEmailAddressButton.style.backgroundColor = "#007bff";
//             });
//             submitEmailAddressButton.addEventListener("click", async () => {
//                 if(createNewAccount){
//                     setTimeout(() =>{
//                         login_step3(userEmailAddress.value,createNewAccount); // send userEmailAddress to server; receive login code || create new user
//                     },1000); // used in development, maybe not necessary in production
//                     popupBusyAnimation();
//                     document.body.removeChild(overlay);
//                 }else{
//                     if(userEmailAddress.value){
//                         const validEmailFormat = await isValidEmailFormat(userEmailAddress.value);
//                         if(validEmailFormat===true){
//                             console.log(consoleTrace());
//                             console.log('validEmailFormat:- ',validEmailFormat);
//                             const validDomain = await isDomainValid(userEmailAddress.value);
//                             if(validDomain===true){
//                                 console.log(consoleTrace());
//                                 console.log(userEmailAddress.value);
//                                 setTimeout(() =>{
//                                     login_step2(userEmailAddress.value); // send userEmailAddress to server; receive login code || create new user
//                                 },1000); // used in development, maybe not necessary in production
//                                 popupBusyAnimation();
//                                 document.body.removeChild(overlay);
//                                 // document.querySelectorAll('.overlay').forEach(el => {
//                                 //     el.style.transition = "opacity 0.5s";
//                                 //     el.style.opacity = "0";
//                                 //     setTimeout(() => el.remove(), 500);
//                                 // });
//                             }else{
//                                 p2.textContent = "Email domain is not valid.  Please try again.";
//                                 p2.classList.remove("fade-out");
//                                 p2.classList.add("fade-in");
//                             }
//                         }else{
//                                 p2.textContent = "Email address is not valid.  Please try again.";
//                                 p2.classList.remove("fade-out");
//                                 p2.classList.add("fade-in");
//                         }
//                     }else{
//                         console.log(consoleTrace());
//                         document.body.removeChild(overlay);
//                     }
//                 }
//             });
//         // cancelButton
//             cancelButton.addEventListener("mouseover", () => {
//                 cancelButton.style.backgroundColor = "rgba(0, 86, 179, 1)";
//             });    
//             cancelButton.addEventListener("mouseout", () => {
//                 cancelButton.style.backgroundColor = "rgba(0, 123, 255, 1)";
//             });    
//             cancelButton.addEventListener("click", () => {
//                 document.body.removeChild(overlay);
//             });
    
// }

// // popup busy animation
//     export function popupBusyAnimation(){

//         const overlay= document.createElement("div");
//         const animation = document.createElement("div");
//         const span1 = document.createElement("span");
//         const span2 = document.createElement("span");
//         const span3 = document.createElement("span");

//         overlay.id = "overlay";
//         overlay.classList.add("overlay");
//         overlay.classList.add("busy-animation");
//         overlay.style.position = "fixed";
//         overlay.style.top = 0;
//         overlay.style.left = 0;
//         overlay.style.width = "100%";
//         overlay.style.height = "100%";
//         overlay.style.background = "rgba(0, 0, 0, 0.25)";
//         overlay.style.zIndex = "9999";
//         overlay.style.display = "flex";
//         overlay.style.justifyContent = "center";
//         overlay.style.alignItems = "center";

//         // animation.id = "busy-animation-container";
//         animation.classList.add("container");
//         animation.style.background = "rgba(255, 255, 255, 1)";
//         animation.style.padding = "20px";
//         animation.style.borderRadius = "8px";
//         animation.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
//         animation.style.textAlign = "center";

//         span1.classList.add("dot");
//         span2.classList.add("dot");
//         span3.classList.add("dot");

//         overlay.appendChild(animation);
//         animation.appendChild(span1);
//         animation.appendChild(span2);
//         animation.appendChild(span3);
//         // animation.appendChild(overlay);
//         document.body.appendChild(overlay);

//     }

export default loginRouter ;