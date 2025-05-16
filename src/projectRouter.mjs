const consoleLog = false;

if(consoleLog===true){console.log(consoleTrace(),"\nLOADED:- projectRoutes.mjs is loaded",new Date().toLocaleString());}
export function projectRoutesMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
    import { Router } from "express";
    const projectRouter = Router();
    import {consoleTrace} from "./globalServer.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

projectRouter.post('/validate_date', (req,res) => {
    if(consoleLog===true){console.log(consoleTrace());}
    if(consoleLog===true){console.log('req.body:- ',req.body);}
    const date = new Date(req.body.date);
    if(consoleLog===true){console.log('new Date(req.body.date):- ',date);}
    let today = new Date().toLocaleDateString();
    today = new Date(new Date());
    if(consoleLog===true){console.log('today:- ',today);}
    if(date > today){
        res.send(`{"response":"A future date is not valid, please try again."}`)
    }
    // const dateMinus366
    if(date < today){
        res.send(`{"response":"A future date is not valid, please try again."}`)
    }
});

export default projectRouter;