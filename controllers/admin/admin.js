const axios = require("axios");
const dotenv = require("dotenv").config();
const Alltransaction = async (req, res) => {
  const data = "";
  let config = {
    method: "get",
    url: "https://api.commerce.coinbase.com/charges",
    headers: {
      "X-CC-Api-Key": process.env.api,
    },
    data: data,
  };

  axios(config)
    .then(function ({ data }) {
      data = data.data;
      return res.render("admin/alltransactions", { data });
    })
    .catch(function (error) {
      console.log(error);
    });
};

module.exports = { Alltransaction };
