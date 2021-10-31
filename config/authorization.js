module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash("error-message", "Please login to continue.");
      return res.redirect("/auth/login");
    }
  },
};
