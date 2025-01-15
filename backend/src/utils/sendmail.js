const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "levisamuel2005@gmail.com",
      pass: "blkw zsqa nmfi gvwd",
    },
  });

  module.exports = transporter;