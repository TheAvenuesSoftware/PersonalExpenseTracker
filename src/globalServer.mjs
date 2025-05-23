const consoleLog = false

export function trace() {
    try {
        const stack = new Error().stack;
        const firstLine = stack.split('\n')[2].trim();
        const x = firstLine.lastIndexOf("/");
        const y = firstLine.lastIndexOf("/",x - 1);
        const fileName_rowNumber_position = firstLine.slice(y + 1,firstLine.length);
        return `📌Trace: ${fileName_rowNumber_position}`;
    } catch (error) {
        return '🔴 Trace line: not available';
    }
};


if(consoleLog===true){console.log(trace(),"\nLOADED:- globalServer.mjs is loaded",new Date().toLocaleString());}
export function globalServerMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  SERVER SIDE IMPORTS ONLY
    import nodemailer from 'nodemailer'; // MUST BE DONE IN Node.mjs environment
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️


// ===========================================================================================================================


// nodemailer sendMail START
    export async function sendMail(from="",to="",subject="",html="",text=""){
        // if(consoleLog===true){console.log(`${trace()}\nfrom:- ${from}\nto:-${to}\nsubject:- ${subject}\nhtml:- ${html.replace(" ","")}\ntext:- ${text}\n`);}
        // data validation START
                if ([from, to, subject, html, text].some(val => !val)) {
                    console.error(trace(), `\n🔴 Something went wrong. Missing or undefined values`);
                    return false;
                }
                if (!process.env.GLOBAL_SMTP_HOST || !process.env.GLOBAL_SMTP_USER || !process.env.GLOBAL_SMTP_PASS) {
                    console.error(trace(), `\n🔴 SMTP credentials are missing`);
                    return false;
                }
        // // data validation END
        // Create a transporter object using SMTP transport START
            const transporter = await nodemailer.createTransport({
                host: process.env.GLOBAL_SMTP_HOST,
                // secure settings
                // non-secure settings
                    port: 587,
                    secure: false, // true for 465, false for other ports
                        // // secure settings
                        //     port: 465,
                        //     secure: true, // uses SSL
                auth: {
                    user: process.env.GLOBAL_SMTP_USER,
                    pass: process.env.GLOBAL_SMTP_PASS
                },
                tls: {
                    // rejectUnauthorized: false // set to true for better security
                    rejectUnauthorized: true // set to true for better security
                }
            });
            // 🔴🔴🔴 KEEP PRIVATE 🔴🔴🔴 
                // console.log(`log(trace()\nGLOBAL_SMTP_HOST:- ${process.env.GLOBAL_SMTP_HOST}\nGLOBAL_SMTP_USER:- ${process.env.GLOBAL_SMTP_USER}\nGLOBAL_SMTP_PASS:- ${process.env.GLOBAL_SMTP_PASS}\n`);}
            // 🔴🔴🔴 KEEP PRIVATE 🔴🔴🔴 
        // Create a transporter object using SMTP transport END
        // send mail START
            try {
                const mailOptions = {
                    from: from,
                    to: to,
                    subject: subject,
                    html: html,
                    text: text
                }
                const info = await transporter.sendMail(mailOptions)
                console.log(`${trace()}\n🟢 Nodemailer info.response:-\n${info.response}`);
                console.log(`${trace()}\n🟢 Nodemailer success.`);
                return true;
            } catch (error) {
                console.error(trace(),'\n🔴 Nodemailer error sending email:- ',error);
                return false;
            }
        // send mail END
    }
// nodemailer sendMail END

// convert image data to image file START
    // Required modules
        import fs from 'fs'; // MUST BE DONE IN Node.mjs environment
        import path from 'path'; // MUST BE DONE IN Node.mjs environment
    // API endpoint to receive image data
        export function convertImageData(req, res){
            try {
                // Extract image data and filename from the request body
                    const { imageData, filename } = req.body;
                    if (!imageData || !filename) {
                        return res.status(400).json({ error: 'Image data and filename are required' });
                    }
                // Decode base64 image data
                    const buffer = Buffer.from(imageData, 'base64');
                // Specify the save path on the server
                    const savePath = path.join(__dirname, 'images', filename);
                // Write the image file to the server
                    fs.writeFile(savePath, buffer, (err) => {
                        if (err) {
                            console.error('Error saving the image:', err);
                            return res.status(500).json({ error: 'Failed to save the image' });
                        }
                        if(consoleLog===true){console.log(`Image saved successfully at ${savePath}`);}
                        res.status(200).json({ message: 'Image uploaded successfully', path: savePath });
                    });
            } catch (error) {
                console.error('Error handling image upload:', error);
                res.status(500).json({ error: 'Server error' });
            }
        // convert image data to image file END
        }

// 