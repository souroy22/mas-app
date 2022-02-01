const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testware.team@gmail.com',
        pass: 'Demo@1357' // naturally, replace both with your real credentials or an application-specific password
    }
});

module.exports = transporter;