const nodemailer = require("nodemailer");
const mailSender = async (emailToSendTo, tkn) => {
  // create reusable transporter object
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.APP_EMAIL}`,
      pass: `${process.env.APP_EMAIL_PWD}`,
    },
  });

  const mailOptions = {
    from: `${process.env.APP_EMAIL}`,
    to: emailToSendTo,
    subject: "Learners garage password reset ✔",
    // a link to a front-end route that consumes reset route
    html: `<b>Click the link below to reset your Learners Garage password?</b><br><p>http://localhost:5000/pwdreset/reset/${tkn}</P>`,
  };

  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return err;
    } else {
      return info;
    }
  });
};

module.exports = mailSender;
