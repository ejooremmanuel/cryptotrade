const User = require("../../models/User");
const confirmUser = async (req, res) => {
  const { secretToken } = req.body;
  if (!secretToken) {
    req.flash(
      "error-message",
      "Please enter the secret token sent to your email."
    );
    return res.redirect("back");
  }

  const userWithToken = await User.findOne({ secretToken });
  if (!userWithToken) {
    req.flash("error-message", "Please provide a valid token");
    return res.redirect("back");
  }
  userWithToken.verified = true;
  await userWithToken.save();
  req.flash("success-message", "Email verified!");
  return res.redirect("/auth/login");
};

module.exports = confirmUser;
