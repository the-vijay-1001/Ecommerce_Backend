import config from '../config';

const {email} = config;
export default {
  sendOtp(data) {
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email.emailAddress,
        pass: email.password
      }
    });

    var mailOptions = {
      from: email.emailAddress,
      to: data.to,
      subject: 'Your OTP : E-commerce',
      text: 'Your Otp '+data.otp
    };

    return transporter.sendMail(mailOptions);
  }
}