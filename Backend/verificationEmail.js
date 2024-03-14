require("dotenv").config();
const mailgun = require("mailgun-js");
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});

const sendEmail = (email, verificationcode) => {
    console.log('Sending verification email to:', email);
    const data = {
        from: "Excited User <postmaster@sandbox93a7ef5754f54931ae3e62ccfed7fdfa.mailgun.org>",
        to: email,
        subject: "Verification Code",
        template: "Verification",
        'h:X-Mailgun-Variables': JSON.stringify({verification : verificationcode})
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
