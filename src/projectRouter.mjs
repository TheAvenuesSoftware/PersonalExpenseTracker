export function consoleTrace() {
    try {
        const stack = new Error().stack;
        const firstLine = stack.split('\n')[2].trim();
        return `Trace line: ${firstLine}`;
    } catch (error) {
        return 'Trace line: not available';
    }
};

console.log(consoleTrace(),"\nLOADED:- projectRoutes.mjs is loaded",new Date().toLocaleString());
export function projectRoutesMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
    import { Router } from "express";
    const projectRouter = Router();
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

projectRouter.post('/validate_date', (req,res) => {
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

export default projectRouter;