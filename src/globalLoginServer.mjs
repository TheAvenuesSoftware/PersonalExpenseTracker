const consoleLog = false

if(consoleLog===true){console.log(consoleTrace(),"\nLOADED:- globalLoginServer.mjs is loaded",new Date().toLocaleString());}
export function globalLoginServerMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  SERVER SIDE IMPORTS ONLY
    import { Router } from "express";
    const loginRouter = Router();
    import fs from 'fs';
    // import * as projectSQLite from './projectSQLite.mjs'
    // import {accessDb} from './SQLite_ServerSide.mjs'
    import {randomInt, randomBytes} from "crypto";
    import {sendMail} from './globalServer.mjs'
    import {loginEmailHtml} from './projectServerConfig.mjs'
    import dotenv from "dotenv";
        dotenv.config({path:`./config/globalServer.env`});
    import {consoleTrace} from "./globalServer.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

loginRouter.get("/isLoginRequired", (req, res) => {
    // if(consoleLog===true){console.log(consoleTrace(),"\nrouter.get('/isLoginRequired");}
    // ❗❗❗const isLoginRequired = process.env.IS_LOGIN_REQUIRED; // DOESN'T WORK! it stores a text value of true, not the boolean.
        const isLoginRequired = process.env.IS_LOGIN_REQUIRED?.toLowerCase() === "true"; // Handles case variations
    // ❗❗❗const isLoginRequired = process.env.IS_LOGIN_REQUIRED; // DOESN'T WORK! it stores a text value of true, not the boolean.
    // if(consoleLog===true){console.log(consoleTrace(),'\nisLoginRequired:- ',isLoginRequired);}
    if(isLoginRequired===true){
        // res.send({"message":true});
        res.send(true);
    }else{
        // res.send({"message":false});
        res.send(false);
    }
});

// create UUID


// ROUTER login_step1
    loginRouter.post("/login_step1", (req, res) => {
        // login_step1 is all done at the client
    });

// ROUTER login_step2 - check if database exists
    loginRouter.post("/login_step2", (req, res) => {
        if(consoleLog===true){console.log(consoleTrace(),"\n✅login_step2\n",req.body);}
        // const filePath = `./data/${userEmailAddress}/${userEmailAddress}.db`;
        const filePath = `./data/${req.body.userEmailAddress}.db`;
        if(consoleLog===true){console.log(consoleTrace(),`\n`,filePath);}
        if (fs.existsSync(filePath)) {
            if(consoleLog===true){console.log(consoleTrace(),'\n🟢 File exists!');}
            res.send({"message":`File named "${req.body.userEmailAddress}.db" found.`,"createNewAccount":false,"issueLoginCode":true});
        } else {
            if(consoleLog===true){console.log(consoleTrace(),'\n🔴 File not found.');}
            res.send({"message":`File named "${req.body.userEmailAddress}.db" not found.`,"createNewAccount":true,"issueLoginCode":false});
        }
    });

// ROUTER login_step3
    loginRouter.post("/login_step3", async (req, res) => {
        if(consoleLog===true){console.log(consoleTrace(),"\n✅login_step3\n",req.body);}
        // generate securityCode 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒
            const securityCode = randomInt(100000, 999999); // 6-digit code
            if(consoleLog===true){console.log(consoleTrace(),`\nLogin: session regen - Session securityCode:- ${securityCode}}`);}
            const securityCodeX = randomBytes(4).toString("hex"); // Hex-based code, more complex code if needed
            if(consoleLog===true){console.log(consoleTrace(),`\nLogin: session regen - Session securityCodeX:- ${securityCodeX}}`);}
        // regenerate session & add security code to regenerated session
            // console.log("🔴 Before regen:", req.sessionID);
            const sessionID_preRegen = req.sessionID;
            req.session.regenerate(err => {
            if (err) {
                    console.error(consoleTrace(),"\n🔴 Login: session regen - Session regen error:\n", err);
                } else {
                    const securityCodeTTL = 10; // minutes
                    req.session.securityCode = {
                        code: securityCode,
                        codeX: securityCodeX,
                        expiresAt: Date.now() + securityCodeTTL * 60 * 1000 // expiry in securityCodeTTL minutes
                            // 💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬
                            // When validating the code, check if it has expired:
                                // if (Date.now() > req.session.securityCode.expiresAt) {
                                //     return res.status(400).json({ message: "Security code expired. Please request a new one." });
                                // }
                            // When validating the code, check if it has expired:
                            // 💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬
                    };
                    // Schedule automatic removal of securityCode after expiry
                        setTimeout(() => {
                            if (req.session.securityCode && Date.now() > req.session.securityCode.expiresAt) {
                                delete req.session.securityCode;
                                console.log("🔴🟢❓ Login: session regen - Security code expired and removed!");
                            }
                        }, ( securityCodeTTL + 1 ) * 60 * 1000);
                    if(consoleLog===true){console.log(consoleTrace(),"\nLogin: session regen - Session regen ok.");}
                    if(consoleLog===true){console.log(consoleTrace(),"\nLogin: session regen - Session securityCode updated.");}
                    if(consoleLog===true){console.log(consoleTrace(),"\nLogin: session regen - req.session:-",JSON.stringify(req.session, null, 2));}
                    if(consoleLog===true){console.log(consoleTrace(),"\nLogin: session regen - req.session.securityCode:-",JSON.stringify(req.session.securityCode, null, 2));}
                    if(consoleLog===true){console.log(consoleTrace(),"\nLogin: session regen - req.session.securityCode.code:-",JSON.stringify(req.session.securityCode.code, null, 2));}
                    const sessionID_postRegen = req.sessionID;
                    if(sessionID_preRegen === sessionID_postRegen){
                        console.log(`🔴 Login: session regen - Session regen failed: ${sessionID_preRegen} === ${sessionID_postRegen}`); // Should be different!
                    }else{
                        console.log(`🟢 Login: session regen - Session regen success: ${sessionID_preRegen} != ${sessionID_postRegen}`); // Should be different!
                    }
                }
            });
        // 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒
        // send code by email
            const from = process.env.GLOBAL_SMTP_USER;
            const to = req.body.userEmailAddress;
            const subject = `${process.env.APP_NAME} login code`;
            const html = await loginEmailHtml(securityCode);
            const text = `Please enter the code below to log in to ${process.env.APP_NAME}\n\n${securityCode}`;
            // const loginCode = securityCode;
            const mailSent = await sendMail(from,to,subject,html,text);
            console.log(`${consoleTrace()}\nmailSent:- `,mailSent);
            if(mailSent === true){
                const answer = `Login code has been emailed to ${req.body.userEmailAddress}.`
                res.json({"message":answer,"userLoginCodeSent":true});
            }else{
                if(typeof mailSent === "undefined"){
                    const answer = `Login code email to ${req.body.userEmailAddress} has failed.`
                    res.json({"message":answer,"userLoginCodeSent":"undefined"});
                }else{
                    const answer = `Login code email to ${req.body.userEmailAddress} has failed.`
                    res.json({"message":answer,"userLoginCodeSent":false});
                }
            }
    });

// ROUTER login_step4
    loginRouter.post("/login_step4", async (req, res) => {
        if(consoleLog===true){console.log(consoleTrace(),"\n✅login_step4\n",req.body);}
        if(consoleLog===true){console.log(consoleTrace(),JSON.stringify(req.session, null, 2));}
        if(consoleLog===true){console.log(consoleTrace(),JSON.stringify(req.session.securityCode, null, 2));}
        if(typeof req.session.securityCode === "undefined"){
        }else{
            if(consoleLog===true){console.log(consoleTrace(),JSON.stringify(req.session.securityCode.code, null, 2));}
        }
        if(consoleLog===true){console.log(consoleTrace(),"\nreq.session.securityCode:-",JSON.stringify(req.session.securityCode.code, null, 2));}
        if(req.body.userLoginCode===req.session.securityCode.code.toString()){
            res.send({"message":`Login approved for ${req.body.userEmailAddress}.`,"loginApproved":true});
            console.log(`${consoleTrace()}\n🔒🟢 login success`);
            req.session.name = req.body.userEmailAddress;
            console.log(consoleTrace(),"\n",req.session);
        }else{
            res.send({"message":`Login approved for ${req.body.userEmailAddress}.`,"loginApproved":false});
            console.log(`${consoleTrace()}\n🔒🔴 login fail`);
        }
    });

export default loginRouter ;