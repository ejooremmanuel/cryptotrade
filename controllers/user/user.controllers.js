const User = require("../../models/user");

module.exports = {
  Dashboard: async (req, res) => {
    const foundUser = await User.findById(req.user._id);
    const { balance, avatar, verified } = foundUser;

    res.render("userpage/dashboard", { balance, fullname: avatar, verified });
  },
  Wallet: async (req, res) => {
    const foundUser = await User.findById(req.user._id);
    const { balance, avatar, verified } = foundUser;
    res.render("userpage/wallet", { balance, fullname: avatar, verified });
  },
  Packages: async (req, res) => {
    const foundUser = await User.findById(req.user._id);
    const { balance, verified, avatar } = foundUser;

    res.render("userpage/packages", { balance, fullname: avatar, verified });
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
};
