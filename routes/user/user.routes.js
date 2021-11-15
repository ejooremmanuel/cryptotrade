const router = require("express").Router();
const { isLoggedIn } = require("../../config/authorization");
const { isAdmin } = require("../../config/admin");
const { Alltransaction } = require("../../controllers/admin/admin");
const {
  Dashboard,
  Wallet,
  Packages,
  getAdminPage,
  getDepositPage,
  getWithdrawPage,
  getProfileSettingPage,
} = require("../../controllers/user/user.controllers");
router.get("/dashboard", isLoggedIn, Dashboard);
router.get("/profilesettings", isLoggedIn, getProfileSettingPage);
router.get("/wallet", isLoggedIn, Wallet);
router.get("/packages", isLoggedIn, Packages);
router.get("/deposit", isLoggedIn, getDepositPage);
router.get("/withdraw", isLoggedIn, getWithdrawPage);
router.get("/admin", isAdmin, getAdminPage);
router.get("/alltransactions", isAdmin, Alltransaction);
router.get("/logout", (req, res) => {
  req.logout();
  req.flash(
    "success-message",
    "You just logged out! We'd love to have you back😊"
  );
  res.redirect("/auth/login");
});
module.exports = router;
