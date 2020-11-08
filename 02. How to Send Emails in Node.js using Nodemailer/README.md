One of the core functionality of an application is to send an email to the users. This email notification allows you to know what's happening in your account or transaction.

Luckily, NodeJS provides an easy way to send an email.

# Prerequisite.

Before we can begin make sure you have [NodeJS](https://nodejs.org/en/) installed in your machine. You need to have at least node v6 or the latest.

# Getting Started

One of the popular packages that NodeJS developers used to send email is [nodemailer](https://nodemailer.com/about/). It allows you to easily integrate email sending to your application.

### Installation
Let's create a project folder then initialize our [npm](https://www.npmjs.com/) by running these commands.
```bash
mkdir sendemail
cd ./sendemail
npm init -y

{
  "name": "sendemail",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

We can now install `nodemailer` by running
```bash
npm install nodemailer
```

NPM will install the package that we can conveniently import in our codes.

### Start Coding
We can now start creating our first email.

Let's create `email.js`
```javascript
// first let's import our package
const mailer = require('nodemailer');

// create a transport object
const transport = mailer.createTransport({
    // put the mail server config
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: 'put_your_username_here',
        pass: 'put_your_password_here'
    }
})
```

The code above will create a transport object that allows you to connect to a [mail server](https://www.google.com/search?q=mail+server&rlz=1C1CHBF_enPH864PH864&oq=mail+server&aqs=chrome.0.69i59j0i67l5j69i60l2.1283j0j7&sourceid=chrome&ie=UTF-8) which sends the email for you. 

Since we don't have a mail server we can use [MailTrap](https://mailtrap.io/) service to get a mail server config.

You can follow these steps to setup your `MailTrap` account.
1. Create an account in MailTrap https://mailtrap.io/register/signup?ref=header.
2. Verify your account by `confirming` your email.
3. After you verify, login to your account then, go to `My Inbox`
4. Click Integrations, then select `nodemailer`. You should see something like this.
![MailTrap - Nodemailer Integration](https://raw.githubusercontent.com/code-n-debug/cnd-blogs/main/02.%20How%20to%20Send%20Emails%20in%20Node.js%20using%20Nodemailer/assets/p1.png)
We can now use this transport to test our email sender.

Let's create a message for our email sender.
```javascript
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
```

Now you will receive something like this.
![MailTrap - Inbox](https://raw.githubusercontent.com/code-n-debug/cnd-blogs/main/02.%20How%20to%20Send%20Emails%20in%20Node.js%20using%20Nodemailer/assets/p2.png)

Congrats, you can now send email in NodeJS.

# Summary 

We can add more functionality to our email by adding email templates, receipient list, add emojis, and adding attachments. All thanks to the `Nodemailer` team which makes email sending fun and easy.

Happy Coding 😃