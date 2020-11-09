const mailer = require('nodemailer');
const fs = require('fs');

const templatedEmail = fs.readFileSync('templatedEmail.html', { encoding: 'utf-8' }).toString();

//import handle bar
const Handlebars = require("handlebars");

//compile the templatedEmail
const template = Handlebars.compile(templatedEmail);

// dynamic data
const data = {
    name: 'Ken C'
};

//pass the data to the template
const dynamicEmail = template(data);

const transport = mailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '87393cbab942d5',
        pass: '00f8bc09b0a566'
    }
});

// send mail with defined transport object
transport.sendMail({
    from: 'help@codendebug.com', // sender address
    to: "user@unknown.net", // receiver address
    subject: "NodeJS Rock", // Subject line
    html: dynamicEmail    // send dynamic HTML
}).then(data=>{
    console.log("Message sent: %s", data.messageId);
    // Message sent: <3a4026d0-b901-b89a-58c5-51bfe14e0b42@codendebug.com>
}).catch(error=>{
    // Do something if there is problem with email
    console.log('error', error);
});