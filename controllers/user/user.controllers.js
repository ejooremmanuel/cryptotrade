const User = require("../../models/user");

module.exports = {
  Dashboard: async (req, res) => {
    const foundUser = await User.findById(req.user._id);
    const { balance, fullname } = foundUser;
    console.log(balance);
    res.render("userpage/dashboard", { balance, fullname });
  },
};
