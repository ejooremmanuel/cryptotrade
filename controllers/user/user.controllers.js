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
  Packages: async (req, res) => {
    const foundUser = await User.findById(req.user._id);
    const { balance, fullname, verified, avatar } = foundUser;
    const getName = fullname.split(" ")[0];

    res.render("userpage/packages", { balance, fullname: getName, verified });
  },
  getAdminPage: (req, res) => {
    res.render("userpage/admin");
  },
  getDepositPage: async (req, res) => {
    const foundUser = await User.findById(req.user._id);
    const { email, fullname } = foundUser;
    res.render("userpage/payment", { email, fullname });
  },
  getWithdrawPage: async (req, res) => {
    const foundUser = await User.findById(req.user._id);
    const { email, fullname } = foundUser;
    res.render("userpage/withdraw", { email, fullname });
  },
  getProfileSettingPage: async (req, res) => {
    const foundUser = await User.findById(req.user._id);
    const { email, fullname, verified } = foundUser;
    const getName = fullname.split(" ")[0];
    res.render("userpage/profile", { email, fullname: getName, verified });
  },
};
