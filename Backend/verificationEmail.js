require("dotenv").config();
const mailgun = require("mailgun-js");
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});
const from = process.env.MAILGUN_EMAIL;

const sendEmail = (email, subject, template, Variables ) => {
    console.log('Sending verification email to:', email);
    const data = {
        from: from,
        to: email,
        subject: subject,
        template: template,
        'h:X-Mailgun-Variables': JSON.stringify(Variables)
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            console.error('Error occurred while sending email:', error);
        } else {
            console.log('Email sent successfully:', body);
        }
    });
}

module.exports = { sendEmail };
