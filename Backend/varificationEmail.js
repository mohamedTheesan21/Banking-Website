const nodemailer = require('nodemailer');

// Create a nodemailer transporter with Mailgun SMTP credentials
const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
        user: 'postmaster@sandbox93a7ef5754f54931ae3e62ccfed7fdfa.mailgun.org',
        pass: 'b823b7f60c3b9d291b6ca9d6b789140f-408f32f3-2bc8a245'
    }
});

// Function to send verification email
const sendVerificationEmail = (email, verificationCode) => {
    const mailOptions = {
        from: 'Excited User <postmaster@sandbox93a7ef5754f54931ae3e62ccfed7fdfa.mailgun.org>',
        to: email,
        subject: 'Verification Code',
        text: `Your verification code is: ${verificationCode}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred while sending email:', error);
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });
}

// const generateVerificationCode =  (length) => {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let code = '';
//     for (let i = 0; i < length; i++) {
//         code += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return code;
// }

module.exports = { sendVerificationEmail};