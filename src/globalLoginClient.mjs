const consoleLog = true;

if(consoleLog===true){console.log("LOADED:- globalLoginClient.mjs is loaded",new Date().toLocaleString());}
function globalLoginClientJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
    // import * as globalClientMJS from './globalClient.mjs';
    import {universalFetch} from './globalClient.mjs';
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

// window.addEventListener("load", () =>
    window.addEventListener("load", () => {

        if(consoleLog===true){console.log('window "load" successsful.');}

        isLoginRequired();

    });

// check email address
    function isValidEmailFormat(email) {
        if(consoleLog===true){console.log(`isValidEmailFormat(${email})`);}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
// check if email domain is valid
    async function isDomainValid(email) {
        if(consoleLog===true){console.log(`isDomainValid(${email})`);}
        // if (!isValidEmailFormat(email)) {
        //     console.error('Invalid email format.');
        //     return false;
        // }
        const domain = email.split('@')[1];
        try {
            const response = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
            const data = await response.json();
            if(consoleLog===true){console.log(data);}
            // return data.Answer && data.Answer.length > 0; // Checks if MX records exist
            if(consoleLog===true){console.log('data.Status:- ',data.Status);} // 0 (Success) or 3 (Name Error)
            if(consoleLog===true){console.log('data.Question:- ',data.Question);} // Checks if MX records exist, 15
            if(consoleLog===true){console.log('data.Question.type:- ',data.Question[0].type);} // Checks if MX records exist, 15
            if(consoleLog===true){console.log('data.Answer:- ',data.Answer);} //
            if(data.Status!=0){
                if(consoleLog===true){console.log('data.Status:- ',data.Status);}
                return false;
            }
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

// isLoginRequired
async function isLoginRequired() {
    if(consoleLog===true){console.log('isLoginRequired()');}
    const fetchUrl = `/loginRouter/isLoginRequired`;
    if(consoleLog===true){console.log(fetchUrl);}
    try {
        // fetch
            const response = await fetch(fetchUrl);
            if (!response.ok) throw new Error(`Server Error: ${response.statusText}`);
            const data = await response.json(); // Fetch JSON object
            if(consoleLog===true){console.log(data);} // Logs correctly? Great!
            if(consoleLog===true){console.log(data.message);} // Logs correctly? Great!
            if(data.message===true){
                // login_step1:- emailAddress, createNewAccount, userLoginCodeSent, loginApproved
                login_step1("",false,false,false);
            }
    } catch (error) {
        // console.error("Error fetching HTML from:",fetchUrl, error.message);
        console.error("Error fetching HTML from:",error.message);
    }
}
async function login_step4(userEmailAddress,createNewAccount,userLoginCode){
    if(consoleLog===true){console.log('login_step4(✅)');}
    const fetchUrl = `/loginRouter/login_step4`;
    const fetchType = `POST`;
    // const fetchPayload = {userEmailAddress:userEmailAddress,createNewAccount:createNewAccount,userLoginCode:userLoginCode};
    const fetchPayload = {userEmailAddress:userEmailAddress,createNewAccount:createNewAccount,userLoginCode:userLoginCode};
    if(consoleLog===true){console.log(fetchPayload);}
    if(consoleLog===true){console.log(JSON.stringify(fetchPayload));}
    const data = await universalFetch(fetchUrl,fetchType,JSON.stringify(fetchPayload));
    if(consoleLog===true){console.log(data);}
    if(consoleLog===true){console.log(data.message,data.loginApproved);}
    if(data.loginApproved===true){
        document.querySelectorAll('.overlay').forEach(el => {
            el.style.transition = "opacity 0.5s";
            el.style.opacity = "0";
            setTimeout(() => el.remove(), 500);
        });
        alert("🟢 Secure login is successful.");
    }else{
        document.querySelectorAll('.overlay').forEach(el => {
            el.style.transition = "opacity 0.5s";
            el.style.opacity = "0";
            setTimeout(() => el.remove(), 500);
        });
        alert("login failed, please try again");
    }
}
async function login_step3(userEmailAddress,createNewAccount=false){
    if(consoleLog===true){console.log('login_step3(✅)');}
    const fetchUrl = `/loginRouter/login_step3`;
    const fetchType = `POST`;
    const fetchPayload = {userEmailAddress:userEmailAddress,createNewAccount:createNewAccount};
    if(consoleLog===true){console.log(fetchPayload);}
    if(consoleLog===true){console.log(JSON.stringify(fetchPayload));}
    const data = await universalFetch(fetchUrl,fetchType,JSON.stringify(fetchPayload));
    if(consoleLog===true){console.log(data);}
    if(consoleLog===true){console.log(data.message,data.userLoginCodeSent);}
    if(data.userLoginCodeSent===true){
        // login_step1:- emailAddress, createNewAccount, userLoginCodeSent, loginApproved
        login_step1(userEmailAddress,false,data.userLoginCodeSent,false);
    }
}
async function login_step2(userEmailAddress){ // send userEmailAddress to server; receive login code || create new user
    if(consoleLog===true){console.log('login_step2(✅)');}
    const fetchUrl = `/loginRouter/login_step2`;
    const fetchType = `POST`;
    const fetchPayload = {userEmailAddress:userEmailAddress};
    if(consoleLog===true){console.log(fetchPayload);}
    if(consoleLog===true){console.log(JSON.stringify(fetchPayload));}
    const data = await universalFetch(fetchUrl,fetchType,JSON.stringify(fetchPayload));
    if(consoleLog===true){console.log(data);}
    if(consoleLog===true){console.log(data.message);}
    if(consoleLog===true){console.log(data.createNewAccount);}
    // login_step1:- emailAddress, createNewAccount, userLoginCodeSent, loginApproved
    login_step1(userEmailAddress,data.createNewAccount,false,false);
}
// ⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨
function login_step1(
    emailAddress="",
    createNewAccount=false,
    userLoginCodeSent=false,
    loginApproved=false){

    if(consoleLog===true){console.log(`login_step1(✅ emailAddress: ${emailAddress},createNewAccount:${createNewAccount},userLoginCodeSent:${userLoginCodeSent},loginApproved:${loginApproved})`);}

    document.querySelectorAll('.overlay').forEach(el => {
        el.style.transition = "opacity 0.5s";
        el.style.opacity = "0";
        setTimeout(() => el.remove(), 500);
    });

    const overlay = document.createElement("div");
    const dialog = document.createElement("div");
    const userEmailAddress = document.createElement("input");
    const userLoginCode = document.createElement("input");
    const submitButton = document.createElement("button");
    const cancelButton = document.createElement("button");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const br1 = document.createElement("br");
    const br2 = document.createElement("br");
    const br3 = document.createElement("br");
    const br4 = document.createElement("br");
    const focusOnMe = document.createElement("input")

    focusOnMe.style.display = "none";
    br1.style.display = "none";
    br2.style.display = "none";

    // 
        overlay.id = "overlay";
        overlay.classList.add("login-overlay", "overlay");
    
    // 
        dialog.id = "dialog";
        dialog.classList.add("dialog");

    //
        p1.classList.add("normal-prompt");
        p1.innerHTML = "Please enter your login email address.";
        if(createNewAccount===true){
            p1.innerHTML = `No account exists for ${emailAddress}<br>Create an account?`;
        }
        if(userLoginCodeSent===true){
            p1.innerHTML = `Please check your email account ${emailAddress}<br>and enter the login code below.`;
        }

    // 
        userEmailAddress.id = "user-email-address";
        if(createNewAccount===true || userLoginCodeSent===true){
            if(consoleLog===true){console.log('createNewAccount:- ',createNewAccount,'userLoginCodeSent:- ',userLoginCodeSent);}
            userEmailAddress.value = emailAddress;
            userEmailAddress.disabled = true;
            userEmailAddress.readOnly = true;
            userEmailAddress.style.background = "rgba(255,255,255,1)";
            setTimeout(() => {
                userEmailAddress.blur();
                focusOnMe.focus();
                focusOnMe.select();
            }, 100); // 50ms delay
        }

    // 
        userLoginCode.id = "user-login-code";
        userLoginCode.style.display = "none";
        if(userLoginCodeSent===true){
            if(consoleLog===true){console.log('userLoginCodeSent:- ',userLoginCodeSent);}
            setTimeout(() => {
                userLoginCode.style.display = "block";
                // br1.style.display = "block";
                // br2.style.display = "block";
                userEmailAddress.style.display = "none";
            }, 100); // 50ms delay
        }

    // Create login button
        submitButton.textContent = "Log-in";
        if(createNewAccount===true){
            submitButton.textContent = "Create account";
        }
        if(userLoginCodeSent===true){
            submitButton.textContent = "Submit code";
        }
        

    // Create cancel button
        cancelButton.textContent = "Cancel";

    // 
        p2.innerHTML = `&nbsp`;
        p2.classList.add("error-prompt");

    // Append elements together
        dialog.appendChild(p1);
        dialog.appendChild(userEmailAddress );
        dialog.appendChild(br1);
        dialog.appendChild(br2);
        dialog.appendChild(userLoginCode);
        dialog.appendChild(br3);
        dialog.appendChild(submitButton);
        dialog.appendChild(cancelButton);
        // dialog.appendChild(br4);
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
                if(createNewAccount===true || userLoginCodeSent===true){
                    userEmailAddress.blur();
                    focusOnMe.focus();
                    focusOnMe.select();
                }
            });
        // loginButton
            submitButton.addEventListener("mouseover", () => {
                submitButton.style.backgroundColor = "#0056b3";
            });    
            submitButton.addEventListener("mouseout", () => {
                submitButton.style.backgroundColor = "#007bff";
            });
            submitButton.addEventListener("click", async () => {
                if(createNewAccount===true){
                    setTimeout(() =>{
                        login_step3(userEmailAddress.value,createNewAccount); // generate login code and email to user
                    },1000); // used in development to mimic delayed response from server, maybe not necessary in production
                    popupBusyAnimation();
                    document.body.removeChild(overlay);
                    return;
                }
                if(userLoginCodeSent===true){
                    setTimeout(() =>{
                        login_step4(userEmailAddress.value,createNewAccount,userLoginCode.value); // submite login code for validation at server
                    },1000); // used in development to mimic delayed response from server, maybe not necessary in production
                    popupBusyAnimation();
                    document.body.removeChild(overlay);
                    return;
                }
                if(userEmailAddress.value.length > 0){
                    const validEmailFormat = await isValidEmailFormat(userEmailAddress.value);
                    if(validEmailFormat===true){
                        if(consoleLog===true){console.log('validEmailFormat:- ',validEmailFormat);}
                        const validDomain = await isDomainValid(userEmailAddress.value);
                        if(consoleLog===true){console.log('validDomain:- ',validDomain);}
                        if(validDomain===true){
                            if(consoleLog===true){console.log(`userEmailAddress.value: ${userEmailAddress.value}`);}
                            setTimeout(() =>{
                                login_step2(userEmailAddress.value); // send userEmailAddress to server; receive login code || create new user
                            },1000); // used in development to mimic delayed response from server, maybe not necessary in production
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
                    document.body.removeChild(overlay);
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
    function popupBusyAnimation(){

        const overlay= document.createElement("div");
        const animation = document.createElement("div");
        const span1 = document.createElement("span");
        const span2 = document.createElement("span");
        const span3 = document.createElement("span");

        overlay.id = "overlay";
        overlay.classList.add("busy-animation", "overlay");

        // animation.id = "busy-animation-container";
            animation.classList.add("container");

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