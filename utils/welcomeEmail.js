const sendEmail = require("../config/mailer");

const welcomeEmail = async (req, username, email, secretToken) => {
  const html = `

  Welcome to TWP(Trade with Power) ${username}, we're excited to have you join us.

  <br/>
  <br/>
  Copy the the activation code <strong>${secretToken}</strong>.
  <br/>
  <br/>

  Alternatively, click the  <a href="https://${req.headers.host}/auth/verify/${secretToken}">Click here to activate your account</a>.
  <br/>
  <br/>
  We will give you the best experience ever😊😊

  <br/>
  <br/>
  Cheers👏
  <br/>
  <strong>TWP</strong>
    `;

  await sendEmail(
    "support@tradewithpower.net",
    email,
    "Verify your account",
    html
  );
};

module.exports = welcomeEmail;
