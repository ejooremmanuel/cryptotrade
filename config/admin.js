module.exports = {
  isAdmin: (req, res, next) => {
    if (!req.user.admin) {
      req.flash(
        "error-message",
        "You dont't have permission to access this page."
      );
      return res.redirect("/");
    } else {
      return next();
    }
  },
};
