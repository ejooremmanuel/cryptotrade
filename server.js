const { globalVariables } = require("./config/configuration");
const express = require("express");
const ejs = require("ejs");
const app = express();
const logger = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv").config();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const LocalStrategy = require("passport-local").Strategy;
app.use(flash());
const authroutes = require("./routes/auth/auth.routes");
const defaultroutes = require("./routes/default/default.routes");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

//Connect Database
mongoose
  .connect("mongodb://localhost/cryptotrade")
  .then((connected) => {
    console.log("Database connection established");
  })
  .catch(({ message }) => {
    console.log("Database connection failed", "::", message);
  });

//Set up cookie and session
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: Date.now() + 360000 * 24 * 60 * 60 },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost/cryptotrade",
      ttl: 14 * 24 * 60,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authroutes);
app.use("/", defaultroutes);

app.use(globalVariables);

app.listen(7000, console.log("server listening on port 7000"));
