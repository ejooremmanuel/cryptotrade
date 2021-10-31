const router = require("express").Router();
const { isLoggedIn } = require("../../config/authorization");
const {
  Dashboard,
  Wallet,
} = require("../../controllers/user/user.controllers");
router.get("/dashboard", isLoggedIn, Dashboard);
router.get("/wallet", isLoggedIn, Wallet);
router.get("/dashboard?", (req, res) => {
  console.log(req.query);
});
module.exports = router;
