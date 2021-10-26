const { User } = require("../../models/User");

const confirmUser = async (req, res) => {
  const { secretToken } = req.body;
  if (!secretToken)
    return res.status(400).json({ message: "Please enter a token." });

  const userWithToken = await User.findOne({ secretToken });
  if (!userWithToken)
    return res.status(404).json({ message: "Invalid token!" });

  userWithToken.confirmed = true;
  await userWithToken.save();

  return res.status(200).json({ message: "Email verified successfully." });
};

module.exports = confirmUser;
