const Withdraw = require("../../models/WIthdraw");

const Withdrawfunds = async (req, res) => {
  const { fullname, email, amount, phone } = req.body;

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
