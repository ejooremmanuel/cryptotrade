// Set up dotenv
require("dotenv").config();
const { createTransport } = require("nodemailer");

// const transport = createTransport({
//   service: "Gmail",
//   auth: {
//     user: process.env.user,
//     pass: process.env.pass,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// create reusable transporter object using the default SMTP transport
let transport = createTransport({
  host: "mail.privateemail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

function sendEmail(from, to, subject, html) {
  return new Promise((resolve, reject) => {
    transport.sendMail({ from, to, subject, html }, (err, info) => {
      if (err) return reject(err);
      resolve(info);
    });
  });
}

module.exports = sendEmail;
