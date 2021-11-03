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
    admin: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: "boolean",
      default: false,
    },
    avatar: {
      type: "string",
    },
    secretToken: {
      type: "string",
    },
    payments: [],
    status: [],
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const user = model("User", userSchema, "user");

module.exports = user;
