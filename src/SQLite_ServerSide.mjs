const consoleLog = false;

if(consoleLog===true){console.log(trace(),"\nLOADED:- SQLite_ServerSide.mjs is loaded",new Date().toLocaleString());}
export function SQLite_ServerSideMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  SERVER SIDE IMPORTS ONLY
    import { Router } from "express";
    const dbRouter = Router();
    import sqlite3 from "sqlite3";
    import {trace} from "./globalServer.mjs";
    import { isValidJSONString } from "./globalClient.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

// accessDb - open || create if not exist
    export function accessDb(fileName){
        const db = new sqlite3.Database(`${process.env.PATH_TO_DATABASE}${fileName}.db`, (err) => {
            if (err) {
                console.error(`${trace()}\n🔴 Error connecting to database:\n`,fileName, err);
            } else {
                console.log(`${trace()}\n🟢 Connected to ${fileName}.db`);
            }
            let myDate = new Date();
            if(consoleLog===true){console.log(`${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);}
            if(consoleLog===true){console.log(("<>").repeat(55));}
        });
    }

// db fetch

    export async function dbFetch_CoPilot(url,options){
        const BASE_URL = "http://localhost:3000";
        const fullUrl = new URL(url, BASE_URL);
        const response = await fetch(fullUrl, options);
    }

    export async function dbFetch(url, method = 'GET', data = null) {
        const BASE_URL = "http://localhost:3000";
        const fullUrl = new URL(url, BASE_URL);
        if(consoleLog===true){console.log(`${trace()}\nurl ▶ ${url}\nfullUrl ▶ ${fullUrl}\nmethod ▶ ${method}\ndata ▶ ${data}`);}
        const parsedJSONdata = JSON.parse(data);
        Object.keys(parsedJSONdata).forEach(key => {
            console.log(`key:- ${key} parsedJSONdata[key]:- ${parsedJSONdata[key]}`);
        }); 
        try {
            // Ensure data is correctly formatted before using it in the request
                const body = isValidJSONString(data)
                    ? data // Data is already stringified
                    : typeof data === 'object' 
                        ? JSON.stringify(data) // Convert object to JSON string
                        : null; // No valid data, avoid sending an incorrect body
            
                const options = {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body
                };
            // 
                const response = await fetch(fullUrl, options);
                console.error(trace(),'\n❓📶🛜Fetch response:', response);
                if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
                return await response.json({message:response});
        } catch (error) {
            console.error(trace(),'\n🔴📶🛜Fetch error:', error);
        }
    }

// 🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️
// routes
    // catch all
        dbRouter.use((req, res, next) => {
            console.log(`${trace()}\nHandling request at: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
            next();
        });
    // Create
        dbRouter.post("/dbCreate", async (req, res) => {
            console.log(`${trace()}\nreq.body ▶ ${JSON.stringify(req.body)}`);
            console.log(trace(), req.body);

            const db = await new sqlite3.Database("./db/project.db", (err) => {
                if (err) {
                    console.error("Error opening database:", err.message);
                } else {
                    console.log("Connected to SQLite database");
                }
            });

            const sql = `INSERT INTO users (user_name, user_email) VALUES ('${req.body.userName}', '${req.body.userEmailAddress}')`;
            console.log(trace(),"\n",sql);
            db.run(sql, function (err) {
                if (err) {
                    console.error(`${trace()}\n🔴🗄️💾 Error inserting user: ${err.message}`);
                    return({message:err.message})
                } else {
                    console.log(`${trace()}\n🟢🗄️💾 User added successfully! ID: ${this.lastID}`);
                    return({message:`🟢🗄️💾 add successful, ID: ${this.lastID}`})
                }
            });
        });
// 🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️🛣️

// ⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸⫸
    export async function dbCreate(payload){
        if(consoleLog===true){console.log(`${trace()}\ndbCreate(✅)`);}
        try{
            Object.keys(payload).forEach(key => {
                console.log(key,payload[key]);
            }); 
        }catch{
                console.log(`🔴 ${trace()}payload is not a valid JSON object`);
        }
        const fetchUrl = "/dbRouter/dbCreate";
        const fetchType = `POST`; 
        const fetchPayload = payload;
        if(consoleLog===true){console.log(`${trace()}\nfetchPayload:-\n${fetchPayload}`);}
        if(consoleLog===true){console.log(`${trace()}\nJSON.stringify(fetchPayload):-\n${JSON.stringify(fetchPayload)}`);}
        const data = await dbFetch(fetchUrl,fetchType,JSON.stringify(fetchPayload));
        // const data = await dbFetch(fetchUrl,fetchType,fetchPayload);
        if(consoleLog===true){console.log(`${trace()}\n${data}`);}
        // if(consoleLog===true){console.log(`${trace()}\n${data.message}`);}
        // if(consoleLog===true){console.log(`${trace()}\n${data.createNewAccount}`);}
    }
    // setTimeout(()=>{
    //     dbCreate({userUUID:"123",userName:"D.Garton",userEmailAddress:"d.garton@netit.com.au"});
    // },3000);
// ⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷⫷

// Read
    // SELECT * FROM users;
    // SELECT name, email FROM users WHERE id = 1;

// Update
    // UPDATE users SET email = 'newemail@example.com' WHERE id = 1;

// Delete
    // DELETE FROM users WHERE id = 1;

export default dbRouter;