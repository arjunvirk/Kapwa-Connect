import nodemailer from "nodemailer";

const sendEmail = async ({ to, email, subject, html, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      // support both styles
      to: to || email,

      subject,

      html: html || `<pre>${message}</pre>`,

      text: message,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email Error:", error);
  }
};

export default sendEmail;
