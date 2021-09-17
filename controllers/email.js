const nodemailer = require('nodemailer');
require('dotenv').config();
/* --------------------- EMAILS Y MESSAGING --------------------------- */
const transporterGmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alonsooteroseminario@gmail.com',
        pass: process.env.GMAIL_PASSWORD.toString()
    }
  });

  module.exports = {
    transporterGmail
  };