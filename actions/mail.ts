"use server";
import nodemailer from "nodemailer";
import axios from "axios";
import sanitizeHtml from "sanitize-html";

function generateEmailTemplate(data: any) {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #4CAF50;
            color: #ffffff;
            padding: 10px 0;
            text-align: center;
          }
          .content {
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            color: #888888;
            font-size: 12px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Árajánlatkérés</h1>
          </div>
          <div class="content">
            <p><strong>Név:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Telefon:</strong> ${data.phone}</p>
            <p><strong>Üzenet:</strong> ${data.message}</p>
          </div>
          <div class="footer">
            <p>Köszönjük az üzenetet!</p>
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
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #4CAF50;
            color: #ffffff;
            padding: 10px 0;
            text-align: center;
          }
          .content {
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            color: #888888;
            font-size: 12px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Köszönjük, hogy kapcsolatba lépett velünk!</h1>
          </div>
          <div class="content">
            <p>Kedves ${data.name},</p>
            <p>Köszönjük, hogy felvette velünk a kapcsolatot! Az üzenetét megkaptuk, és rövidesen válaszolunk.</p>
            <p>Az ön adatai:</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Telefon:</strong> ${data.phone}</p>
            <p><strong>Üzenet:</strong> ${data.message}</p>
          </div>
          <div class="footer">
            <p>Üdvözlettel,<br>WeblabStudio</p>
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
    to: "pnorbert88@gmail.com",
    subject: "Árajánlatkérés", // Subject line
    text: `Név: ${sanitizedData.name}, Email: ${sanitizedData.email}, Telefon: ${sanitizedData.phone}, Üzenet: ${sanitizedData.message}`, // plain text body
    html: htmlContent, // HTML body
  });
  return info;
}

export default sendMail;
