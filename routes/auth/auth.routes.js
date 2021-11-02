const {
  postRegister,
  postLogin,
  getRegister,
  getLogin,
  confirmUser,
  confirmUserfromlink,
} = require("../../controllers/auth/auth.controllers");

const router = require("express").Router();

router.get("/register", getRegister);
router.post("/register", postRegister);
router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/verify/:token", confirmUserfromlink);
router.post("/verify", confirmUser);
router.get("/verify", (req, res) => {
  res.render("auth/verifytoken");
});

module.exports = router;
