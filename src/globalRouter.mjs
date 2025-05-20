const consoleLog = false

if(consoleLog===true){console.log(consoleTrace(),"\nLOADED:- globalRoutes.mjs is loaded",new Date().toLocaleString());}
export function globalRoutesMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  SERVER SIDE IMPORTS ONLY
    import { Router } from "express";
    const globalRouter = Router();
    // import * as globalClientJS from "./globalClient.mjs";
    // import {newDateAttributes} from "./globalClient.mjs";
    import {consoleTrace} from "./globalServer.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

globalRouter.get("/getGlobalFooter", (req, res) => {
    // if(consoleLog===true){console.log("globalRouter.get('/getGlobalFooter...");}
    const moment = new Date();
    const myHtml = `
        <div class=global-footer-content>
            <p>&copy; ${moment.getFullYear()} The Avenues Software. All rights reserved.</p>
            <nav>
                <ul>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    `
    res.send(myHtml);
    // const myHtml = `<div>...footer</div>`;
    // res.send(myHtml);
});

export default globalRouter;