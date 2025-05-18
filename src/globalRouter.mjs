const consoleLog = true

if(consoleLog===true){console.log(consoleTrace(),"\nLOADED:- globalRoutes.mjs is loaded",new Date().toLocaleString());}
export function globalRoutesMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  SERVER SIDE IMPORTS ONLY
    import { Router } from "express";
    const globalRouter = Router();
    // import * as globalClientJS from "./globalClient.mjs";
    import {newDateAttributes} from "./globalClient.mjs";
    import {consoleTrace} from "./globalServer.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

globalRouter.get("/getGlobalFooter", (req, res) => {
    if(consoleLog===true){console.log("router.get('/getGlobalFooter...");}
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