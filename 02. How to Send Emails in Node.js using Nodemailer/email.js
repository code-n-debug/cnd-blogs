const mailer = require('nodemailer');

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
    text: "Hello Email World!", // plain text body
}).then(data=>{
    console.log("Message sent: %s", data.messageId);
    // Message sent: <3a4026d0-b901-b89a-58c5-51bfe14e0b42@codendebug.com>
}).catch(error=>{
    // Do something if there is problem with email
    console.log('error', error);
});