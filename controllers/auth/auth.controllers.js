const User = require("../../models/user");
const bcryptjs = require("bcryptjs");
const welcomeEmail = require("../../utils/welcomeEmail");

const { Strategy } = require("passport-local");
const passport = require("passport");

passport.use(
  new Strategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (!user.verified) {
          return done(
            null,
            false,
            req.flash("error-message", "Please verify your email address.")
          );
        }

        if (!user) {
          return done(
            null,
            false,
            req.flash("error-message", "User not found. Please register.")
          );
        }
        const checkPassword = bcryptjs.compareSync(password, user.password);
        if (!checkPassword) {
          return done(
            null,
            false,
            req.flash("error-message", "Password does not match.")
          );
        }
        if (user && checkPassword) {
          return done(
            null,
            user,
            req.flash("success-message", "Login Successful!")
          );
        }
        return err.message;
      });
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    return done(err, user);
  });
});

module.exports = {
  getLogin: (req, res) => {
    res.render("auth/login", { year: new Date().getFullYear() });
  },
  getRegister: (req, res) => {
    res.render("auth/register", { year: new Date().getFullYear() });
  },
  postLogin: passport.authenticate("local", {
    successFlash: true,
    successMessage: true,
    successRedirect: "/user/dashboard",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true,
    session: true,
  }),
  postRegister: async (req, res) => {
    const { fullname, email, password, confirmpassword } = req.body;
    try {
      if (!fullname || !email || !password) {
        req.flash("error-message", "Please fill all fields!");
        return res.redirect("back");
      }
      if (password.length < 6) {
        req.flash(
          "error-message",
          "Password be be at least 6 characters long!"
        );
        return res.redirect("back");
      }
      if (password !== confirmpassword) {
        req.flash("error-message", "Password must match!");
        return res.redirect("back");
      }

      User.findOne({ email }, (err, user) => {
        if (user) {
          req.flash(
            "error-message",
            "Email already in use by another user! Please Use a different email and try again."
          );
          return res.redirect("back");
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);
        const secretToken = hashedPassword;
        const newUser = new User({
          fullname,
          email,
          password: hashedPassword,
          secretToken,
          avatar: `${fullname.substring(0, 2).toUpperCase()}`,
        });

        newUser.save();
        welcomeEmail(req, newUser.fullname, newUser.email, newUser.secretToken);
        req.flash(
          "success-message",
          "Registration Successful! Please verify your email address."
        );
        return res.redirect("/auth/verify");
      });
    } catch {
      ({ message }) => {
        res.json({ message });
      };
    }
  },
  confirmUser: async (req, res) => {
    const { secretToken } = req.body;
    if (!secretToken) {
      req.flash(
        "error-message",
        "Please enter the secret token sent to your email."
      );
      return res.redirect("back");
    }

    const userWithToken = await User.findOne({ secretToken });
    if (!userWithToken) {
      req.flash("error-message", "Please provide a valid token");
      return res.redirect("back");
    }
    userWithToken.verified = true;
    await userWithToken.save();
    req.flash("success-message", "Email successfully verified!");
    return res.redirect("/auth/login");
  },
  confirmUserfromlink: async (req, res) => {
    const { token } = req.params;
    if (!token) {
      req.flash(
        "error-message",
        "Please enter the secret token sent to your email."
      );
      return res.redirect("back");
    }

    const userWithToken = await User.findOne({ secretToken: token });
    if (!userWithToken) {
      req.flash("error-message", "Please provide a valid token");
      return res.redirect("back");
    }
    userWithToken.verified = true;
    await userWithToken.save();
    req.flash("success-message", "Email verified!");
    return res.redirect("/auth/login");
  },
};
