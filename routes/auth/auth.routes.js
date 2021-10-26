const { promisify } = require("util");
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
router.post("/login", postLogin);
router.get("/success", async (req, res) => {
  let flash = () => {
    setTimeout(() => {
      res.redirect("/");
    }, 5000);
    console.log(res.locals);
    // res.locals.success_message = "Login you in...";
  };
  flash();
});

module.exports = router;
