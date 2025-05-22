const consoleLog = false

if(consoleLog===true){console.log("LOADED:- projectClientConfig.mjs is loaded");}
export function projectClientConfigJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  ONLY IMPORT CLIENT SIDE MODULES TO HERE
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

const clientSessionWarningDelay = (60 * 60 * 1000);
const clientSessionExpiredDelay = (65 * 60 * 1000);
export const clientConfigSettings = {
    CLIENT_APP_NAME: "Personal Expense Tracker",
    CLIENT_API_KEY: "your-key-here", // public key only!!!
    CLIENT_BASE_URL: "http://192.168.1.117:3000",
    CLIENT_DATES_ALLOW_FUTURE: false,
    CLIENT_DATES_ALLOW_ANY_PAST: false,
    CLIENT_SESSION_WARNING_DELAY: clientSessionWarningDelay,
    CLIENT_SESSION_EXPIRED_DELAY: clientSessionExpiredDelay,
    CLIENT_SESSION_HEARTBEAT_INTERVAL: 2, // minutes
    CLIENT_SESSION_IDLE_LOGOUT_AFTER: 4 // minutes
};
if(consoleLog===true){console.log('Project client configuration variables, from projectClientConfig.mjs:-\n',clientConfigSettings);}
if(consoleLog===true){console.log('Project client configuration variables, from projectClientConfig.mjs CLIENT_APP_NAME:-\n',clientConfigSettings.CLIENT_APP_NAME);}