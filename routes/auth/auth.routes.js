const {
  postRegister,
  postLogin,
  getRegister,
  getLogin,
} = require("../../controllers/auth/auth.controllers");

const router = require("express").Router();

router.get("/register", getRegister);
router.post("/register", postRegister);
router.get("/login", getLogin);

module.exports = router;
