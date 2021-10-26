const sendEmail = require("../config/mailer");

const welcomeEmail = async (req, username, email, secretToken) => {
  const html = `

  Welcome to WAAWChat ${username}, we're excited to have you join us.

  <br/>
  <br/>
  Copy the the activation code ${secretToken} below.

  Alternatively, click the  ${req.headers.host}/user/confirm-account/${secretToken} to activate your account.
  <br/>
  <br/>
  WAAWChat will give you the best experience ever😊😊

  <br/>
  <br/>
  Cheers👏
  <br/>
  <strong>WAAWCHAT Team</strong>
    `;

  await sendEmail("support@waawchat.com", email, "Welcome to WAAWChat", html);
};

module.exports = welcomeEmail;
