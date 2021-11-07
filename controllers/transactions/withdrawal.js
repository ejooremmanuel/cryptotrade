const Withdraw = require("../../models/WIthdraw");
const User = require("../../models/user");

const Withdrawfunds = async (req, res) => {
  const { fullname, email, amount, phone } = req.body;

  let checkbalance = await User.findOne({ email: email });

  if (amount > checkbalance.balance) {
    req.flash(
      "error-message",
      "Insufficient balance! Please make a deposit and try again."
    );
    return res.redirect("back");
  }

  const newWithdrawRequest = await new Withdraw({
    fullname,
    email,
    amount,
    phone,
  });

  await newWithdrawRequest.save();
  req.flash(
    "success-message",
    "Withdrawal Request Successful. We will contact you shortly!"
  );
  res.redirect("back");
};

module.exports = Withdrawfunds;
