// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
//      robocopy C:\SourceFolder D:\DestinationFolder /E /V /XD C:\SourceFolder\ExcludeFolder1 C:\SourceFolder\ExcludeFolder2
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
//      robocopy C:\SourceFolder D:\DestinationFolder /E /COPYALL /V
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

// If you want to mirror a directory (ensuring the destination matches the source exactly, deleting any extra files in the destination), use
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
//      robocopy C:\SourceFolder D:\DestinationFolder /MIR
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// /MIR (Mirror)
// - Synchronizes the destination to match the source exactly.
// - Copies all files and directories (including empty ones).
// - Deletes extra files and directories in the destination that do not exist in the source.
// - Essentially, /MIR is a combination of /E (copy all directories) and /PURGE (remove extra files).
// /PURGE
// - Deletes files and directories in the destination that no longer exist in the source.
// - Unlike /MIR, it does not automatically copy everything—so you'd need /E or another copy option alongside it.
// Example:
// robocopy C:\SourceFolder D:\DestinationFolder /MIR
// This mirrors the directories completely.
// robocopy C:\SourceFolder D:\DestinationFolder /E /PURGE
// This ensures unnecessary files are removed but doesn’t strictly enforce mirroring.
// Would you like help deciding which option fits your task best? 🚀

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
console.log("LOADED:- projectConfig.mjs is loaded")
export function projectConfigJSisLoaded(){
    return true;
}

const sessionWarningDelay = (60 * 60 * 1000);
const sessionExpiredDelay = (65 * 60 * 1000);
export const configSettings = {
    APP_NAME: "Personal Expense Tracker",
    API_KEY: "your-key-here", // public key only!!!
    BASE_URL: "http://192.168.1.117:3000",
    CONSOLE_ON: true,
    DATES_ALLOW_FUTURE: false,
    DATES_ALLOW_ANY_PAST: false,
    SESSION_WARNING_DELAY: sessionWarningDelay,
    SESSION_EXPIRED_DELAY: sessionExpiredDelay,
    CONSOLE_ON: true
};
console.log('Project configuration variables, from projectConfig.mjs:-\n',configSettings);
console.log('Project configuration variables, from projectConfig.mjs:-\n',configSettings.SESSION_WARNING_DELAY);

// loginEmailHtml
    export function loginEmailHtml(loginCode){
        const loginEmailHtml =  `
                            <!DOCTYPE html>
                            <html>
                            <head>
                                <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                        background-color: #f4f4f4;
                                        margin: 0;
                                        padding: 0;
                                    }
                                    .container {
                                        width: 100%;
                                        max-width: 600px;
                                        margin: 0 auto;
                                        background-color: #ffffff;
                                        padding: 20px;
                                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                    }
                                    .header {
                                        background-color: #4CAF50;
                                        color: #ffffff;
                                        padding: 10px 0;
                                        text-align: center;
                                        font-size:2em;
                                    }
                                    .content {
                                        padding: 20px;
                                    }
                                    .footer {
                                        background-color: #f4f4f4;
                                        color: #888888;
                                        text-align: center;
                                        padding: 10px 0;
                                        font-size: 12px;
                                    }
                                    .button {
                                        display: inline-block;
                                        padding: 10px 20px;
                                        margin: 20px 0;
                                        background-color: #4CAF50;
                                        color: #ffffff;
                                        text-decoration: none;
                                        border-radius: 5px;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="container">
                                    <div class="header">
                                        <p>Ride Share Driver Access Code</p>
                                    </div>
                                    <div class="content">
                                        <p>Dear User,</p>
                                        <p>Your access code is: <strong>${loginCode}</strong></p>
                                        <p>Use this code to access your Ride Share Driver account.  (You can copy and paste it.)</p>
                                        // <p>Click the "Remember me" checkbox at the website/app to save re-typing your email address each time you sign in.</p>
                                        <p style="color:red"><b>DELETE THIS EMAIL WHEN DONE. A code will be issued each time you log in.</b></p>
                                        <p>This method of sign-in is secure so long as your email account is secure, a password is not necessary.</p>
                                        <p>If you believe your email account is insecure or if you believe your emails are being intercepted, DO NOT use your Ride Share Driver account untill your email account is secure.</p>
                                    </div>
                                    <div class="footer">
                                        <p>&copy; 2025 Ride Share Driver. All rights reserved.</p>
                                    </div>
                                </div>
                            </body>
                            </html>`;
                            return loginEmailHtml;
    }

