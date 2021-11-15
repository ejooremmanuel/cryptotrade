const {
  postRegister,
  postLogin,
  getRegister,
  getLogin,
  confirmUser,
  confirmUserfromlink,
  getForgotPassword,
  postForgotPassword,
  postreset,
  postChangePassword,
} = require("../../controllers/auth/auth.controllers");

const router = require("express").Router();

router.get("/register", getRegister);
router.post("/register", postRegister);
router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/verify/:token", confirmUserfromlink);
router.post("/verify", confirmUser);
router.get("/forgot", getForgotPassword);
router.post("/reset", postreset);
router.post("/forgot", postForgotPassword);
router.post("/changepassword", postChangePassword);
router.get("/forgot/:token", postForgotPassword);
router.get("/verify", (req, res) => {
  res.render("auth/verifytoken");
});

module.exports = router;
