consoleLog = true;

if(consoleLog===true){console.log(trace(),'\nLOADED:- indexMountRouters.mjs');}

function trace() {
    try {
        const stack = new Error().stack;
        const firstLine = stack.split('\n')[2].trim();
        return `Trace line: ${firstLine}`;
    } catch (error) {
        return '🔴 Trace line: not available';
    }
};

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
    // import express from "express";
    // const app = express();
    // import { Router } from "express";
    // const projectRouter = Router();
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

// export function mountRouters(){

// }