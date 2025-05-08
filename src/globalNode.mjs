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

// ############################
// SERVER SIDE FUNCTIONS ONLY #
// ############################

console.log(consoleTrace());
console.log("LOADED:- globalNode.mjs is loaded")
export function globalNodeMJSisLoaded(){
    return true;
}

const consoleOn = true;
// Override console.trace to only output the first line of the stack trace START
    export function consoleTrace() {
        try {
            const stack = new Error().stack;
            const firstLine = stack.split('\n')[2].trim();
            return `Trace line: ${firstLine}`;
        } catch (error) {
            return 'Trace line: not available';
        }
    };


// ===========================================================================================================================


// // nodemailer setup START
//     // const nodemailer = require('nodemailer');
//         import nodemailer from 'nodemailer'; // MUST BE DONE IN Node.js environment
//     // export function nodemailerSetup(){
//     //     // Create a transporter object using SMTP transport START
//     //         const transporter = nodemailer.createTransport({
//     //             host: process.env.GLOBAL_SMTP_HOST,
//     //             // secure settings
//     //             // non-secure settings
//     //                 port: 587,
//     //                 secure: false, // true for 465, false for other ports
//     //                     // // secure settings
//     //                     //     port: 465,
//     //                     //     secure: true, // uses SSL
//     //             auth: {
//     //                 user: process.env.GLOBAL_SMTP_USER,
//     //                 pass: process.env.GLOBAL_SMTP_PASS
//     //             },
//     //             tls: {
//     //                 // rejectUnauthorized: false // set to true for better security
//     //                 rejectUnauthorized: true // set to true for better security
//     //             }
//     //         });
//     //         if(consoleOn){console.log(consoleTrace());}
//     //         if(consoleOn){console.log(`${process.env.GLOBAL_SMTP_HOST}\n${process.env.GLOBAL_SMTP_USER}\n${process.env.GLOBAL_SMTP_PASS}\n`);}
//     //     // Create a transporter object using SMTP transport END
//     // }
// // nodemailer setup END

// nodemailer sendMail START
    import nodemailer from 'nodemailer'; // MUST BE DONE IN Node.js environment
    export async function nodemailerSendMail(from,to,subject,html,text){
        if(consoleOn){console.log(consoleTrace());}
        // if(consoleOn){console.log(`${from}\n${to}\n${subject}\n${html}\n${text}\n`);}

        // Create a transporter object using SMTP transport START
            const transporter = nodemailer.createTransport({
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
            if(consoleOn){console.log(consoleTrace());}
            if(consoleOn){console.log(`${process.env.GLOBAL_SMTP_HOST}\n${process.env.GLOBAL_SMTP_USER}\n${process.env.GLOBAL_SMTP_PASS}\n`);}
        // Create a transporter object using SMTP transport END

        try {
            // const { name, subject, email, message } = req.body;
            const mailOptions = {
                from: from,
                to: to,
                subject: subject,
                html: html,
                text: text
            }
            // ALL "mailOptions" START
                // from: The sender's email address.
                // to: The recipient's email address or a list of recipients.
                // cc: Carbon copy recipients.
                // bcc: Blind carbon copy recipients.
                // subject: The subject of the email.
                // text: The plain text body of the email.
                // html: The HTML body of the email.
                // attachments: An array of attachment objects.
                // replyTo: An email address to which replies should be sent.
                // headers: Custom headers for the email.
                // priority: Priority of the email ('high', 'normal', 'low').
                // alternatives: An array of alternative text contents (e.g., plain text and HTML versions).
                // envelope: SMTP envelope, if different from the from and to fields.
                // messageId: Custom message ID.
                // date: Custom date header.
                // encoding: Content transfer encoding.
                // raw: Raw email content.
            // ALL "mailOptions" END
            // if(consoleOn){console.log(consoleTrace());}
            // if(consoleOn){console.log(mailOptions);}
            await transporter.sendMail(mailOptions)
            .then(info =>{
                // res.status(200).send('Email sent successfully');
                // if(consoleOn){console.log(consoleTrace());}
                if(consoleOn){console.log(`Nodemailer success:- ${info.response}`);}
            })
            .catch(error =>{
                if(consoleOn){console.error('Nodemailer Error:- ',error.response);}
            })
        } catch (error) {
            // res.status(500).send('Error sending email');
            // if(consoleOn){console.log(consoleTrace());}
            if(consoleOn){console.error('Error sending email');}
        }
    }
    // nodemailerSendMail(process.env.GLOBAL_SMTP_USER,"donald.garton@outlook.com","subject","html","text");
// nodemailer sendMail END

// convert image data to image file START
    // Required modules
        import fs from 'fs'; // MUST BE DONE IN Node.js environment
        import path from 'path'; // MUST BE DONE IN Node.js environment
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
                        console.log(`Image saved successfully at ${savePath}`);
                        res.status(200).json({ message: 'Image uploaded successfully', path: savePath });
                    });
            } catch (error) {
                console.error('Error handling image upload:', error);
                res.status(500).json({ error: 'Server error' });
            }
        // convert image data to image file END
        }

// 