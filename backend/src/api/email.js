const nodemailer = require("nodemailer");

require("dotenv").config();

const thanksToCreateAccount = `
  <h1>Obrigado por criar na Ocitanda</h1>
  <p>Com esta conta você poderá usufruir de todos os recursos que a ocitanda tem para o oferecer.</p>
  <a href="https://ocitanda.com">https://ocitanda.com</a>
`;

const resetPasswordHTML = (link) => `
  <h1>Este link serve para recoperar a sua password</h1>
  <p>Click no Link para recoperar no link para recoperar a palavra-passe.</p>
  <a href="${link}">${link}</a>
  <p>Se não pediu por este email, por favor ignore.</p>
`;

const transport = nodemailer.createTransport({
  host: "mail.ocitanda.com",
  port: 465,
  secure: true,
  auth: {
    type: "login",
    user: process.env.OCITANDA_EMAIL,
    pass: process.env.OCITANDA_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (to) =>
  await transport.sendMail({
    from: `"Ocitanda" <${process.env.OCITANDA_EMAIL}>`,
    to,
    subject: "Obrigado por Criar uma Conta",
    html: thanksToCreateAccount,
  });

const resetPasswordEmail = async (to, recoverLink) =>
  await transport.sendMail({
    from: `"Ocitanda" <${process.env.OCITANDA_EMAIL}>`,
    to,
    subject: "Link para recoperar a palavra-passe",
    html: resetPasswordHTML(recoverLink),
  });

module.exports = {
  sendEmail,
  resetPasswordEmail
};
