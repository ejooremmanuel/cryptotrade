const {
  getHome,
  getAbout,
  getContact,
} = require("../../controllers/default/default.controller");
const { isLoggedIn } = require("../../config/authorization");
const Deposit = require("../../controllers/transactions/deposit");
const newDeposit = require("../../controllers/transactions/newdeposit");
const Withdraw = require("../../controllers/transactions/withdrawal");
const router = require("express").Router();

router.get("/", getHome);
router.get("/about", getAbout);
router.get("/contact", getContact);
router.get("/market", (req, res) => {
  res.render("markets");
});

router.post("/deposit", isLoggedIn, Deposit);
router.post("/withdraw", isLoggedIn, Withdraw);
router.get("/deposit/:amount", newDeposit);

module.exports = router;
