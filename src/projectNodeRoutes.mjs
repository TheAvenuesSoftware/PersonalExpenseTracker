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

console.log(consoleTrace());
console.log("LOADED:- projectServerSideValidations.mjs is loaded")
export function projectServerSideValidationsMJSisLoaded(){
    return true;
}
export function test(){
    return true;
}

// Override console.trace to only output the first line of the stack trace START
    // version 5 START
    function consoleTrace() {
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

// import * as globalClient from './globalClient.js';
// // import { newDateAttributes } from './globalClient.js';

router.post('/validate_date', (req,res) => {
    console.log(consoleTrace());
    console.log('req.body:- ',req.body);
    const date = new Date(req.body.date);
    console.log('new Date(req.body.date):- ',date);
    let today = new Date().toLocaleDateString();
    today = new Date(new Date());
    console.log('today:- ',today);
    if(date > today){
        res.send(`{"response":"A future date is not valid, please try again."}`)
    }
    // const dateMinus366
    if(date < today){
        res.send(`{"response":"A future date is not valid, please try again."}`)
    }
});

export default router;