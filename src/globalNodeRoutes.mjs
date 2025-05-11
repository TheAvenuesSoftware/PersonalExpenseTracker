// <!-- collapse all     Ctrl + k + 0 -->
// <!-- expand all       Ctrl + k + j -->
// <!-- format           Alt + Shift + F (USE WITH CAUTION)-->
// <!-- word wrap toggle Alt + z -->

// - Variables & Functions: Use camelCase (e.g., getUserName(), totalAmount)
// - Classes & Constructors: Use PascalCase (e.g., UserModel, DataProcessor)
// - Constants: Use UPPER_CASE_SNAKE_CASE (e.g., API_KEY, MAX_LIMIT)
// - Modules: Often kebab-case for filenames (e.g., user-profile.js)
// - Event & Callback Handlers: Prefix with on (e.g., onClick, onDataReceived)
// - Private Variables: Some use leading _ to indicate private properties (_hiddenProperty)

// ############################
// SERVER SIDE FUNCTIONS ONLY #
// ############################

console.log(consoleTrace());
console.log("LOADED:- globalNodeRoutes.mjs is loaded");
export function globalNodeRoutesMJSisLoaded(){
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

import express from 'express';
const router = express.Router();

import fs from 'fs';

import * as globalClient from './globalClient.js';
// import { newDateAttributes } from './globalClient.js';

// getGlobalFooter
router.get("/getGlobalFooter", (req, res) => {
    console.log("router.get('/getGlobalFooter...");
    const moment = globalClient.newDateAttributes();
    const myHtml = `
        <div class=global-footer-content>
            <p>&copy; ${moment.year} The Avenues Software. All rights reserved.</p>
            <nav>
                <ul>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    `
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.send(myHtml);
    // const myHtml = `<div>...footer</div>`;
    // res.send(myHtml);
});

router.get("/isLoginRequired", (req, res) => {
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
router.post("/login_step2", (req, res) => {
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

export default router;