const { getHome } = require("../../controllers/default/default.controller");
const Deposit = require("../../controllers/transactions/deposit");
const newDeposit = require("../../controllers/transactions/newdeposit");
const router = require("express").Router();

router.get("/", getHome);
router.get("/market", (req, res) => {
  res.render("markets");
});

router.get("/deposit", Deposit);
router.get("/deposit/:amount", newDeposit);

module.exports = router;
