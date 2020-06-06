const nodemailer = require('nodemailer');
const fs = require('fs');

// Email Template Style 
const styles = require('./styles');


// Configuration Declaration
let username;
let smtp;
let password;
let coded = '';

// Store (Code) Data
const verification = fs.readFileSync('store.txt', 'UTF-8', function (err, data) {
    if (err) throw err;
        return data;
});

// Module Object
const nev = {

    //Configuration Declaration
    config: function (service, user, pass) {
        smtp = service;
        username = user;
        password = pass;
    },

    send: function (email) {
        // Random 5-6digit code generator
        coded = Math.floor(Math.random() * 903192);

        console.log('Mailing *********************');

        // Storing code for loss prevention
        fs.writeFile('store.txt', coded, function (err) {
            if (err) throw err;
        });

        //Sending  Email Using Nodemailer
        var transporter = nodemailer.createTransport({
            service: smtp,
            auth: {
                user: username,
                pass: password
            }
        });

        var mailOptions = {
            from: username,
            to: email,
            subject: 'EMAIL CONFIRMATION',
            html: styles.text(coded),
            text: styles.text(coded)
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                throw error;
            } else {
                return true;
            }
        });
    },

    //Verification Function
    verify: function(code){
        return code === parseInt(verification);
    }
}

module.exports = nev