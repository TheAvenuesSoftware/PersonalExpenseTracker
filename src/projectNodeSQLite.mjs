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
console.log("LOADED:- projectNodeSQLite.mjs is loaded")
export function projectNodeSQLiteMJSisLoaded(){
    return true;
}
export function test(){
    return true;
}

// consoleTrace()
    function consoleTrace() {
        try {
            const stack = new Error().stack;
            const firstLine = stack.split('\n')[2].trim();
            return `Trace line: ${firstLine}`;
        } catch (error) {
            return 'Trace line: not available';
        }
    };

import sqlite3 from "sqlite3";

// accessDb
    export function accessDb(fileName){
        const db = new sqlite3.Database(`${process.env.PATH_TO_DATABASE}${fileName}.db`, (err) => {
            if (err) {
                console.log(consoleTrace());
                console.error("Error connecting to SQLite database:",fileName, err);
            } else {
                console.log(consoleTrace());
                console.log(`Connected to SQLite database. ${fileName}.db`);
            }
            let myDate = new Date();
            console.log(`${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);
            console.log(("<>").repeat(55));
        });
    }