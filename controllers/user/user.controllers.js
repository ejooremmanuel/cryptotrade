const User = require("../../models/user");

module.exports = {
  Dashboard: async (req, res) => {
    const foundUser = await User.findById(req.user._id);
    const { balance, fullname, verified } = foundUser;
    const getName = fullname.split(" ")[0];

    res.render("userpage/dashboard", { balance, fullname: getName, verified });
  },
  Wallet: async (req, res) => {
    const foundUser = await User.findById(req.user._id);
    const { balance, fullname, verified } = foundUser;
    const getName = fullname.split(" ")[0];

    res.render("userpage/wallet", { balance, fullname: getName, verified });
  },
};
