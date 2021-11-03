const router = require("express").Router();
const { isLoggedIn } = require("../../config/authorization");
const { isAdmin } = require("../../config/admin");
const {
  Dashboard,
  Wallet,
  Packages,
  getAdminPage,
} = require("../../controllers/user/user.controllers");
router.get("/dashboard", isLoggedIn, Dashboard);
router.get("/wallet", isLoggedIn, Wallet);
router.get("/packages", isLoggedIn, Packages);
router.get("/admin", isAdmin, getAdminPage);
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
module.exports = router;
