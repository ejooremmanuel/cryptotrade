const sendEmail = require("../config/mailer");

const welcomeEmail = async (req, username, email, secretToken) => {
  const html = `

  Welcome to TWP(Trade with Power) ${username}, we're excited to have you join us.

  <br/>
  <br/>
  Copy the the activation code ${secretToken} below.

  Alternatively, click the  ${req.headers.host}/user/confirm-account/${secretToken} to activate your account.
  <br/>
  <br/>
  We will give you the best experience ever😊😊

  <br/>
  <br/>
  Cheers👏
  <br/>
  <strong>TWP</strong>
    `;

  await sendEmail("support@TWP.com", email, "Verify your account", html);
};

module.exports = welcomeEmail;
