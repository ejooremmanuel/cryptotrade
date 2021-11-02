const router = require("express").Router();
const { isLoggedIn } = require("../../config/authorization");
const {
  Dashboard,
  Wallet,
} = require("../../controllers/user/user.controllers");
router.get("/dashboard", isLoggedIn, Dashboard);
router.get("/wallet", isLoggedIn, Wallet);
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
module.exports = router;
