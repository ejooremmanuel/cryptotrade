const axios = require("axios");
const dotenv = require("dotenv").config();
const User = require("../../models/user");

const Deposit = async (req, res) => {
  const { amount } = req.body;
  if (!req.user) {
    res.redirect("/user/login");
  }
  let data = JSON.stringify({
    name: "Deposit for TWP",
    local_price: {
      amount,
      currency: "USD",
    },
    pricing_type: "fixed_price",
    metadata: {
      customer_name: req.user.email,
      customer_id: req.user.fullname,
    },
  });

  let config = {
    method: "post",
    url: "https://api.commerce.coinbase.com/charges/",
    headers: {
      "X-CC-Api-Key": process.env.api,
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then((response) => {
      User.findByIdAndUpdate(
        req.user._id,
        [
          {
            $set: {
              status: response.data.data.timeline[0].status,
              payments: response.data.data.payments,
            },
          },
        ],
        (err, doc) => {
          if (!err) {
            res.redirect(response.data.data.hosted_url);
          }
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = Deposit;
