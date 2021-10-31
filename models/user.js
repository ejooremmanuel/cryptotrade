const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    fullname: {
      type: "string",
    },
    password: {
      type: "string",
    },
    email: {
      type: "string",
    },
    verified: {
      type: "boolean",
      default: false,
    },
    avatar: {
      type: "string",
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const user = model("User", userSchema, "user");

module.exports = user;
