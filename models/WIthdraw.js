const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const withdrawSchema = new Schema(
  {
    amount: {
      type: "string",
    },
    email: {
      type: "string",
    },
    phone: {
      type: "string",
    },
    fullname: {
      type: "string",
    },
  },
  { timestamps: true }
);

const user = model("withdraw", withdrawSchema);

module.exports = user;
