export function consoleTrace() {
    try {
        const stack = new Error().stack;
        const firstLine = stack.split('\n')[2].trim();
        return `Trace line: ${firstLine}`;
    } catch (error) {
        return 'Trace line: not available';
    }
};

console.log(consoleTrace(),"\nLOADED:- globalRoutes.mjs is loaded",new Date().toLocaleString());
export function globalRoutesMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
    import { Router } from "express";
    const globalRouter = Router();
    // import * as globalClientJS from "./globalClient.mjs";
    import {newDateAttributes} from "./globalClient.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

globalRouter.get("/getGlobalFooter", (req, res) => {
    console.log("router.get('/getGlobalFooter...");
    const moment = newDateAttributes();
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

export default globalRouter;