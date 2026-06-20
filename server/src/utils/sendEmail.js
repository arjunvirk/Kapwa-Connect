import nodemailer from "nodemailer";

const sendEmail = async ({ to, email, subject, html, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },

      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to || email,
      subject,
      html: html || `<pre>${message}</pre>`,
      text: message,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email Error:", error);
    throw error;
  }
};

export default sendEmail;
