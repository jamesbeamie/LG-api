const nodemailer = require("nodemailer");
const mailSender = async (emailToReset) => {
  // create reusable transporter object
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.APP_EMAIL}`, // generated ethereal user
      pass: `${process.env.APP_EMAIL_PWD}`, // generated ethereal password
    },
  });

  const mailOptions = {
    from: `${process.env.APP_EMAIL}`, // sender address
    to: emailToReset, // list of receivers
    subject: "Learners garage password reset ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: "<b>Click the link below to reset your password?</b>", // html body
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.json({ message: "something went wrong" });
    } else {
      res.json({
        info,
        message: `A password reset link has been sent to ${emailToReset}. Check to reset password`,
      });
    }
  });
};

module.exports = mailSender;
