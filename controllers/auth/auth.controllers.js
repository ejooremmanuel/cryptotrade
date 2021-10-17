module.exports = {
  getLogin: (req, res) => {
    res.render("auth/login");
  },
  getRegister: (req, res) => {
    res.render("auth/register");
  },
  postLogin: async (req, res) => {},
  postRegister: async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      await req.flash("error-message", "Please fill all fields!");
      return res.redirect([304], "back");
    }
    if (password.length < 6) {
      await req.flash(
        "error-message",
        "Password be be at least 6 characters long!"
      );
      return res.redirect("back");
    }
    res.redirect("/auth/login");
  },
};
