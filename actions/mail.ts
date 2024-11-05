"use server";
import nodemailer from "nodemailer";
import axios from "axios";
import sanitizeHtml from "sanitize-html";

function generateEmailTemplate(data: any) {
  return `
   <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Árajánlatkérés</title>
    <style>
      .hatterszin {
        margin: 0;
        padding: 0;
        background: radial-gradient(
          circle at center,
          #0c2912,
          #0cb406,
          #243e24
        );
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        color: #ffffff;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 40px auto;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }
      .header {
        background: linear-gradient(135deg, #07330a, #31d331);
        color: #ffffff;
        text-align: center;
        padding: 30px 20px;
      }
      .header h1 {
        margin: 0;
        font-size: 28px;
      }
      .content {
        padding: 30px 20px;
        color: #dcdcdc;
      }
      .content p {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 20px;
      }
      .content p:last-child {
        margin-bottom: 0;
      }
      .footer {
        background: linear-gradient(135deg, #07330a, #31d331);
        text-align: center;
        padding: 20px;
        font-size: 14px;
        color: #ffffff;
      }
    </style>
  </head>
  <body>
    <div class="hatterszin">
    <div class="container">
      <div class="header">
        <h1>Árajánlatkérés</h1>
      </div>
      <div class="content">
        <p>
          Árajánlatkérő Üzenet!
        </p>
        <p><strong>Név:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefon:</strong> ${data.phone}</p>
        <p><strong>Üzenet:</strong> ${data.message}</p>
      </div>
      <div class="footer">
        <p>Üdvözlettel,<br /><strong>Weblab Studio</strong></p>
      </div>
    </div>
  </div>
  </body>
</html>
  `;
}
function generateThankYouEmailTemplate(data: any) {
  return `
    <html>
      <head>
        <style>
      .hatterszin {
        margin: 0;
        padding: 0;
        background: radial-gradient(
          circle at center,
          #0c2912,
          #0cb406,
          #243e24
        );
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        color: #ffffff;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 40px auto;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }
      .header {
        background: linear-gradient(135deg, #07330a, #31d331);
        color: #ffffff;
        text-align: center;
        padding: 30px 20px;
      }
      .header h1 {
        margin: 0;
        font-size: 28px;
      }
      .content {
        padding: 30px 20px;
        color: #dcdcdc;
      }
      .content p {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 20px;
      }
      .content p:last-child {
        margin-bottom: 0;
      }
      .footer {
        background: linear-gradient(135deg, #07330a, #31d331);
        text-align: center;
        padding: 20px;
        font-size: 14px;
        color: #ffffff;
      }
    </style>
      </head>
      <body>
      <div class="hatterszin">
        <div class="container">
          <div class="header">
            <h1>Köszönjük, hogy kapcsolatba lépett velünk!</h1>
          </div>
          <div class="content">
            <p>Kedves ${data.name},</p>
            <p>Köszönjük, hogy felvette velünk a kapcsolatot! Az üzenetét megkaptuk, hamarosan felvesszük Önnel a kapcsolatot.</p>
            <p>Az ön adatai:</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Telefon:</strong> ${data.phone}</p>
            <p><strong>Üzenet:</strong> ${data.message}</p>
          </div>
          <div class="footer">
            <p>Üdvözlettel,<br>Weblab Studio</p>
          </div>
        </div>
        </div>
      </body>
    </html>
  `;
}

const transporter = nodemailer.createTransport({
  host: "mail.weblabstudio.hu",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function verifyToken(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
  );

  console.log(response.data);
  return response.data.success;
}

function sanitizeInput(input: string) {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

function validateInput(formData: any) {
  const { name, email, phone, message } = formData;
  if (!name || !email || !phone || !message) {
    throw new Error("All fields are required.");
  }
  // Add more validation logic as needed
}

async function sendMail(formData: any) {
  const { name, email, phone, message, token } = formData;

  // Verify reCAPTCHA token
  // const isTokenValid = await verifyToken(token);
  // if (!isTokenValid) {
  //   throw new Error("Invalid reCAPTCHA token.");
  // }

  // Sanitize user input
  const sanitizedData = {
    name: sanitizeInput(name),
    email: sanitizeInput(email),
    phone: sanitizeInput(phone),
    message: sanitizeInput(message),
  };

  // Validate user input
  validateInput(sanitizedData);
  const htmlContent = generateEmailTemplate(sanitizedData);
  const htmlContentThankYou = generateThankYouEmailTemplate(sanitizedData);

  // Send email
  await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: `${sanitizedData.email}`,
    subject: "Árajánlatkérés", // Subject line
    text: `Név: ${sanitizedData.name}, Email: ${sanitizedData.email}, Telefon: ${sanitizedData.phone}, Üzenet: ${sanitizedData.message}`, // plain text body
    html: htmlContentThankYou, // HTML body
  });
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: "hello@weblabstudio.hu",
    subject: "Árajánlatkérés", // Subject line
    text: `Név: ${sanitizedData.name}, Email: ${sanitizedData.email}, Telefon: ${sanitizedData.phone}, Üzenet: ${sanitizedData.message}`, // plain text body
    html: htmlContent, // HTML body
  });
  return info;
}

export default sendMail;
