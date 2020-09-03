const nodemailer = require("nodemailer");

require("dotenv").config();

const banksInfo = [
  "Banco BAI Número de Conta - 10130147910 001 (Moeda AKZ), IBAN/NIB - AO06 0040 0000 0130 1479 1013 7",
];

// HTML

const headerHTML = `
<figure style="width: 100%; display: flex; margin-left: 0;">
  <img style="width: 40%; min-width: 15rem; max-width: 30rem;" src="https://ocitanda.com/logo_horizontal.png" alt="Ocitanda logo" >
</figure>
`;

const thanksToSubscribe = `
${headerHTML}
  <h1>Obrigado por se subscrever na <strong>OCITANDA</strong></h1>
  <p> Apartir de agora receberá todas as nossas atualizações, desde produtos, promoções e tudo  de bom que a <strong>OCITANDA</strong> tem para o oferecer.</p>
  <a href="https://ocitanda.com">https://ocitanda.com</a>
`;

const purchaseHtml = (purchase) => `
${headerHTML}
  <h1>Bom dia, ${purchase.consumer.user.name}</h1>
  <h3>Código de Encomenda -
  <strong style="color: #2e8f30;">
    ${purchase.code}
  </strong></h3>
  <p>
    A sua compra com o código de encomenda
    <strong style="color: #2e8f30;">
        ${purchase.code}
    </strong>
    já foi registrada e aguarda o pagamento.
  </p>
  <article>
    <h1>
      Pagamento por Tranferência Bancária
    </h1>
    <p>Quantia: <strong style="color: #2e8f30;">${
      purchase.quantity
    } AKZ</strong></p>
    <p>Titular da Conta: <strong style="color: #2e8f30;">DP & DEEPL, Lda,</strong></p>
    <ul>
      <h3>
        Detalhes da conta para transferência.
      </h3>
      ${banksInfo.map((_b) => "<li>" + _b + "</li>")}
    </ul>
    <p style="color: #2e8f30; font-weight: 700">
      Enviar comprovativo de pagamento para,
      <strong>pagamentos@ocitanda.com</strong>
      , junto com o código de referência e atravéz deste email.
    </p>
  </article>
  <a href="https://ocitanda.com">Para mais informações visite o nosso site https://ocitanda.com</a>
`;

const confirmPurchaseHtml = (purchase) => `
${headerHTML}
    <h1>Bom dia, ${purchase.consumer.user.name}</h1>
  <h3>Código de Encomenda -
  <strong style="color: #2e8f30;">
    ${purchase.code}
  </strong></h3>
  <p>
    A sua compra com o código de encomenda
    <strong style="color: #2e8f30;">
        ${purchase.code}
    </strong>
    já foi confirmada como paga.
  </p>
  <article>
      <h3>
        A sua encomenda está em trânsito. Pode saber mais no nosso site clicando no "Icon de usuário".
      </h3>
  </article>
  <a href="https://ocitanda.com">Para mais informações visite o nosso site https://ocitanda.com</a>
`;

const deliveredPurchaseHtml = (purchase) => `
${headerHTML}
  <h1>Bom dia, ${purchase.consumer.user.name}</h1>
  <h3>Código de Encomenda -
  <strong style="color: #2e8f30;">
    ${purchase.code}
  </strong></h3>
  <p>
    A sua compra com o código de encomenda
    <strong style="color: #2e8f30;">
        ${purchase.code}
    </strong>
    já foi entregue com sucesso.
  </p>
  <p>Vá até ao seu perfil ocitnada para ver mais informações sobre a compra</p>
  <article>
      <h3>
        Obrigado por escolher a OCITANDA, agradecemos a sua preferência. 
      </h3>
  </article>
  <a href="https://ocitanda.com">Para mais informações visite o nosso site https://ocitanda.com</a>
`;

const resetPasswordHTML = (link) => `
${headerHTML}
  <h1>Este link serve para recuperar a sua password</h1>
  <p>Click no Link para recuperar no link para recuperar a palavra-passe.</p>
  <a href="${link}">${link}</a>
  <p>Se não pediu por este email, por favor ignore.</p>
`;

const verifyEmailHTML = (link) => `
${headerHTML}
  <h1>Obrigado por criar uma conta na Ocitanda</h1>
  <h3>Este email serve para verificar se o senhor(a) é detentor(a) desta conta.</h3>
  <p>Click no Link para validar o seu email.</p>
  <a href="${link}">${link}</a>
  <p>Se não pediu por este email, por favor ignore.</p>
`;

// Emails

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

const resetPasswordEmail = async (to, recoverLink) =>
  await transport.sendMail({
    from: `"Ocitanda" <${process.env.OCITANDA_EMAIL}>`,
    to,
    subject: "Link para recuperar a palavra-passe",
    html: resetPasswordHTML(recoverLink),
  });

const verifyEmail = async (to, recoverLink) =>
  await transport.sendMail({
    from: `"Ocitanda" <${process.env.OCITANDA_EMAIL}>`,
    to,
    subject: "Link para verificar email",
    html: verifyEmailHTML(recoverLink),
  });

const subscribeEmail = async (to) =>
  await transport.sendMail({
    from: `"Ocitanda" <${process.env.OCITANDA_EMAIL}>`,
    to,
    subject: "Obrigado por subscrever-se na OCITANDA",
    html: thanksToSubscribe,
  });

const PurchaseEmail = async ({ to, purchase }) =>
  await transport.sendMail({
    from: `"Ocitanda" <${process.env.OCITANDA_EMAIL}>`,
    to,
    subject: "Compra registrada á espera de pagamento",
    html: purchaseHtml(purchase),
  });

const confirmPurchaseEmail = async ({ to, purchase }) =>
  await transport.sendMail({
    from: `"Ocitanda" <${process.env.OCITANDA_EMAIL}>`,
    to,
    subject: "Compra Paga com sucesso",
    html: confirmPurchaseHtml(purchase),
  });

const deliveredPurchaseEmail = async ({ to, purchase }) =>
  await transport.sendMail({
    from: `"Ocitanda" <${process.env.OCITANDA_EMAIL}>`,
    to,
    subject: "Compra Paga com sucesso",
    html: deliveredPurchaseHtml(purchase),
  });

module.exports = {
  resetPasswordEmail,
  subscribeEmail,
  verifyEmail,
  confirmPurchaseEmail,
  PurchaseEmail,
  deliveredPurchaseEmail,
};
