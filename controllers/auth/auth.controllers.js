const User = require("../../models/user");
const bcryptjs = require("bcryptjs");

const { Strategy } = require("passport-local");
const passport = require("passport");

passport.use(
  new Strategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      User.findOne({ email }, (err, user) => {
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
    successRedirect: "/",
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

        const newUser = new User({
          fullname,
          email,
          password: hashedPassword,
          avatar: `${fullname.substring(0, 2).toUpperCase()}`,
        });

        newUser.save();

        req.flash(
          "success-message",
          "Registration Successful! You can now log in."
        );
        return res.redirect("/auth/login");
      });
    } catch {
      ({ message }) => {
        res.json({ message });
      };
    }
  },
};
