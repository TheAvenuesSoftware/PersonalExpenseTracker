function consoleTrace() {
    try {
        const stack = new Error().stack;
        const firstLine = stack.split('\n')[2].trim();
        return `Trace line: ${firstLine}`;
    } catch (error) {
        return 'Trace line: not available';
    }
};

console.log(consoleTrace(),"\nLOADED:- globalLoginClient.mjs is loaded",new Date().toLocaleString());
function globalLoginClientJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
    // import * as globalClientMJS from './globalClient.mjs';
    import {universalFetch} from './globalClient.mjs';
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

// window.addEventListener("load", () =>
    window.addEventListener("load", () => {

        console.log(consoleTrace(),'\nwindow "load" successsful.');

        isLoginRequired();

    });

// check email address
    function isValidEmailFormat(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
// check if email domain is valid
    async function isDomainValid(email) {
        console.log(consoleTrace());
        // if (!isValidEmailFormat(email)) {
        //     console.error('Invalid email format.');
        //     return false;
        // }
        const domain = email.split('@')[1];
        try {
            const response = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
            const data = await response.json();
            console.log(data);
            // return data.Answer && data.Answer.length > 0; // Checks if MX records exist
            console.log('data.Status:- ',data.Status); // 0 (Success) or 3 (Name Error)
            console.log('data.Question:- ',data.Question); // Checks if MX records exist, 15
            console.log('data.Question.type:- ',data.Question[0].type); // Checks if MX records exist, 15
            console.log('data.Answer:- ',data.Answer); //
            if(data.Status!=0){
                console.log('data.Status:- ',data.Status);
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
    console.log(consoleTrace());
    console.log('isLoginRequired()...');
    // const fetchUrl = `/routesGlobal/isLoginRequired`;
    const fetchUrl = `/loginRouter/isLoginRequired`;
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
    const fetchUrl = `/loginRouter/login_step3`;
    const fetchType = `POST`;
    const fetchPayload = {userEmailAddress:userEmailAddress,createNewAccount:createNewAccount};
    console.log(fetchPayload);
    console.log(JSON.stringify(fetchPayload));
    const data = await universalFetch(fetchUrl,fetchType,JSON.stringify(fetchPayload));
    console.log(data);
    console.log(data.message);
}
async function login_step2(userEmailAddress){ // send userEmailAddress to server; receive login code || create new user
    console.log(consoleTrace());
    console.log('login_step2()...');
    const fetchUrl = `/loginRouter/login_step2`;
    const fetchType = `POST`;
    const fetchPayload = {userEmailAddress:userEmailAddress};
    console.log(fetchPayload);
    console.log(JSON.stringify(fetchPayload));
    const data = await universalFetch(fetchUrl,fetchType,JSON.stringify(fetchPayload));
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
        dialog.id = "dialog";
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
                            console.log(consoleTrace());
                            console.log('validDomain:- ',validDomain);
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
                                console.log(consoleTrace());
                                p2.textContent = "Email domain is not valid.  Please try again.";
                                p2.classList.remove("fade-out");
                                p2.classList.add("fade-in");
                            }
                        }else{
                                console.log(consoleTrace());
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
    function popupBusyAnimation(){

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