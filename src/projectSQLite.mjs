function consoleTrace() {
    try {
        const stack = new Error().stack;
        const firstLine = stack.split('\n')[2].trim();
        return `Trace line: ${firstLine}`;
    } catch (error) {
        return 'Trace line: not available';
    }
};

console.log(consoleTrace(),"\nLOADED:- projectNodeSQLite.mjs is loaded",new Date().toLocaleString());
export function projectNodeSQLiteMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
    import sqlite3 from "sqlite3";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

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