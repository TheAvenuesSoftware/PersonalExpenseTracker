const consoleLog = true

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
};
if(consoleLog===true){console.log('Project client configuration variables, from projectClientConfig.mjs:-\n',clientConfigSettings);}
if(consoleLog===true){console.log('Project client configuration variables, from projectClientConfig.mjs CLIENT_APP_NAME:-\n',clientConfigSettings.CLIENT_APP_NAME);}

// // loginEmailHtml
//     export function loginEmailHtml(loginCode){
//         const loginEmailHtml =  `
//                             <!DOCTYPE html>
//                             <html>
//                             <head>
//                                 <style>
//                                     body {
//                                         font-family: Arial, sans-serif;
//                                         background-color: #f4f4f4;
//                                         margin: 0;
//                                         padding: 0;
//                                     }
//                                     .container {
//                                         width: 100%;
//                                         max-width: 600px;
//                                         margin: 0 auto;
//                                         background-color: #ffffff;
//                                         padding: 20px;
//                                         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//                                     }
//                                     .header {
//                                         background-color: #4CAF50;
//                                         color: #ffffff;
//                                         padding: 10px 0;
//                                         text-align: center;
//                                         font-size:2em;
//                                     }
//                                     .content {
//                                         padding: 20px;
//                                     }
//                                     .footer {
//                                         background-color: #f4f4f4;
//                                         color: #888888;
//                                         text-align: center;
//                                         padding: 10px 0;
//                                         font-size: 12px;
//                                     }
//                                     .button {
//                                         display: inline-block;
//                                         padding: 10px 20px;
//                                         margin: 20px 0;
//                                         background-color: #4CAF50;
//                                         color: #ffffff;
//                                         text-decoration: none;
//                                         border-radius: 5px;
//                                     }
//                                 </style>
//                             </head>
//                             <body>
//                                 <div class="container">
//                                     <div class="header">
//                                         <p>Ride Share Driver Access Code</p>
//                                     </div>
//                                     <div class="content">
//                                         <p>Dear User,</p>
//                                         <p>Your access code is: <strong>${loginCode}</strong></p>
//                                         <p>Use this code to access your Ride Share Driver account.  (You can copy and paste it.)</p>
//                                         // <p>Click the "Remember me" checkbox at the website/app to save re-typing your email address each time you sign in.</p>
//                                         <p style="color:red"><b>DELETE THIS EMAIL WHEN DONE. A code will be issued each time you log in.</b></p>
//                                         <p>This method of sign-in is secure so long as your email account is secure, a password is not necessary.</p>
//                                         <p>If you believe your email account is insecure or if you believe your emails are being intercepted, DO NOT use your Ride Share Driver account untill your email account is secure.</p>
//                                     </div>
//                                     <div class="footer">
//                                         <p>&copy; 2025 Ride Share Driver. All rights reserved.</p>
//                                     </div>
//                                 </div>
//                             </body>
//                             </html>`;
//                             return loginEmailHtml;
//     }